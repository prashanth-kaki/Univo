import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Phone, MapPin, Briefcase, Award, Save, Edit3, X } from 'lucide-react';
import { updateProfile } from '../../services/authService';
import toast from 'react-hot-toast';

const FacultyProfile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '+1 (555) 123-4567',
    office: user?.office || 'Room 402, Block A',
    designation: user?.designation || 'Associate Professor',
    qualification: user?.qualification || 'Ph.D. in Computer Science',
    expertise: user?.expertise || 'Algorithms, Data Structures, Machine Learning',
    officeHours: user?.officeHours || 'Mon-Wed, 2:00 PM - 4:00 PM',
    bio: user?.bio || 'Passionate educator with over 10 years of experience in teaching computer science. Dedicated to helping students build strong fundamentals.'
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await updateProfile(formData);
      setUser(res.data);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
                {isEditing ? (
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-indigo-300 outline-none" />
                ) : (
                  <span className="font-medium">{formData.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                <MapPin className="w-4 h-4 text-slate-400" />
                {isEditing ? (
                  <input type="text" name="office" value={formData.office} onChange={handleChange} className="w-full bg-transparent border-b border-indigo-300 outline-none" />
                ) : (
                  <span className="font-medium">{formData.office}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-800">Professional Details</h3>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="text-sm flex items-center gap-1.5 text-indigo-600 font-medium hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-500" /> Designation
                  </label>
                  <input type="text" name="designation" value={formData.designation} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none ${!isEditing ? 'bg-slate-50 border-transparent text-slate-700' : 'border-slate-300'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" /> Highest Qualification
                  </label>
                  <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none ${!isEditing ? 'bg-slate-50 border-transparent text-slate-700' : 'border-slate-300'}`} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Areas of Expertise</label>
                <input type="text" name="expertise" value={formData.expertise} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none ${!isEditing ? 'bg-slate-50 border-transparent text-slate-700' : 'border-slate-300'}`} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Office Hours</label>
                <input type="text" name="officeHours" value={formData.officeHours} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none ${!isEditing ? 'bg-slate-50 border-transparent text-slate-700' : 'border-slate-300'}`} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none ${!isEditing ? 'bg-slate-50 border-transparent text-slate-700' : 'border-slate-300'}`} rows={isEditing ? 4 : Math.max(3, formData.bio.split('\n').length)}></textarea>
              </div>
              
              {isEditing && (
                <div className="flex justify-end pt-4 gap-3">
                  <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button type="button" onClick={handleSave} disabled={loading} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50">
                    <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
