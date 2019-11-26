exports.isLoggedIn = (req, res,next) => {
  req.isAuthenticated() ? res.redirect('/profile') : next();
};

exports.isNotLoggedIn = (req,res, next) => {
  !req.isAuthenticated() ? res.redirect('/login') : next();
};