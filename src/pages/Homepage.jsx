import "./Homepage.scss"
import logo from "../source/logo.png"
import { useState, useEffect } from "react"

const Homepage = () => {
  
  return (
    <>
      <Navbar/>
      <div className="home-container">
        {/***<div className="hero-container">
          <div className="hero-wrapper">
            <div className="hero-child">
              <img src={logo} alt="logo" />
              <h3>Kirmago</h3>
            </div>
          </div>
          <img src="https://source.unsplash.com/random/1400×800/?fruit" alt="fruit" />
        </div>***/}
        <div className="hero noisy">
          <div className="bunder" />
          <h1>KIRMAGO,</h1>
          <h2>Website official kir SMA Negeri 1 Rogojampi</h2>
          <p className="hero-text">Ekstrakurikuler ini merupakan organisasi mengembangkan kreativitas, ilmu pengetahuan, dan teknologi</p>
          <button>Cari tahu</button>
        </div>
        
        <div className="container-content">
          
          <div className="box-content noisy">
            <div className="box-left">
            <h3>Karya</h3>
            <p>Karya anak kirmago</p>
            </div>
            <div className="box-right">
            <span className="material-symbols-rounded">north_east</span>
            </div>
          </div>
          
          <div className="box-content noisy">
            <div className="box-left">
            <h3>Prestasi</h3>
            <p>Prestasi kirmago</p>
            </div>
            <div className="box-right">
            <span className="material-symbols-rounded">north_east</span>
            </div>
          </div>
        
          <div className="box-content noisy">
            <div className="box-left">
            <h3>Kenangan</h3>
            <p>Kenangan Alumni</p>
            </div>
            <div className="box-right">
            <span className="material-symbols-rounded">north_east</span>
            </div>
          </div>
          
          <div className="box-content noisy">
            <div className="box-left">
            <h3>Update</h3>
            <p>Update dan dokumentasi kirmago</p>
            </div>
            <div className="box-right">
            <span className="material-symbols-rounded">north_east</span>
            </div>
          </div>
          
        </div>
        
        <div className="container-content2">
          <h2>Sejarah Kirmago</h2>
          <p>Organisasi ini pertama kali dibentuk pada tahun 2013 dan terus mendapat perkembangan prestasi hingga dibagi menjadi beberapa divisi dikarenakan <bold>Tekinforkom</bold> merge dengan <bold>Kirmago</bold> pada tahun 2022 awal januari</p>
        </div>
        
      </div>
    </>
  )
}

export default Homepage

const Navbar = (navbarclick) => {
  const [clicked, setClicked] = useState(false)
  
  return (
  <>
  <section className={`navcon ${clicked ? "open":"closed"}`}>
    <nav className="navbar">
      <div className="left-navbar">
      <img src={logo} alt="logo" />
      
      </div>
      {/**<div className="middle-navbar">
        <div className="search-bar">
          <span className="material-symbols-rounded">search</span>
          <input type="text" placeHolder="cari" />
        </div>
      </div>**/}
      <div className="right-navbar">
        <span onClick={() => setClicked(prev => !prev)} className={`burger ${clicked ? "open":"closed"} material-symbols-rounded`}>{clicked ? "close" : "menu"}</span>
      </div>
    </nav>
    {clicked && (
    <div className="navbarxuy">
    <div className="list">
        <ul>
          <li><span className="material-symbols-rounded">post_add</span><p>Posting sesuatu</p></li>
          <li><span className="material-symbols-rounded">login</span><p>Log in</p></li>
        </ul>
    </div>
    
    
    </div>)}
  </section>
  </>
  )
}