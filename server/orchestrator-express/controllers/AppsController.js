const axios = require("axios");
const { apps, users, redis } = require("../config");

class AppsController {
  static async findProduct(req, res) {
    try {
      //   console.log("ini masuk ke find product");
      const cache = await redis.get("products");
      //   console.log(cache, "<< ini harusnya cache");
      if (cache) {
        res.status(200).json(JSON.parse(cache));
      } else {
        const { data } = await axios.get(`${apps}/products`);
        console.log(data, "ini data aja");

        // console.log(data);
        redis.set("products", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getProductById(req, res) {
    try {
      // console.log(req.params.id, "ini harusnya id");
      // const cache = await redis.get(`products: ${req.params.id}`);
      // console.log(cache, "<<<<");
      // if (cache) {
      //   res.status(200).json(JSON.parse(cache));
      // } else {
      const { data } = await axios.get(`${apps}/products/${req.params.id}`);
      console.log(data, "ini data product");

      // redis.set(`products: ${req.params.id}`, JSON.stringify(products.data));
      res.status(200).json(data.product);
      // }
    } catch (error) {
      console.log(error);
    }
  }

  static async addProduct(req, res) {
    try {
      console.log(req.body, "ini req body dari add");

      const { data } = await axios.post(`${apps}/products`, req.body);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteProduct(req, res) {
    try {
      console.log(req.params.id, "ini id ya");
      const product = await axios.delete(`${apps}/products/${req.params.id}`);

      redis.del(`product:${req.params.id}`);
      res.status(product.status).json(product.data);
    } catch (error) {
      console.log(error);
    }
  }
  static async editProduct(req, res) {
    try {
      console.log(req.params.id, req.body, "harusnya ini id");
      const { data } = await axios.put(
        `${apps}/products/${req.params.id}`,
        req.body
      );
      redis.del(`products: ${req.params.id}`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AppsController;
