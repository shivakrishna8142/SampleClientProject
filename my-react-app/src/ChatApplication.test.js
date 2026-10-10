import { act, fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import ChatApplication from './ChatApplication';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => require('react').createElement('a', { href: to }, children),
}));

beforeEach(() => {
  axios.post.mockReset();
});

test('shows a pending assistant status without replacing earlier messages', async () => {
  axios.post.mockResolvedValueOnce({ data: { reply: 'First reply' } });

  render(<ChatApplication />);

  const input = screen.getByRole('textbox', { name: 'Your message' });
  const sendButton = screen.getByRole('button', { name: 'Send' });

  expect(sendButton).toBeDisabled();
  fireEvent.change(input, { target: { value: 'First message' } });
  expect(sendButton).toBeEnabled();
  fireEvent.click(sendButton);
  expect(await screen.findByText('First reply')).toBeInTheDocument();
  expect(sendButton).toBeDisabled();

  let resolveRequest;
  axios.post.mockReturnValueOnce(new Promise((resolve) => {
    resolveRequest = resolve;
  }));

  fireEvent.change(input, { target: { value: 'Second message' } });
  fireEvent.click(sendButton);

  expect(screen.getByText('First reply')).toBeInTheDocument();
  expect(screen.getByText('Second message')).toBeInTheDocument();
  expect(screen.getAllByRole('status')).toHaveLength(1);
  expect(screen.getByRole('status')).toHaveTextContent('Waiting for response...');

  await act(async () => {
    resolveRequest({ data: { reply: 'Second reply' } });
  });

  expect(await screen.findByText('Second reply')).toBeInTheDocument();
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});
