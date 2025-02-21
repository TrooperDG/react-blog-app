import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/database";
import { Container, Loading, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

function AllPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    databaseService
      .getPosts([Query.equal("userId", [userData.$id])])
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
      <h1 className="text-5xl">You dont have any posts yet "create post" </h1>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {allPosts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
