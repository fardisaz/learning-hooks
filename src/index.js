import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

const NoteApp = () => {
  // const notesData = JSON.parse(localStorage.getItem("notes"));
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem("notes"));
    if (notesData) {
      setNotes(notesData);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const addNote = (e) => {
    e.preventDefault();
    setNotes([
      ...notes,
      {
        title,
        body,
      },
    ]);
    setTitle("");
    setBody("");
  };
  const removeNote = (title) => {
    setNotes(notes.filter((note) => note.title !== title));
  };
  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.title}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <button onClick={() => removeNote(note.title)}>x</button>
        </div>
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

const App = (props) => {
  const [count, setCount] = useState(props.count);

  const [text, setText] = useState("");
  //just like useState we can use useEffect as many times as we want to
  useEffect(() => {
    console.log("This should only run once");
    //this function is gonna run once when the component first mounts but it's never going to run again bc it depends on nothing.
    //this can be useful if we are fetching or reading data
  }, []);

  useEffect(() => {
    console.log("useEffect ran");
    document.title = count;
    //right now react is doing more work than it needs to be doing and it's because for each letter we enter in input the update will run.The only state we use is count.The useEffect hook allows us to specify the things we care about.The things that we want to make sure when they change the effect runs.This is done via an array as the second argument.So below we are saying only run this effect when the count changes
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>
        The current {text || "count"} is {count}
      </p>
      <button onClick={increment}>+1</button>
      <button onClick={() => setCount(0)}>reset</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

App.defaultProps = {
  count: 0,
};

ReactDOM.render(<NoteApp />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
