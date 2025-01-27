import Message from "./Message";
import "./MessagesScroll.css";
export default function MessagesScroll({
  messages,
  currentProfile,
  theirProfile,
  id,
}) {
  return (
    <div className="messagesScroll" id={id}>
      {messages &&
        messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg}
            currentProfile={currentProfile}
            theirProfile={theirProfile}
          ></Message>
        ))}
    </div>
  );
}
