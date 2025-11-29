import React, { useState } from "react";
import "./PostPage.css";

const PostPage = ({ post, onBack, onVote, onAddComment }) => {
  const [comment, setComment] = useState("");

  if (!post) return null;

  return (
    <div className="page post-page">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <h2>{post.title}</h2>
      <p className="post-author">Posted by u/{post.author}</p>

      <p className="post-content">{post.content}</p>

      {/* Voting */}
      <div className="vote-box">
        <button onClick={() => onVote(post.id, 1)} className="vote-btn">⬆</button>
        <span className="vote-count">{post.votes}</span>
        <button onClick={() => onVote(post.id, -1)} className="vote-btn">⬇</button>
      </div>

      <hr />

      {/* Comment Input */}
      <h3>Comments</h3>

      <div className="comment-input-box">
        <textarea
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          className="comment-submit-btn"
          onClick={() => {
            if (comment.trim().length > 0) {
              onAddComment(post.id, comment);
              setComment("");
            }
          }}
        >
          Comment
        </button>
      </div>

      {/* Comments List */}
      {post.comments.length === 0 && (
        <p className="no-comments-text">No comments yet.</p>
      )}

      {post.comments.map((c) => (
        <div className="comment" key={c.id}>
          <strong className="comment-author">u/{c.author}</strong>
          <p className="comment-text">{c.text}</p>
        </div>
      ))}
    </div>
  );
};

export default PostPage;
