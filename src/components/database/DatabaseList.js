import React from 'react';
import axios from 'axios';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Database } from './Database';

export const DatabaseList = () => {
  const [databases, setDatabases] = React.useState([]);
  const { path, url } = useRouteMatch();

  React.useEffect(() => {
    axios
      .get('/database')
      .then(({ data }) => setDatabases(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {databases.map(({ name, count }) => (
        <Link style={{ marginLeft: '10px' }} key={name} to={`${url}/${name}`}>
          {`${name}(${count})`}
        </Link>
      ))}
      <Switch>
        <Route path={`${path}/:databaseName`} component={Database} />
      </Switch>
    </div>
  );
};
