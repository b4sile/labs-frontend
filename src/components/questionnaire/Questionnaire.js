import React from 'react';
import s from './Questionnaire.module.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Questionnaire = () => {
  const fileInput = React.useRef();
  const formRef = React.useRef();
  const [questionnaires, setQuestionnaires] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/questionnaire`)
      .then(({ data }) => {
        console.log(data);
        setQuestionnaires(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    if (fileInput.current && fileInput.current.files[0]) {
      formData.append('file', fileInput.current.files[0]);
    }
    axios
      .post(`/questionnaire`, formData)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form ref={formRef} className={s.form} onSubmit={onSubmit}>
        <div>
          <label>
            Должность
            <select name="post">
              <option value=""></option>
              <option value="Декан">Техник</option>
              <option value="Преподаватель">Инженер</option>
              <option value="Дворник">Дворник</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            ФИО:
            <input name="name" type="text" />
          </label>
        </div>
        <div>
          <label>
            Дата Рождения:
            <input name="birthday" type="text" />
          </label>
        </div>
        <div>
          <label>
            Уровень образования:
            <select name="education">
              <option value=""></option>
              <option value="Среднее общее">Среднее общее</option>
              <option value="среднее профессиональное">
                Среднее профессиональное
              </option>
              <option value="высшее образование">Высшее образование</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Языки программирования:
            <br />
            <input name="languages" type="checkbox" value="C++" />
            C++
          </label>
          <label>
            <input name="languages" type="checkbox" value="JS" />
            JS
          </label>
          <label>
            <input name="languages" type="checkbox" value="PHP" />
            PHP
          </label>
          <label>
            <input name="languages" type="checkbox" value="Python" />
            Python
          </label>
        </div>
        <label>
          Пол: <br />
          <label>
            <input name="gender" type="radio" value="Мужской" />М
          </label>
          <label>
            <input name="gender" type="radio" value="Женский" />Ж
          </label>
          <label>
            <input name="gender" type="radio" value="Другое" />
            Другое
          </label>
        </label>
        <label>
          О себе:<textarea name="personal" cols="32" rows="7"></textarea>
        </label>
        <label>
          Желаемая ЗП:
          <br />
          <input name="salary" type="text" />
        </label>
        <div>
          <label>
            Резюме:
            <input ref={fileInput} type="file" />
          </label>
        </div>
        <div>
          <button type="submit">Отправить</button>
          <button type="reset">Очистить</button>
        </div>
      </form>
      {questionnaires.map(({ id }) => (
        <Link key={id} to={`/questionnaire/${id}`}>
          {id}
        </Link>
      ))}
    </div>
  );
};
