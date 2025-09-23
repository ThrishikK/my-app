import React, { useState } from "react";
import initialComments from "./comments";
import "./App.css";

function addReplyAtPath(comments, path, newReply) {
  if (path.length === 0) {
    // add at root level
    return [...comments, newReply];
  }

  // deep clone-ish update using recursion
  const [idx, ...rest] = path.map((p) => Number(p));
  return comments.map((c, i) => {
    if (i !== idx) return c;
    // we found the branch to update
    return {
      ...c,
      replies: addReplyAtPath(c.replies || [], rest, newReply),
    };
  });
}

function RenderRootCommentForm({ onAddRootComment }) {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");

  function addingRootComment(e) {
    e.preventDefault();
    if (!user.trim() || !text.trim()) return;
    onAddRootComment({ user: user.trim(), text: text.trim(), replies: [] });
    setUser("");
    setText("");
  }

  return (
    <form onSubmit={addingRootComment} className="root-comment-form">
      <input
        onChange={(e) => setUser(e.target.value)}
        value={user}
        placeholder="Name"
        className="input"
      />
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Comment"
        className="input"
      />
      <button>Post Comment</button>
    </form>
  );
}

function Comment({ comment, path, onAddReply }) {
  const [replying, setReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [replyUser, setReplyUser] = useState("");
  const [replyText, setReplyText] = useState("");

  function handleSubmitReply(e) {
    e.preventDefault();

    if (!replyUser.trim() || !replyText.trim()) return;
    const newReply = {
      user: replyUser.trim(),
      text: replyText.trim(),
      replies: [],
    };
    onAddReply(path, newReply);
    setReplying(false);
    setShowReplies(true);
    setReplyUser("");
    setReplyText("");
  }

  return (
    <div className="comment">
      {/* COMMENT DETAILS */}
      <div className="comment-details">
        <strong className="comment-owner">{comment.user}</strong>
        <p className="comment-text">{comment.text}</p>
      </div>
      {/* COMMENT ACTIONS */}
      <div className="comment-actions">
        <button
          onClick={() => setReplying((prev) => !prev)}
          className="reply-btn "
        >
          {replying ? "Cancel" : "Reply"}
        </button>
        <button
          onClick={() => {
            setShowReplies((prev) => !prev);
          }}
          className="show-replies-btn"
        >
          {showReplies
            ? `Hide ${
                comment.replies.length > 0 ? comment.replies.length : ""
              } Replies`
            : "Show replies"}
        </button>
      </div>
      {/* FORM FOR REPLYING TO COMMENT */}
      {replying && (
        <form onSubmit={handleSubmitReply} className="comment-reply-form">
          <input
            value={replyUser}
            className="input"
            placeholder="Your name"
            onChange={(e) => setReplyUser(e.target.value)}
          />
          <input
            value={replyText}
            className="input"
            placeholder="Write a reply"
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button className="comment-reply-form-btn">Post</button>
        </form>
      )}
      {/* RECURSIVE COMMENTS */}
      {comment.replies && comment.replies.length > 0 && showReplies && (
        <div className="replies">
          {comment.replies.map((r, i) => (
            <Comment
              key={i}
              comment={r}
              path={[...path, i]}
              onAddReply={onAddReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [comments, setComments] = useState(initialComments);

  function handleAddReply(path, newReply) {
    console.log(path);
    setComments((prev) => addReplyAtPath(prev, path, newReply));
  }

  return (
    <div className="main">
      <h2>Recursive Rendering Comments</h2>
      {/* CALLING ROOT COMMENT FORM*/}
      <RenderRootCommentForm onAddRootComment={(c) => handleAddReply([], c)} />
      <div className="comments-list">
        {comments.map((c, i) => (
          <Comment key={i} comment={c} path={[i]} onAddReply={handleAddReply} />
        ))}
      </div>
    </div>
  );
}

export default App;
