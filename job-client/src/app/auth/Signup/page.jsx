"use client";

import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";

const signup = () => {
  const [Username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [dob, setdob] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const router = useRouter();

  const handleregister = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3001/api/v1/User/register", {
          Username: Username,
          email: email,
          password: password,
          dob: dob,
        })

        .then((data) => {
          setAlertMessage("User created successfully");
          setShowAlert(true);
        })
        .catch((err) => {
          console.log(data.data);
          localStorage.setItem("token", data.data)
          setAlertMessage("logined");
          setShowAlert(true);
          console.log("");

        });
    } catch (err) {
      setAlertMessage(err.response.data.message);
      setShowAlert(true);
    }
  };

  return (
    <section>
      <div className="w-screen min-h-screen flex items-center justify-center">
        <div className="w-full sm:max-w-sm">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleregister}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="username"
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                email
              </label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                password
              </label>
              <input
                type="password"
                className="shadow appearance-none border border-grey-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight
                focus:outline-none focus:shadow-outline mb-2"
                id="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dob"
              >
                dob
              </label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="dob"
                placeholder="dob"
                value={dob}
                onChange={(e) => setdob(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
                type="submit"
              >
                Register
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/auth/login"
              >
                Already registered
              </a>
            </div>
          </form>
          {showAlert && <Alert severity="warning">{alertMessage}</Alert>}
        </div>
      </div>
    </section>
  );
};

export default signup;
