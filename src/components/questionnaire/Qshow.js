import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Qshow = () => {
  const [questionnaire, setQuestionnaire] = React.useState(null);

  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/questionnaire/${id}`)
        .then(({ data }) => {
          setQuestionnaire(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const {
    post,
    fullname,
    birthday,
    education,
    gender,
    personal,
    salary,
    languages,
    file,
  } = questionnaire || {};

  return (
    <div>
      <div>Звание: {post}</div>
      <div>ФИО: {fullname}</div>
      <div>Дата рождения: {birthday}</div>
      <div>Образование: {education}</div>
      <div>Пол: {gender}</div>
      <div>Личная информация: {personal}</div>
      <div>Зарплата: {salary}</div>
      <div>Языки: {languages}</div>
      <a href={`/tmp/${file}`} download={file}>
        Резюме
      </a>
    </div>
  );
};
