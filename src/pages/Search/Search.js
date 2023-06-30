import React from "react";
import "./Search.scss";
import { Link } from "react-router-dom";
import { useFetchCollection } from "../../hooks/useFetchCollection";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import PostDetail from "../../components/PostDetail";

const Search = () => {
  const searchQuery = useSearchQuery();
  const searchSearch = searchQuery.get("q");

  const { fetchedDocuments } = useFetchCollection("posts", searchSearch);

  return (
    <div className="search_container">
      <h2>Search Results for "{searchSearch}":</h2>
      <div>
        {fetchedDocuments && fetchedDocuments.length === 0 && (
          <>
            <p className="no_posts_found_search">
              No Posts Found... Try to Copy one of the Tags. Also, type the Full
              Word.
            </p>
            <div className="no_posts_example_container">
              <p>Example:</p>
              <p className="right_example">
                big breasts / Big Breasts / bondage - V Right
              </p>
              <p className="wrong_example">Big / bon - X Wrong</p>
            </div>
            <Link to="/" className="search_button button_style_3">
              Go Back to Homepage
            </Link>
          </>
        )}
        <div className="home_posts_gallery">
          {fetchedDocuments &&
            fetchedDocuments.map((searchedTagPost) => (
              <PostDetail
                key={searchedTagPost.id}
                displayPost={searchedTagPost}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
