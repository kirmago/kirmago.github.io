import { db } from '../../../feature/config/firebase/firebase';
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate, Link } from "react-router-dom"
import "./Register.scss"
import axios from "axios"

import Navbar from "../../components/Navbar/Navbar"

const Register = ({setIsDarkMode, isDarkMode}) => {
  const [navClick, setNavClick] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nisn, setNisn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [errorXm, setErrorXm] = useState(false)
  const [errorEmail, setErrorEmail] = useState("")
  const [isWeakpw, setIsWeakpw] = useState("")
  const [loading, setLoading] = useState(false);
  const [loadingUp, setLoadingUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSucces, setIsSucces] = useState(false)
  const [profilePic, setProfilePic] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const randomId = () => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
   const handleImageChanged = async (e) => {
  const file = e.target.files[0];
  
  try {
    setLoadingUp(true); 
    const fullname = `${firstName} ${middleName} ${lastName}`
    const idRandom = randomId();
    const newFileName = `profile-kirmago-${idRandom}-${fullname}`;

    const formData = new FormData();
    formData.append('image', file, newFileName); // Menggunakan newFileName sebagai nama file

    const settings = {
      url: 'https://api.imgbb.com/1/upload?key=9c86085ef480b65e3be0a5b80822bb7a',
      method: 'POST',
      timeout: 0,
      processData: false,
      mimeType: 'multipart/form-data',
      contentType: false,
      data: formData,
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress);
      },
    };

    const response = await axios(settings);
    setProfilePic(response.data.data.url)
 
    setError(null);
  } catch (error) {
    console.error('Error uploading image: ', error);
    setError('Gagal mengunggah gambar. Coba lagi nanti.');
  } finally {
    setLoadingUp(false);
  }
};

  const handleRegistration = async () => {
    try {
      setLoading(true);
      // Check if all required fields are filled
      if (!email || !password || !nisn || !phoneNumber || !firstName || !middleName || !lastName) {
        setError(true)
        setErrorXm(false)
        setLoading(false)
        return;
      }
      

      const auth = getAuth();
      
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const uid = user.uid;

          const usersCollectionRef = collection(db, 'users');
          for (let i = 0; i <= 100; i += 10) {
             setProgress(i);
             await new Promise(resolve => setTimeout(resolve, 500)); // Delay simulasi
          }
          await addDoc(usersCollectionRef, {
            uid: uid,
            email: email,
            nisn: nisn,
            phoneNumber: phoneNumber,
            firstName: firstName,
            middleName: middleName,
            role: "user",
            lastName: lastName,
            profilePicture: profilePic ? profilePic :  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          });
          setIsSucces(true)
          setLoading(false);
          setError(false)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            setError(true)
            setIsWeakpw('Password terlalu lemah. Gunakan password yang lebih kuat.');
          } else if (errorCode === 'auth/email-already-in-use') {
            setError(true)
            alert('Email sudah digunakan. Gunakan email lain.');
          } else if (errorCode === 'auth/invalid-email') {
            setErrorEmail("Format Email salah")
            setErrorXm(true)
          } else {
            setError(true)
            alert(errorMessage);
          }
          setLoading(false);
          console.error(errorCode, errorMessage);
        });
    } catch (error) {
      alert('error');
      console.log(error);
    }
  };
  
  const navigateDash = () => {
    navigate("/")
  }
  
  useEffect(() => {
    if (isSucces) {
      navigate("/login")
    }
  },[isSucces])
  
  

  return (
    <>
    {(loading || loadingUp) && (
      <>
        <div className="getReg">
          <div className="container-progressx">
            <div className="progress-wrapper">
              {loading && (
              <div className="progress" style={{ width: `${progress}%` }}/>
              )}
              {loadingUp && (
              <div className="progress" style={{ width: `${uploadProgress}%` }}/>
              )}
            </div>
            {loading && (
            <h6>{progress}%</h6>
            )}
            {loadingUp && (
            <h6>{uploadProgress}%</h6>
            )}
          </div>
          {loading && (
          <p>Sedang melakukan registrasi tunggu</p>
          )}
          {loadingUp && (
          <p>Sedang mengupload profil</p>
          )}
        </div>
      </>
    )}
    <Navbar setNavbarClicked={setNavClick} navbarClicked={navClick} setDarkMode={setIsDarkMode} darkMode={isDarkMode} />
    {!navClick ? (
    <>
    <div className="button-x">
      <button onClick={navigateDash}><span className="material-symbols-rounded">chevron_left</span><h3>Homepage</h3></button>
    </div>
    {isSucces ? (<p>Sudah Registrasi, Tunggu kami akan memindahkan anda ke /login</p>) : (
    
    <div className="register-body">
      <div className="email">
        <input type="email" placeholder="Example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        {error && !email && ( <span className="material-symbols-rounded">error</span> )}
        {errorXm && !email.includes("@gmail.com") && (<span className="material-symbols-rounded">alternate_email</span>)}
      </div>
      {error && !email && (<p className="isError">input email tidak boleh kosong</p>)}
      {errorXm && !email.includes("@gmail.com") && (<p className="isError">{errorEmail}, gunakan format seperti : example@gmail.com</p>)}
      
      <div className="password">
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      
      {error && !password && ( <span className="material-symbols-rounded">error</span> )}
      {error && isWeakpw && ( <span className="material-symbols-rounded">error</span> )}
      </div>
      {error && !password && (<p className="isError">input password tidak boleh kosong</p>)}
      {error && (<p className="isError">{isWeakpw}</p>)}
      
      
      <div className="nisn">
      <input type="text" placeholder="NISN" value={nisn} onChange={(e) => setNisn(e.target.value)} required />
      
      {error && !nisn && ( <span className="material-symbols-rounded">error</span> )}
      </div>
      {error && !nisn && (<p className="isError">input nisn tidak boleh kosong</p>)}
      
      <div className="tel">
      <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      
      {error && !phoneNumber && ( <span className="material-symbols-rounded">error</span> )}
      </div>
      {error && !phoneNumber && (<p className="isError">input nomor telepon tidak boleh kosong</p>)}
      
      <div className="name">
      <input type="text" placeholder="Nama Depan" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      {/**error && !firstName && (<p>input nama depan tidak boleh kosong</p>)**/}
      <input type="text" placeholder="Nama Tengah" value={middleName} onChange={(e) => setMiddleName(e.target.value)} required />
      {/**error && !middleName && (<p>input nama tengah tidak boleh kosong</p>)**/}
      <input type="text" placeholder="Nama Belakang" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      {/**error && !lastName && (<p>input nama belakang tidak boleh kosong</p>)**/}
      </div>
      <div className="pfp">
      {profilePic ? (
        <>
          <div className="mecon">
          <img className="me" src={profilePic} alt="foto profil" />
          </div>
        </>
      ) : (
      <div className="upload-foto">
        <input type="file" id="file-input" onChange={handleImageChanged}  name="file-input" />
        <label id="file-input-label" for="file-input"><span className="material-symbols-rounded">upload_file</span><p>upload foto</p><p>profil</p></label>
      </div>
      )}
      </div>
      <button onClick={handleRegistration}>Register</button>
      <div className="sudah-akun">
        <p>Sudah punya akun?</p><Link to="/login">login</Link>
      </div>
      
    </div>
    
    )}
    </>
    ) : ""}
    </>
  );
};

export default Register;