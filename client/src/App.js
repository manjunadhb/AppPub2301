import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  let [users, setUsers] = useState([]);

  return (
    <div className="App">
      <button
        onClick={async () => {
          let response = await axios.get("/getUsers");

          setUsers(response.data);

          console.log(response);
        }}
      >
        Get Users
      </button>
      {users.map((obj) => {
        return <h3>{obj.firstName}</h3>;
      })}
    </div>
  );
}

export default App;
