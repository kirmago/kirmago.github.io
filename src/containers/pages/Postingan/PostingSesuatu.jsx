import axios from "axios";
import { useState, useEffect } from "react";
import { db } from "../../../feature/config/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import "./PostingSesuatu.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TambahDetailPostingan from "./TambahDetailPostingan.jsx";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const PostingSesuatu = ({ setIsDarkMode, isDarkMode }) => {
    const [makeElements, setMakeElements] = useState([]);
    const [rawJSON, setRawJSON] = useState("");
    const [navClick, setNavClick] = useState(false);
    const [tahapan, setTahapan] = useState(1);
    const [currentDateTime, setCurrentDateTime] = useState("");
    const [hideUi, setHideUi] = useState(false);

    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [uploadProgress, setUploadProgress] = useState(0);

    const [judul, setJudul] = useState("");
    const [deskripsiSingkat, setDeskripsiSingkat] = useState("");
    const [deskripsiPenuh, setDeskripsiPenuh] = useState("");
    const [thumb, setThumb] = useState("");
    const navigate = useNavigate();

    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        const driverObj = driver({
            showProgress: true, // Because everyone loves progress bars!
            steps: [
                {
                    popover: {
                        title: "Peringatan",
                        description:
                            "Page ini adalah tempat untuk memposting sesuatu di page postingan, ketik next dibawah untuk melihat tutorialnya",
                    },
                },
                {
                    element: "#upgb",
                    popover: {
                        title: "Upload Thumbnail",
                        description:
                            "Ini adalah tempat upload untuk thumbnail yang nantinya ditampilkan di awal postingan",
                    },
                },
                {
                    element: "#judulpo",
                    popover: {
                        title: "Judul postingan",
                        description:
                            "Judul postingan utama yang nantinya akan ditampilkan di thumbnail",
                    },
                },
                {
                    element: "#desksinpo",
                    popover: {
                        title: "Deskripsi singkat",
                        description:
                            "Deskripsi singkat ini wajib diisi untuk ditampilkan di thumbnail",
                    },
                },
                {
                    element: "#deskfull",
                    popover: {
                        title: "Deskripsi penuh",
                        description:
                            "Sama dengan yang deskripsi singkat namun lebih diperjelas dan diperdetail karena ini untuk memenuhi kriteria moderator",
                    },
                },
                {
                    element: "#prevsx",
                    popover: {
                        title: "Tombol undo atau mundur",
                        description:
                            "Apabila ada kesalahan dalam penulisan ketika sudah mencapai page isi postingan maka gunakan ini untuk memulai ulang",
                    },
                },
                {
                    element: "#prevsd",
                    popover: {
                        title: "Tombol next atau lanjut",
                        description: "Untuk lanjut ke page isi postingan ",
                    },
                },
                {
                    popover: {
                        title: "Peringatan",
                        description:
                            "Seluruh kolom wajib diisi! ketika semua kolom sudah terisi maka otomatis tombol next/lanjut akan bisa ditekan",
                    },
                },
            ],
        });
        driverObj.drive();
    }, []);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    const randomId = () => {
        const characters = "0123456789";
        let result = "";
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        return result;
    };

    const handleSaveData = async () => {
        if (
            judul.trim() !== "" &&
            thumb.trim() !== "" &&
            deskripsiPenuh.trim() !== ""
        ) {
            try {
                const formatTime = (date) => {
                    const hours = date.getHours().toString().padStart(2, "0");
                    const minutes = date
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                    return `${hours}:${minutes}`;
                };
                const now = new Date();

                // Daftar nama bulan dalam bahasa Indonesia
                const namaBulan = [
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember",
                ];

                // Format tanggal dan waktu sesuai dengan format yang diinginkan
                const formattedDateTime = `${now.getDate()} ${
                    namaBulan[now.getMonth()]
                } ${now.getFullYear()}`;

                // Simpan tanggal dan waktu dalam state
                setCurrentDateTime(formattedDateTime);
                if (currentDateTime) {
                    setLoading(true);

                    // Simulating upload progress for 2 seconds (adjust the time based on your requirement)
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += 10; // Increase progress by 10% every second
                        setUploadProgress(progress);
                        if (progress >= 100) {
                            clearInterval(interval);
                        }
                    }, 200); // 200 milliseconds interval for 10 iterations (2 seconds in total)

                    await addDoc(collection(db, "postingan"), {
                        judul: judul,
                        thumb: thumb, // Assuming thumb contains the ImgBB image URL
                        deskripsiSingkat: deskripsiSingkat,
                        tanggalPosting: currentDateTime,
                        isFinish: true,
                        author: user.firstName,
                        isiPostingan: makeElements,
                        waktuPosting: formatTime(now),
                        deskripsiPenuh: deskripsiPenuh,
                    });

                    setMakeElements([]);
                    setTahapan(1);
                    setJudul("");
                    setDeskripsiSingkat("");
                    setDeskripsiPenuh("");
                    setThumb("");
                    setImageUrl("");
                    setCurrentDateTime("");
                    setUploadProgress(0);
                    setLoading(false);
                    clearInterval(interval); // Clear the interval if the upload is successful
                    alert("Terposting");
                }
            } catch (error) {
                console.error("Error adding document: ", error);
                setLoading(false);
                setError("Gagal memposting data. Coba lagi nanti.");
                setUploadProgress(0);
            }
        } else if (thumb === "") {
            if (imageUrl) {
                setThumb(imageUrl);
            }
        } else {
            alert("isi semua kolom");
        }
    };

    const handleImageChanged = async (e) => {
        const file = e.target.files[0];

        try {
            setLoading(true);
            const originalFileName = file.name;
            const idRandom = randomId();
            const newFileName = `data-kirmago-${idRandom}-${originalFileName}`;

            const formData = new FormData();
            formData.append("image", file, newFileName); // Menggunakan newFileName sebagai nama file

            const settings = {
                url: "https://api.imgbb.com/1/upload?key=9c86085ef480b65e3be0a5b80822bb7a",
                method: "POST",
                timeout: 0,
                processData: false,
                mimeType: "multipart/form-data",
                contentType: false,
                data: formData,
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    setUploadProgress(progress);
                },
            };

            const response = await axios(settings);
            setImageUrl(response.data.data.url);
            setThumb(response.data.data.url);

            setError(null);
        } catch (error) {
            console.error("Error uploading image: ", error);
            setError("Gagal mengunggah gambar. Coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const json = JSON.stringify(makeElements, null, 2);
        setRawJSON(json);
    }, [setRawJSON, makeElements]);

    const handleNextStep = () => {
        if (
            tahapan < 3 &&
            judul !== "" &&
            deskripsiSingkat !== "" &&
            deskripsiPenuh !== "" &&
            thumb !== ""
        ) {
            if (tahapan === 2 && !makeElements.length < 1) {
                setTahapan(tahapan + 1);
                setHideUi(false);
            } else if (tahapan === 1) {
                setTahapan(tahapan + 1);
            }
        }
    };

    const handlePreviousStep = () => {
        if (tahapan > 1) {
            setTahapan(tahapan - 1);
            if (tahapan === 3) {
                setMakeElements([]);
            }
            setHideUi(false);
        }
    };

    return (
        <>
            {user && (
                <>
                    {!hideUi ? (
                        <Navbar
                            setNavbarClicked={setNavClick}
                            navbarClicked={navClick}
                            setDarkMode={setIsDarkMode}
                            darkMode={isDarkMode}
                        />
                    ) : (
                        ""
                    )}

                    {!navClick ? (
                        <>
                            <div className="container-postingan">
                                {!hideUi ? <h1 id="juduls">Memposting</h1> : ""}

                                {tahapan === 1 ? (
                                    <>
                                        <div
                                            className="upload-gambar"
                                            id="upgb"
                                        >
                                            {!imageUrl && (
                                                <>
                                                    {" "}
                                                    {loading ? (
                                                        ""
                                                    ) : (
                                                        <>
                                                            <input
                                                                type="file"
                                                                id="file-input"
                                                                onChange={
                                                                    handleImageChanged
                                                                }
                                                                name="file-input"
                                                            />
                                                            <label
                                                                id="file-input-label"
                                                                for="file-input"
                                                            >
                                                                <span className="material-symbols-rounded">
                                                                    upload_file
                                                                </span>
                                                                <p>
                                                                    upload
                                                                    thumbnail
                                                                </p>
                                                            </label>
                                                        </>
                                                    )}
                                                </>
                                            )}

                                            {loading ? (
                                                <>
                                                    <div className="pokokload">
                                                        <div className="loadingDots">
                                                            <div className="dot"></div>
                                                            <div className="dot"></div>
                                                            <div className="dot"></div>
                                                        </div>
                                                        <p id="uprog">
                                                            {uploadProgress}%
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                imageUrl && (
                                                    <>
                                                        <img
                                                            src={imageUrl}
                                                            alt="Gambar hasil upload"
                                                        />
                                                    </>
                                                )
                                            )}
                                        </div>
                                        <div>
                                            <div className="judul-postingan">
                                                <input
                                                    disabled={loading}
                                                    type="text"
                                                    placeHolder="Judul postingan"
                                                    value={judul}
                                                    id="judulpo"
                                                    onChange={(e) =>
                                                        setJudul(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="desksing-postingan">
                                                <input
                                                    disabled={loading}
                                                    type="text"
                                                    id="desksinpo"
                                                    placeHolder="Deskripsi singkat postingan"
                                                    value={deskripsiSingkat}
                                                    onChange={(e) =>
                                                        setDeskripsiSingkat(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="desknuh-postingan">
                                                <textarea
                                                    disabled={loading}
                                                    type="text"
                                                    id="deskfull"
                                                    placeHolder="Deskripsi penuh"
                                                    value={deskripsiPenuh}
                                                    onChange={(e) =>
                                                        setDeskripsiPenuh(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {tahapan === 2 ? (
                                            <>
                                                <TambahDetailPostingan
                                                    sjudul={judul}
                                                    outputElements={
                                                        makeElements
                                                    }
                                                    setOutputElements={
                                                        setMakeElements
                                                    }
                                                    setHiddenUi={setHideUi}
                                                    hiddenUi={hideUi}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {tahapan === 3 ? (
                                                    <>
                                                        <h1>
                                                            Yakin dengan semua
                                                            progress?
                                                        </h1>
                                                        <button
                                                            disabled={loading}
                                                            id="tombols"
                                                            onClick={
                                                                handleSaveData
                                                            }
                                                        >
                                                            Ya, Posting Sekarang
                                                        </button>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                    <div className="progressBar">
                        <div className={`progressFill step-${tahapan}`}></div>
                    </div>
                    {/* Tombol untuk mengganti nilai tahapan */}
                    <div className="next-prev">
                        <button onClick={handlePreviousStep} id="prevsx">
                            <span className="material-symbols-rounded">
                                chevron_left
                            </span>
                        </button>
                        {loading ? <p id="uprog">{uploadProgress}%</p> : ""}
                        <button onClick={handleNextStep} id="prevsd">
                            <span className="material-symbols-rounded">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default PostingSesuatu;
