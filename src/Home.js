import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRIES = gql`
  query getCountries {
    countries {
      name
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <>
        <h1>Error</h1>
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      <h1>Countries:</h1>
      <pre>{JSON.stringify(data.countries, null, 2)}</pre>
    </>
  );
};

export default Home;
