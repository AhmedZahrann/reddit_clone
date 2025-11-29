import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CommunityPage from "./components/CommunityPage";
import CreateCommunityPage from "./components/CreateCommunityPage";
import CreatePostPage from "./components/CreatePostPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ProfilePage from "./components/ProfilePage";
import PostPage from "./components/PostPage";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // USER DATA
  const [user, setUser] = useState({
    username: "Seif",
    bio: "Hello, this is my profile.",
    joinedCommunities: []
  });

  // COMMUNITIES
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: "ReactJS",
      members: 12,
      joined: false,
      posts: []
    },
    {
      id: 2,
      name: "Gaming",
      members: 44,
      joined: false,
      posts: []
    }
  ]);

  // NAVIGATION
  const goHome = () => {
    setPage("home");
    setSelectedCommunity(null);
    setSelectedPost(null);
  };

  const openCommunity = (community) => {
    setSelectedCommunity(community);
    setSelectedPost(null);
    setPage("community");
  };

  const openPost = (post) => {
    setSelectedPost(post);
    setPage("post");
  };

  // SEARCH
  const searchResults = communities.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CREATE COMMUNITY
  const createCommunity = (name) => {
    const newComm = {
      id: Date.now(),
      name,
      members: 1,
      joined: true,
      posts: []
    };

    // user joins it by default
    setUser({
      ...user,
      joinedCommunities: [...user.joinedCommunities, name]
    });

    setCommunities([...communities, newComm]);
    setSelectedCommunity(newComm);
    setPage("community");
  };

  // JOIN / LEAVE COMMUNITY
  const toggleMembership = (communityId) => {
    const updated = communities.map((c) => {
      if (c.id !== communityId) return c;

      const isJoining = !c.joined;

      // update user joined list
      if (isJoining) {
        setUser({
          ...user,
          joinedCommunities: [...user.joinedCommunities, c.name]
        });
      } else {
        setUser({
          ...user,
          joinedCommunities: user.joinedCommunities.filter(
            (name) => name !== c.name
          )
        });
      }

      return {
        ...c,
        joined: isJoining,
        members: isJoining ? c.members + 1 : c.members - 1
      };
    });

    setCommunities(updated);
    setSelectedCommunity(updated.find((c) => c.id === communityId));
  };

  // CREATE POST
  const createPost = (communityId, title, content) => {
    const updated = communities.map((c) => {
      if (c.id !== communityId) return c;

      return {
        ...c,
        posts: [
          ...c.posts,
          {
            id: Date.now(),
            title,
            content,
            author: user.username,
            votes: 0,
            userVote: 0,
            comments: []
          }
        ]
      };
    });

    setCommunities(updated);
    setSelectedCommunity(updated.find((c) => c.id === communityId));
    setPage("community");
  };

  // REDDIT-VOTING
  const votePost = (postId, delta) => {
    const updated = communities.map((c) => {
      if (c.id !== selectedCommunity.id) return c;

      return {
        ...c,
        posts: c.posts.map((p) => {
          if (p.id !== postId) return p;

          const newVote = p.userVote === delta ? 0 : delta;

          return {
            ...p,
            userVote: newVote,
            votes: p.votes - p.userVote + newVote
          };
        })
      };
    });

    setCommunities(updated);

    const updatedComm = updated.find((c) => c.id === selectedCommunity.id);
    setSelectedCommunity(updatedComm);
    setSelectedPost(updatedComm.posts.find((p) => p.id === postId));
  };

  // COMMENTS
  const addComment = (postId, text) => {
    const updated = communities.map((c) => {
      if (c.id !== selectedCommunity.id) return c;

      return {
        ...c,
        posts: c.posts.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  { id: Date.now(), text, author: user.username }
                ]
              }
            : p
        )
      };
    });

    setCommunities(updated);

    const updatedComm = updated.find((x) => x.id === selectedCommunity.id);
    setSelectedCommunity(updatedComm);
    setSelectedPost(updatedComm.posts.find((p) => p.id === postId));
  };

  // LOGOUT
  const logoutUser = () => {
    setIsLoggedIn(false);
    setPage("home");
  };

  return (
    <div>
      <Header
        onLogoClick={goHome}
        onLoginClick={() => setPage("login")}
        onProfileClick={() => setPage("profile")}
        onSearch={(q) => setSearchQuery(q)}
        isLoggedIn={isLoggedIn}
      />

      <div className="main-container">
        <Sidebar
          communities={communities}
          onHomeClick={goHome}
          onCreateCommunity={() => setPage("create-community")}
          onSelectCommunity={openCommunity}
          onProfileClick={() => setPage("profile")}
          onLogout={logoutUser}
        />

        <div className="content">
          {/* HOME */}
          {page === "home" && (
            <div className="posts-container">
              <h2>Trending Communities</h2>
              {communities.map((c) => (
                <div key={c.id} className="post">
                  <h4>r/{c.name}</h4>
                  <p>{c.members} members</p>
                  <button onClick={() => openCommunity(c)}>View</button>
                </div>
              ))}
            </div>
          )}

          {/* SEARCH RESULTS */}
          {searchQuery !== "" && page === "home" && (
            <>
              <h3>Search Results</h3>
              {searchResults.map((c) => (
                <div key={c.id} className="post">
                  <h4>r/{c.name}</h4>
                  <button onClick={() => openCommunity(c)}>Open</button>
                </div>
              ))}
            </>
          )}

          {/* LOGIN */}
          {page === "login" && (
            <LoginPage
              onSignUpClick={() => setPage("signup")}
              onSuccess={() => {
                setIsLoggedIn(true);
                setPage("home");
              }}
            />
          )}

          {/* SIGNUP */}
          {page === "signup" && (
            <SignUpPage
              onLoginClick={() => setPage("login")}
              onSuccess={() => {
                setIsLoggedIn(true);
                setPage("home");
              }}
            />
          )}

          {/* PROFILE */}
          {page === "profile" && (
            <ProfilePage
              user={user}
              posts={communities.flatMap((c) => c.posts)}
              onSaveBio={(newBio) => setUser({ ...user, bio: newBio })}
            />
          )}

          {/* CREATE COMMUNITY */}
          {page === "create-community" && (
            <CreateCommunityPage onCreate={createCommunity} />
          )}

          {/* COMMUNITY PAGE */}
          {page === "community" && selectedCommunity && (
            <CommunityPage
              community={selectedCommunity}
              onJoinLeave={toggleMembership}
              onCreatePost={() => setPage("create-post")}
              onViewPost={openPost}
            />
          )}

          {/* CREATE POST */}
          {page === "create-post" && selectedCommunity && (
            <CreatePostPage
              community={selectedCommunity}
              onCreate={createPost}
            />
          )}

          {/* POST PAGE */}
          {page === "post" && selectedPost && (
            <PostPage
              post={selectedPost}
              onBack={() => setPage("community")}
              onVote={votePost}
              onAddComment={addComment}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
