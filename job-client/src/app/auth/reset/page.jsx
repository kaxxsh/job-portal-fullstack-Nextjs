"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";

const reset = () => {
  const [email, setemail] = useState("");
  const [ResetPassword, setResetPassword] = useState("");
  const [status, setstatus] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();

    if (status === false) {
      try {
        await axios
          .post("http://localhost:3001/api/v1/User/reset", { email: email })
          .then((data) => {
            setAlertMessage("Reset link sent successfully");
            setShowAlert(true);
            setstatus(true);
          }
          )
          .catch((err) => {
            console.log("not found");
          });
      } catch (error) {
        setAlertMessage(error);
        setShowAlert(true);
      }
    } else {
      try {
        if (!ResetPassword) {
          setShowAlert(true);
          setAlertMessage("ResetPassword filed is empt — check it out!");
          setResetPassword("");
        }
        await axios
          .patch("http://localhost:3001/api/v1/User/reset", {
            email: email,
            password: ResetPassword,
          })
          .then(() => router.push("/auth/login"))
          .catch((err) => {
            setAlertMessage(err.response.data.message);
            console.log(err);
            setShowAlert(true);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section>
      <div className="w-screen min-h-screen flex items-center justify-center">
        <div className="w-full sm:max-w-xs">
          <h1 className="text-center text-2xl font-bold mb-4">Reset</h1>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleReset}
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
            {status === true ? (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="ResetPassword"
                >
                  Reset Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="ResetPassword"
                  type="text"
                  placeholder="Reset Password"
                  value={ResetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
                type="Submit"
              >
                Reset
              </button>
            </div>
          </form>
          {showAlert && <Alert severity="warning">{alertMessage}</Alert>}
        </div>
      </div>
    </section>
  );
};

export default reset;
