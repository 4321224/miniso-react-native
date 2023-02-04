const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const appSchema = require("./schema/appSchema");
const userSchema = require("./schema/userSchema");
const port = process.env.PORT || 4000;
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [appSchema.typeDefs, userSchema.typeDefs],
  resolvers: [appSchema.resolvers, userSchema.resolvers],
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
