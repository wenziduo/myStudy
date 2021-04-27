import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  let Page1 = null;

  import("./page1").then((comp) => {
    Page1 = comp;
  });
  // console.log($);
  return (
    <div>
      <div>App</div>
      <Page1 />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
