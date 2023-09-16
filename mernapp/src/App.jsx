import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Users";
import Updateuser from "./Updateuser";
import CreateUser from "./CreateUser";
import CreateTodo from "./CreateTodo";
import Register from "./Register";
import Login from "./Login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/CreateUser" element={<CreateUser />}></Route>
          <Route path="/Updateuser/:id" element={<Updateuser />}></Route>
          <Route path="/CreateTodo" element={<CreateTodo />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
