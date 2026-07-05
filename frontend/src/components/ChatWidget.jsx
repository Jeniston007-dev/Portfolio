export default function ChatWidget({ chatOpen, messages, draft, loading, setDraft, onToggle, onSubmit }) {
  return (
    <>
      <button className="chat-toggle" onClick={onToggle}>
        {chatOpen ? 'Close AI' : 'Open AI'}
      </button>

      {chatOpen && (
        <aside className="chat-widget">
          <div className="chat-header">
            <strong>AI Assistant</strong>
            <span>terminal</span>
          </div>
          <div className="chat-body">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`bubble ${message.role}`}>
                {message.text}
              </div>
            ))}
            {loading && <div className="bubble bot">Thinking...</div>}
          </div>
          <form className="chat-form" onSubmit={onSubmit}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about my services..."
            />
            <button type="submit">Send</button>
          </form>
        </aside>
      )}
    </>
  );
}
