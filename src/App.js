import "./App.css";
import { useReducer, useState } from "react";

const initialtodos = [
  // {
  //   id: 1,
  //   Tittle: "todo1",
  //   Completed: false,
  // },
  // {
  //   id: 2,
  //   Tittle: "todo2",
  //   Completed: false,
  // },
  // {
  //   id: 3,
  //   Tittle: "todo3",
  //   Completed: false,
  // },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "Completed":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, Completed: !todo.Completed };
        }
        return todo;
      });

    case "add":
      if (state.length === 0)
        return [...state, { id: 1, Tittle: action.Tittle, Completed: false }];
      else
        return [
          ...state,
          {
            id: state[state.length - 1].id + 1,
            Tittle: action.Tittle,
            Completed: false,
          },
        ];
    default:
      return state;

    case "Delete":
      return state.filter((todo) => todo.id !== action.id);
  }
};

function App() {
  const [todos, dispatch] = useReducer(reducer, initialtodos);
  const [newtodo, setnewtodo] = useState("");
  const handleclick = () => {
    dispatch({ type: "add", Tittle: newtodo });
  };

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <input
        type="Text"
        placeholder=" Add Todo"
        onChange={(e) => setnewtodo(e.target.value)}
      />
      <button onClick={handleclick}>Add</button>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <h3>{todo.Tittle}</h3>
            <button
              onClick={() => dispatch({ type: "Completed", id: todo.id })}
            >
              {todo.Completed ? "Completed" : "Not Completed"}
            </button>
            <button onClick={() => dispatch({ type: "Delete", id: todo.id })}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
