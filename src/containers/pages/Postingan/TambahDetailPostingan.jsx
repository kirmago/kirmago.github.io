/* eslint-disable */

import React, { useState, useEffect } from "react";
import "./TambahDetailPostingan.scss";
import axios from "axios";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../feature/config/firebase/firebase";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const TambahDetailPostingan = ({
    sjudul,
    setIsDarkMode,
    isDarkMode,
    outputElements,
    setOutputElements,
    setHiddenUi,
    hiddenUi,
}) => {
    const [elements, setElements] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [elementType, setElementType] = useState("");
    const [isPreviewVisible, setIsPreviewVisible] = useState(true);
    const [rawJSON, setRawJSON] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [postId, setPostId] = useState("");

    const [tambahSubJudul, setTambahSubJudul] = useState(false);
    const [tambahGambar, setTambahGambar] = useState(false);
    const [tambahParagraf, setTambahParagraf] = useState(false);
    const [tambahMultImage, setTambahMultImage] = useState(false);

    const [isVisibleSuju, setIsVisibleSuju] = useState(true);
    const [isVisibleGam, setIsVisibleGam] = useState(true);
    const [isVisiblePara, setIsVisiblePara] = useState(true);
    const [isVisibleMulimg, setIsVisibleMulimg] = useState(true);
    const [hidex, setHidex] = useState(false);

    const setSubjudul = () => {
        setTambahSubJudul(true);
        setIsVisibleGam(false);
        setIsVisibleSuju(true);
        setIsVisiblePara(false);
        setIsVisibleMulimg(false);
    };

    const batal = () => {
        setIsVisibleGam(true);
        setIsVisibleSuju(true);
        setIsVisiblePara(true);
        setIsVisibleMulimg(true);
        setTambahSubJudul(false);
        setTambahGambar(false);
        setTambahParagraf(false);
    };

    const setGambar = () => {
        setTambahGambar(true);
        setIsVisibleGam(true);
        setIsVisibleSuju(false);
        setIsVisiblePara(false);
        setIsVisibleMulimg(false);
    };

    const setParagraf = () => {
        setTambahParagraf(true);
        setIsVisibleGam(false);
        setIsVisibleSuju(false);
        setIsVisiblePara(true);
        setIsVisibleMulimg(false);
    };

    const setMultimage = () => {
        setTambahMultImage(true);
        setIsVisibleGam(false);
        setIsVisibleSuju(false);
        setIsVisiblePara(false);
        setIsVisibleMulimg(true);
    };

    const randomId = () => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 4; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        return result;
    };

    const [nambahHeight, setNambahHeight] = useState(5);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            if (nambahHeight < 25) {
                setNambahHeight((prevHeight) => prevHeight + 5);
            }
        }
    };

    useEffect(() => {
        const json = JSON.stringify(outputElements, null, 2);
        setRawJSON(json);
    }, [setRawJSON, outputElements]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const inputgambs = (url) => {
        const newElement = {};
        newElement["urlGambar"] = url;
        setElements([...elements, newElement]);
        setOutputElements([...outputElements, newElement]);
        setTambahSubJudul(false);
        setTambahGambar(false);
        setTambahParagraf(false);
        setIsVisibleSuju(true);
        setIsVisibleGam(true);
        setIsVisiblePara(true);
        setIsVisibleMulimg(true);
    };

    const handleElementTypeChange = (type) => {
        setElementType(type);
        if (inputValue.trim() !== "") {
            setTambahSubJudul(false);
            setTambahGambar(false);
            setTambahParagraf(false);
            setTambahMultImage(false);
            setIsVisibleSuju(true);
            setIsVisibleGam(true);
            setIsVisiblePara(true);
            setIsVisibleMulimg(true);
            setHidex(false);
            const newElement = {};
            newElement[type] = inputValue;
            setElements([...elements, newElement]);
            setOutputElements([...outputElements, newElement]);
            setInputValue("");
        } else {
            alert("Nilai tidak boleh kosong!");
        }
    };

    const togglePreview = () => {
        setIsPreviewVisible(!isPreviewVisible);
    };

    const renderElement = (outputElements) => {
        const elementType = Object.keys(outputElements)[0];
        const value = outputElements[elementType];

        switch (elementType) {
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
                return <h4 key={value}>{value}</h4>;
            case "paragraf":
                return <p key={value}>{value}</p>;
            default:
                /*if (elementType.startsWith("multipleImage")) {
        const isValidUrl = value && typeof value === 'string' && value.trim() !== '';
        return isValidUrl ? (
          <div className="multiple-img-wrapper" key={`multiple-wrapper-${value}`}>
            <img className="multiple-img" key={value} src={value} alt={`Multiple Image ${value}`} />
          </div>
        ) : null;
      }*/
                return null;
        }
    };

    const handleAddImage = async (e) => {
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
            inputgambs(response.data.data.url);
            setError(null);
        } catch (error) {
            console.error("Error uploading image: ", error);
            setError("Gagal mengunggah gambar. Coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    };

    /*const handleMultipleImage = async (event) => {
  const selectedFiles = event.target.files;
  const newImages = [];
  
 
  if (selectedFiles && selectedFiles.length > 0) {
    for (let i = 0; i < Math.min(selectedFiles.length, 7); i++) {
      const formData = new FormData();
      formData.append('image', selectedFiles[i]);

      const settings = {
        // Pengaturan pengunggahan ImgBB
        url: 'https://api.imgbb.com/1/upload?key=9c86085ef480b65e3be0a5b80822bb7a',
        method: 'POST',
        timeout: 0,
        processData: false,
        mimeType: 'multipart/form-data',
        contentType: false,
        data: formData,
        onUploadProgress: (progressEvent) => {
          // Menghitung dan menetapkan persentase progres pengunggahan
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      };

      try {
        const response = await axios(settings);

        if (response.data && response.data.data && response.data.data.url) {
          newImages.push(response.data.data.url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    const updatedElement = {};
    for (let i = 0; i < newImages.length; i++) {
      updatedElement[`multipleImage${i + 1}`] = newImages[i];
    }

    // Fill in remaining properties with empty strings if less than 7 images are uploaded
    for (let i = newImages.length + 1; i <= 7; i++) {
      updatedElement[`multipleImage${i}`] = "";
    }
    


    setElements([...elements, updatedElement]);
    setTambahMultImage(false)
    setIsVisibleSuju(true)
    setIsVisibleGam(true)
    setIsVisiblePara(true)
    setIsVisibleMulimg(true)
    event.target.files = null
  }
};
*/

    useEffect(() => {
        if (hidex) {
            handleElementTypeChange("judul");
        }
    }, [hidex]);

    const samakanJudul = async () => {
        setHidex(true);
        setInputValue(sjudul);
        handleInputChange({ target: { value: sjudul } });
        if (inputValue) {
            handleElementTypeChange("judul");
        }
    };

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
            ],
        });
        driverObj.drive();
    }, []);

    return (
        <>
            <div
                className="overgas"
                style={{ marginTop: `${hiddenUi ? "5vh" : "0px"}` }}
            >
                <div className="input-field">
                    <p>{error}</p>

                    {isPreviewVisible && (
                        <div className="preview">
                            {elements.map((element, index) => (
                                <div key={index} className="preview-wrapper">
                                    {Object.keys(element).map((key) =>
                                        key.startsWith("multipleImage") ? (
                                            <div
                                                key={key}
                                                className="multiple-wrapper"
                                            >
                                                {renderElement({
                                                    [key]: element[key],
                                                })}
                                            </div>
                                        ) : (
                                            <div key={key}>
                                                {renderElement({
                                                    [key]: element[key],
                                                })}
                                            </div>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {elements.length === 0 ? (
                        <>
                            <input
                                className="set-judul"
                                type="text"
                                placeholder="Judul isi postingan"
                                value={inputValue}
                                onChange={handleInputChange}
                                required
                            />
                            {!hidex ? (
                                <>
                                    {!inputValue ? (
                                        <button
                                            id="hsx"
                                            onClick={() => samakanJudul()}
                                        >
                                            samakan dengan judul utama
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </>
                            ) : (
                                ""
                            )}
                        </>
                    ) : (
                        <>
                            {/** depcreated tambahMultImage && (
        <input type="file" accept="image/*" onChange={handleMultipleImage} multiple />
        )**/}

                            {tambahSubJudul && (
                                <input
                                    className="subjud"
                                    type="text"
                                    placeholder="Masukkan sub judul"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    required
                                />
                            )}

                            {loading && <p>Uploading... {uploadProgress}%</p>}
                            {tambahGambar && (
                                <>
                                    <input
                                        className="ols"
                                        type="file"
                                        id="file-input"
                                        onChange={handleAddImage}
                                        name="file-input"
                                    />
                                    <label
                                        className="addMage"
                                        id="file-input-label"
                                        for="file-input"
                                    >
                                        <span className="material-symbols-rounded">
                                            upload_file
                                        </span>
                                    </label>
                                </>
                            )}

                            {tambahParagraf && (
                                <textarea
                                    style={{
                                        height: `${nambahHeight}vh`,
                                    }}
                                    onKeyPress={handleKeyPress}
                                    className="paragrafs"
                                    type="text"
                                    placeholder="Masukkan paragraf"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    required
                                />
                            )}
                        </>
                    )}
                </div>
                <div className="toggle-preview-button">
                    <button onClick={togglePreview}>
                        {isPreviewVisible
                            ? "Sembunyikan Preview"
                            : "Tampilkan Preview"}
                    </button>
                </div>
            </div>
            <div className="element-type-buttons">
                <div className="hideui">
                    <button onClick={() => setHiddenUi((e) => !e)}>
                        <span
                            className="material-symbols-rounded"
                            style={{
                                transform: `${
                                    hiddenUi ? "rotate(180deg)" : "rotate(0deg)"
                                }`,
                                transition: "transform .5 ease-in-out",
                            }}
                        >
                            straight
                        </span>
                    </button>
                </div>

                <div className="another-buttons">
                    {elements.length > 0 ? (
                        <>
                            {isVisibleSuju ? (
                                <>
                                    {!tambahSubJudul && (
                                        <button onClick={() => setSubjudul()}>
                                            <span className="material-symbols-rounded">
                                                title
                                            </span>
                                        </button>
                                    )}
                                </>
                            ) : (
                                ""
                            )}

                            {tambahSubJudul && (
                                <button
                                    onClick={() =>
                                        handleElementTypeChange("subjudul")
                                    }
                                >
                                    <span className="material-symbols-rounded">
                                        done
                                    </span>
                                </button>
                            )}

                            {isVisibleGam ? (
                                <>
                                    {!tambahGambar && (
                                        <button onClick={() => setGambar()}>
                                            <span className="material-symbols-rounded">
                                                add_photo_alternate
                                            </span>
                                        </button>
                                    )}
                                </>
                            ) : (
                                ""
                            )}

                            {/***isVisibleMulimg ? (
        <>
        {!tambahMultImage && (
          <button onClick={() => setMultimage()}>tambahkan multi gambar</button>
        )}
        </>
        ) : ""****/}

                            {isVisiblePara ? (
                                <>
                                    {!tambahParagraf && (
                                        <button onClick={() => setParagraf()}>
                                            <span className="material-symbols-rounded">
                                                match_case
                                            </span>
                                        </button>
                                    )}
                                </>
                            ) : (
                                ""
                            )}

                            {tambahParagraf && (
                                <button
                                    onClick={() =>
                                        handleElementTypeChange("paragraf")
                                    }
                                >
                                    <span className="material-symbols-rounded">
                                        done
                                    </span>
                                </button>
                            )}

                            {!isVisiblePara ||
                            !isVisibleGam ||
                            !isVisibleSuju ? (
                                <button id="hsx" onClick={() => batal()}>
                                    <span className="material-symbols-rounded">
                                        close
                                    </span>
                                </button>
                            ) : (
                                ""
                            )}
                        </>
                    ) : (
                        <>
                            {!tambahSubJudul ||
                            !tambahGambar ||
                            !tambahParagraf ? (
                                <button
                                    id="hsx"
                                    onClick={() =>
                                        handleElementTypeChange("judul")
                                    }
                                >
                                    <span className="material-symbols-rounded">
                                        done
                                    </span>
                                </button>
                            ) : (
                                ""
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default TambahDetailPostingan;
