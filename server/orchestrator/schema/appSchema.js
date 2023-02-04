const axios = require("axios");
const { redis, apps, users } = require("../config/index");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// berarti kurang CRUD dari category
const typeDefs = `#graphql
  type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    authorId: Int
    user: User
    category: Category
    images: [Images]
  }
  type User {
    id: ID
    username: String
    email: String
    password: String
  }
  type Category {
    id: ID
    name: String
  }
  type Images {
    productId: Int
    imgUrl: String
  }
  input ProductInput {
    name: String!
    slug: String!
    description: String!
    price: Int!
    mainImg: String!
    categoryId: Int!
    userMongoId: String!
    image1: String!
    image2: String!
  }
  input CategoryInput {
    name: String!
  }
  type Query {
    getProducts: [Product]
    getCategories: [Category]
    getproductById(id: ID!): Product
    getCategoryById(id:ID!): Category
  }
  type Mutation {
    addProduct(content: ProductInput!): Product
    editProduct(id: ID!, content: ProductInput!): Product
    deleteProduct(id: ID): Product
    addCategory(content: CategoryInput!): Category
    ediCategory(id:ID!, content: CategoryInput): Category
    deleteCategory(id:ID!): Category
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const cache = await redis.get("products");
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios.get(`${apps}/products`);
          const user = await axios.get(`${users}/user`);
          data.forEach((product) => {
            user.data.forEach((el) => {
              product.userMongoId === el._id
                ? (product.User = { username: user.username })
                : "";
            });
            delete product.userMongoId;
          });
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getCategories: async () => {
      try {
        const cache = await redis.get("categories");
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios.get(`${apps}/categories`);
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getproductById: async (_, args) => {
      try {
        const { id } = args;
        // console.log(id, "ini args");
        // const cache = await redis.get(`product:${id}`);
        // console.log(cache);
        // if (cache) {
        //   return JSON.parse(cache);
        // } else {
        const { data } = await axios.get(`${apps}/products/${id}`);
        // const user = await axios.get(`${users}/user`);
        // data.forEach((product) => {
        //   user.data.forEach((el) => {
        //     product.userMongoId === el._id
        //  (data.User = { username: user.username })
        //       : "";
        //   });
        //   delete product.userMongoId;
        // });
        redis.set(`product: ${id}`, JSON.stringify(data));
        // console.log(data.product, "ini data lho");
        return data.product;
        // }
      } catch (error) {
        console.log(error);
      }
    },
    getCategoryById: async (_, args) => {
      try {
        const { id } = args;
        // console.log(id, "ini dari category");
        const { data } = await axios.get(`${apps}/categories.${id}`);
        // console.log(data, "ini dari category id");
        redis.set(`category: ${id}`, JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        const { content } = args;
        // console.log(content, "<<<<");
        const { data } = await axios.post(`${apps}/products`, content);
        // console.log(data, "harusnya ini ada isinya");
        redis.del("product");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    addCategory: async (_, args) => {
      try {
        const { content } = args;
        // console.log(content, "ini dari category");
        const { data } = await axios.post(`${apps}/categories`, content);
        // console.log(data, "ini data dari add category");
        redis.del("category");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editProduct: async (_, args) => {
      try {
        const { id, content } = args;
        // console.log(id, content, "ini dari edit");
        const { data } = await axios.put(`${apps}/products/${id}`, content);
        // console.log(data, "ini coba liat ada data ato nggak");
        redis.del("product");
        redis.del(`product: ${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    ediCategory: async (_, args) => {
      try {
        const { id } = args;
        // console.log(id, "ini harusnya ada id");
        const { data } = await axios.put(
          `${apps}/categories/${args.id}`,
          content
        );
        // console.log(data, "ini data edir category");
        redis.del("categories");
        redis.del(`category: ${args.id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (_, args) => {
      try {
        const { id } = args;
        // console.log(id, "harusnya ada id nya");
        const { data } = await axios.delete(`${apps}/products/${id}`);
        // console.log(data, "ini data isinya apa ya");
        redis.del("product");
        redis.del(`prodduct: ${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteCategory: async (_, args) => {
      try {
        const { id } = args;
        // console.log(id, "ini id dari delete");
        const { data } = await axios.delete(`${apps}/categories/${id}`);
        console.log(data);
        redis.del("categories");
        redis.del(`category: ${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
