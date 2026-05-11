import React, {
  useEffect,
  useState,
} from 'react';

import toast from 'react-hot-toast';

// COMPONENTS

import AnalyticsStats
  from '../../components/admin/analytics/AnalyticsStats';

import AnalyticsFilters
  from '../../components/admin/analytics/AnalyticsFilters';

import UserGrowthChart
  from '../../components/admin/analytics/UserGrowthChart';

import DepartmentEngagementChart
  from '../../components/admin/analytics/DepartmentEngagementChart';

import ContentDistributionChart
  from '../../components/admin/analytics/ContentDistributionChart';

import PeakActivityChart
  from '../../components/admin/analytics/PeakActivityChart';

import AnalyticsExportButton
  from '../../components/admin/analytics/AnalyticsExportButton';

// SERVICES

import {

  getOverviewAnalytics,

  getUserGrowthAnalytics,

  getDepartmentAnalytics,

  getContentDistributionAnalytics,

  getPeakActivityAnalytics,

} from '../../services/analyticsService';

// ======================================
// COMPONENT
// ======================================

const AdminAnalytics = () => {

  // ======================================
  // STATES
  // ======================================

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    timeFilter,
    setTimeFilter
  ] = useState('7days');

  const [
    overview,
    setOverview
  ] = useState({

    totalEngagement:
      '0',

    contentCreated:
      '0',

    avgSessionTime:
      '0m',

    dailyActiveUsers:
      '0',
  });

  const [
    userGrowthData,
    setUserGrowthData
  ] = useState([]);

  const [
    departmentData,
    setDepartmentData
  ] = useState([]);

  const [
    contentData,
    setContentData
  ] = useState([]);

  const [
    activityData,
    setActivityData
  ] = useState([]);

  // ======================================
  // FETCH ANALYTICS
  // ======================================

  const fetchAnalytics =
    async () => {

      try {

        setLoading(true);

        // ======================================
        // FETCH ALL ANALYTICS
        // ======================================

        const [

          overviewRes,

          userGrowthRes,

          departmentRes,

          contentRes,

          activityRes,

        ] = await Promise.all([

          getOverviewAnalytics(
            timeFilter
          ),

          getUserGrowthAnalytics(
            timeFilter
          ),

          getDepartmentAnalytics(
            timeFilter
          ),

          getContentDistributionAnalytics(
            timeFilter
          ),

          getPeakActivityAnalytics(
            timeFilter
          ),
        ]);

        // ======================================
        // SET STATES
        // ======================================

        setOverview(
          overviewRes.data
        );

        setUserGrowthData(
          userGrowthRes.data
        );

        setDepartmentData(
          departmentRes.data
        );

        setContentData(
          contentRes.data
        );

        setActivityData(
          activityRes.data
        );

      } catch (error) {

        console.error(error);

        toast.error(
          'Failed to load analytics'
        );

      } finally {

        setLoading(false);
      }
    };

  // ======================================
  // LOAD DATA
  // ======================================

  useEffect(() => {

    fetchAnalytics();

  }, [timeFilter]);

  // ======================================
  // LOADING
  // ======================================

  if (loading) {

    return (

      <div className="
        flex
        items-center
        justify-center
        h-[500px]
      ">

        <div className="
          text-slate-500
          text-lg
          font-medium
        ">
          Loading analytics...
        </div>

      </div>
    );
  }

  // ======================================
  // RENDER
  // ======================================

  return (

    <div className="
      flex
      flex-col
      gap-6
    ">

      {/* HEADER */}

      <div className="
        flex
        flex-col
        lg:flex-row
        justify-between
        items-start
        lg:items-center
        gap-4
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            text-slate-800
          ">
            Platform Analytics
          </h1>

          <p className="
            text-slate-500
            mt-1
          ">
            Deep insights into
            engagement, activity,
            and platform growth.
          </p>

        </div>

        <div className="
          flex
          items-center
          gap-3
          w-full
          lg:w-auto
        ">

          {/* FILTERS */}

          <AnalyticsFilters

            timeFilter={
              timeFilter
            }

            setTimeFilter={
              setTimeFilter
            }
          />

          {/* EXPORT */}

          <AnalyticsExportButton

            analytics={
              overview
            }
          />

        </div>
      </div>

      {/* STATS */}

      <AnalyticsStats
        analytics={
          overview
        }
      />

      {/* CHARTS */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      ">

        {/* USER GROWTH */}

        <UserGrowthChart
          data={
            userGrowthData
          }
        />

        {/* DEPARTMENT */}

        <DepartmentEngagementChart
          data={
            departmentData
          }
        />

        {/* CONTENT */}

        <ContentDistributionChart
          data={
            contentData
          }
        />

        {/* ACTIVITY */}

        <PeakActivityChart
          data={
            activityData
          }
        />

      </div>
    </div>
  );
};

export default AdminAnalytics;