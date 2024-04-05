const db = require("../database/prisma");

const getArticles = async (_req, res) => {
  const articles = await db.article.findMany({
    orderBy: {
      article_id: "desc",
    },
    include: {
      category: true,
    },
  });

  return res.status(200).send(articles);
};

const createArticle = async (req, res) => {
  const { title, content, category_id } = req.body;

  if (
    title === "" ||
    title === undefined ||
    content === "" ||
    content === undefined ||
    category_id === "" ||
    category_id === undefined ||
    category_id === null
  ) {
    return res.status(400).send({
      message: "Title field is required",
    });
  }

  const createdArticle = await db.article.create({
    data: {
      title,
      content,
      category_id,
    },
  });

  return res.status(200).send({
    message: `Article ${createdArticle.title} - ${createdArticle.category_id} successfully created`,
  });
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  const formattedId = Number(id);

  const deletedArticle = await db.article.delete({
    where: {
      article_id: formattedId,
    },
  });

  return res.status(200).send({
    message: `Article ${deletedArticle.title} successfully deleted!`,
  });
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const formattedId = Number(id);
  const { title, content, category_id } = req.body;

  if (
    title === "" ||
    title === undefined ||
    content === "" ||
    content === undefined ||
    category_id === "" ||
    category_id === undefined ||
    category_id === null
  ) {
    return res.status(400).send({
      message: "Title field is required",
    });
  }

  const updatedArticle = await db.article.update({
    where: {
      article_id: formattedId,
    },
    data: {
      title,
      content,
      category_id,
    },
  });

  return res.status(201).send({
    message: `Article ${updatedArticle.title} successfully updated!`,
  });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
  updateArticle,
};
