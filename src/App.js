import "./App.css";
import EmpList from "./EmpList.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="header-Text">
          {" "}
          React App Demo - Hexagon <br />
        </h2>
      </header>
      <div className="App-body">
        {" "}
        <EmpList />{" "}
      </div>
    </div>
  );
}
export default App;
