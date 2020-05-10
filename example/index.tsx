import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Cards } from '../.';

const App = () => {
  return (
    <div>
      <Cards />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
