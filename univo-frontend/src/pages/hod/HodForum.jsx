import React, { useEffect, useState } from 'react';
import ForumModeration from '../../components/hod/ForumModeration';
import { getModerationQueue } from '../../services/hodService';

const HodForum = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const data = await getModerationQueue();
        setQueue(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQueue();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Community Moderation</h1>
        <p className="text-slate-500 mt-1">Review flagged discussions to maintain academic integrity.</p>
      </div>

      <div className="flex-1 min-h-0">
        <ForumModeration queue={queue} loading={loading} />
      </div>
    </div>
  );
};

export default HodForum;
