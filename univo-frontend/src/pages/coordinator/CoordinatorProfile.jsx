import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Briefcase, Award, Phone } from 'lucide-react';

const CoordinatorProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Operational Profile</h1>
        <p className="text-slate-500 mt-1">Manage your professional details and contact information.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
         <div className="h-32 bg-gradient-to-r from-teal-500 to-blue-600"></div>
         
         <div className="px-6 pb-6 relative">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-teal-600 absolute -top-12">
               {user?.name?.charAt(0) || 'C'}
            </div>
            
            <div className="flex justify-end pt-4 mb-2">
               <button className="text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors shadow-sm">
                 Edit Profile
               </button>
            </div>
            
            <div className="mt-2">
               <h2 className="text-2xl font-bold text-slate-800">{user?.name || 'Coord. Davis'}</h2>
               <p className="text-teal-600 font-bold mb-4">CSE Department Coordinator</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3">
                     <Mail className="w-4 h-4 text-slate-400" />
                     <span className="font-medium">{user?.email || 'coordinator.cse@univo.edu'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Phone className="w-4 h-4 text-slate-400" />
                     <span className="font-medium">+1 (555) 019-2837</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Briefcase className="w-4 h-4 text-slate-400" />
                     <span className="font-medium">Managing Sections: CS-A, CS-B, CS-C</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Award className="w-4 h-4 text-slate-400" />
                     <span className="font-medium">Joined Fall 2024</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CoordinatorProfile;
