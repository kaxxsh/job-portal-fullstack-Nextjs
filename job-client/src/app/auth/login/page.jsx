"use client";
import axios from "axios";
import { useState } from "react";
import Alert from "@mui/material/Alert";

const login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handelLoginUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3001/api/v1/User/login", {
          email: email,
          password: password,
        })
        .then((data) => {
          console.log(data.data);
          localStorage.setItem("token", data.data)
          setAlertMessage("logined");
          setShowAlert(true);
          console.log("");
        })
        .catch((err) => {
          setAlertMessage(err.response.data.message);
          setShowAlert(true);
          console.log(err);
        });
      setemail("");
      setpassword("");
    } catch (error) {
      setAlertMessage(error);
      setShowAlert(true);
    }
  };
  return (
    <section>
      <div className="w-screen min-h-screen flex items-center justify-center">
        <div className="w-full sm:max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handelLoginUser}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-grey-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight
                focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-red-700"
                href="/auth/reset"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          {showAlert && <Alert severity="warning">{alertMessage}</Alert>}
        </div>
      </div>
    </section>
  );
};

export default login;
