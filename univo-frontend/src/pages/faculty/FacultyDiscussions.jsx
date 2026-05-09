import React from 'react';
import DiscussionPanel from '../../components/faculty/DiscussionPanel';

const FacultyDiscussions = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Student Discussions</h1>
        <p className="text-slate-500 mt-1">Answer doubts and moderate classroom forums.</p>
      </div>

      <div className="flex-1 min-h-0">
        <DiscussionPanel />
      </div>
    </div>
  );
};

export default FacultyDiscussions;
