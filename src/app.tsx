import React from "react";
import { render } from "react-dom";
import Characters from "./components/characters";

const App = () => <h1>Hello World</h1>;

render(<Characters />, document.getElementById("app"));
