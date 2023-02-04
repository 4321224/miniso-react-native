const axios = require("axios");
const { redis, users } = require("../config/index");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type User {
    _id: String
    username: String
    email: String
    role:String
    phoneNumber: String
    address: String
  }
  input contentUser {
    username: String!
    email: String!
    password: String!
    phoneNumber: String!
    address: String!
  }
  type Query {
    getUsers: [User]
    getUserById(id:ID!): User
  }
  type Mutation {
    postUser(content: contentUser): User
    deleteUser(id:ID!): User
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const cache = await redis.get("users");
        // console.log(cache, "harusnya ini dari user");
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios.get(`${users}/user`);
          // console.log(data);
          redis.set("users", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getUserById: async (_, args) => {
      try {
        console.log(args, "ini harusnya isi _id");
        const cache = await redis.get(`user: ${args.id}`);
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios.get(`${users}/user/${args.id}`);
          console.log(data, "harusnya ini ada data");
          redis.set(`user: ${args.id}`, JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    postUser: async (_, args) => {
      try {
        // console.log(args);
        const { data } = await axios.post(`${users}/user`, args.content);
        redis.del("users");
        // console.log(data, "harusnya ada data");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (_, args) => {
      try {
        // console.log(args);
        const { data } = await axios.delete(`${users}/user/${args.id}`);
        // console.log(data, "isinya apa ya");
        redis.del("users");
        redis.del(`user:${args.id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
