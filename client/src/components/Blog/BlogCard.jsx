import React from 'react'
import { ClockIcon } from '@heroicons/react/24/outline'
import DOMPurify from 'dompurify';
import { Link } from 'react-router';

export default function BlogCard({ post }) {



  function SafeHtmlRenderer({ htmlString }) {
    const cleanHtml = DOMPurify.sanitize(htmlString);

    return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
  }

  return (
    <Link to={post.status == "draft" ? `/create-blog/${post._id}` : `/${post._id}`}>
      <article className={`group ${post.status === "draft" ? "bg-yellow-200" : "bg-slate-50"} rounded-2xl p-6 shadow-sm hover:shadow-lg transition relative overflow-hidden`}>
        {/* accent stripe */}
        <div className="absolute left-0 top-0 h-full w-1 bg-slate-500 group-hover:bg-slate-700 transition" />

        <div className="pl-4 flex flex-col h-full">
          {/* date */}
          <div className="flex items-center text-sm text-slate-400 mb-2">
            <ClockIcon className="h-4 w-4 mr-1" />
            <time date={post.createdAt}>{new Date(post.createdAt).toDateString()}</time>
          </div>

          {/* title */}
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition mb-2">
            {post.title}

          </h3>

          {/* tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-slate-200 text-slate-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* description */}
          <p className="text-sm text-slate-600 line-clamp-3 flex-grow">
            <SafeHtmlRenderer htmlString={post.content} />
          </p>

          {/* read more */}
          {post.status == "draft" ?
            <>
              <Link
                to={`/create-blog/${post._id}`}
                className="mt-4 inline-block text-sm font-semibold text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded"
              >
                {post.status.toUpperCase()} →
              </Link>
            </>
            :
            <Link
              to={post?.href}
              className="mt-4 inline-block text-sm font-semibold text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded"
            >
              Read more →
            </Link>
          }
        </div>

      </article>
    </Link>
  )
}
