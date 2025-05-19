import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import DOMPurify from 'dompurify';
import { Link } from 'react-router';

export default function BlogCard({ post }) {
  function SafeHtmlRenderer({ htmlString }) {
  const cleanHtml = DOMPurify.sanitize(htmlString);
  return (
    <div
      className="line-clamp-5 overflow-hidden text-ellipsis"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

  const isDraft = post.status === 'draft';
  const linkTo = isDraft ? `/create-blog/${post._id}` : `/${post._id}`;
  const time = new Date(post.createdAt).toDateString().split(" ")
  return (
    <Link to={linkTo}>
      <div
        class="w-[100%] bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden"
      >
        <div class="w-24 h-24 bg-black rounded-full absolute -right-4 -top-7">
          <p class="absolute bottom-4 left-3 text-white text-2xl">
            <h2 className='text-lg font-bold'>{time[1]} {time[2]}</h2>
            <h3 className='text-sm float-end'>{time[3]}</h3>
            <h3 className='text-sm'></h3>
          </p>
        </div>
        <div class="fill-black w-12">

        </div>
        <h1 class="font-bold text-xl my-6">{post.title}</h1>
        <p class="text-sm text-zinc-500 leading-6">
          <SafeHtmlRenderer htmlString={post.content} />
        </p>
        {/* Read More */}
        <Link
          to={linkTo}
          className="mt-auto inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
        >
          {isDraft ? 'DRAFT →' : 'Read more →'}
        </Link>
      </div>

    </Link>

   
  );
}
