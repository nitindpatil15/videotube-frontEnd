import React, { useState } from "react";
import "material-icons/iconfont/material-icons.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

const Userlogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7500/api/v1/users/login', {
                email,
                username,
                password
            });
            const { accessToken } = response.data.data;
            // Store the access token in a cookie
            Cookies.set('accessToken', accessToken, { expires: 7 }); // Expires in 7 days
            // Optionally redirect to another page or update the UI
            console.log('Login successful');
            navigate('/current-user')
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

  return (
    <div className="mt-24">
      <div className="flex justify-around">
        <form onSubmit={handleLogin} method="post" className="w-96">
          <div className="text-white text-4xl mb-2 text-center">
            <span className="material-icons" style={{ fontSize: "6rem" }}>
              account_circle
            </span>
          </div>{" "}
          <div className="flex flex-col ">
            <label className="text-white  font-bold mb-2 text-2xl">
              Username
            </label>
            <input
              className="p-3 rounded-lg"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              id="username"
              placeholder="Username"
            />
            <label className="text-white  font-bold mb-2 text-2xl">Email</label>
            <input
              className="p-3 rounded-lg"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter Your Email"
            />
            <label className="text-white  font-bold mb-2 text-2xl">
              Password
            </label>
            <input
              className="p-3 rounded-lg"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
            />
            <button className="bg-blue-700 my-3 p-2">submit</button>
            <div className="text-white">
              Don't have accound?{" "}
              <Link to="/signup" className="text-red-500">
                Sign Up
              </Link>{" "}
              <span className="text-orange-700 ml-12">
                <Link to="/change-pass">forget password</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Userlogin;
