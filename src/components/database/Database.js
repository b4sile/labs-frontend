import React from 'react';
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import { Table } from '../table';
import s from './Database.module.scss';
import cn from 'classnames';
const limit = 20;

export const Database = () => {
  const [tables, setTables] = React.useState([]);
  const [currentTable, setCurrentTable] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);

  const { databaseName } = useParams();
  const { path, url } = useRouteMatch();

  React.useEffect(() => {
    axios
      .get(`/database/${databaseName}`)
      .then(({ data }) => setTables(data))
      .catch((err) => console.log(err));
  }, [databaseName]);

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
            <Link
              to={`${url}/${name}?offset=0&limit=${limit}`}
            >{`${name}(${count})`}</Link>
          </li>
        ))}
      </ul>
      <Switch>
        <Route
          exact
          path={`${path}/:tableName`}
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
