import React, { useEffect, useState } from 'react';
import BookmarkCard from '../../components/student/BookmarkCard';
import { getBookmarks } from '../../services/studentService';
import { Bookmark } from 'lucide-react';

const StudentBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const data = await getBookmarks();
        // Assume API returns items in a generic format or map them if needed
        setBookmarks(data);
      } catch (err) {
        console.error("Failed to fetch bookmarks");
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Saved Items</h1>
        <p className="text-slate-500 mt-1">Quick access to your bookmarked resources, announcements, and discussions.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 min-h-[500px]">
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-20 bg-slate-50 border border-slate-100 rounded-xl animate-pulse"></div>)}
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map(item => (
              <BookmarkCard key={item.id} item={item} />
            ))}
            {bookmarks.length === 0 && (
              <div className="text-center py-16">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">You haven't bookmarked any items yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentBookmarks;
