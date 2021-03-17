import React from 'react';

export const Questionnaire = () => {
  const [values, setValues] = React.useState({
    post: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  console.log(values);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Должность
          <select
            value={values.post}
            onChange={(e) => setValues({ ...values, post: e.target.value })}
          >
            <option value="">Выберете должность:</option>
            <option value="Декан">Декан</option>
            <option value="Преподаватель">Преподаватель</option>
            <option value="Дворник">Дворник</option>
          </select>
        </label>
        <div>
          <button type="submit">Отправить</button>
          <button type="reset">Очистить</button>
        </div>
      </form>
    </div>
  );
};
