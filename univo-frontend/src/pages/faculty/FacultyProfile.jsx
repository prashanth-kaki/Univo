import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Phone, MapPin, Briefcase, Award, Save } from 'lucide-react';

const FacultyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal and academic details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-indigo-100 border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-indigo-600 mb-4">
              {user?.name?.charAt(0) || 'F'}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{user?.name || 'Dr. Jane Doe'}</h2>
            <p className="text-indigo-600 font-medium mb-1">Associate Professor</p>
            <p className="text-sm text-slate-500 mb-6">{user?.department || 'Computer Science & Engineering'}</p>
            
            <div className="w-full space-y-3 text-sm text-slate-600 text-left">
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="font-medium truncate">{user?.email || 'jane.doe@univo.edu'}</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="font-medium">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-medium">Room 402, Block A</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Professional Details</h3>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-500" /> Designation
                  </label>
                  <input type="text" defaultValue="Associate Professor" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" /> Highest Qualification
                  </label>
                  <input type="text" defaultValue="Ph.D. in Computer Science" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Areas of Expertise</label>
                <input type="text" defaultValue="Algorithms, Data Structures, Machine Learning" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Office Hours</label>
                <input type="text" defaultValue="Mon-Wed, 2:00 PM - 4:00 PM" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none" defaultValue="Passionate educator with over 10 years of experience in teaching computer science. Dedicated to helping students build strong fundamentals."></textarea>
              </div>
              
              <div className="flex justify-end pt-4">
                <button type="button" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
