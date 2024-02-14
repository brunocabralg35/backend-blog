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

const router = express.Router();

// Categories Routes
router.get("/categories", getCategories);

router.post("/categories", createCategory);

router.delete("/categories/:id", deleteCategory);

router.put("/categories/:id", updateCategory);

// Articles Routes
router.get("/articles", getArticles);

router.post("/articles", createArticle);

router.delete("/articles/:id", deleteArticle);

router.put("/articles/:id", updateArticle);

module.exports = router;
