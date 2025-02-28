import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/database";
import { Container, Loading, PostCard } from "../components";

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
    return <h1 className="text-5xl">No post available</h1>;
  }

  return (
    <div className="w-full  py-8">
      <Container>
        <div className="flex justify-center flex-wrap">
          {shuffledPosts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full max-w-lg md:w-1/2 lg:w-1/3"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
