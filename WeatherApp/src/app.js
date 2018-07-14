import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
  // Switch
} from 'react-router-dom';

import './scss/style.scss';
import Home from './components/Home';

class App extends React.Component {
  render(){
    return (
      <Router>
        <main>
          <Route path="/" component={Home} />
        </main>
      </Router>
    );

  }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
