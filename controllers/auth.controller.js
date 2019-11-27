require("dotenv").config();
const User = require("../models/User");
const Course = require('../models/Course')
const { sendEmail } = require("../controllers/email")
const passport = require('passport')
 
exports.signupGet = (req, res) => res.render("auth/signup");

exports.signupPost = (req, res, next) => {
    const { email, username, password, passwordrepeat } = req.body;
    if (password !== passwordrepeat) {
      return res.render("auth/signup", {
        msg: "Password must be the same"
      });
    }

    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length )];
    }
    User.register({email, username, token}, password)
      .then(async (user) => {
        await sendEmail(user.email, `Hi ${username}`, `<a href="http://localhost:3000/confirm/${token}">Bienvenido, por favor activa tu cuenta</a>`);
        res.redirect("/");
      })
      .catch(err => {
        console.log(err)
        if(err.name === "UserExistError"){
          return res.render("auth/login", {
            msg: "You are already registered"
          });
        }
      });
};

exports.userToken = (req,res) => {
  const {token} = req.params;
  console.log(token)
  User.findOneAndUpdate(
    {token},
    {
      $set: {status: 'Active'}
    },
    {
      new: true
    }
  )
  .then(()=> res.redirect(`/`))
  .catch(err => console.log(err));
}

exports.loginGet = async (req, res) => {
  await res.render("auth/login");
}

exports.loginPost = (req, res, next ) => {
  passport.authenticate("local", (err, user, info) =>{
    if(err) return console.log(err);
    if(!user){
      return res.render("auth/login")
    }
    req.logIn(user, err => {
      if (err) console.log(err)
      req.user = user
      return res.redirect('/profile')//, {loggedUser: true}
    })
  })(req, res, next)
}

exports.profileGet = async (req, res) => {
  const {id} = await req.user;
  const courses = await Course.find({authorId: id});
  res.render("auth/profile", {
    user: req.user,
    courses,
  });
}

exports.logOut = (req, res) => {
  req.logOut()
  res.redirect('/')
}

exports.createCourseGet=(req,res) => {
  res.render("auth/create");
};

exports.createCoursePost = async(req, res, next) => {
  const { _id } = req.user;
  const { title, description, category, fecha } = req.body;
  let imageURL;
  switch (category) {
    case "Ciencia":
      imageURL = "images/science.png"
      break;
    case "Arte":
      imageURL = "images/art.png"
      break;
    case "Tecnología":
      imageURL = "images/tech.png"
      break;
  }
  const curso = await Course.create({title, description, category, imageURL, fecha, authorId: _id});
  console.log(curso)
  res.redirect("/profile");
}
