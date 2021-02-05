import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { Table } from '../table';
import s from './Database.module.scss';
import cn from 'classnames';

export const Database = () => {
  const [tables, setTables] = React.useState([]);
  const [currentTable, setCurrentTable] = React.useState(null);

  const { path, url } = useRouteMatch();

  React.useEffect(() => {
    axios
      .get('/database')
      .then(({ data }) => setTables(data.tables))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ul className={s.list}>
        {tables.map((name) => (
          <li
            className={cn({ [s.active]: name === currentTable })}
            onClick={() => setCurrentTable(name)}
            key={name}
          >
            <Link to={`${url}/${name}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <Switch>
        <Route exact path={`${path}/:name`} component={Table} />
      </Switch>
    </>
  );
};
