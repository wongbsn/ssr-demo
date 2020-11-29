import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_COUNTRY = gql`
  query getCountry($filter: CountryFilterInput) {
    countries(filter: $filter) {
      name
      native
      phone
      continent {
        name
      }
      capital
      currency
      languages {
        name
      }
      emoji
      emojiU
      states {
        name
      }
    }
  }
`;

const Country = () => {
  const { code } = useParams();
  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: {
      filter: { code: { eq: code } },
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <>
        <h1>Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );
  }

  const { name, ...rest } = data.countries[0];

  return (
    <main>
      <h1>{name}</h1>
      <pre>{JSON.stringify(rest, null, 2)}</pre>
      <Link to="/">Home</Link>
    </main>
  );
};

export default Country;
