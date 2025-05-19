import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen,MessageCircle, User, Twitter, Linkedin } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-16 my-[5%]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl font-extrabold inline-block pb-2 mb-10 ">
          About PurePost
        </h1>

        <p className="text-lg leading-8 mb-6">
          Welcome to PurePost — where ideas take flight and stories come to life. Our blog is a sanctuary
          for curious minds, creative souls, and lifelong learners. Dive into topics spanning technology,
          design, productivity, and personal growth.
        </p>

        <p className="text-lg leading-8 mb-12">
          At PurePost, we believe in the power of words and the magic of connection. Every article is crafted
          to spark conversation, foster community, and ignite inspiration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <BookOpen size={48} />, title: 'Insightful Articles', desc: 'Deep-dives and how-tos from industry experts.' },
            { icon: <MessageCircle size={48}/>, title: 'Community Engagement', desc: 'Join discussions and share your perspective.' },
            { icon: <User size={48} />, title: 'Expert Contributors', desc: 'Profiles and interviews with thought leaders.' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 text-black opacity-80">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-base leading-7 text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          
          <h2 className="text-2xl font-bold mb-2">Jane Doe</h2>
          <p className="text-base leading-7 mb-4 max-w-xl">
            Founder & Chief Editor at PurePost. Passionate about storytelling and digital innovation,
            Jane curates content that educates, entertains, and empowers.
          </p>
          <div className="flex space-x-6">
            <a href="https://twitter.com/purepost" aria-label="Twitter" className="hover:text-blue-500">
              <Twitter size={24} />
            </a>
            <a href="https://linkedin.com/company/purepost" aria-label="LinkedIn" className="hover:text-blue-700">
              <Linkedin size={24} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
