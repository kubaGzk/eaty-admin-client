import { gql } from '@manifoldco/gql-zero';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      firstname
      lastname
      id
      role
      token
      username
      email
    }
  }
`;

export const CHECK_TOKEN = gql`
  mutation checkToken {
    checkToken {
      firstname
      lastname
      id
      role
      token
      username
      email
    }
  }
`;

export const GET_TABLE_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      name
      size {
        name
      }
      itemsCount
    }
  }
`;

export const GET_TABLE_SIZES = gql`
  query getSizes {
    getSizes {
      id
      name
    }
  }
`;

export const GET_TABLE_CUSTOM_COMPS = gql`
  query getCustomCompositions {
    getCustomCompositions {
      id
      name
      size {
        name
      }
      itemsCount
      categoriesCount
    }
  }
`;

export const GET_TABLE_ITEMS = gql`
  query getItems {
    getItems {
      id
      name
      category {
        name
      }
      size {
        name
      }
    }
  }
`;

export const GET_TABLE_INGREDIENTS = gql`
  query getIngredients {
    getIngredients {
      name
      size {
        name
      }
      uniqueName
    }
  }
`;
