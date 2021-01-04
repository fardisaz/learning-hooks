import React from "react";

//first we use React.createContext to create new context.
//NotesContext is an object that needs to be accessible in the component that's providing things & in the component that's consuming things
const NotesContext = React.createContext();

export default NotesContext;
