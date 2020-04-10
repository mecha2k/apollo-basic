import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
// import { gql } from "apollo-boost";
import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://ojo6385vn6.sse.codesandbox.io",
});

const GET_DOGS = gql`
  query {
    dogs {
      id
      breed
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return "Loading...🚀";
  if (error) return `Error(Dogs)! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data["dogs"].map(function (dog) {
        return (
          <option key={dog.id} value={dog.breed}>
            {dog.breed}
          </option>
        );
      })}
    </select>
  );
}

function DogPhoto({ breed }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
    skip: !breed,
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === 4) return "Refetching!";
  if (loading) return "Loading...🚀";
  if (error) return `Error(Photo)! ${error}`;

  return (
    <div>
      <img src={data.dog.displayImage} style={{ height: 200, width: 200 }} alt="" />
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  );
}

function AddTodo() {
  let input;
  const [addTodo, { data }] = useMutation(ADD_TODO);

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

class App extends React.Component {
  state = { selectedDog: null };

  onDogSelected = ({ target }) => {
    this.setState(() => ({ selectedDog: target.value }));
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>Building Query components 🚀</h2>
          {/*{this.state.selectedDog && <DogPhoto breed={this.state.selectedDog} />}*/}
          <Dogs onDogSelected={this.onDogSelected} />
        </div>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
