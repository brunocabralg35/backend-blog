const adminAuth = (req, res, next) => {
  if (req.session.user !== undefined) {
    next();
  } else {
    return res.status(400).send({
      message: "User not logged",
    });
  }
};

module.exports = adminAuth