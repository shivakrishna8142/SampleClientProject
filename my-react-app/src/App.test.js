import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';

jest.mock('axios');

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

function renderForm() {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<p>Admin destination</p>} />
        <Route path="/manager" element={<p>Manager destination</p>} />
        <Route path="/user" element={<p>User destination</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

test.each([
  ['admin', 'Admin destination'],
  ['manager', 'Manager destination'],
  ['user', 'User destination'],
])('routes an authenticated %s to the matching page', async (role, destination) => {
  axios.post.mockResolvedValue({
    data: { isAuthenticated: true, role, token: 'session-token' },
  });
  renderForm();

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'sam' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'secret' },
  });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  expect(await screen.findByText(destination)).toBeInTheDocument();
  expect(axios.post).toHaveBeenCalledWith('/login', {
    username: 'sam',
    password: 'secret',
  });
  expect(localStorage.getItem('token')).toBe('session-token');
});

test('verifies the saved token with the Bearer authorization header', async () => {
  axios.post.mockResolvedValue({
    data: { isAuthenticated: true, token: 'session-token' },
  });
  axios.get.mockResolvedValue({ data: { isAuthenticated: true } });
  renderForm();

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'sam' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'secret' },
  });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith('/auth', {
      headers: { Authorization: 'Bearer session-token' },
    });
  });
});

test('shows an invalid message and does not store a token when login is rejected', async () => {
  axios.post.mockResolvedValue({
    data: { isAuthenticated: false, token: 'unused-token' },
  });
  renderForm();

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'sam' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'wrong' },
  });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  expect(await screen.findByText('Invalid username or password.')).toBeInTheDocument();
  expect(localStorage.getItem('token')).toBeNull();
});
