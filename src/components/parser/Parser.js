import React from 'react';
import axios from 'axios';
import s from './Parser.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';

export const Parser = () => {
  const [links, setLinks] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [msg, setMsg] = React.useState(null);

  const { url } = useRouteMatch();

  React.useEffect(() => {
    axios
      .get('/parser')
      .then(({ data }) => {
        setLinks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (e) => {
    setMsg('Загрузка...');
    e.preventDefault();
    axios
      .post('/parser', { url: value })
      .then(({ data: { title, id } }) => {
        setMsg(null);
        setLinks([...links, { title, id }]);
        setValue('');
      })
      .catch((err) => {
        setValue('');
        console.log(err);
        setMsg('Неправильный url');
        setTimeout(() => setMsg(null), 3000);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <label>
            Введите url
            <input
              className={s.inp}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
            />
          </label>
          <button type="submit">Парсить</button>
        </form>
        {msg}
      </div>
      <div>
        <ul>
          {links.map(({ title, id }) => (
            <li key={`${title}__${id}`}>
              <Link to={`${url}/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
