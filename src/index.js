import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

function FancyBorder(props) {
  return <div className={"FancyBorder FancyBorder-" + props.color}>{props.children}</div>;
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Building Query components 🚀</h2>
        <WelcomeDialog />
      </div>
    );
  }
}

ReactDOM.render(<WelcomeDialog />, document.getElementById("root"));
