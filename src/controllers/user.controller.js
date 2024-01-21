import bcrypt from "bcrypt";
import jwt from "../utils/jwt.js";
import UserModels from "../model/users.model.js";

const Register = async (req, res) => {
  try {
    let { username, lastname, email, password } = req.body.data;
    const file = req.files.file;

    const find = await UserModels.findOne({ where: { username, email } });
    if (find) {
      return res.status(400).json({
        status: 400,
        message: "Admin already exists !!!",
      });
    }
    if (password.length < 8) {
      console.log("Not only 8 symbol");
      return new Error("Not only 8 symbol");
    }
    password = bcrypt.hashSync(password, 10);
    // bu yerda user rasm yuklamagan vaqtida xatolikni oldini olish maqsadida ushbu code yozildi
    if (file) {
      var { name, mv } = await file;
      const extFile = name.replace(".", "");
      const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      name = Date.now() + "-" + name.replace(/\s/g, "");
      mv(resolve("src", "uploads", name));
    }
    const register = await UserModels.create({
      username,
      lastname,
      password,
      email,
      avatar: name,
    });

    const TOKEN = jwt.sign({
      username,
      id: register.dataValues.id,
      isAdmin: true,
    });

    res.status(201).json({
      status: 201,
      message: "success",
      data: register,
      access_token: TOKEN,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body.data;
    const user = await UserModels.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Admin  Not Found ",
      });
    }
    if (password.length < 8) {
      console.log("Not only 8 symbol");
      return new Error("Not only 8 symbol");
    }

    const isTrue = await password.bcrypt.compare(
      password,
      user.dataValues.password
    );
    if (!isTrue) {
      return res.status(404).json({
        status: 404,
        message: "Username or password incorrect !!!",
      });
    }

    const TOKEN = jwt.sign({
      id: user.dataValues.id,
      username,
    });

    res.status(201).json({
      status: 201,
      message: "successFully",
      data: user,
      access_token: TOKEN,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetUser = async (req, res) => {
  try {
    const id = req.token.id;

    const user = await UserModels.findOne({ where: { id } });
    if (!user) {
      return req.status(404).json({
        status: 404,
        message: "User Not Found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "SuccessFully",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetAllUserForAdmin = async (req, res) => {
  try {
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your is Not Admin !!!",
      });
    }
    const users = await UserModels.findAll();
    res.status(200).json({
      status: 200,
      message: "SuccessFully",
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const GetUserByIdForAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your is Not Admin !!!",
      });
    }
    const user = await UserModels.findOne({ where: { id } });
    if (!user) {
      return req.status(404).json({
        status: 404,
        message: "User Not Found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "SuccessFully",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const UpdateUserData = async (req, res) => {
  try {
    const id = req.token.id;
    const file = req.files.file;
    const { username, lastname, email, password, newPassword } = req.body.data;
    const user = await UserModels.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User Not Found !!!",
      });
    }

    if (password.length < 8) {
      console.log("Not only 8 symbol");
      return new Error("Not only 8 symbol");
    }
    const isTrue = password.compareSync(password.user.dataValues.password);
    if (!isTrue) {
      res.status(404).json({
        status: 404,
        message: "Username or Password incorrect",
      });
    }

    if (newPassword && newPassword.length < 8) {
      console.log("Not only 8 symbol");
      return new Error("Not only 8 symbol");
    }

    if (file) {
      var { name, mv } = await file;
      const extFile = name.replace(".", "");
      const extPattern = /(jpg|jpeg|png|webp|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      name = Date.now() + "-" + name.replace(/\s/g, "");
      mv(resolve("src", "uploads", name));
    }
    const updeted = await UserModels.update(
      {
        username: username || user.dataValues.username,
        lastname: lastname || user.dataValues.lastname,
        email : email || user.dataValues.email,
        avatar: name || user.dataValues.avatar,
        password: newPassword
          ? bcrypt.hashSync(newPassword, 10)
          : user.dataValues.password,
      },
      { where: { id: req.token?.id } }
    );
    const TOKEN = jwt.sign({ username, id });
    res.status(201).json({
      status: 201,
      message: "updated",
      data: updeted,
      access_token: TOKEN,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      messaage: "Internal Server Error",
    });
  }
};

const DeleteUserForAdmin = async (req, res) => {
  try {
    const id = rea.params.id;
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your is Not Admin !!!",
      });
    }
    const user = await UserModels.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        messaage: "User Not Found !!!",
      });
    }
    const deleted = await UserModels.destroy({ where: { id } });
    res.status(201).json({
      status: 201,
      messaage: "Deleted user",
      data: deleted,
    });
  } catch (error) {
    console.log(error.messaage);
    return res.status(500).json({
      status: 500,
      messaage: "Internal Server Error",
    });
  }
};

export default {
  Register,
  Login,
  GetUser,
  GetAllUserForAdmin,
  GetUserByIdForAdmin,
  UpdateUserData,
  DeleteUserForAdmin,
};
