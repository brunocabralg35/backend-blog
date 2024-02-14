const db = require("../../database/prisma");

const getCategories = async (_req, res) => {
  const categories = await db.category.findMany({
    include: {
      Article: true,
    },
  });

  return res.status(200).json(categories);
};

const createCategory = async (req, res) => {
  const { title } = req.body;

  if (title === "" || title === undefined) {
    return res.status(400).json({
      message: "Title field is required",
    });
  }

  const createdCategory = await db.category.create({
    data: {
      title: title,
    },
  });

  return res.status(201).json({
    message: `Category ${createdCategory.title} successfully created!`,
  });
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const formattedId = Number(id);
  const { title } = req.body;

  if (title === "" || title === undefined) {
    return res.status(400).json({
      message: "Title field is required",
    });
  }

  const updatedCategory = await db.category.update({
    where: {
      category_id: formattedId,
    },
    data: {
      title: title,
    },
  });

  return res.status(201).json({
    message: `Category ${updatedCategory.title} successfully updated!`,
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const formattedId = Number(id);

  const deletedCategory = await db.category.delete({
    where: {
      category_id: formattedId,
    },
  });

  return res.status(200).json({
    message: `Category ${deletedCategory.title} successfully deleted!`,
  });
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
