/* eslint-disable */
import { useState, useEffect } from "react";
import { db } from "../../../feature/config/firebase/firebase";
import {
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
    collection,
    onSnapshot,
} from "firebase/firestore";
//import axios from "axios"
import "./Postingan.scss";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";

const Postingan = ({ setIsDarkMode, isDarkMode }) => {
    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const navigate = useNavigate();

    const [navClick, setNavClick] = useState(false);

    const [onHold, setOnHold] = useState(false);

    const [userPfp, setUserPfp] = useState("");
    const [likeError, setLikeError] = useState(null);
    const [isLikeProcessing, setIsLikeProcessing] = useState(false);
    const [unlikeError, setUnLikeError] = useState(null);
    const [isUnLikeProcessing, setIsUnLikeProcessing] = useState(false);
    const [postingan, setPostingan] = useState([]);
    const [errorPos, setErrorPos] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const filteredPostingan = postingan.filter((post) => {
            const judulMatch = post.judul
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const deskripsiMatch = post.deskripsiSingkat
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            return judulMatch || deskripsiMatch;
        });
        setSearchResults(filteredPostingan);
    }, [searchTerm, postingan]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await onSnapshot(
                collection(db, "postingan"),
                (snapshot) => {
                    const items = [];
                    snapshot.forEach((doc) => {
                        items.push({
                            id: doc.id,
                            judul: doc.data().judul,
                            thumb: doc.data().thumb,
                            likes: doc.data().likes,
                            author: doc.data().author,
                            authorPfp: doc.data().authorPfp,
                            tanggalPosting: doc.data().tanggalPosting,
                            waktuPosting: doc.data().waktuPosting,
                            unlikes: doc.data().unlikes,
                            deskripsiSingkat: doc.data().deskripsiSingkat,
                            deskripsiPenuh: doc.data().deskripsiPenuh,
                        });
                    });
                    setPostingan(items);
                }
            );

            // Unsubscribe ketika komponen dibongkar
            return () => querySnapshot();
        };

        fetchData();

        // Cleanup function untuk unsubscribe dari listener ketika komponen dibongkar
    }, []);

    const handleLike = async (postId) => {
        if (isLikeProcessing) {
            return; // Menghindari pengguna mengklik berkali-kali selama operasi sedang berlangsung
        }

        setIsLikeProcessing(true);
        // Memeriksa apakah pengguna sudah memberi suka pada postingan ini
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
        if (likedPosts.includes(postId)) {
            setLikeError("Anda sudah memberi suka pada postingan ini.");
            setIsLikeProcessing(false); // Mengaktifkan kembali tombol "Like"
            return;
        }

        const postRef = doc(db, "postingan", postId);
        const postDoc = await getDoc(postRef);

        if (postDoc.exists()) {
            const currentLikes = postDoc.data().likes || 0;
            const updatedLikes = currentLikes + 1;

            try {
                await updateDoc(postRef, {
                    likes: updatedLikes,
                });

                const updatedPosts = postingan.map((post) => {
                    if (post.id === postId) {
                        return { ...post, likes: updatedLikes };
                    }
                    return post;
                });

                setPostingan(updatedPosts);

                // Menyimpan ID postingan yang disukai ke localStorage
                likedPosts.push(postId);

                localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
            } catch (error) {
                setLikeError("Gagal menyukai postingan. Coba lagi nanti.");
                console.error("Error updating likes: ", error);
            }
        }
        setIsLikeProcessing(false);
    };

    const handleUnLike = async (postId) => {
        if (isUnLikeProcessing) {
            return; // Menghindari pengguna mengklik berkali-kali selama operasi sedang berlangsung
        }

        setIsUnLikeProcessing(true);
        // Memeriksa apakah pengguna sudah memberi suka pada postingan ini
        const unlikedPosts =
            JSON.parse(localStorage.getItem("unlikedPosts")) || [];
        if (unlikedPosts.includes(postId)) {
            setUnLikeError("Anda sudah memberi suka pada postingan ini.");
            setIsUnLikeProcessing(false); // Mengaktifkan kembali tombol "Like"
            return;
        }

        const postRef = doc(db, "postingan", postId);
        const postDoc = await getDoc(postRef);

        if (postDoc.exists()) {
            const currentUnLikes = postDoc.data().unlikes || 0;
            const updatedUnLikes = currentUnLikes + 1;

            try {
                await updateDoc(postRef, {
                    unlikes: updatedUnLikes,
                });

                const updatedPosts = postingan.map((post) => {
                    if (post.id === postId) {
                        return { ...post, unlikes: updatedUnLikes };
                    }
                    return post;
                });

                setPostingan(updatedPosts);

                // Menyimpan ID postingan yang disukai ke localStorage
                unlikedPosts.push(postId);

                localStorage.setItem(
                    "unlikedPosts",
                    JSON.stringify(unlikedPosts)
                );
            } catch (error) {
                setUnLikeError(
                    "Gagal tidak menyukai postingan. Coba lagi nanti."
                );
                console.error("Error updating unlikes: ", error);
            }
        }
        setIsUnLikeProcessing(false);
    };

    const deleteDocumentByid = async (data) => {
        const documentRef = doc(db, "postingan", data);
        try {
            await deleteDoc(documentRef);
            console.log("Dokumen berhasil dihapus");
        } catch (error) {
            console.error("Error menghapus dokumen:", error);
        }
    };

    const tahanDuaMdetik = () => {
        setOnHold(true);
    };

    const buatPostingan = () => {
        navigate("/postingan/posting");
    };

    return (
        <>
            {!navClick ? (
                <>
                    {user && (
                        <div className="buat-postingan">
                            <span
                                onClick={buatPostingan}
                                className="material-symbols-rounded"
                            >
                                post_add
                            </span>
                        </div>
                    )}
                </>
            ) : (
                ""
            )}
            <Navbar
                setNavbarClicked={setNavClick}
                navbarClicked={navClick}
                setDarkMode={setIsDarkMode}
                darkMode={isDarkMode}
            />
            {!navClick ? (
                <div className="container-content">
                    <h1 id="postingan">Postingan</h1>
                    <div className="search-wrapper">
                        <div className="search">
                            <div className="search-left">
                                <span className="material-symbols-rounded">
                                    search
                                </span>
                            </div>
                            {/**<div className="search-middle">
            
          </div>**/}
                            <div className="search-right">
                                <input
                                    type="text"
                                    placeholder="Cari postingan.."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {searchTerm && (
                        <div className="hasil-pencarian">
                            {/* Tampilkan hasil pencarian di sini */}
                            {searchResults.map((result, index) => (
                                <div key={index}>
                                    {/* Tampilkan informasi postingan, sesuai dengan struktur data postingan Anda */}
                                    {result.judul} - {result.deskripsiSingkat}
                                </div>
                            ))}
                        </div>
                    )}
                    <ul className="listed-postingan">
                        {postingan.length > 0 ? (
                            <>
                                {postingan.map((postinganNya) => {
                                    const judulPotong =
                                        postinganNya.judul.substring(0, 20);
                                    const judulTampilan =
                                        judulPotong.length === 20
                                            ? `${judulPotong}...`
                                            : judulPotong;

                                    return (
                                        <>
                                            <div className="listedx">
                                                <li
                                                    className="single-listed-postingan"
                                                    key={postinganNya.id}
                                                    onMouseDown={tahanDuaMdetik}
                                                >
                                                    {user &&
                                                        user.role ===
                                                            "admin" && (
                                                            <div id="deletePost">
                                                                <span
                                                                    onClick={() =>
                                                                        deleteDocumentByid(
                                                                            postinganNya.id
                                                                        )
                                                                    }
                                                                    className="material-symbols-rounded"
                                                                >
                                                                    delete
                                                                </span>
                                                            </div>
                                                        )}

                                                    <Link
                                                        to={`/postingan/${postinganNya.id}`}
                                                    >
                                                        <div className="slp-top">
                                                            <img
                                                                src={
                                                                    postinganNya.thumb
                                                                }
                                                                alt="foto siswa"
                                                            />
                                                        </div>
                                                        <div className="slp-bottom">
                                                            <div className="title-des">
                                                                <h3>
                                                                    {
                                                                        judulTampilan
                                                                    }
                                                                </h3>
                                                                <p>
                                                                    {postinganNya.deskripsiSingkat.substring(
                                                                        0,
                                                                        30
                                                                    )}
                                                                    ...
                                                                </p>
                                                                <i>
                                                                    {
                                                                        postinganNya.tanggalPosting
                                                                    }
                                                                </i>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <div className="listedb">
                                                    <div className="user-who-post">
                                                        <img
                                                            src={
                                                                postinganNya.authorPfp
                                                                    ? postinganNya.authorPfp
                                                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNyfBW5GwUReZfJs8r8lA-VhnO2-CVGfhZ_En7WP-xjjOnxXADTrAEClIF&s=10"
                                                            }
                                                            alt="foto profil"
                                                        />
                                                        <p id="username">
                                                            {!postinganNya.author
                                                                ? "unknown"
                                                                : postinganNya.author}
                                                        </p>
                                                        <p id="usertype">
                                                            admin
                                                        </p>
                                                    </div>
                                                    <div className="likesys">
                                                        <div
                                                            onClick={() =>
                                                                handleLike(
                                                                    postinganNya.id
                                                                )
                                                            }
                                                            className="likeds"
                                                        >
                                                            <button>
                                                                <span className="material-symbols-rounded">
                                                                    thumb_up
                                                                </span>
                                                            </button>
                                                            <p>
                                                                {!postinganNya.likes
                                                                    ? "0"
                                                                    : postinganNya.likes}
                                                            </p>
                                                        </div>
                                                        <div
                                                            onClick={() =>
                                                                handleUnLike(
                                                                    postinganNya.id
                                                                )
                                                            }
                                                            className="likeds"
                                                        >
                                                            <button>
                                                                <span className="material-symbols-rounded">
                                                                    thumb_down
                                                                </span>
                                                            </button>
                                                            <p>
                                                                {!postinganNya.unlikes
                                                                    ? "0"
                                                                    : postinganNya.unlikes}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/**likeError && <p style={{ color: 'red' }}>{likeError}</p>**/}
                                        </>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                <Loading />
                            </>
                        )}
                    </ul>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Postingan;
