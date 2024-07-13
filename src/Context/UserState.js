import React from "react";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const UserState = () => {
  const navigate = useNavigate()
  const host = "http://localhost:7500/api/v1";
  const userlogin = async (username,email,password) => {
    // fetch api 
    try {
      const login = await fetch(`${host}/users/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const logindata = await login.json();
      console.log(logindata.data.accessToken);
      alert("Logged in Successfully!!!");
      if (logindata.success) {
        localStorage.setItem("token", logindata.data.accessToken);
        navigate("/");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      throw error.message;
    }
  };

  const userregister = async (avatar,coverImage ,fullName,username,email,password) => {
    // Api call 
    try {
      const formData = new FormData();
      formData.append('fullName', credentials.fullName);
      formData.append('username', credentials.username);
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);
      formData.append('avatar', profilePic); // Ensure field name is 'avatar'
      formData.append('coverImage', coverImage); // Ensure field name is 'coverImage'

      const register = await fetch(`${host}/users/register`, {
        method: 'POST',
        body: formData
      });

      const registerData = await register.json();

      if (registerData.success) {
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };
  return (
    <div>
      <UserContext.Provider value={{ userlogin, userregister }}>
        {props.children}
      </UserContext.Provider>
    </div>
  );
};

export default UserState;
