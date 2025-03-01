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
    <div className="w-full  py-2  ">
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
    </div>
  );
}

export default Home;
