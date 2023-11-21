import axios from "axios"

const uploadImage = async (imageData) => {
  try {
    const response = await axios.post('https://api.imgbb.com/1/upload', {
      key: 'dcb532b724f80bebfc6aa6ad24cb7d74', // Ganti dengan kunci API ImgBB Anda
      image: imageData,
    });
    return response.data.data.url;
  } catch (error) {
    console.error('Error uploading image: ', error);
    return null;
  }
};

export default uploadImage;