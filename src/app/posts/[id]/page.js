"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setPost(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <p className="flex items-center justify-center min-h-screen text-2xl">
        Loading post...
      </p>
    );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto max-w-1/2 w-full">
        <button
          className="text-blue-500 border py-2 px-4 rounded cursor-pointer"
          onClick={() => router.back()}
        >
          ← Back
        </button>

        <div className="mt-10">
          <h1 className="text-3xl font-bold">{post?.title}</h1>
          <p className="mt-2 text-xl">{post?.body}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
