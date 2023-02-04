import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";

export function Product({ name, price, mainImg, onPress }) {
  // console.log(name, price, mainImg, " ini dari product");
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View
        style={{
          width: 300,
          height: 300,
          alignSelf: "center",
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: `${mainImg}`,
          }}
        />
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Rp {price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
  },
});
