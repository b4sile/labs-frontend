import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

export const Table = () => {
  const [data, setData] = React.useState([]);
  const { path, url } = useRouteMatch();
  const { name: databaseName } = useParams();

  React.useEffect(() => {
    axios
      .get(`/database/${databaseName}`)
      .then(({ data }) => setData(data.data))
      .catch((err) => console.log(err));
  }, [databaseName]);

  return (
    <table>
      {data.map((item) => (
        <div>{JSON.stringify(item)}</div>
      ))}
    </table>
  );
};
