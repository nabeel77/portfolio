import React from 'react';

const ImageUpload = ({ onImageChange, imageUrl }) => {
  const image = imageUrl && <img src={imageUrl} alt="project-screenshot" />;
  return (
    <div className="w-4/12 my-0 mx-auto flex flex-col gap-5">
      {image}
      <input
        className="file-input w-full max-w-xs"
        type="file"
        name="myImage"
        onChange={onImageChange}
        accept="image/png, image/jpeg"
      />
    </div>
  );
};

export default ImageUpload;
