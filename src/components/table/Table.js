import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import { Link, useRouteMatch } from 'react-router-dom';
import { getPager } from '../../utils';
import s from './Table.module.scss';
import cn from 'classnames';

const limit = 20;

export const Table = ({ count, currentPage, setCurrentPage }) => {
  const [data, setData] = React.useState([]);
  const { name: databaseName } = useParams();
  const { url } = useRouteMatch();
  const { pages, totalPages } = getPager(count, currentPage, limit);

  const { search } = useLocation();

  React.useEffect(() => {
    const parsed = queryString.parse(search);
    axios
      .get(
        `/database/${databaseName}?offset=${parsed.offset}&limit=${parsed.limit}`
      )
      .then(({ data }) => setData(data.data))
      .catch((err) => console.log(err));
  }, [databaseName, search]);

  return (
    <>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((obj, ind) => (
              <tr key={`${obj.id}__${ind}`}>
                {Object.values(obj).map((value, ind) => (
                  <td key={`${value}__${ind}`}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ul className={s.list}>
        <li>
          <Link
            onClick={() => setCurrentPage(1)}
            to={`${url}?offset=0&limit=${limit}`}
          >
            {'first'}
          </Link>
        </li>
        {pages.map((page) => (
          <li className={cn({ [s.active]: currentPage === page })} key={page}>
            <Link
              onClick={() => setCurrentPage(page)}
              to={`${url}?offset=${(page - 1) * limit}&limit=${limit}`}
            >
              {page}
            </Link>
          </li>
        ))}
        {totalPages !== undefined && (
          <li>
            <Link
              onClick={() => setCurrentPage(totalPages)}
              to={`${url}?offset=${totalPages * limit - limit}&limit=${limit}`}
            >
              {'last'}
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};
