import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Example from '../src/videotape';

const App = () => {
  return (
    <div className="h-full">
      <Example />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
