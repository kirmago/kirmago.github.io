import React, { useEffect, useRef, useState } from 'react';

const AudioPlayer = ({ playlist }) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  // Tambahkan state untuk mengontrol apakah audio telah dimulai
  const [isAudioStarted, setIsAudioStarted] = useState(false);

  // Gunakan useEffect untuk memainkan audio saat isAudioStarted berubah
  useEffect(() => {
    if (isAudioStarted) {
      audioRef.current.play();
    }
  }, [isAudioStarted]);

  const onEnded = () => {
    // Mengganti lagu setelah satu lagu selesai
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
    // Set isAudioStarted menjadi true setelah user sudah berinteraksi
    setIsAudioStarted(true);
  };

  // Gunakan onClick pada button untuk memulai audio
  const handlePlay = () => {
    setIsAudioStarted(true);
  };

  return (
    <div>
      {/* Tambahkan tombol untuk memulai audio */}
      <p style={{ marginTop: "1vh", textAlign: "center"}} >Gabut? Dengerin musik yang disediakan admin</p>
      <button onClick={handlePlay} style={{ background: "unset", border: "1.5px solid #000", borderRadius: "20px", padding: "20px 20vw", margin: "10px 0px" }} >Play</button>
      {/* Tambahkan kontrol audio dengan style display: none */}
      <audio ref={audioRef} controls={false} style={{ display: 'none' }} onEnded={onEnded}>
        <source src={playlist[currentTrack]} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default AudioPlayer;