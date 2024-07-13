import React ,{ useState } from "react";
import "material-icons/iconfont/material-icons.css";
import { Link ,useNavigate,} from "react-router-dom";

const Userlogin = () => {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({username:"", email: "", password: "" });

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const handleonSubmit=async(e)=>{
    e.preventDefault();
    try {
      const login = await fetch('http://localhost:7500/api/v1/users/login',{
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username:credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
      })
      const logindata = await login.json();
      console.log(logindata.data.accessToken);
      alert("Logged in Successfully!!!")
      if (logindata.success) {
        localStorage.setItem("token", logindata.data.accessToken);
        navigate("/");
      } else {
        alert("Invalid Credentials")
      }
    } catch (error) {
      throw error.message
    }
  }
  return (
    <div className="mt-24">
      <div className="flex justify-around">
        <form onSubmit={handleonSubmit} method="post" className="w-96">
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
              value={credentials.username}
              onChange={onchange}
              name="username"
              id="username"
              placeholder="Username"
            />
            <label className="text-white  font-bold mb-2 text-2xl">Email</label>
            <input
              className="p-3 rounded-lg"
              type="email"
              name="email"
              value={credentials.email}
              onChange={onchange}
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
              value={credentials.password}
              onChange={onchange}
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
