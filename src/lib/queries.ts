import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts {
    Products(limit: 1000) {
      docs {
        id
        name
        price
        currency
        impactTags
        brand
        impactScore
        verified
        image {
          url
        }
      }
    }
  }
`
