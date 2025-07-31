import React, { useRef } from 'react';
import './fileUpload.css';
import { IoMdCloudUpload } from 'react-icons/io';
import { MdOutlineCancel } from "react-icons/md";

const MAX_IMAGES = 6;

const FileUpload = ({ files, setFiles }) => {
  const fileRef = useRef();

  const fileClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const fileChange = (event) => {
    const newFiles = Array.from(event.target.files);

   
    if (files.length + newFiles.length > MAX_IMAGES) {
      alert(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  return (
    <div className="file_upload_main">
      <div onClick={fileClick} className="file_upload_section">
        <input
          ref={fileRef}
          type="file"
          onChange={fileChange}
          accept="image/png,image/jpeg,image/jpg"
          multiple
          style={{ display: 'none' }}
        />
        <IoMdCloudUpload size={50} />
        <span>Upload Images</span>
      </div>

      <div className="file_previews">
        {files.map((item, index) => {
          const previewUrl = item instanceof File ? URL.createObjectURL(item) : "";
          return (
            <div key={index} className="single_preview">
              <span className="single_image_remove" onClick={() => removeImage(index)}>
                <MdOutlineCancel />
              </span>
              {previewUrl ? (
                <img src={previewUrl} alt={`Preview ${index}`} />
              ) : (
                <p style={{ color: "red" }}>Invalid file</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileUpload;


