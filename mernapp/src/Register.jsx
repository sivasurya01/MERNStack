import axios from "axios";
import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");

  const onsubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}register`, {
        name,
        email,
        password,
      })
      .then((user) => {
        console.log(user);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* <form onSubmit={onsubmit}>
        <label for="fname"> Name</label>
        <br />
        <input
          type="text"
          name="name"
          id=""
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        <br></br>
        <label for="">Email</label>
        <br></br>
        <input
          type="email"
          name="email"
          id=""
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <br></br>
        <label for="">Pasword</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br></br>
        <input type="submit" value={"submit"} />
      </form> */}
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Sign Up
          </h1>
          <form className="mt-6" onSubmit={onsubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="username"
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  className="block w-full px-4 py-2 mt-2 text-purple-700 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => setPassword(e.target.value)}
                  type={type}
                  name="password"
                  value={password}
                />
                <span className="absolute right-3 top-7 transform -translate-y-1/2">
                  {type === "password" ? (
                    <IoEyeOutline
                      onClick={() => setType("text")}
                      className="cursor-pointer text-gray-500"
                    />
                  ) : (
                    <IoEyeOffOutline
                      onClick={() => setType("password")}
                      className="cursor-pointer text-gray-500"
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account ?
            <Link
              to={"/"}
              className="font-medium text-purple-600 hover:underline"
            >
              {" "}
              Please Login{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
