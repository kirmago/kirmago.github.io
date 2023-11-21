import React, { useEffect, useRef } from 'react';

const YouTubePlayer = ({ videoId, autoplay, loop, blurDuration }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Atur parameter URL untuk video YouTube dengan opsi yang diinginkan
    const autoplayParam = autoplay ? '1' : '0';
    const loopParam = loop ? '1' : '0';

    // Menunggu 5 detik sebelum menghapus efek blur
    setTimeout(() => {
      if (iframeRef.current) {
        // Menghilangkan blur dengan mengganti URL iframe
        iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&controls=0&loop=${loopParam}`;
      }
    }, blurDuration * 1000);
  }, [videoId, autoplay, loop, blurDuration]);

  return (
    <div>
      {/* iframe YouTube */}
      <iframe
        ref={iframeRef}
        title="YouTube Video"
        width="1000" // Sesuaikan lebar sesuai kebutuhan
        height="4000" // Sesuaikan tinggi sesuai kebutuhan
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&loop=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;