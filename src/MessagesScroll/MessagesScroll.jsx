import Message from "./Message";
import "./MessagesScroll.css";
export default function MessagesScroll({
  messages,
  currentProfile,
  theirProfile,
}) {
  return (
    <div className="messagesScroll">
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
