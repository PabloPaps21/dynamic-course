// exports.isLoggedIn = (req, res,next) => {
//   req.isAuthenticated() ? res.redirect('/profile') : next();
// };

exports.isNotLoggedIn = (req,res, next) => {
  !req.isAuthenticated() ? res.redirect('/login') : next();
};



exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    
    req.app.locals.logged =  true;
    
    //next();
  } else {
    req.app.locals.logged = false;
    res.redirect('/login')
  }
  return next();
}