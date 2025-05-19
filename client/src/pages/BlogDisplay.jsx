import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/Blog/BlogCard';
import toast from 'react-hot-toast';
import TagDisplay from '../components/Blog/TagDisplay';
import Loader from '../components/Loader';

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

  /* --------------------------------fetch posts once on mount ---------------------*/
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BACKEND_URL}/api/blog`, { withCredentials: true });
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

  //-----------------------------------create post on button click-------------------------------------
  async function onCreate() {
    const res = await axios.post(BACKEND_URL + '/api/blog/save-draft', {
      title: '',
      content: '',
      tags: [],
      userId: localStorage.getItem('id')
    }, { withCredentials: true })

    toast(res.data)
    console.log(res.data);

    if (res.data) {
      const data = res.data.data
      navigate('/create-blog/' + data._id)
    } else {
      console.log("Data doesn't found !");
    }
  }


  /*------------------------------ derive tag list -------------------------- */
  const allTags = [
    'All',
    ...Array.from(new Set(posts.flatMap((p) => p.tags))),
  ];
  /* ---------------- current user id ----------------- */
  const userId = localStorage.getItem('id');

  /* ---------------- tag filter ---------------------- */
  const basePosts =
    selectedTag === 'All'
      ? posts
      : posts.filter(p => p.tags.includes(selectedTag));

  /* -----------keep drafts only if present userId or published status----- */
  const visible = basePosts.filter(
    p => p.status !== 'draft' || p.userId === userId
  );

  /* ---------- put **my** drafts first --------------- */
  const filtered = visible.sort((a, b) => {
    if (a.status === 'draft' && b.status !== 'draft') return -1; 
    if (a.status !== 'draft' && b.status === 'draft') return 1;
    return 0;                                    
  });


  /* -------- UI -------- */
  return (
    <section className="py-16 px-6 my-24">
      {/* Header + “Create Blog” */}
      <div className="max-[100%] flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-slate-800">Articles</h2>
          <p className="mt-2 text-slate-500">
            Insights, tutorials, and stories from our team.
          </p>
        </div>

        <button
          onClick={() => onCreate()}
          className="mt-4 sm:mt-0  inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white font-semibold shadow hover:bg-slate-500 transition"
        >
          <PlusIcon className="h-5 w-5" />
          Create Blog
        </button>
      </div>

      {/* tag display component */}
      <TagDisplay allTags={allTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>

      {/* Posts grid */}
      {isLoading ? (
        <div className='w-full flex flex-col items-center'>
          <Loader/>
        </div>
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
