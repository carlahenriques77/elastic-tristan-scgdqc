import { useState } from "react";
import "./Home.scss";
import { useNavigate, Link } from "react-router-dom";
import { useFetchCollection } from "../../hooks/useFetchCollection";
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [homeQuery, setHomeQuery] = useState("");

  const { fetchedDocuments, fetchLoadingStatus } = useFetchCollection("posts");

  const searchNavigate = useNavigate("");

  const homeHandleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    if (homeQuery) {
      return searchNavigate(`/Search?q=${homeQuery}`);
    }
  };

  return (
    <div className="home_container">
      <div className="search_form_container">
        <h1 className="home_title">Recent Posts</h1>

        <form className="home_search_form" onSubmit={homeHandleSubmit}>
          <input
            className="home_search_input"
            type="text"
            placeholder="Search for a #Tag..."
            onChange={(changeEvent) => setHomeQuery(changeEvent.target.value)}
          />

          <button className="home_search_button">Search</button>
        </form>
      </div>

      {fetchLoadingStatus && (
        <div className="spinner_container_home">
          <p>Loading Posts...</p>
          <div className="home_spinner" id="html-spinner"></div>
        </div>
      )}
      <div className="home_posts_gallery">
        {fetchedDocuments &&
          fetchedDocuments.map((fetchedPost) => (
            <PostDetail key={fetchedPost.id} displayPost={fetchedPost} />
          ))}
      </div>

      {fetchedDocuments && fetchedDocuments.length === 0 && (
        <div className="home_noposts">
          <p>No Posts Found...</p>

          <Link
            to="/Posts/Create"
            className="home_create_first_post_button button_style_3"
          >
            Create the First Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
