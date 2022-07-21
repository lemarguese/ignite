import {gql} from "@apollo/client";
import {useAuth} from "../authConfig/authProvider";

export const PostNew = async ({url, description}) => {
    const {createApolloClient} = useAuth();
    const client = createApolloClient();

    const res = await client.mutate({
        mutation: gql`
                mutation {
                     post(
                          url: $url,
                          description: $description
                     ) {
                          id
                     }
                }`,
        variables: {url, description}
    });
    console.log(res);
}