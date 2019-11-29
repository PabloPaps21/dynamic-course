require("dotenv").config();
const User = require("../models/User");
const Course = require('../models/Course')
const Review = require("../models/Review")
const { sendEmail } = require("../controllers/email")
const passport = require('passport')
 
exports.signupGet = (req, res) => res.render("auth/signup");




exports.signupPost = async (req, res, next) => {
  const { email, username, password, passwordrepeat } = req.body;
  if (password !== passwordrepeat) {
    return res.render("auth/signup", {
      msg: "La contraseña debe ser la misma"
    });
  }
  User.register({ username, email }, password)
    .then(user => res.redirect("/login"))
    .catch(err => {
      if (err.email === "UserExistsError") {
        return res.render("auth/signup", {
          msg: "Ya existe el usuario"
        });
      }
    });
    passport.authenticate("local", (err, user, info) => {
      if(err) return next(err);
      if(!user) return res.redirect("/login");
      req.logIn (user,err => {
        if(err)return next(err);
        req.user = user;
        return res.redirect(`/profile`)
      });
    })(req,res, next);
};

exports.loginGet = async (req, res) => {
  await res.render("auth/login");
}

exports.loginPost = (req, res, next ) => {
  passport.authenticate("local", (err, user, info) =>{
    if(err) return console.log(err);
    if(!user){
      return res.render("auth/login", {msg: "Correo o contraseña incorrecta"})
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
  const inscrito = await req.user.inscrito;
  const courses = await Course.find({authorId:id});
  let coursesInscrip = []
  let variable
  for(let i = 0; i < inscrito.length; i++){
    variable = await Course.findOne({_id: inscrito[i] }).populate("reviews")
    coursesInscrip.push(variable)
  }
  res.render("auth/profile", {
    user: req.user,
    courses,
    coursesInscrip
  });
}








exports.logOut = (req, res,next) => {
  req.logout()
  req.app.locals.logged = false;
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



exports.updateCourseGet = (req, res) => {

  const { id } = req.params

  Course.findById(id).then(curso => {
    let config = {
      title:"update course",
      action:`/editcourse/${id}`,
      button: "Editar"
    }
    res.render("editCourse" , { config, curso })
  });
}


exports.updateCoursePost = (req, res) => {
  
  const { id } = req.params;
  
  const { title, description, creditos} = req.body;
  Course.findByIdAndUpdate(
    id,
    {
      $set: {title, description, creditos, photoURL: req.file.secure_url}
    },
    {
      new: true
    }
  )
  .then(() => res.redirect(`/profile`))
  .catch(err => console.log(err))
}


exports.deleteCourse = (req, res) => {
  const { courseId } = req.params;
  Course.findByIdAndDelete(courseId)
    .then(() => res.redirect("/profile"))
    .catch(err => console.error(err));
};


exports.courseGet = async (req,res) => {
  const {id} = await req.user;
  const {inscrito} = await req.user;
  const courses = await Course.find({authorId: {$ne: id}}).populate("reviews");
  inscrito.forEach(element => {
    for(let i = 0; i < courses.length; i++){
      if(element==courses[i].id){
        courses.splice(i, 1);
      }
    }
  })
  res.render("auth/course", {
    user: req.user,
    courses,
  });
};

///
exports.signCoursePost = async(req, res, next) => {
  let { _id, credit } = await req.user;
  const{ id } = await req.params;
  const{creditos, authorId:{_id: idUser}} = await Course.findOne({_id: id }).populate("authorId");
 
  if(credit < creditos){
    res.render("auth/course", {msg:"No tienes créditos suficientes"});
  }else{
    credit-=creditos

    let{credit: creditVar} = await User.findOne({_id: idUser });
    creditVar+=creditos
    await User.findByIdAndUpdate(idUser, {$set: {credit:creditVar}});
    await User.findByIdAndUpdate(_id, { $push: { inscrito: id } });
    await User.findByIdAndUpdate(_id, {$set: {credit}}, {new: true});
  res.redirect("/profile");
  }
}
/////

exports.createReview = async(req, res, next) => {
  const { id } = req.params;
  const { descripcion, calificacion } = req.body
  const review = await Review.create({descripcion, calificacion, claseId: id});
  const {_id} = review
  const courseUpdated = await Course.findByIdAndUpdate(
    id,
    { $push: { reviews: _id } }
  );
  res.redirect("/profile");
}
