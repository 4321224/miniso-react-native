const axios = require("axios");
const { redis, users } = require("../config");

class UsersController {
  static async findUser(req, res) {
    try {
      const getCache = await redis.get("users");
      if (!getCache) {
        console.log(getCache, "ini cache dari users");
        res.status(200).json(JSON.parse(getCache));
      } else {
        const { data } = await axios.get(`${users}/user`);
        await redis.set("users", JSON.stringify(data));
        console.log(data, "ini dari usernya");
        res.status(200).json(data);
      }
    } catch (error) {
      // nanti kasih res apa gitu
      console.log(error);
    }
  }

  static async addUser(req, res) {
    try {
      const { email, password } = req.body;
      console.log(req.body, "<-- ini req body");
      const { data } = await axios.post(`${users}/user`, req.body);
      console.log(data, "ini harusnya data dari add user");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteUser(req, res) {
    try {
      const { data } = await axios.delete(`${users}/user/${req.params.id}`);
      redis.del("users");
      redis.del(`user:${req.params.id}`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async findUserById(req, res) {
    try {
      const cache = await redis.get(`user:${req.params.id}`);
      // console.log(cache, "ini dari by id");
      if (cache) {
        res.status(200).json(JSON.parse(cache));
      } else {
        // console.log(req.params.id, ">>> id");
        const { data } = await axios.get(`${users}/user/${req.params.id}`);
        redis.set(`user:${req.params.id}`, JSON.stringify(data));
        console.log(data, "data dari find id");
        res.status(200).json(data);
      }
    } catch (error) {
      console.log();
    }
  }
}

module.exports = UsersController;
