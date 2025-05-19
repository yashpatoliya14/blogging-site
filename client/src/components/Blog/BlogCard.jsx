import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import DOMPurify from 'dompurify';
import { Link } from 'react-router';

export default function BlogCard({ post }) {
  function SafeHtmlRenderer({ htmlString }) {
    const cleanHtml = DOMPurify.sanitize(htmlString);
    return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
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

    // <article className={`group rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden relative border ${isDraft ? 'bg-yellow-100 border-yellow-300' : 'bg-white border-slate-200'}`}>
    //   {/* Left accent stripe */}
    //   <div className={`absolute left-0 top-0 h-full w-1 ${isDraft ? 'bg-yellow-500 group-hover:bg-yellow-600' : 'bg-slate-500 group-hover:bg-slate-700'} transition`} />

    //   <Link to={linkTo} className="block p-6 pl-8 h-full">
    //     <div className="flex flex-col h-full">
    //       {/* Date */}
    //       <div className="flex items-center text-sm text-slate-500 mb-2">
    //         <ClockIcon className="h-4 w-4 mr-1" />
    //         <time dateTime={post.createdAt}>{new Date(post.createdAt).toDateString()}</time>
    //       </div>

    //       {/* Title */}
    //       <h3 className="text-xl font-semibold text-slate-800 group-hover:text-slate-900 mb-2 transition">
    //         {post.title}
    //       </h3>

    //       {/* Tags */}
    //       <div className="flex flex-wrap gap-2 mb-3">
    //         {post.tags.map((tag) => (
    //           <span
    //             key={tag}
    //             className="text-xs font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full"
    //           >
    //             #{tag}
    //           </span>
    //         ))}
    //       </div>

    //       {/* Description */}
    //       <div className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
    //         <SafeHtmlRenderer htmlString={post.content} />
    //       </div>

    //       {/* Read More */}
    //       <Link
    //         to={readMoreLink}
    //         className="mt-auto inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
    //       >
    //         {isDraft ? 'DRAFT →' : 'Read more →'}
    //       </Link>
    //     </div>
    //   </Link>
    // </article>
  );
}
