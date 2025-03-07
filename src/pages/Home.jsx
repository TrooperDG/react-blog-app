import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/database";
import { Button, Container, Loading, PostCard } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const shuffledPosts = shuffleArray(allPosts);

  useEffect(() => {
    databaseService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setAllPosts(posts.documents);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (allPosts.length === 0) {
    return (
      <Container>
        <div className="flex flex-col gap-4 justify-center items-center h-[60vh]">
          <h1 className="text-2xl ">Sorry no posts available</h1>
          <Link to={"/add-post"}>
            <Button bgColor="bg-orange-600">Create yours</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="w-full py-2  ">
      <Container>
        <div className="flex justify-center">
          <article>
            {shuffledPosts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-full max-w-lg lg:max-w-[36rem] "
              >
                <PostCard {...post} />
              </div>
            ))}
          </article>
        </div>
      </Container>
      <Link
        to="/add-post"
        className="md:hidden fixed bottom-5 right-6 rounded-full"
      >
        <button className=" p-2 rounded-full bg-blue-500 hover:bg-blue-400 active:bg-blue-300">
          <svg
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="#ffffff"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default Home;
