import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from '../../src/store'
import Filter from '../../src/containers/filter';

test('renders filter input component', () => {
  const { getByPlaceholderText } = render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Filter/>
        </ConnectedRouter>
    </Provider>);
  const inputElement = getByPlaceholderText(/Type to filter/i);
  expect(inputElement).toBeTruthy();
});