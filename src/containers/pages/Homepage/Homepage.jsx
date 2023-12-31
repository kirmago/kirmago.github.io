/* eslint-disable */
import "./Homepage.scss"
import { useNavigate, Link } from 'react-router-dom';
import logo from "../../../assets/logo/logo.png"
import React, { useState, useEffect, useRef } from "react"
import Navbar from "../../components/Navbar/Navbar"

const Homepage = ({setIsDarkMode, isDarkMode}) => {
  const navigate = useNavigate();
  const [navClick, setNavClick] = useState(false)
  const [moreContents, setMoreContents] = useState(false)
  const [moreContents2, setMoreContents2] = useState(false)
  const infomin = useRef(null);

  
  const scrollToElement = () => {
    infomin.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  const listedContent = [{
    contentTitle: "Karya",
    contentDescription: "Karya anak KIRMAGO dari tahun ke tahun",
    contentThumbnail: {
      url: "https://images.unsplash.com/photo-1643199319409-84b7066f45b9?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9vayUyMHJvYm90aWN8ZW58MHx8MHx8fDA%3D",
      title: "Gambar buku dan robot",
    },
  },{
    contentTitle: "Dokumentasi",
    contentDescription: "Dokumentasi kegiatan dan dokumentasi lainya",
    contentThumbnail: {
      url: "https://telegra.ph/file/6963db6f2d7dc3dbd3e0f.jpg",
      title: "foto anggota kir",
    },
  },{
    contentTitle: "Prestasi",
    contentDescription: "Prestasi anak KIRMAGO",
    contentThumbnail: {
      url: "https://telegra.ph/file/ce6a364ccd73b2f7a2778.jpg",
      title: "hendra dwi permana pemenang untag",
    },
  },{
    contentTitle: "Alumni",
    contentDescription: "Alumni KIRMAGO dari tahun ke tahun",
    contentThumbnail:  {
      url: "https://telegra.ph/file/87504e74d5be5545c2fb7.jpg",
      title: "alumni kir tahun 2023",
    },
  },
  ]

  return (
    <>
      <Navbar setNavbarClicked={setNavClick} navbarClicked={navClick} setDarkMode={setIsDarkMode} darkMode={isDarkMode} />
      {!navClick ? (
      <div className="container-home" style={{
          color: `${isDarkMode ? "#fff" : "#000"}`,
          backgroundColor: `${isDarkMode ? "#261C2C" : "#fff"}`,
      }}>
        <div className="container-home-hero">
          <div id="corak" />
          <h1 id="title">Kelompok Ilmiah Remaja SMA negeri 1 rogojampi taruna budaya</h1>
          <p id="subtitle" style={{
          color: `${isDarkMode ? "rgba(221,221,221,0.6)" : "#000"}`,
      }}>Website official KIR SMA negeri 1 rogojampi taruna budaya, playground anak Kirmago, penelitian dan dokumentasi.</p>
          <div className="container-home-hero-button">
            <button onClick={scrollToElement} style={{
          color: `${isDarkMode ? "#fff" : "#000"}`,
          border: `${isDarkMode ? "1.5px solid #fff" : "1.5px solid #000"}`,
      }}>Cari tahu</button>
            <button onClick={() => navigate("/informasi")} style={{
          color: `${isDarkMode ? "#fff" : "#000"}`,
          border: `${isDarkMode ? "1.5px solid #fff" : "1.5px solid #000"}`,
      }}>Informasi Kirmago</button>
          </div>
        </div>
        <div className="container-home-content">
        <div className="intro-content">
          <div id="corak" style={{
          backgroundColor: `${isDarkMode ? "#fff" : "#000"}`,
      }} />
          <div ref={infomin} className="intro-text">
          
          
            <div className="apasih" onClick={() => setMoreContents(prev => !prev)} style={{
                borderBottom: `${isDarkMode ? "1.5px solid rgba(222,221,221,0.5)" : "1.5px solid #000"}`,
            }}>
            <h3>Apa sih KIRMAGO itu?</h3>
            <span className="material-symbols-rounded">{moreContents ? "expand_less" : "expand_more"}</span>
            </div>
            {moreContents ? (
            <ul className="list-mor">
              <li><h4>Secara umum</h4></li>
              <p>Kelompok ilmiah remaja adalah sebuah organisasi atau kelompok kecil yang terdiri dari remaja yang memiliki minat dan ketertarikan dalam bidang ilmiah. Mereka biasanya berkumpul untuk mendiskusikan topik-topik ilmiah, melakukan eksperimen, dan belajar bersama. Kelompok ilmiah remaja memberikan platform bagi para remaja untuk mengembangkan keterampilan penelitian, logika, dan pemecahan masalah sambil memperluas pengetahuan mereka dalam berbagai bidang ilmu pengetahuan. Biasanya, kelompok ini didukung oleh mentor atau guru yang membimbing mereka dalam eksplorasi ilmiah mereka.</p>
              <li><h4>Sejarah berdirinya</h4></li>
              <p>Kelompok ilmiah remaja SMA Negeri 1 Rogojampi, atau dikenal sebagai KIRMAGO, didirikan pada tahun 2014. Berawal dari kebutuhan akan tempat untuk melakukan kajian dan untuk melatih cara berpikir lebih kreatif, KIRMAGO tumbuh dan terbagi menjadi sektor atau divisi seiring berjalannya waktu. Pendiri KIRMAGO pada saat itu adalah seorang siswa kreatif bernama Kak <a href="https://instagram.com/ayudesiartha">Ayu</a>. Inilah sejarah singkat KIRMAGO. [Belum Valid]</p>
            </ul>
            ) : ""}
            
            
            <div className="divisi" onClick={() => setMoreContents2(prev => !prev)} style={{
                borderBottom: `${isDarkMode ? "1.5px solid rgba(222,221,221,0.5)" : "1.5px solid #000"}`,
            }} >
            <h3>Divisi Kirmago?</h3>
            <span className="material-symbols-rounded">{moreContents2 ? "expand_less" : "expand_more"}</span>
            </div>
            {moreContents2 ? (
              <>
               <p>hehe</p>
              </>
            ) : ""} 
            
            
            <div className="peran" style={{
                borderBottom: `${isDarkMode ? "1.5px solid rgba(222,221,221,0.5)" : "1.5px solid #000"}`,
            }}>
            <h3>Peran Kirmago untuk sekolah?</h3>
            <span className="material-symbols-rounded">{moreContents2 ? "expand_less" : "expand_more"}</span>
            </div>
            
            
            
            <div className="greenhouse" style={{
                borderBottom: `${isDarkMode ? "1.5px solid rgba(222,221,221,0.5)" : "1.5px solid #000"}`,
            }}>
            <h3>Green House Kirmago?</h3>
            <span className="material-symbols-rounded">{moreContents2 ? "expand_less" : "expand_more"}</span>
            </div>
            
            
            
          </div>
        </div>
        <button className={`daftar-button ${isDarkMode ? "darkm":""}`} onClick={() => navigate("/daftar-kirmago")} >Mendaftar menjadi anggota kirmago</button>
        <div className="home-content">
        <p>Tentang hal lainya di</p>
        <h2>Kirmago website</h2>
      
           {listedContent.map((data) => {
             return (
              <>
              <div className="container-home-content-chd">
                <div className="wrapper-content-bg">
                <img src={data.contentThumbnail.url} alt={data.contentThumbnail.title} />
                </div>
                <div className="wrapper-content-text">
                
                  <div className="wct-in">
                    <h3>{data.contentTitle}</h3>
                    <p>{data.contentDescription}</p>
                  </div>
                  <div className="wct-in-l">
                    <button onClick={() => navigate(data.contentTitle)}>telusuri</button>
                  </div>
                </div>
              </div>
              </>
              )
            })
           }
        </div>
        </div>
        <div className="container-home-credit">
        <div className="propow-up">
          <div className="developer">
            <h2>Developer</h2>
            <div className="ig">
            <i className="fa-brands fa-instagram"></i>
            <Link to="https://instagram.com/chromesavior">@Chromesavior/Ridho</Link>
            </div>
            <div className="git">
            <i className="fa-brands fa-github"></i>
            <Link to="https://github.com/7ryznxx">@7ryznxx</Link>
            </div>
          </div>
          <div className="copyright">
            <h2>Copyright</h2>
            <div className="mas">
            <i className="fa fa-copyright"></i>
            <Link to="/kirmago-social" >Kirmago 2023</Link>
            </div>
          </div>
        </div>
        <div className="propow-down"> 
          <h2>Project Powered</h2>
          <div className="masx">
            <i className="fa-brands fa-github"></i>
            <Link to="https://pages.github.com/" >github pages</Link>
          </div>
        </div>
        </div>
        
        
      </div>
      ) : ""}
    </>
  )
}

export default Homepage
