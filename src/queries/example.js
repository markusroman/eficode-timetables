import { gql } from 'apollo-boost';

export const GET_ALL = gql`
  query {
    example {
      field1
      field2
    }
  }
`;

export const CREATE_EXAMPLE = gql`
  mutation createExample($field1: String!, $field2: String) {
    createContact(field1: $field1, field2: $field2)
  }
`;

export const EXAMPLE_ADDED = gql`
  subscription {
    exampleAdded {
      field1
      field2
    }
  }
`;
