import { gql } from "@apollo/client";

//   ini harusnya nanti dipindah ke queries
// const client = ...
export const GET_PRODUCT = gql`
  query GetProducts {
    getProducts {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      authorId
      user {
        email
        _id
      }
      category {
        name
        id
      }
      images {
        productId
        imgUrl
      }
    }
  }
`;
export const GET_CATEGORY = gql`
  query GetCategories {
    getCategories {
      name
      id
    }
  }
`;
export const GET_PRODUCT_BY_ID = gql`
  query GetproductById($getproductByIdId: ID!) {
    getproductById(id: $getproductByIdId) {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      authorId
      user {
        id
        email
        _id
      }
      category {
        id
        name
      }
      images {
        productId
        imgUrl
      }
    }
  }
`;
