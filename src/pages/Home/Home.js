import { useState } from "react";
import styles from "./Home.module.scss";
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
    <div className={styles.home}>
      <div>
        <h1>Recent Posts</h1>

        <form className={styles.search_form} onSubmit={homeHandleSubmit}>
          <input
            type="text"
            placeholder="Search for #Tags..."
            onChange={(changeEvent) => setHomeQuery(changeEvent.target.value)}
          />

          <button className="btn btn-dark">Search</button>
        </form>
      </div>

      {fetchLoadingStatus && <p>Loading...</p>}
      <div className={styles.gallery}>
        {fetchedDocuments &&
          fetchedDocuments.map((fetchedPost) => (
            <PostDetail key={fetchedPost.id} displayPost={fetchedPost} />
          ))}
      </div>

      {fetchedDocuments && fetchedDocuments.length === 0 && (
        <div className={styles.noposts}>
          <p>No Posts Found...</p>

          <Link to="/Posts/Create" className="btn">
            Create the First Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
