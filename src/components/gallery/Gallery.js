import React from 'react';
import s from './Gallery.module.scss';
import axios from 'axios';

export const Gallery = () => {
  const [files, setFiles] = React.useState([]);

  const onSelectdFiles = (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    axios
      .post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className={s.wrapper}>
      <input onChange={onSelectdFiles} multiple type="file" />
    </div>
  );
};
