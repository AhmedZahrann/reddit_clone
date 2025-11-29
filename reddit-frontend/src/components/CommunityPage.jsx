import React from "react";
import "./CommunityPage.css";

const CommunityPage = ({ 
  community, 
  onJoinLeave, 
  onCreatePost, 
  onViewPost
}) => {
  if (!community) return null;

  return (
    <div className="page">
      <h2>r/{community.name}</h2>

      <button onClick={() => onJoinLeave(community.id)}>
        {community.joined ? "Leave" : "Join"}
      </button>

      <p>{community.members} members</p>

      <button onClick={onCreatePost}>Create Post</button>

      <h3>Posts</h3>
      {community.posts.length === 0 && <p>No posts yet.</p>}

      {community.posts.map((p) => (
        <div key={p.id} className="post" onClick={() => onViewPost(p)}>
          
          {/* Post Content Only - No Voting */}
          <div className="post-content">
            <h4>{p.title}</h4>
            <p>{p.content.slice(0, 120)}...</p>

            <div className="post-meta">
              <span>By {p.author}</span>
              <span>{p.comments ? p.comments.length : 0} comments</span>
              <span>{p.votes} votes</span>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default CommunityPage;
