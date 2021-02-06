import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { Table } from '../table';
import s from './Database.module.scss';
import cn from 'classnames';
const limit = 20;

export const Database = () => {
  const [tables, setTables] = React.useState([]);
  const [currentTable, setCurrentTable] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);

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
        {tables.map(({ name, count }) => (
          <li
            className={cn({ [s.active]: name === currentTable.name })}
            onClick={() => {
              setCurrentTable({ name, count });
              setCurrentPage(1);
            }}
            key={name}
          >
            <Link to={`${url}/${name}?offset=0&limit=${limit}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <Switch>
        <Route
          exact
          path={`${path}/:name`}
          render={() => (
            <Table
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              count={currentTable.count}
            />
          )}
        />
      </Switch>
    </>
  );
};
