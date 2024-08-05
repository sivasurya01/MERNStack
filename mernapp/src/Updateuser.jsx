import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Updateuser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    email: "",
    nunmber: "",
  });
  console.log(user);
  const [users, setUsers] = useState({
    username: "",
    email: "",
    nunmber: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  console.log(users, "users");
  const submit = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_API_URL}Update/` + id, {
        username: name ? name : users.username,
        email: email ? email : users.email,
        nunmber: num ? num : users.nunmber,
      })
      .then((user) => {
        console.log(user);
        navigate("/user");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const submit = (e) => {
      // e.preventDefault();
      axios
        .get(`${import.meta.env.VITE_API_URL}Updateuser/` + id)
        .then((user) => {
          console.log(user);
          setUsers(user.data);
        })
        .catch((err) => console.log(err));
    };
    submit();
  }, []);
  const handleChange = (e) => {
    const updatedFormValues = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUsers(updatedFormValues);
  };
  return (
    <div>
      {/* <form onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="username"
          onChange={(e) => setName(e.target.value)}
          defaultValue={users.username}
        />
        <br />
        <label htmlFor="name">email</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={users.email}
        />
        <br />

        <label htmlFor="name">number</label>
        <br />
        <input
          type="number"
          name="nunmber"
          onChange={(e) => setNum(e.target.value)}
          defaultValue={users.nunmber}
        />
        <br />
        <input type="submit" value={"submit"} />
      </form> */}
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Update User
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
                onChange={(e) => setName(e.target.value)}
                defaultValue={users.username}
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
                defaultValue={users.email}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Number
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setNum(e.target.value)}
                defaultValue={users.nunmber}
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updateuser;
