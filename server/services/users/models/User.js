const { data } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class User {
  static getCollection() {
    const db = data();
    // console.log(db, "ini data dari db");
    return db.collection("users");
  }

  static async find() {
    try {
      const users = await User.getCollection().find().toArray();
      // console.log(users, "ini user");
      // yang disini juga jangan tampilin password
      users.map((el) => {
        return delete el.password;
      });
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  static async insertOne(value) {
    // console.log(value, "ini value");
    try {
      const users = await User.getCollection().insertOne(value);
    } catch (error) {
      console.log(error);
    }
  }
  static async findOne(id) {
    // console.log(ObjectId(), "ini new object");
    try {
      const findOne = await User.getCollection().findOne({
        _id: ObjectId(id),
      });
      // console.log(findOne, "ini dari id");
      return findOne;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteOne(id) {
    try {
      console.log(id, "id dari delete");
      const deleteOne = await User.getCollection().deleteOne({
        _id: ObjectId(id),
      });
      return deleteOne;
    } catch (error) {
      console;
    }
  }
}

module.exports = User;
