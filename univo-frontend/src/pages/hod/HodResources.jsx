import React, { useEffect, useState } from 'react';
import ResourceModeration from '../../components/hod/ResourceModeration';
import { getModerationQueue } from '../../services/hodService';

const HodResources = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getModerationQueue();
        setQueue(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Resource Moderation</h1>
        <p className="text-slate-500 mt-1">Review flagged materials and monitor uploads.</p>
      </div>

      <div className="flex-1 min-h-0">
        <ResourceModeration queue={queue} loading={loading} onRefresh={() => {
          setLoading(true);
          getModerationQueue().then(setQueue).finally(() => setLoading(false));
        }} />
      </div>
    </div>
  );
};

export default HodResources;
