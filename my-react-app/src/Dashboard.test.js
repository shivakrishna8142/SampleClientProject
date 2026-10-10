import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';

test.each([
  ['Admin', '/admin', 'Admin page'],
  ['Manager', '/manager', 'Manager page'],
  ['User', '/user', 'User page'],
])('navigates from the dashboard menu to the %s page', (label, path, page) => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path={path} element={<h1>{page}</h1>} />
      </Routes>
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByRole('link', { name: new RegExp(label) }));

  expect(screen.getByRole('heading', { name: page })).toBeInTheDocument();
});
