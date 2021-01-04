import React, { useState, useEffect, useReducer } from "react";
import notesReducer from "../reducers/notes";
import NoteList from "./NoteList";
import AddNoteForm from "./AddNoteForm";
import NotesContext from "../context/notes-context";

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));
    if (notes) {
      dispatch({ type: "POPULATE_NOTES", notes });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // here we are providing the context value to any one in its children who wants to consume it.
  //so for example at this point the NoteList component .we provide the value & it can be anything and that's what we share.
  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Notes</h1>
      <NoteList />
      <AddNoteForm />
    </NotesContext.Provider>
  );
};
export default NoteApp;
