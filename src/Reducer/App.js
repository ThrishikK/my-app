import { useReducer } from "react";
import "./App.css";

const initialState = { value: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, value: state.value + 1 };
    case "decrement":
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}

function App() {
  // console.log(useReducer(reducer, initialState));
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(dispatch);
  return (
    <div className="main">
      <button onClick={() => dispatch({ type: "decrement" })}>Down</button>
      <h1>{state.value}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>Up</button>
    </div>
  );
}

export default App;
