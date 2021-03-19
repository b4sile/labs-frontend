import React from 'react';
import axios from 'axios';

export const Excel = () => {
  const fileInput = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (fileInput.current && fileInput.current.files[0]) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', fileInput.current.files[0]);
      axios
        .post('/excel', formData)
        .then(({ data }) => {
          console.log(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={fileInput} type="file" />
        <button type="submit">Отправить</button>
      </form>
      {isLoading ? 'Обработка...' : ''}
    </div>
  );
};
