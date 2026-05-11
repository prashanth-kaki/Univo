import React, { useState } from 'react';
import { UploadCloud, File, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ResourceUpload = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [formDataState, setFormDataState] = useState({
    year: '1',
    department: 'Computer Science',
    subjectName: 'Data Structures',
    type: 'notes',
    description: '',
  });

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

  const handleChange = (e) => {
    setFormDataState({
      ...formDataState,
      [e.target.name]: e.target.value
    });
  };

  const handleFiles = async (newFiles) => {
    for (const file of newFiles) {
      const tempFile = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        progress: 0,
        status: 'uploading'
      };

      setFiles(prev => [...prev, tempFile]);

      try {
        const formData = new FormData();
        formData.append("title", file.name.split('.').slice(0, -1).join('.'));
        formData.append("subject", "60d5ecb8b392d7001f3e3948"); // Dummy valid ObjectId
        formData.append("subjectName", formDataState.subjectName);
        formData.append("year", formDataState.year);
        formData.append("department", formDataState.department);
        formData.append("type", formDataState.type);
        formData.append("description", formDataState.description || "Uploaded file");
        formData.append("semester", formDataState.year * 2 - 1);
        formData.append("file", file); // File must be last for multer to read body fields first

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/resources", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || 'Upload failed');
        }

        setFiles(prev =>
          prev.map(f =>
            f.name === file.name ? { ...f, progress: 100, status: "completed" } : f
          )
        );
        toast.success("File uploaded successfully");
        if (onUploadSuccess) onUploadSuccess();

      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload file");
        setFiles(prev =>
          prev.map(f =>
            f.name === file.name ? { ...f, status: "failed" } : f
          )
        );
      }
    }
  };

  const removeFile = (name) => {
    setFiles(files.filter(f => f.name !== name));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Upload Study Material</h3>
      
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
            <select name="year" value={formDataState.year} onChange={handleChange} className="w-full border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-indigo-500">
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select name="department" value={formDataState.department} onChange={handleChange} className="w-full border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-indigo-500">
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Subject Name</label>
          <input type="text" name="subjectName" value={formDataState.subjectName} onChange={handleChange} placeholder="e.g. Data Structures" className="w-full border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Resource Type</label>
          <select name="type" value={formDataState.type} onChange={handleChange} className="w-full border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-indigo-500">
            <option value="notes">Notes</option>
            <option value="assignment">Assignment</option>
            <option value="record">Record</option>
            <option value="mid_questions">Mid Questions</option>
            <option value="internal_questions">Internal Questions</option>
            <option value="external_questions">External Questions</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

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

