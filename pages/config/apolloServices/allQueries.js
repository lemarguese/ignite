import {gql} from "@apollo/client";

export const allQuery = gql`query {
          feed { 
            count
            links {
              id
              description
              url
              postedBy {
                id
                name
              }
              votes {
                id
                user {
                  id
                  name
                }
              }
            }
          }
        }`;