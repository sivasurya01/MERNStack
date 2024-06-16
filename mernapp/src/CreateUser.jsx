import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    nunmber: "",
  });
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/createUser", user)
      .then((user) => {
        console.log(user);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    const updatedFormValues = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(updatedFormValues);
  };
  return (
    <div>
      {/* <form onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={user.username}
        />
        <br />
        <label htmlFor="name">email</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={user.email}
        />
        <br />

        <label htmlFor="name">number</label>
        <br />
        <input
          type="number"
          name="nunmber"
          value={user.nunmber}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value={"submit"} />
      </form> */}

      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Create User
          </h1>
          <form className="mt-6" onSubmit={submit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="username"
                onChange={handleChange}
                value={user.username}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="email"
                onChange={handleChange}
                value={user.email}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Number
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleChange}
                value={user.nunmber}
                // required
                type="number"
                name="nunmber"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
