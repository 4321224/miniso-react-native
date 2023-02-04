import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  // harusnya ini disini yg di ngrok
  // uri: "http://localhost:4000",
  // uri: "https://2096-139-228-111-125.ap.ngrok.io",
  uri: "https://orchestrator-production-9cc2.up.railway.app",
  cache: new InMemoryCache(),
});

export default client;
