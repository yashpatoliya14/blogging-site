import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/Blog/BlogCard';

/* Fallback data while waiting for the API */
const INITIAL_POSTS = [
  {
    _id: 'local-1',
    title: 'Mastering Tailwind Slate Theme',
    description:
      'Learn how to leverage Tailwind’s slate palette to build elegant, modern interfaces with minimal effort.',
    date: 'May 16, 2025',
    tags: ['Tailwind', 'UI', 'Design'],
  },
  /* …more demo posts… */
];

export default function BlogDisplay() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  /* fetch posts once on mount */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BACKEND_URL}/api/blog`);
        // if your API returns { data: [...] } adjust accordingly
        setPosts(data.data);     
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [BACKEND_URL]);

  async function onCreate(){
        const res = await axios.post(BACKEND_URL + '/api/blog/save-draft',{
          title:'',
          content:'',
          tags:[],      
        })
        
        if(res.data){
          const data = res.data.data
          navigate('/create-blog/' + data._id)
        }else{
          console.log("Data doesn't found !");
        }
      }
      

  /* derive tag list */
  const allTags = [
    'All',
    ...Array.from(new Set(posts.flatMap((p) => p.tags))),
  ];

  /* filter posts by tag */
  const filtered =
    selectedTag === 'All'
      ? posts
      : posts.filter((p) => p.tags.includes(selectedTag));

  /* -------- UI -------- */
  return (
    <section className="py-16 px-6 my-24">
      {/* Header + “Create Blog” */}
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-slate-800">Articles</h2>
          <p className="mt-2 text-slate-500">
            Insights, tutorials, and stories from our team.
          </p>
        </div>

        <button
          onClick={() => onCreate()}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-lg bg-slate-600 px-5 py-3 text-white font-semibold shadow hover:bg-slate-500 transition"
        >
          <PlusIcon className="h-5 w-5" />
          Create Blog
        </button>
      </div>

      {/* Tag filter pills */}
      <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start mb-12">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedTag === tag
                ? 'bg-slate-600 text-white'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {isLoading ? (
        <p className="text-center text-slate-500">Loading…</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
