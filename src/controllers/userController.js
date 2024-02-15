const db = require("../../database/prisma");
const bcrypt = require("bcryptjs");

const getUsers = async (_req, res) => {
  const users = await db.user.findMany();

  return res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const formattedId = Number(id);

  const deletedUser = await db.user.delete({
    where: {
      user_id: formattedId,
    },
  });

  return res.status(200).json({
    message: `User ${deletedUser.email} successfully deleted!`,
  });
};

const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === "" ||
    email === undefined ||
    password === "" ||
    password === undefined
  ) {
    return res.status(400).json({
      message: "Email and password field are required",
    });
  }

  const isAlreadyUsed = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (isAlreadyUsed) {
    return res.status(400).json({
      message: "Email already registered",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const createdUser = await db.user.create({
    data: {
      email,
      password: hash,
    },
  });

  return res
    .status(201)
    .json({ message: `User ${createdUser.email} successfully created!` });
};

const updateUser = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;
  const formattedId = Number(id);

  if (
    email === "" ||
    email === undefined ||
    password === "" ||
    password === undefined
  ) {
    return res.status(400).json({
      message: "Email and password field are required",
    });
  }

  const emailExist = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!emailExist) {
    return res.status(400).json({
      message: "Email does not exist in our database!",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const updatedUser = await db.user.update({
    where: {
      user_id: formattedId,
      email: email,
    },
    data: {
      password: hash,
    },
  });

  return res
    .status(201)
    .json({ message: `User ${updatedUser.email} successfully updated!` });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await db.user.findFirst({
    where: {
      email: email,
    },
  });

  if (
    email === "" ||
    email === undefined ||
    password === "" ||
    password === undefined
  ) {
    return res.status(400).json({
      message: "Email and password field are required",
    });
  }

  if (!userExist) {
    return res.status(400).json({
      message: "Email does not exist in our database!",
    });
  }

  const passwordCompare = bcrypt.compareSync(password, userExist.password);

  if (!passwordCompare) {
    return res.status(400).json({
      message: "Incorrect password!",
    });
  }

  req.session.user = {
    id: userExist.user_id,
    email: userExist.email,
  };

  return res.status(200).json({ loggedUser: req.session.user });
};

const logout = async () => {
  return req.session.user = undefined;
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
};
