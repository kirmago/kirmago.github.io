/* eslint-disable */
import "./Homepage.scss";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Credit from "./../../components/Credits/Credit";

const Homepage = ({ setIsDarkMode, isDarkMode }) => {
    const navigate = useNavigate();
    const [navClick, setNavClick] = useState(false);
    const infomin = useRef(null);

    const [modalOpen, setModalOpen] = useState(false);

    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);

    const scrollToElement = () => {
        infomin.current.scrollIntoView({ behavior: "smooth" });
    };

    const listedContent = [
        {
            contentTitle: "Karya",
            contentDescription: "Karya anak KIRMAGO dari tahun ke tahun",
            contentThumbnail: {
                url: "https://images.unsplash.com/photo-1643199319409-84b7066f45b9?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9vayUyMHJvYm90aWN8ZW58MHx8MHx8fDA%3D",
                title: "Gambar buku dan robot",
            },
        },
        {
            contentTitle: "Dokumentasi",
            contentDescription: "Dokumentasi kegiatan dan dokumentasi lainya",
            contentThumbnail: {
                url: "https://telegra.ph/file/6963db6f2d7dc3dbd3e0f.jpg",
                title: "foto anggota kir",
            },
        },
        {
            contentTitle: "Prestasi",
            contentDescription: "Prestasi anak KIRMAGO",
            contentThumbnail: {
                url: "https://telegra.ph/file/6adc3d2baee3aeef92130.jpg",
                title: "Deira cahya memenangkan kompetisi essay",
            },
        },
        {
            contentTitle: "Alumni",
            contentDescription: "Alumni KIRMAGO dari tahun ke tahun",
            contentThumbnail: {
                url: "https://telegra.ph/file/87504e74d5be5545c2fb7.jpg",
                title: "alumni kir tahun 2023",
            },
        },
    ];

    return (
        <>
            <Navbar
                setNavbarClicked={setNavClick}
                navbarClicked={navClick}
                setDarkMode={setIsDarkMode}
                darkMode={isDarkMode}
            />
            {!navClick ? (
                <>
                    <div
                        className="container-home"
                        style={{
                            color: `${isDarkMode ? "#fff" : "#000"}`,
                            backgroundColor: `${
                                isDarkMode ? "#261C2C" : "#fff"
                            }`,
                        }}
                    >
                        <div className="container-home-hero">
                            <div id="corak" />
                            <h1 id="title">
                                Kelompok Ilmiah Remaja SMA negeri 1 rogojampi
                                taruna budaya
                            </h1>
                            <p id="subtitle">
                                Website official KIR SMA negeri 1 rogojampi
                                taruna budaya, playground anak Kirmago,
                                penelitian dan dokumentasi.
                            </p>
                            <div className="container-home-hero-button">
                                <button
                                    onClick={() => navigate("/daftar-kirmago")}
                                >
                                    Mendaftar menjadi anggota kirmago
                                </button>
                            </div>
                        </div>

                        <div className="container-home-content">
                            <p>Tentang hal lainya di</p>
                            <h2>Kirmago website</h2>
                            <div className="intro-content">
                                <div className="intr-container-content">
                                    <div className="intr-left">
                                        <img src={logo} alt="logo kirmago" />
                                    </div>
                                    <div className="intr-right">a</div>
                                </div>
                            </div>

                            <p>Tentang hal lainya di</p>
                            <h2>Kirmago website</h2>
                            <div className="home-content">
                                {listedContent.map((data, index) => {
                                    return (
                                        <>
                                            <motion.div
                                                key={index}
                                                whileHover={{
                                                    scale: 1.02,
                                                    boxShadow:
                                                        "0px 0px 20px 5px rgba(0, 0, 0, 0.3)",
                                                }}
                                                className="container-home-content-chd"
                                            >
                                                <div className="wrapper-content-bg">
                                                    <img
                                                        src={
                                                            data
                                                                .contentThumbnail
                                                                .url
                                                        }
                                                        alt={
                                                            data
                                                                .contentThumbnail
                                                                .title
                                                        }
                                                    />
                                                </div>
                                                <div className="wrapper-content-text">
                                                    <div className="wct-in">
                                                        <h3>
                                                            {data.contentTitle}
                                                        </h3>
                                                        <p>
                                                            {
                                                                data.contentDescription
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="wct-in-l">
                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    data.contentTitle
                                                                )
                                                            }
                                                        >
                                                            telusuri
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <Credit />

                    <AnimatePresence>
                        {modalOpen && (
                            <Modal
                                handleClose={close}
                                text="Hello, I'm a modal!"
                            />
                        )}
                    </AnimatePresence>
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default Homepage;

const Backdrop = ({ children, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="modal-container">{children}</div>
        </motion.div>
    );
};

const dropIn = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1,
        },
    },
    exit: {
        opacity: 0,
    },
};

const Modal = ({ handleClose, text }) => {
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal orange-gradient"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <p>{text}</p>
                <button onClick={handleClose}>Close</button>
            </motion.div>
        </Backdrop>
    );
};

{
    /* </li>
                                            <p>
                                                Kelompok ilmiah remaja SMA
                                                Negeri 1 Rogojampi, atau dikenal
                                                sebagai KIRMAGO, didirikan pada
                                                tahun 2014. Berawal dari
                                                kebutuhan akan tempat untuk
                                                melakukan kajian dan untuk
                                                melatih cara berpikir lebih
                                                kreatif, KIRMAGO tumbuh dan
                                                terbagi menjadi sektor atau
                                                divisi seiring berjalannya
                                                waktu. Pendiri KIRMAGO pada saat
                                                itu adalah seorang siswa kreatif
                                                bernama Kak{" "}
                                                <a href="https://instagram.com/ayudesiartha">
                                                    Ayu
                                                </a>
                                                . Inilah sejarah singkat
                                                KIRMAGO. [Belum Valid]
                                            </p> */
}

{
    /* //  {/* Kelompok ilmiah remaja adalah
//                                                 sebuah organisasi atau kelompok
//                                                 kecil yang terdiri dari remaja
//                                                 yang memiliki minat dan
//                                                 ketertarikan dalam bidang
//                                                 ilmiah. Mereka biasanya
//                                                 berkumpul untuk mendiskusikan
//                                                 topik-topik ilmiah, melakukan
//                                                 eksperimen, dan belajar bersama.
//                                                 Kelompok ilmiah remaja
//                                                 memberikan platform bagi para
//                                                 remaja untuk mengembangkan
//                                                 keterampilan penelitian, logika,
//                                                 dan pemecahan masalah sambil
//                                                 memperluas pengetahuan mereka
//                                                 dalam berbagai bidang ilmu
//                                                 pengetahuan. Biasanya, kelompok
//                                                 ini didukung oleh mentor atau
//                                                 guru yang membimbing mereka
//                                                 dalam eksplorasi ilmiah mereka. */
}
