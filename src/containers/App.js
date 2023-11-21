/* eslint-disable */
import './App.css';
import { useState, useEffect } from "react"
import { Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet-async"
import favicon from "../assets/icons/favicon.ico";
import { useDispatch } from 'react-redux';
import { checkAuthState } from '../feature/redux/toolkit';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import Homepage from "./pages/Homepage/Homepage"
import Register from "./pages/Register/Register"
import PostingSesuatu from "./pages/Postingan/PostingSesuatu"
import Postingan from "./pages/Postingan/Postingan"
import CekPostingan from "./pages/Postingan/CekPostingan"
import Login from "./pages/Login/Login"
import AudioPlayer from "./components/AudioPlayer/AudioPlayer"
import NoPages from "./components/NoPages/NoPages"
import SoonPages from "./components/SoonPages/SoonPages"


function App() {
  
  const playlist = [
    'https://dl.sndup.net/qnw7/obsession.obsession',
  ];
  
  const [darkMode, setDarkMode] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);
  
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setScreenSize('Desktop');
      } else if (width >= 768) {
        setScreenSize('Tablet');
      } else {
        setScreenSize('Mobile');
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial screen size detection
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  return (
    <>
    <Helmet>
      <title>kirmago website</title>
      <link rel='icon' type='image/png' href={favicon} sizes='16x16' />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@30,400,0,0" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </Helmet>
    {screenSize === 'Desktop' || screenSize === 'Tablet' ? (
      <>
        
        <div className="container-gear">
        <div className="bg">
        </div>
        <div className="group-gear">
          <div className="sp1">
          <img className="gear1" src="https://telegra.ph/file/1c72088a49a56b7bec23a.png" alt="gear" />
          </div>
          <div className="sp2">
          <img className="gear2" src="https://telegra.ph/file/1c72088a49a56b7bec23a.png" alt="gear" />
          </div>
          <div className="sp3">
          <img className="gear3" src="https://telegra.ph/file/1c72088a49a56b7bec23a.png" alt="gear" />
          </div>
        </div>
        <div className="warnab"><span className="material-symbols-rounded">warning</span><p>Untuk mode desktop dan tablet dalam masa pengembangan</p></div>
        <AudioPlayer playlist={playlist} />
        </div>
        
      </>
    ) : (
    <Routes>
      <Route path="/" element={<Homepage isDarkMode={darkMode} setIsDarkMode={setDarkMode} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/daftar-kirmago" element={<SoonPages />} />
      <Route path="/informasi" element={<SoonPages />} />
      <Route path="/informasi/posting" element={<SoonPages />} />
      <Route path="/karya" element={<SoonPages />} />
      <Route path="/karya/posting" element={<SoonPages />} />
      <Route path="/register" element={<Register />} />
      <Route path="/postingan" element={<Postingan isDarkMode={darkMode} setIsDarkMode={setDarkMode} />} />
      <Route path="/postingan/posting" element={<PostingSesuatu isDarkMode={darkMode} setIsDarkMode={setDarkMode} />} />
      <Route path="/postingan/:id" element={<CekPostingan isDarkMode={darkMode} setIsDarkMode={setDarkMode}  />} />
      <Route path="/dokumentasi" element={<SoonPages />} />
      <Route path="/dokumentasi/:id" element={<SoonPages />} />
      <Route path="/dokumentasi/upload" element={<SoonPages />} />
      <Route path="/prestasi" element={<SoonPages />} />
      <Route path="/prestasi/:id" element={<SoonPages />} />
      <Route path="/prestasi/posting" element={<SoonPages />} />
      <Route path="/alumni" element={<SoonPages />} />
      <Route path="/alumni/posting" element={<SoonPages />} />
      <Route path="/alumni/:id" element={<SoonPages />} />
      <Route path="/badnews" element={<PostForm />} />
      <Route path="*" element={<NoPages />} />
    </Routes>
    )}
    </>
  );
}

export default App;


const PostForm = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [posts, setPosts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'content') setContent(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    uploadImage(file);
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const settings = {
        url: 'https://api.imgbb.com/1/upload?key=9c86085ef480b65e3be0a5b80822bb7a',
        method: 'POST',
        timeout: 0,
        processData: false,
        mimeType: 'multipart/form-data',
        contentType: false,
        data: formData,
      };

      const imgBbResponse = await axios(settings);
      const uploadedImageUrl = imgBbResponse.data.data.url;

      setImageUrl(uploadedImageUrl);

      // Hapus file setelah diunggah
      setImage(null);

      return uploadedImageUrl;
    } catch (error) {
      console.error('Error uploading image: ', error);
      // Handle error
    }
  };

  const handleUpload = async () => {
    if (content || imageUrl) {
      const newPost = {
        id: Date.now(),
        content: `${content} ${imageUrl ? `![Deskripsi Gambar](${imageUrl})` : ''}`,
      };

      setPosts([...posts, newPost]);

      setContent('');
      setImageUrl('');
    }
  };

  return (
    <div>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <ReactMarkdown className="tes">{post.content}</ReactMarkdown>
          </div>
        ))}
      </div>
      <textarea name="content" value={content} onChange={handleInputChange} placeholder="Content" />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Set Data</button>
      
      <p>{JSON.stringify(posts, 2)}</p>
    </div>
  );
};