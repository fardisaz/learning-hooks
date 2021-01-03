import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import NoteApp from "./components/NoteApp";

//react context api & useContext hook to manage a more complex hierarchy of components

ReactDOM.render(<NoteApp />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
