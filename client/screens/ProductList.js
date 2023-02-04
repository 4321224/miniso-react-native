import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchProducts } from "../dataProduct/productService";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../config/queries";
import { Product } from "../components/Product";

export function ProductList({ navigation }) {
  const { loading, error, data } = useQuery(GET_PRODUCT);
  // console.log(loading, error, data, "ini dari list");
  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;
  const renderProduct = ({ item: product }) => {
    return (
      <Product
        {...product}
        onPress={() => {
          navigation.navigate("ProductDetail", { productId: product.id });
        }}
      />
    );
  };
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   setProducts(fetchProducts());
  // });
  return (
    <View>
      <FlatList
        style={styles.ProductList}
        contentContainerStyle={styles.productListContent}
        keyExtractor={(item) => item.id}
        data={data.getProducts}
        renderItem={renderProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ProductList: {
    // backgroundColor: "blue",
    marginBottom: 2,
  },
  productListContent: {
    // backgroundColor: "red",
    borderColor: "black",
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 5,
  },
});
