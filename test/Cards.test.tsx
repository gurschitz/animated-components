import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CardExample from '../src/cards';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CardExample />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
