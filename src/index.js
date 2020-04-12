import React, { useState } from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const client = new ApolloClient({ uri: "http://localhost:4000/" });

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

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos
  }
`;

function AddTodo() {
  let input;
  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      const { todos } = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: todos.concat([addTodo]) }
      });
    }
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return "Loading...🚀";
  if (error) return `Error(Dogs)! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data["dogs"].map(function(dog) {
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
    notifyOnNetworkStatusChange: true
  });

  if (networkStatus === 4) return "Refetching!";
  if (loading) return "Loading...🚀";
  if (error) return `Error(Photo)! ${error}`;

  return (
    <div>
      <img src={data.dog.displayImage} style={{ height: 400, width: 400 }} alt="" />
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  );
}

function DelayedQuery() {
  const [dog, setDog] = useState(null);
  const [getDog, { loading, data }] = useLazyQuery(GET_DOG_PHOTO);

  if (loading) return <p>Loading ...</p>;

  if (data && data.dog) {
    setDog(data.dog);
  }

  return (
    <div>
      {dog && <img src={dog.displayImage} alt={null} />}
      <button onClick={() => getDog({ variables: { breed: "bulldog" } })}>Click me!</button>
    </div>
  );
}

function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.todos.map(({ id, type }) => {
    let input;

    return (
      <div key={id}>
        <p>{type}</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateTodo({ variables: { id, type: input.value } });

            input.value = "";
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Update Todo</button>
        </form>
      </div>
    );
  });
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
          {this.state.selectedDog && <DogPhoto breed={this.state.selectedDog} />}
          <Dogs onDogSelected={this.onDogSelected} />
        </div>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
