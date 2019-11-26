// exports.isLoggedIn = (req, res,next) => {
//   req.isAuthenticated() ? res.redirect('/profile') : next();
// };

exports.isNotLoggedIn = (req,res, next) => {
  !req.isAuthenticated() ? res.redirect('/login') : next();
};



exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    
    req.app.locals.logged =  true;
  } else {
    req.app.locals.logged = false;
  }
  return next();
}