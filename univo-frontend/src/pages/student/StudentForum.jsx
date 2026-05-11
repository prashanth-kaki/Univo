import React, { useEffect, useState } from 'react';
import { Users, Hash, Code, Trophy } from 'lucide-react';
import { getForumTopics } from '../../services/studentService';

const StudentForum = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getForumTopics();
        setTopics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);
  const channels = [
    { id: 1, name: 'general', icon: Hash, desc: 'Campus news and general chat' },
    { id: 2, name: 'hackathons', icon: Code, desc: 'Find teammates and discuss events' },
    { id: 3, name: 'opportunities', icon: Trophy, desc: 'Internships and job postings' },
    { id: 4, name: 'study-groups', icon: Users, desc: 'Find people to study with' },
  ];

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-800">Campus Forum</h2>
            <p className="text-xs text-slate-500 font-medium">Univo Student Community</p>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Channels</p>
            {channels.map((channel, idx) => {
              const Icon = channel.icon;
              return (
                <button 
                  key={channel.id} 
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    idx === 1 ? 'bg-violet-100 text-violet-700' : 'text-slate-600 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-70" />
                  {channel.name}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-slate-800">#hackathons</h3>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              42 Online
            </span>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-slate-200 rounded-xl"></div>
                <div className="h-20 bg-slate-200 rounded-xl"></div>
              </div>
            ) : topics.length > 0 ? (
              topics.map(topic => (
                <div key={topic._id || topic.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 shrink-0">
                    {topic?.author?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-slate-800">{topic.author?.name || 'Unknown User'}</span>
                      <span className="text-xs font-medium text-slate-400">Recent</span>
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 text-sm text-slate-700 shadow-sm inline-block">
                      {topic.content || topic.title}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 shrink-0">
                  S
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-slate-800">System</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 text-sm text-slate-700 shadow-sm inline-block">
                    No forum topics yet! Start the conversation below. 🚀
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Message #hackathons" 
                className="w-full bg-slate-100 border-transparent rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-violet-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForum;
