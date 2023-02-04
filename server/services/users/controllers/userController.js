const { hashPassword } = require("../helper/bcrypt");
const User = require("../models/User");

class UserController {
  static async find(req, res) {
    try {
      const user = await User.find();
      // console.log(user, "ini dari find");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  static async postUser(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      req.body.password = hashPassword(req.body.password);
      const newUser = await User.insertOne(req.body);
      // kalo bisa passwordnya didelete aja biar nggak ditampilkan
      delete req.body.password;
      // console.log(req.body, "ini harus ada isinya");
      res.status(200).json(req.body);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne(id);
      delete user.password;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.deleteOne(id);
      res.status(200).json({ msg: "success" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
