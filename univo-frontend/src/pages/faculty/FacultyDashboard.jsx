import React, { useEffect, useState } from 'react';
import FacultyStats from '../../components/faculty/FacultyStats';
import UpcomingClasses from '../../components/faculty/UpcomingClasses';
import AssignmentTable from '../../components/faculty/AssignmentTable';
import DiscussionPanel from '../../components/faculty/DiscussionPanel';
import AnnouncementPanel from '../../components/faculty/AnnouncementPanel';
import { getDashboardStats, getUpcomingClasses, getAssignments, getAnnouncements } from '../../services/facultyService';

const FacultyDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, classesData, assignmentsData, announcementsData] = await Promise.all([
          getDashboardStats(),
          getUpcomingClasses(),
          getAssignments(),
          getAnnouncements()
        ]);
        
        setStats(statsData);
        setClasses(classesData);
        setAssignments(assignmentsData.slice(0, 3)); // Only show recent 3
        setAnnouncements(announcementsData || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, Faculty! 👋</h1>
        <p className="text-slate-500 mt-1">Here is your overview for today.</p>
      </div>

      <FacultyStats stats={stats} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[400px]">
        <div className="lg:col-span-2 h-full">
          <AssignmentTable assignments={assignments} loading={loading} />
        </div>
        <div className="h-full">
          <UpcomingClasses classes={classes} loading={loading} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[450px]">
        <div className="h-full">
          <DiscussionPanel />
        </div>
        <div className="h-full">
          <AnnouncementPanel announcements={announcements} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
