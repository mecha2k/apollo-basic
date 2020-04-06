import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";

const client = new ApolloClient({ uri: "https://48p1r2roz4.sse.codesandbox.io" });

const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...🚀</p>;
  if (error) return <p>Error:</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h6>My first Apollo application...</h6>
      <ExchangeRates />
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
