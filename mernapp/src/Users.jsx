import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Users() {
  const [user, setUser] = useState([]);
  console.log(user, "users");
  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);
  const deletefun = (e, id) => {
    e.preventDefault();
    axios
      .delete("http://localhost:3000/delete/" + id)
      .then((res) => {
        console.log(res.data);
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="flex justify-end mr-10 mt-10 rounded-md mb-5">
        <NavLink to={"/CreateUser"}>
          <button className="p-2 bg-green-400 text-white rounded-md">
            CreateUser
          </button>
        </NavLink>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {user.map((data) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.username}
                  </th>
                  <td className="px-6 py-4">{data.email}</td>
                  <td className="px-6 py-4">{data.nunmber}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600   dark:text-blue-500 hover:underline"
                    >
                      <Link to={`/Updateuser/${data._id}`}>Edit</Link>
                    </a>
                    <a
                      href="#"
                      className="font-medium text-blue-600 ml-2  dark:text-blue-500 hover:underline"
                      onClick={(e) => deletefun(e, data._id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
