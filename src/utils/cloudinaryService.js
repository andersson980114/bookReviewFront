import { useEffect, useRef, useState } from "react";
import {Cloudinary} from "@cloudinary/url-gen";
//import env from 'react-dotenv';
import axios from "axios";
          
 
const cloudinaryService = {
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
};
   

export default cloudinaryService;
