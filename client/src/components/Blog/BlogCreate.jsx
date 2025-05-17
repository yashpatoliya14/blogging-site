import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Check, Plus } from 'lucide-react'; // Optional: install lucide-react icons
import TagSelector from './TagSelector';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router';
export default function BlogCreate() {
  const {id} = useParams()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()
  const typingTimeoutRef = useRef(null)
  const onPublish = async (title,content)=>{
    const res = await axios.post(BACKEND_URL + '/api/blog/publish/' + id,{
      title,
      content,
      tags      
    })

    if(res.data){
      const data = res.data
      console.log(data);
      
    }

    navigate("/blogs")
    
  }
useEffect(() => {
    // Clear previous timer if any key stroke happens
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Only start debounce if there's content or title
    if (title || content) {
      typingTimeoutRef.current = setTimeout(() => {
        onSave(title,content)
      }, 5000) // 5 seconds
    }

  }, [title, content, tags])

  const onSave = async (title,content)=>{
    
      const res = await axios.post(BACKEND_URL + '/api/blog/save-draft',{
        title,
        content,
        tags,
        id      
      })
      
      if(res.data){
        const data = res.data
        console.log(data);
      }
    
    
  }

  return (
    <div className="bg-gray-100 min-h-screen py-28">
      <div className="container mx-auto max-w-3xl rounded-lg overflow-hidden">
        
        {/* Content Area */}
        <div className="p-8">
          <div className="mb-6">
            <input
              type="text"
              id="title"
              placeholder="Write a title"
              className="shadow text-3xl appearance-none w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <ReactQuill
              placeholder='Start here'
              theme="snow"
              value={content}
              onChange={setContent}
              className="border-0 focus:ring-0"
              style={{ minHeight: '400px' }}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['link'], // Added image and video support
                  ['clean'],
                ],
              }}
            />
          </div>
          <div className='mb-8'>
            <TagSelector
              selectedTags={tags}
              onChange={(tags) =>{ setTags(tags)}}
            />

          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded focus:outline-none focus:shadow-outline mr-3"
              onClick={() => {
                onSave( title, content )
                navigate('/blogs')
              }}
            >
              Save as Draft
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
              onClick={() => onPublish(title, content )}
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}