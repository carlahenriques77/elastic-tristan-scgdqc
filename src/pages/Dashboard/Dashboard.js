import React from "react";
import "./Dashboard.scss";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchCollection } from "../../hooks/useFetchCollection";
import { Link } from "react-router-dom";
import { useDeletePost } from "../../hooks/usePostManagement";

const Dashboard = () => {
  const { currentUser } = useAuthValue();
  const userUID = currentUser.uid;

  const { fetchedDocuments, fetchLoadingStatus } = useFetchCollection(
    "posts",
    null,
    userUID
  );

  const { deleteDocument } = useDeletePost("posts");

  if (fetchLoadingStatus) {
    return <p>Loading Dashboard...</p>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <p>Manage your Posts</p>

      {fetchedDocuments && fetchedDocuments.length === 0 ? (
        <div className="no_posts_dashboard">
          <p className="no_post_description">No Posts Found</p>

          <Link to="/Posts/Create" className="no_posts_button button_style_3">Create First Post</Link>
        </div>
      ) : (
        <>
          <div className="post_header">
            <span>Title</span>

            <span>Actions</span>
          </div>

          {fetchedDocuments &&
            fetchedDocuments.map((post_in_the_list) => (
              <div className="post_row" key={post_in_the_list.id}>
                <p>{post_in_the_list.postTitle}</p>
                <div>
                  <Link
                    to={`/Posts/${post_in_the_list.id}`}
                    className="btn btn-outline"
                  >
                    See
                  </Link>

                  <Link
                    to={`/Posts/Edit/${post_in_the_list.id}`}
                    className="btn btn-outline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteDocument(post_in_the_list.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
