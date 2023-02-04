import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { getProduct } from "../dataProduct/productService";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../config/queries";
import { CartContext } from "../CartContext";

export function ProductDetail({ route }) {
  const { productId } = route.params;
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      getproductByIdId: productId,
    },
  });
  console.log(data, "ini dari detail");
  if (loading) return <Text>null</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;
  // const [product, setProduct] = useState({});

  // useEffect(() => {
  //   setProduct(getProduct(productId));
  // });

  // console.log(product.id, "ini product");
  const { addItemToCart } = useContext(CartContext);
  // console.log(data.getproductById.id, "ini muncul id gak");
  function onAddToCart() {
    addItemToCart(data.getproductById.id);
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `${data.getproductById.mainImg}`,
            }}
          />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.name}>{data.getproductById.name}</Text>
          <Text style={styles.price}>Rp {data.getproductById.price}</Text>
          <Text style={styles.description}>
            {data.getproductById.description}
          </Text>
          <Button onPress={onAddToCart} title="Add To Cart" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginTop: 10,
  },
  infoContent: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787878",
    marginBottom: 16,
  },
});
