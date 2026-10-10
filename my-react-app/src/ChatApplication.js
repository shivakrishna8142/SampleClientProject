import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const chatApiUrl = `${process.env.REACT_APP_API_BASE_URL || ''}/api/chat`;

function ChatApplication() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    const message = draft.trim();
    if (!message || isSending) {
      return;
    }

    setError('');
    setIsSending(true);
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `user-${Date.now()}`, role: 'user', content: message },
    ]);
    try {
      const response = await axios.post(chatApiUrl, { message });
      const reply = response.data?.reply;
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: `response-${Date.now()}`, role: 'assistant', content: reply },
      ]);
      setDraft('');
    } catch (error) {
      setError(error.response?.data?.details?.message || 'Unable to send your message.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="App">
      <section className="chat-panel" aria-labelledby="chat-title">
        <header className="chat-header">
          <div>
            <p className="eyebrow">CONVERSATION</p>
            <h1 id="chat-title">Chat</h1>
          </div>
          <Link className="back-link" to="/dashboard">Dashboard</Link>
        </header>

        <div className="chat-messages" aria-live="polite" aria-label="Chat messages">
          {messages.length === 0 && !isSending && (
            <p className="chat-status">No messages yet. Start a conversation.</p>
          )}
          {messages.map((message) => (
            <article className={`chat-message chat-message-${message.role}`} key={message.id}>
              <p>{message.content}</p>
            </article>
          ))}
          {isSending && (
            <article className="chat-message chat-message-assistant" role="status">
              <p>Waiting for response...</p>
            </article>
          )}
        </div>

        {error && <p className="chat-error" role="alert">{error}</p>}
        <form
          className="chat-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <label className="visually-hidden" htmlFor="chat-message">Your message</label>
          <input
            id="chat-message"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write a message..."
            disabled={isSending}
          />
          <button type="submit" disabled={isSending || !draft.trim()}>
            Send
          </button>
        </form>
      </section>
    </main>
  );
}

export default ChatApplication;
