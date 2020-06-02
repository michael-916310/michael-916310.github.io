import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import 'normalize.css';
import './App.scss'

import {SearchPage} from './Pages/SearchPage/SearchPage'
import {FilmPage} from './Pages/FilmPage/FilmPage'
import {FavoritesPage} from './Pages/FavoritesPage/FavoritesPage'

function App() {
  return (
    <div className='application-container'>
      <Router>
        <Switch>

          <Route path='/search/:filmName' component={SearchPage}/>
          <Route path='/film/:filmName' component={FilmPage}/>
          <Route path='/favorites' component ={FavoritesPage}/>

          <Route path='/' component={SearchPage}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
