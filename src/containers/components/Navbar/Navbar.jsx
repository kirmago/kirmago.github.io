/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { useLocation, Link } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import { logoutUser } from "../../../feature/redux/toolkit"; // Replace with the actual path
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ setNavbarClicked, navbarClicked, darkMode, setDarkMode }) => {
    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();
    const [edRo, setEdRo] = useState(false);

    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logoutUser());
    };

    const location = useLocation();
    const pathArray = location.pathname.split("/").filter(Boolean);

    return (
        <>
            <nav
                style={{
                    background: `${darkMode ? "#261C2C" : "#fff"}`,
                    borderBottom: `${
                        navbarClicked
                            ? "none"
                            : `${
                                  darkMode
                                      ? "1.5px solid rgba(221,221,221,0.1)"
                                      : "1.5px solid rgba(0,0,0,0.1)"
                              }`
                    }`,
                }}
            >
                <div className="navbar-left">
                    <div className="logo">
                        <img src={logo} alt="logo kirmago" />
                    </div>
                    <div className="pathnow">
                        {pathArray.map((pathSegment, index) => (
                            <span key={index}>
                                <Link className="linkto" to={location.pathname}>
                                    {pathSegment.length === 0
                                        ? "homepage"
                                        : pathSegment}
                                </Link>
                                {index < pathArray.length - 1 && (
                                    <span className="hehe material-symbols-rounded">
                                        chevron_right
                                    </span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="navbar-right">
                    <ul>
                        <li>
                            <Link className="kls" to="/">
                                beranda
                            </Link>
                        </li>
                        <li>
                            <Link className="kls" to="/alumni">
                                Alumni
                            </Link>
                        </li>
                        <li>
                            <Link className="kls" to="/dokumentasi">
                                Dokumentasi
                            </Link>
                        </li>
                        <li>
                            <Link className="kls" to="/postingan">
                                Postingan
                            </Link>
                        </li>
                        <li>
                            <Link className="kls" to="/daftar-kirmago">
                                mendaftar KIR
                            </Link>
                        </li>
                    </ul>
                    <span
                        onClick={() => setNavbarClicked((prev) => !prev)}
                        className="burger material-symbols-rounded"
                        style={{ color: `${darkMode ? "#fff" : "#000"}` }}
                    >
                        {navbarClicked ? "close" : "menu"}
                    </span>
                    <div className="search-bar">
                        <span className="search material-symbols-rounded">
                            search
                        </span>
                        <input type="text" placeholder="cari" />
                    </div>
                </div>
            </nav>
            {navbarClicked && (
                <div
                    className="navbar-content"
                    style={{
                        color: `${darkMode ? "#fff" : "#000"}`,
                        background: `${darkMode ? "#261C2C" : "#fff"}`,
                    }}
                >
                    <div className="navbar-ch-wrapper">
                        {user && (
                            <>
                                <div className="profiles">
                                    <img src={user.profilePicture} alt="user" />
                                    <div className="text-pf">
                                        <h4>{user.firstName}</h4>
                                        <i>{user.role}</i>
                                    </div>
                                </div>
                            </>
                        )}
                        <ul>
                            <li>
                                <Link to="/">Beranda</Link>
                            </li>
                            <li>
                                <Link to="/postingan">Postingan</Link>
                            </li>
                            <li>
                                <Link to="/dokumentasi">Dokumentasi</Link>
                                <p id="next">soon</p>
                            </li>
                            <li>
                                <Link to="/alumni">Alumni</Link>
                                <p id="next">soon</p>
                            </li>
                            <li
                                onClick={() => setEdRo((o) => !o)}
                                style={{
                                    borderBottom: `${
                                        edRo
                                            ? "none"
                                            : "1.5px solid rgba(0,0,0,0.2)"
                                    }`,
                                    fontWeight: "500",
                                }}
                            >
                                <p>Informasi</p>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "5px",
                                        alignItems: "center",
                                    }}
                                >
                                    <p id="next">soon</p>
                                    <span className="material-symbols-rounded">
                                        {edRo ? "expand_less" : "expand_more"}
                                    </span>
                                </div>
                            </li>
                            {edRo && (
                                <ul className="jaf">
                                    <li>
                                        <Link to="/prestasi">
                                            Prestasi Kirmago
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/karya">Karya Kirmago</Link>
                                    </li>
                                    <li>
                                        <Link to="/daftar-kirmago">
                                            Daftar Kirmago
                                        </Link>
                                        <p>Mendaftar menjadi anggota kirmago</p>
                                    </li>
                                    <li>
                                        <Link to="/informasi">
                                            Informasi lainya
                                        </Link>
                                        <p>Seputar kirmago</p>
                                    </li>
                                </ul>
                            )}
                            {!user && (
                                <li>
                                    <Link to="/login">Masuk</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/register">Registrasi</Link>
                            </li>
                            {user && user.role === "admin" && (
                                <li>
                                    <Link
                                        style={{ color: "crimson" }}
                                        to="/admin"
                                    >
                                        Dashboard admin
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <div className="modemodean">
                            <span className="material-symbols-rounded">
                                {darkMode ? "light_mode" : "dark_mode"}
                            </span>
                            {!darkMode ? (
                                <p>Beralih ke mode gelap</p>
                            ) : (
                                <p>Beralih ke mode terang</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
