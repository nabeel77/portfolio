import React from 'react';

const ImageUpload = ({ onImageChange, imageUrls }) => {
  const images =
    imageUrls &&
    imageUrls.length &&
    imageUrls.map((img, index) => {
      return (
        <div className="w-32 h-32 bg-red-600 rounded bg-base-100" key={index}>
          <img
            src={URL.createObjectURL(img)}
            alt="Project-image"
            className="w-full h-full"
          />
        </div>
      );
    });

  return (
    <div>
      <div className="w-full flex flex-wrap justify-center items-center w-full gap-5">
        {images}
      </div>
      <div className="w-4/12 my-0 mx-auto flex flex-col gap-5">
        <input
          className="file-input w-full max-w-xs"
          type="file"
          name="myImage"
          onChange={onImageChange}
          accept="image/png"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
