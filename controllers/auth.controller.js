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

exports.profileGet = async(req, res) => {
  const { id } = await req.user;
  const courses = await Course.find({authorId:id});
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
  const { id } = req.user;
  const { title, description,fecha,creditos } = req.body;
  const curso = await Course.create({title, description, fecha, creditos, authorId: id});
  res.redirect("/profile");
}

exports.updateCourse = async(req, res, next) => {
  let userUpdated;
  const { courseid } = req.params;
  const { title, description, creditos} = req.body;
  if(req.file){
    userUpdated = await Course.findByIdAndUpdate(courseid, {
      $set: {title, description, creditos, photpURL: req.file.secure_url}
    });
  }else{
    userUpdated = await Course.findByIdAndUpdate(courseid, {
      $set: { title, description, creditos}
    })
  }
req.user = userUpdated;
res.redirect(`/profile`);

  // Course.findByIdAndUpdate( courseid , { title, description })
  //   .then(() => res.redirect("/profile"))
  //   .catch(err => console.error(err));
}

exports.deleteCourse = (req, res) => {
  const { courseId } = req.params;
  Course.findByIdAndDelete(courseId)
    .then(() => res.redirect("/profile"))
    .catch(err => console.error(err));
};

exports.courseGet = async (req,res) => {
  const {id} = await req.user;
  const courses = await Course.find({authorId: {$ne: id}});
  res.render("auth/course", {
    user: req.user,
    courses,
  });
  console.log(courses)
};