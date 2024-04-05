const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("./controllers/categoryController");
const {
  getArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} = require("./controllers/articleController");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
} = require("./controllers/userController");
const adminAuth = require("./middlewares/adminAuth");

const router = express.Router();

// Categories Routes
router.get("/categories", getCategories);

router.post("/categories", adminAuth, createCategory);

router.delete("/categories/:id", adminAuth, deleteCategory);

router.put("/categories/:id", adminAuth, updateCategory);

// Articles Routes
router.get("/articles", getArticles);

router.post("/articles", adminAuth, createArticle);

router.delete("/articles/:id", adminAuth, deleteArticle);

router.put("/articles/:id", adminAuth, updateArticle);

// User Routes
router.get("/users", getUsers);

router.post("/users", adminAuth, createUser);

router.delete("/users/:id", adminAuth, deleteUser);

router.put("/users/:id", adminAuth, updateUser);

// Login Routes
router.post("/login", login);

// Logout Routes
router.post("/logout", adminAuth, logout);

module.exports = router;
