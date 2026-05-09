import React, { useState } from 'react';
import { UploadCloud, File, X, CheckCircle } from 'lucide-react';

const ResourceUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles) => {
    const mappedFiles = newFiles.map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      progress: 0,
      status: 'uploading'
    }));
    
    setFiles(prev => [...prev, ...mappedFiles]);
    
    // Simulate upload
    mappedFiles.forEach((file, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles(prev => {
          const updated = [...prev];
          const fileIndex = updated.findIndex(f => f.name === file.name);
          if (fileIndex !== -1) {
            if (progress >= 100) {
              updated[fileIndex].progress = 100;
              updated[fileIndex].status = 'completed';
              clearInterval(interval);
            } else {
              updated[fileIndex].progress = progress;
            }
          }
          return updated;
        });
      }, 300);
    });
  };

  const removeFile = (name) => {
    setFiles(files.filter(f => f.name !== name));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Upload Study Material</h3>
      
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:bg-slate-50 hover:border-indigo-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          multiple 
          onChange={handleFileInput}
        />
        <UploadCloud className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-indigo-500' : 'text-slate-400'}`} />
        <p className="text-slate-700 font-medium mb-1">Drag and drop files here</p>
        <p className="text-slate-500 text-sm mb-4">or click to browse from your computer</p>
        <span className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Select Files</span>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-semibold text-slate-700">Uploading Files</h4>
          {files.map((file, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded">
                    <File className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{file.size}</p>
                  </div>
                </div>
                {file.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <button onClick={(e) => { e.stopPropagation(); removeFile(file.name); }} className="text-slate-400 hover:text-red-500 shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {file.status !== 'completed' && (
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${file.progress}%` }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceUpload;
