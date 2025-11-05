import './ContactMessages.css';

const ContactMessages = ({ messages, onDelete }) => {
  if (messages.length === 0) {
    return <div className="no-messages">No messages yet.</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="contact-messages">
      {messages.map((message) => (
        <div key={message._id} className={`message-card ${message.read ? 'read' : 'unread'}`}>
          <div className="message-header">
            <div className="message-sender">
              <h3>{message.name}</h3>
              <a href={`mailto:${message.email}`}>{message.email}</a>
            </div>
            <div className="message-meta">
              <span className="message-date">{formatDate(message.createdAt)}</span>
              {!message.read && <span className="unread-badge">New</span>}
            </div>
          </div>
          
          <div className="message-content">
            <p>{message.message}</p>
          </div>
          
          <div className="message-actions">
            <a 
              href={`mailto:${message.email}`} 
              className="btn-action btn-reply"
            >
              Reply
            </a>
            <button 
              onClick={() => onDelete(message._id)} 
              className="btn-action btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMessages;
