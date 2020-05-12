import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Example } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Example />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
