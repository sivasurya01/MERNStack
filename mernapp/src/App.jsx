import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Users";
import Updateuser from "./Updateuser";
import CreateUser from "./CreateUser";
import CreateTodo from "./CreateTodo";
import Register from "./Register";
import Login from "./Login";
function App() {
  const Lazyuser = lazy(() => import("./Users"));
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Suspense fallback={<p>Loading...</p>}> */}
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      justifyItems: "center",
                      marginTop: "30px",
                    }}
                  >
                    Loading...
                  </p>
                }
              >
                <Lazyuser />
              </Suspense>
            }
          ></Route>
          {/* </Suspense> */}
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
