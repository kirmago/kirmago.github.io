import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./CekPostingan.scss";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import { db } from "../../../feature/config/firebase/firebase";
import Credit from "./../../components/Credits/Credit";

const CekPostingan = ({ setIsDarkMode, isDarkMode }) => {
    const [elements, setElements] = useState([]);
    const [rawJSON, setRawJSON] = useState("");
    const [error, setError] = useState(null);
    const location = useLocation();
    const pathArray = location.pathname.split("/");

    const [totalLike, setTotalLike] = useState(0);
    const [totalUnlike, setTotalUnlike] = useState("");
    const [navClick, setNavClick] = useState(false);
    const [likeError, setLikeError] = useState(null);
    const [isLikeProcessing, setIsLikeProcessing] = useState(false);
    const [unlikeError, setUnLikeError] = useState(null);
    const [isUnLikeProcessing, setIsUnLikeProcessing] = useState(false);

    const postId = pathArray.filter(Boolean).pop();

    const [loading, setLoading] = useState(false);

    const flattenData = (data) => {
        return data.flatMap((nestedArray) => {
            return nestedArray.map((item) => {
                const key = Object.keys(item)[0];
                return { type: key, value: item[key] };
            });
        });
    };

    const renderElement = (element) => {
        const { type, value } = element;

        switch (type) {
            case "judul":
                return <h1 key={value}>{value}</h1>;
            case "urlGambar":
                return (
                    <img
                        className="single-img"
                        key={value}
                        src={value}
                        alt="Gambar"
                    />
                );
            case "subjudul":
                return (
                    <h4 key={value} style={{ color: "rgba(0,0,0,0.9)" }}>
                        {value}
                    </h4>
                );
            case "paragraf":
                return (
                    <p key={value} style={{ color: "rgba(0,0,0,0.6)" }}>
                        {value}
                    </p>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Reference the document directly based on postId
                setLoading(true);
                const docRef = doc(db, "postingan", postId);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const postData = docSnapshot.data().isiPostingan;
                    const liked = docSnapshot.data().likes;
                    const unliked = docSnapshot.data().unlikes;
                    setLoading(false);
                    setTotalLike(liked);
                    setTotalUnlike(unliked);
                    setElements([postData]);
                } else {
                    setError("Document not found.");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
                setError(
                    `Failed to fetch data. Please try again later.${error}`
                );
            }
        };

        fetchData();

        // Cleanup function to unsubscribe from the listener when the component is unmounted
        return () => {};
    }, [postId]);

    useEffect(() => {
        const json = JSON.stringify(elements, null, 2);
        setRawJSON(json);
    }, [setRawJSON, elements]);

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

                // Menyimpan ID postingan yang disukai ke localStorage
                likedPosts.push(postId);
                setTotalLike((prev) => prev + 1);

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
                    {error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <>
                            {loading ? (
                                <Loading />
                            ) : (
                                <>
                                    <div className="cek-postingan-container">
                                        {flattenData(elements).map(
                                            (element, index) => (
                                                <div
                                                    key={index}
                                                    className="rendered-cek-postingan"
                                                >
                                                    {renderElement(element)}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div className="marginable">
                                        <div className="likesys">
                                            <div
                                                onClick={() =>
                                                    handleLike(postId)
                                                }
                                                className="likeds"
                                            >
                                                <button>
                                                    <span className="material-symbols-rounded">
                                                        thumb_up
                                                    </span>
                                                </button>
                                                <p>
                                                    {!totalLike ? 0 : totalLike}
                                                </p>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleUnLike(postId)
                                                }
                                                className="likeds"
                                            >
                                                <button>
                                                    <span className="material-symbols-rounded">
                                                        thumb_down
                                                    </span>
                                                </button>
                                                <p>
                                                    {!totalUnlike
                                                        ? "0"
                                                        : totalUnlike}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            ) : (
                ""
            )}
            <Credit />
        </>
    );
};

export default CekPostingan;
