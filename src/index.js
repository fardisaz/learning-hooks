import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

const NoteApp = () => {
  const notesData = JSON.parse(localStorage.getItem("notes"));
  const [notes, setNotes] = useState(notesData || []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  });
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
  // here we showed how we can use useState multiple times to track multiple things.
  const [text, setText] = useState("");

  useEffect(() => {
    // this function is similar to a combination of componentDidMount() & componentDidUpdate()
    console.log("useEffect ran");
    document.title = count;
  });

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>
        The current {text || "count"} is {count}
      </p>
      <button onClick={increment}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>reset</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

App.defaultProps = {
  count: 0,
};

ReactDOM.render(<App count={0} />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// useeffect allows us to do something in functional components that we were not able to do & that is a replacement for lifecycle methods in classbased components
