import ReducerOne from "../ReducerOne/ReducerOne";
import ReducerTwo from "../ReducerTwo/ReducerTwo";
import ReducerRandom from "../ReducerRandom/ReducerRandom";

import "./App.css";

function App() {
  return (
    <div className="app">
      <ReducerOne />
      <ReducerTwo />
      <ReducerRandom />
    </div>
  );
}

export default App;
