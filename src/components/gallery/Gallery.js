import React from 'react';
import s from './Gallery.module.scss';
import axios from 'axios';
import { ReactComponent as CloseSvg } from '../../assets/close.svg';

export const Gallery = () => {
  const [files, setFiles] = React.useState([]);
  const [isVisiblePopup, setIsVisiblePopup] = React.useState(false);
  const [popupImage, setPopupImage] = React.useState(null);
  const [isChangingDesription, setIsChangingDesription] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const poputElem = React.useRef();

  React.useEffect(() => {
    axios
      .get('/gallery')
      .then(({ data }) => {
        setFiles(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onOpenModal = (file) => {
    setPopupImage(file);
    setIsVisiblePopup(true);
    document.body.style.overflow = 'hidden';
  };

  const onCloseModal = (e) => {
    if (e.target === poputElem.current) {
      setPopupImage(null);
      setIsVisiblePopup(false);
      setIsChangingDesription(false);
      setDescription('');
      document.body.style.overflow = 'unset';
    }
  };

  const onChangeDescription = (e) => {
    e.preventDefault();
    if (description === '') return;
    axios
      .patch(`/gallery/${popupImage.id}`, { description })
      .then(() => {
        setFiles(
          files.map((file) => {
            if (file.id === popupImage.id) {
              file.description = description;
              return file;
            }
            return file;
          })
        );
        setIsChangingDesription(false);
      })
      .catch((err) => console.log(err));
  };

  const onDeleteImage = (id) => {
    axios
      .delete(`/gallery/${id}`)
      .then(() => {
        setFiles(files.filter((file) => file.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const onSelectdFiles = (e) => {
    const filesImages = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < filesImages.length; i++) {
      formData.append('images', filesImages[i]);
    }
    axios
      .post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data: { images } }) => {
        setFiles([...files, ...images]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={s.wrapper}>
      <ul className={s.images}>
        {files.map((file) => (
          <li key={file.id}>
            <img
              onClick={() => onOpenModal(file)}
              src={file.thumb_url}
              alt={`${file.filename}`}
            />
            <div onClick={() => onDeleteImage(file.id)} className={s.delete}>
              <CloseSvg />
            </div>
          </li>
        ))}
      </ul>
      <label className={s.chose}>
        {' '}
        Выберете фотографии для загрузки
        <input
          style={{ display: 'none' }}
          onChange={onSelectdFiles}
          multiple
          type="file"
        />
      </label>
      {isVisiblePopup && (
        <div onClick={onCloseModal} ref={poputElem} className={s.modal}>
          <div className={s.content}>
            <div>
              <img src={popupImage.url} alt={popupImage.url} />
              <div className={s.desc}>{popupImage.description}</div>
            </div>
            <div className={s.add}>
              {!isChangingDesription ? (
                <button onClick={() => setIsChangingDesription(true)}>
                  Изменить описание
                </button>
              ) : (
                <div className={s.change}>
                  <form onSubmit={onChangeDescription}>
                    <textarea
                      value={description}
                      cols="25"
                      rows="5"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <br />
                    <button type="submit">Изменить</button>
                    <button
                      onClick={() => {
                        setIsChangingDesription(false);
                        setDescription('');
                      }}
                    >
                      отмена
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
