import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={home} />
          <Route path="/about" component={about} />
        </Switch>
      </div>
    </Router>
  );
}

function home() {
  console.log(this.props);
  return <div>Home</div>;
}

function about() {
  return <div>About</div>;
}

// <Router>
//   <div className="App">
//     <div className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <h2>Welcome to React</h2>
//     </div>
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/About">About</Link>
//         </li>
//         <li>
//           <Link to="/page">page</Link>
//         </li>
//         <li>
//           <Link to="/render">render</Link>
//         </li>
//       </ul>
//     </nav>
//     <Route exact={true} path="/" component={Home} />
//     <Route path="/About" component={About} />
//     <Route
//       path="/page"
//       children={(props) =>
//         props.match ? <h1>/page 주소입니다</h1> : <h1>/page 주소가 아닙니다</h1>
//       }
//     />
//     <Route
//       path="/render"
//       render={(props) =>
//         props.match ? <h1>/render 주소입니다</h1> : <h1>/render 주소가 아닙니다</h1>
//       }
//     />
//   </div>
// </Router>

// import React from "react";
// import ReactDOM from "react-dom";
// import "./App.css";
//
// function FancyBorder(props) {
//   console.log(props.children);
//   return <div className={"FancyBorder FancyBorder-" + props.color}>{props.children}</div>;
// }
//
// function WelcomeDialog() {
//   return (
//     <FancyBorder color="blue">
//       <h1 className="Dialog-title">Welcome</h1>
//       <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
//     </FancyBorder>
//   );
// }
//
// // class App extends React.Component {
// //   render() {
// //     return (
// //       <div>
// //         <h2>Building Query components 🚀</h2>
// //         <WelcomeDialog />
// //       </div>
// //     );
// //   }
// // }

ReactDOM.render(<App />, document.getElementById("root"));
