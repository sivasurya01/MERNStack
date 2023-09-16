import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateTodo() {
  const [todo, setTodo] = useState("");
  const [gettodo, setGettodo] = useState([]);
  console.log(gettodo);
  console.log(todo, "todo");
  const addtodo = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/createtodo", { todo })
      .then((todo) => {
        console.log(todo);
        toast.success("Created Sucessfully");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/createtodo")
      .then((todo) => {
        console.log(todo);
        setGettodo(todo.data);
      })
      .catch((err) => console.log(err));
  }, [todo]);
  return (
    <div>
      <ToastContainer />

      <form onSubmit={addtodo}>
        todo:{" "}
        <input
          type="text"
          name="todo"
          onChange={(e) => setTodo(e.target.value)}
          required
          className="border-2"
        />
        <button
          type="submit"
          className="border-2 bg-slate-600 text-white rounded-md p-1"
        >
          add
        </button>
      </form>
      {gettodo.map((data, index) => {
        return <h4 key={index}>{data.todo}</h4>;
      })}
    </div>
  );
}

export default CreateTodo;
