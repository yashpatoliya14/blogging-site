import React, { useEffect, useState } from 'react';
import { Check, Plus } from 'lucide-react'; // Optional: install lucide-react icons

const tagsList = ['Technology', 'Health', 'Finance', 'Education', 'Sports', 'Travel'];

export default function TagSelector({ selectedTags , onChange }) {
  const [selected, setSelected] = useState(selectedTags || []);

  useEffect(() => {
    setSelected(selectedTags || []);
  }, [selectedTags]);

  const toggleTag = (tag) => {
    let updated;
    if (selected.includes(tag)) {
      updated = selected.filter((t) => t !== tag);
    } else {
      updated = [...selected, tag];
    }
    setSelected(updated);
    onChange && onChange(updated);
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {tagsList.map((tag) => {
        const isSelected = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
              isSelected
                ? 'bg-green-100 text-green-700 border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {isSelected ? <Check size={18} /> : <Plus size={18} />}
            <span>{tag}</span>
          </button>
        );
      })}
    </div>
  );
}
