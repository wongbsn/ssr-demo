import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRIES = gql`
  query getCountries {
    countries {
      code
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
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );
  }

  return (
    <main>
      <h1>Countries:</h1>
      {data.countries.map(({ code, name }) => {
        const url = `/country/${code}`;

        return (
          <div key={code}>
            <h2>{name}</h2>
            <Link to={url}>See more info </Link>
          </div>
        );
      })}
    </main>
  );
};

export default Home;
