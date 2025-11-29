// import React from "react";
// import "./SearchPage.css";

// const SearchPage = ({ query, communities, onSelectCommunity }) => {
//   const filtered = communities.filter((c) =>
//     c.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="page search-page">
//       <h2>Search results for: "{query}"</h2>

//       {filtered.length === 0 && <p>No matching communities.</p>}

//       {filtered.map((c) => (
//         <div className="search-item" key={c.id} onClick={() => onSelectCommunity(c)}>
//           <h3>r/{c.name}</h3>
//           <p>{c.members} members</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SearchPage;
