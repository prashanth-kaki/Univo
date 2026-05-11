import React, { useState } from 'react';
import { FileText, File as FileIcon, Video, Download, Bookmark as BookmarkIcon, Eye } from 'lucide-react';

const ResourceCard = ({ resource }) => {
  const [bookmarked, setBookmarked] = useState(resource.bookmarked || false);

  const getIcon = () => {
    const type = resource.type ? resource.type.toLowerCase() : '';
    const mime = resource.file?.mimetype || '';
    
    if (type === 'notes' || mime.includes('pdf')) return <FileText className="w-8 h-8 text-rose-500" />;
    if (type === 'assignment') return <FileIcon className="w-8 h-8 text-amber-500" />;
    if (mime.includes('video')) return <Video className="w-8 h-8 text-indigo-500" />;
    return <FileText className="w-8 h-8 text-slate-500" />;
  };

  const formattedSize = resource.file?.size ? (resource.file.size / (1024 * 1024)).toFixed(2) + ' MB' : '0 MB';
  const formattedDate = new Date(resource.createdAt || Date.now()).toLocaleDateString();

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          {getIcon()}
        </div>
        <button 
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-2 rounded-full transition-colors ${bookmarked ? 'bg-violet-50 text-violet-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
        >
          <BookmarkIcon className={`w-5 h-5 ${bookmarked ? 'fill-violet-600' : ''}`} />
        </button>
      </div>
      
      <h4 className="font-bold text-slate-800 text-base mb-1 line-clamp-2" title={resource.title || resource.file?.originalName}>
        {resource.title || resource.file?.originalName || 'Untitled Resource'}
      </h4>
      <p className="text-sm text-violet-600 font-medium mb-4">{resource.subjectName || resource.subject}</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
        <div className="text-xs font-semibold text-slate-400">
          <span>{formattedSize}</span> • <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <a href={resource.file?.url || '#'} target="_blank" rel="noreferrer" className="text-violet-600 hover:bg-violet-50 p-2 rounded-lg transition-colors" title="View">
            <Eye className="w-4 h-4" />
          </a>
          <a href={resource.file?.url || '#'} download className="text-violet-600 hover:bg-violet-50 p-2 rounded-lg transition-colors" title="Download">
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
