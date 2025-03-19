"use client";
import { nextPage, prevPage, setPosts } from "@/store/postSlice";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, currentPage, totalPages } = useSelector(
    (state) => state.posts
  );
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
      );
      setLoading(false);
      dispatch(setPosts({ posts: res?.data, page }));
    } catch (err) {
      setLoading(false);
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading)
    return (
      <p className="flex items-center justify-center min-h-screen text-2xl">
        Loading...
      </p>
    );

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-center text-3xl font-bold my-8">Posts</h1>

      <div className="text-center">
        <input
          type="text"
          placeholder="Search posts..."
          className="border rounded-3xl py-3 px-5 w-1/2 mb-10"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <ul className="flex flex-wrap gap-5">
        {filteredPosts.map((post) => (
          <li key={post.id} className="w-[45%]">
            <Link
              href={`/posts/${post.id}`}
              className="text-xl py-2 px-3 border border-gray-500 min-h-[80px] rounded text-gray-600 w-full inline-block"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-5 mt-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
          onClick={() => dispatch(prevPage())}
          disabled={currentPage === 1 || loading}
        >
          Prev
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} / {totalPages}
        </span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
          onClick={() => dispatch(nextPage())}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
