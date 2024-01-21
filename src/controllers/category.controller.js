import CategoryModels from "../model/category.model.js";

const CreateCategory = async (req, res) => {
  try {
    let { category_name } = req.body.data;
    const file = req.files.file;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your in Not Admin !!!",
      });
    }
    category_name = category_name.toLocaleUpperCase();
    const chack = await CategoryModels.findAll({ where: { category_name } });
    if (chack.length !== 0) {
      return res.status(404).json({
        status: 404,
        message: "This is category already exists",
      });
    }

    let { mv, name } = await file;
    const extFile = name.replace(".", "");
    const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
    if (!extPattern) throw new TypeError("Image format is not valid");
    name = Date.now() + "-" + name.replace(/\s/g, "");
    mv(resolve("src", "uploads", name));

    const newCategory = await CategoryModels.create({
      category_name,
      category_image: name,
    });
    return res.status(201).json({
      status: 201,
      message: "success",
      data: newCategory,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetAllCategory = async (req, res) => {
  try {
    const allCategory = await CategoryModels.findAll([
      {
        attributes: ["id", "category_name", "category_image"],
        include: [{ all: true }],
      },
    ]);
    return res.status(200).json({
      status: 200,
      message: "success",
      data: allCategory,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetAllCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const allCategory = await CategoryModels.findOne({
      where: { id },
      include: [{ all: true }],
    });
    return res.status(200).json({
      status: 200,
      message: "success",
      data: allCategory,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const UpdateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const file = req.files.file;
    let { category_name } = req.body.data;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your in Not Admin !!!",
      });
    }
    category_name = category_name.toLocaleUpperCase();
    const chack = await CategoryModels.findOne({ where: { id } });
    if (chack) {
      return res.status(404).json({
        status: 404,
        message: "Category Not Found",
      });
    }
    if (file) {
      var { mv, name } = await file;
      const extFile = name.replace(".", "");
      const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      name = Date.now() + "-" + name.replace(/\s/g, "");
      mv(resolve("src", "uploads", name));
    }
    const category = await CategoryModels.create({
      category_name: category_name || chack.dataValues.category_image,
      category_image: name || chack.dataValues.name,
    });
    return res.status(201).json({
      status: 201,
      message: "success",
      data: category,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your is Not Admin",
      });
    }
    const find = await CategoryModels.findOne({ where: { id } });
    if (!find) {
      return res.status(404).json({
        status: 404,
        message: "Category Not Found !!!",
      });
    }
    const deletedCategory = await CategoryModels.destroy({ where: { id } });
    return res.status(200).json({
      status: 200,
      message: "success",
      data: deletedCategory,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default {
  CreateCategory,
  GetAllCategory,
  GetAllCategoryById,
  UpdateCategory,
  DeleteCategory,
};
