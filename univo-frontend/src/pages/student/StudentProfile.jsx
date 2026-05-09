import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, GraduationCap, Trophy, Terminal, Award, Edit3 } from 'lucide-react';

const StudentProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Student Profile</h1>
        <p className="text-slate-500 mt-1">Manage your academic identity and personal information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-violet-500 to-indigo-600"></div>
            
            <div className="w-28 h-28 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-violet-600 mb-4 z-10 relative mt-8">
              {user?.name?.charAt(0) || 'S'}
            </div>
            
            <h2 className="text-xl font-bold text-slate-800">{user?.name || 'Alex Student'}</h2>
            <p className="text-violet-600 font-bold mb-1">USN: 1UN23CS001</p>
            <p className="text-sm text-slate-500 mb-6 font-medium">B.Tech - Computer Science</p>
            
            <div className="w-full space-y-3 text-sm text-slate-600 text-left pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="font-medium truncate">{user?.email || 'alex.student@univo.edu'}</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span className="font-medium">3rd Year, Semester 5</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" /> Achievements
              </h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-600">1st Place - Campus Hackathon 2025</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-600">Dean's List - Fall 2025</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Academic Info & Skills */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-800">Academic Standing</h3>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Excellent</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Current CGPA</p>
                <p className="text-2xl font-black text-slate-800">8.9<span className="text-sm font-bold text-slate-400">/10</span></p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Credits Earned</p>
                <p className="text-2xl font-black text-slate-800">104</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Backlogs</p>
                <p className="text-2xl font-black text-slate-800">0</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Total Attendance</p>
                <p className="text-2xl font-black text-slate-800">88%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
             <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-slate-400" /> Skills & Interests
              </h3>
              <button className="text-violet-600 hover:text-violet-700 p-1">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3">Programming Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'Python', 'Java', 'C++'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3">Frameworks & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Express', 'MongoDB', 'Git', 'Tailwind CSS'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-lg text-sm font-semibold border border-violet-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-2">Bio</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Passionate computer science student with a focus on full-stack web development. 
                  Currently exploring machine learning and its applications in modern web apps. 
                  Always eager to collaborate on hackathons and open-source projects!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
