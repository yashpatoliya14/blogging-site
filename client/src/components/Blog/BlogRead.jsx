import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { ArrowLeft } from 'lucide-react';
import Loader from '../Loader';

export default function BlogRead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/blog/${id}`,{withCredentials:true});
        setPost(res.data.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="py-20 text-center"><Loader/></div>;
  if (!post) return <div className="py-20 text-center">Blog not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-slate-600 mb-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>

        <h1 className="text-4xl font-bold text-slate-800 mb-2">{post.title}</h1>

        <div className="text-sm text-slate-500 mb-4">
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.tags && (
            <span className="ml-2 text-xs text-indigo-600">
              • {post.tags.join(', ')}
            </span>
          )}
        </div>

        <div
          className="prose max-w-none prose-img:rounded-lg prose-a:text-indigo-600"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        />
      </div>
    </div>
  );
}

