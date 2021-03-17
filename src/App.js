import React from 'react';
import s from './App.module.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import {
  Gallery,
  Parser,
  DatabaseList,
  Product,
  Questionnaire,
} from './components';

const navList = [
  { to: '/', text: 'Главная' },
  { to: '/gallery', text: 'Галерея' },
  { to: '/parser', text: 'Парсер' },
  { to: '/databases', text: 'База данных' },
  { to: '/questionnaire', text: 'Анкета' },
];

function App() {
  return (
    <Router>
      <div className={s.wrapper}>
        <nav className={s.nav}>
          <ul className={s.list}>
            {navList.map(({ to, text }) => (
              <li key={to}>
                <NavLink exact activeStyle={{ color: 'blue' }} to={to}>
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.lab}>
          <Switch>
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/parser" component={Parser} />
            <Route exact path="/questionnaire" component={Questionnaire} />
            <Route path="/parser/:id" component={Product} />
            <Route path="/databases" component={DatabaseList} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
