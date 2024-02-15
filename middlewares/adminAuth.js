const adminAuth = (req, res, next) => {
  if (req.session.user !== undefined) {
    next();
  } else {
    return res.status(400).json({
      message: "User not logged",
    });
  }
};

module.exports = adminAuth