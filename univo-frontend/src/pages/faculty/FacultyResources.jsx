import React, { useEffect, useState } from "react";
import ResourceUpload from "../../components/faculty/ResourceUpload";
import { getFacultyResources } from "../../services/facultyService";
import { File, Download, Search, Filter, Folder, ChevronRight, Eye, MoreVertical } from "lucide-react";

const FacultyResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState([]); // [] = root, [{type:'year', val: 1}], [{type:'year', val:1}, {type:'subject', val:'Math'}]

  const fetchResources = async () => {
    try {
      const response = await getFacultyResources();
      setResources(response.data || response); // Handle both mock and real response structures
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleNavigate = (pathItem) => {
    setCurrentPath([...currentPath, pathItem]);
  };

  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      setCurrentPath([]);
    } else {
      setCurrentPath(currentPath.slice(0, index + 1));
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-slate-100 rounded-lg animate-pulse"></div>)}
        </div>
      );
    }

    if (resources.length === 0) {
      return <div className="text-center py-10 text-slate-500">No resources uploaded yet</div>;
    }

    // Root Level: Show Years
    if (currentPath.length === 0) {
      const years = [...new Set(resources.map(r => r.year))].sort();
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {years.map(year => (
            <div key={year} onClick={() => handleNavigate({ type: 'year', value: year })} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all flex items-center gap-4 bg-white">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Folder className="w-6 h-6 fill-indigo-100" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Year {year}</h4>
                <p className="text-xs text-slate-500">{resources.filter(r => r.year === year).length} files</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Level 1: Show Subjects for selected Year
    if (currentPath.length === 1 && currentPath[0].type === 'year') {
      const year = currentPath[0].value;
      const yearResources = resources.filter(r => r.year === year);
      const subjects = [...new Set(yearResources.map(r => r.subjectName))].sort();

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map(subject => (
            <div key={subject} onClick={() => handleNavigate({ type: 'subject', value: subject })} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all flex items-center gap-4 bg-white">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Folder className="w-6 h-6 fill-blue-100" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="font-semibold text-slate-800 truncate" title={subject}>{subject}</h4>
                <p className="text-xs text-slate-500">{yearResources.filter(r => r.subjectName === subject).length} files</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Level 2: Show Files for selected Year and Subject
    if (currentPath.length === 2) {
      const year = currentPath[0].value;
      const subject = currentPath[1].value;
      const files = resources.filter(r => r.year === year && r.subjectName === subject);

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.map(res => (
            <div key={res._id || res.id} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group bg-white">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <File className="w-5 h-5" />
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-md capitalize">{res.type}</span>
                </div>
              </div>
              <h4 className="font-semibold text-slate-800 line-clamp-1" title={res.title || (res.file && res.file.originalName)}>
                {res.title || (res.file && res.file.originalName)}
              </h4>
              <p className="text-xs text-slate-500 mt-1">{res.department}</p>
              
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
                <span className="text-xs font-medium text-slate-400">
                  {new Date(res.createdAt || Date.now()).toLocaleDateString()}
                  {" • "}
                  {res.file && res.file.size ? (res.file.size / (1024 * 1024)).toFixed(2) : "0"} MB
                </span>
                <div className="flex items-center gap-2">
                  <a href={res.file?.url || "#"} target="_blank" rel="noreferrer" title="View File" className="text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 p-1.5 rounded-md transition-colors">
                    <Eye className="w-4 h-4" />
                  </a>
                  <a href={res.file?.url || "#"} download title="Download File" className="text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 p-1.5 rounded-md transition-colors">
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Study Materials</h1>
        <p className="text-slate-500 mt-1">Upload and manage resources for your subjects.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ResourceUpload onUploadSuccess={fetchResources} />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col min-h-[500px]">
            
            {/* TOP BAR / BREADCRUMBS */}
            <div className="p-4 border-b border-slate-200 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm">
                <button onClick={() => handleBreadcrumbClick(-1)} className={`font-medium ${currentPath.length === 0 ? 'text-slate-800' : 'text-slate-500 hover:text-indigo-600'}`}>
                  All Uploads
                </button>
                {currentPath.map((path, index) => (
                  <React.Fragment key={index}>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                    <button 
                      onClick={() => handleBreadcrumbClick(index)}
                      className={`font-medium ${index === currentPath.length - 1 ? 'text-slate-800' : 'text-slate-500 hover:text-indigo-600'}`}
                    >
                      {path.type === 'year' ? `Year ${path.value}` : path.value}
                    </button>
                  </React.Fragment>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full sm:w-64 outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 bg-slate-50/50">
              {renderContent()}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyResources;

