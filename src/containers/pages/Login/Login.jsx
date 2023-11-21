import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../../../feature/redux/toolkit'; // Replace with the actual path
import Navbar from "../../components/Navbar/Navbar"
import { useNavigate } from "react-router-dom"
import "./Login.scss"

const Login = ({setIsDarkMode, isDarkMode}) => {
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);
  const [navClick, setNavClick] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [gotVis, setGotvis] = useState(false)
  const [err, setErr] = useState(false)
  const [errEm, setErrEm] = useState(false)
  const [nopw, setnopw] = useState(false)
  
  const handleLogin = () => {
    if (email !== "" && password !== "") {
    dispatch(loginUser({ email, password }));
    } else if (email === "" && password === "") {
      setErr(true)
      setTimeout(() => {
        setErr(false)
        setnopw(false)
      }, 5000)
    } else if (!email.includes("@gmail.com") && !password) {
      setErrEm(true)
      setnopw(true)
      setTimeout(() => {
        setErrEm(false)
        setnopw(false)
      }, 5000)
    } else if (password === "") {
      
    }
  };

  
  useEffect(() => {
    if (user) {
      navigate("/")
    }
    if (gotVis) {
      setTimeout(() => {
        setGotvis(false)
      }, 3000)
    }
  }, [user, gotVis, setGotvis])

  return (
  <>
    <Navbar setNavbarClicked={setNavClick} navbarClicked={navClick} setDarkMode={setIsDarkMode} darkMode={isDarkMode} />
    {!navClick ? (
    <div className="loginers">
      <h1>Login</h1>
      <div className="obv-email">
      <div className="email">
      <span className="material-symbols-rounded">person</span>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {err && email === "" && (
        <div className="errs">
        <span className="material-symbols-rounded">exclamation</span>
        <p>email tidak boleh kosong</p>
        </div>
      )}
      {(errEm || errEm && !email.includes("@gmail.com")) && (
        <div className="errs">
        <span className="material-symbols-rounded">exclamation</span>
        <p>format email salah sertakan @gmail.com</p>
        </div>
      )}
      </div>
      <div className="obv-pw">
      <div className="password">
      <span className="material-symbols-rounded">password</span>
      <input type={gotVis ? "text" : "password"}  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <span id="vis" onClick={() => setGotvis(o => !o)} className="material-symbols-rounded">{gotVis ? "visibility" : "visibility_off"}</span>
      </div>
      {(err && password === "" || nopw || errEm && password === "" ) && (
        <div className="errs">
        <span className="material-symbols-rounded">exclamation</span>
        <p>password tidak boleh kosong</p>
        </div>
      )}
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
    ) : ""}
  </>
  );
};

export default Login;