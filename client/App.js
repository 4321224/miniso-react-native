import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductList } from "./screens/ProductList";
import { ProductDetail } from "./screens/ProductDetail";
import { CartProvider } from "./CartContext";
import { CartIcon } from "./components/CartIcon";
import { Cart } from "./screens/Cart";
import client from "./config/index";
import { ApolloProvider } from "@apollo/client";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Products"
              component={ProductList}
              options={({ navigation }) => ({
                title: "Products",
                headerRight: () => <CartIcon navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={({ navigation }) => ({
                title: "Products",
                headerRight: () => <CartIcon navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={({ navigation }) => ({
                title: "Products",
                headerRight: () => <CartIcon navigation={navigation} />,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  Container: {
    textAlign: "center",
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
