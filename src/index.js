import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

//we need to define a reducer function before we can call useReducer.This function is identical to the reducer we already creating with redux
//this is a simple way to manage component state.If it's really easy state we can manage it with useState if it's more complext we can switch over to useReducer
const notesReducer = (state, action) => {
  switch (action.type) {
    case "POPULATE_NOTES":
      return action.notes;
    case "ADD_NOTE":
      return [...state, action.note];
    case "REMOVE_NOTE":
      return state.filter((note) => note.title !== action.title);

    default:
      return state;
  }
};

const NoteApp = () => {
  //we call useReducer and we pass 2 things .First the reducer function ,second is our initial state.UseReducer returns an array with 2 very important things on it.your state & a dispatch function
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));
    if (notes) {
      dispatch({ type: "POPULATE_NOTES", notes });
      //setNotes(notesData);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const addNote = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_NOTE", note: { title, body } });
    setTitle("");
    setBody("");
  };
  const removeNote = (title) => {
    dispatch({ type: "REMOVE_NOTE", title });
  };
  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Note key={note.title} note={note} removeNote={removeNote} />
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button>add note</button>
      </form>
    </div>
  );
};

const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log("Setting up effect!");

    return () => {
      console.log("cleaning up effect");
    };
  }, []);

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};

ReactDOM.render(<NoteApp />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
