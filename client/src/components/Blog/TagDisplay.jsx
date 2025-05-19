

export default function TagDisplay({ allTags, selectedTag, setSelectedTag }) {
    {/* Tag filter pills */ }
    return (<div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start mb-12">
        {allTags.map((tag) => (
            <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTag === tag
                    ? 'bg-black text-white'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
            >
                {tag}
            </button>
        ))}
    </div>)

}