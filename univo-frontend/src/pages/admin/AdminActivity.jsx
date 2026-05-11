import React, {
  useEffect,
  useState,
} from 'react';

import toast from 'react-hot-toast';

import {
  Download,
} from 'lucide-react';

// COMPONENTS

import ActivityTimeline
  from '../../components/admin/activity/ActivityTimeline';

import ActivityFilters
  from '../../components/admin/activity/ActivityFilters';

import ActivitySearch
  from '../../components/admin/activity/ActivitySearch';

import ActivityDetailsModal
  from '../../components/admin/activity/ActivityDetailsModal';

import LoadMoreButton
  from '../../components/admin/activity/LoadMoreButton';

// SERVICES

import {

  getActivityLogs,

} from '../../services/activityService';

// ======================================
// COMPONENT
// ======================================

const AdminActivity = () => {

  // ======================================
  // STATES
  // ======================================

  const [
    activities,
    setActivities
  ] = useState([]);

  const [
    filteredActivities,
    setFilteredActivities
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    searchTerm,
    setSearchTerm
  ] = useState('');

  const [
    eventType,
    setEventType
  ] = useState('');

  const [
    selectedDate,
    setSelectedDate
  ] = useState('');

  const [
    page,
    setPage
  ] = useState(1);

  const [
    selectedActivity,
    setSelectedActivity
  ] = useState(null);

  const [
    modalOpen,
    setModalOpen
  ] = useState(false);

  // ======================================
  // FETCH ACTIVITIES
  // ======================================

  const fetchActivities =
    async (
      currentPage = 1
    ) => {

      try {

        setLoading(true);

        const response =
          await getActivityLogs({

            page:
              currentPage,

            limit:
              10,

            search:
              searchTerm,

            type:
              eventType,

            date:
              selectedDate,
          });

        const logs =
          response?.data || [];

        if (
          currentPage === 1
        ) {

          setActivities(logs);

        } else {

          setActivities(
            (prev) => [
              ...prev,
              ...logs,
            ]
          );
        }

      } catch (error) {

        console.error(error);

        toast.error(
          'Failed to load activity logs'
        );

      } finally {

        setLoading(false);
      }
    };

  // ======================================
  // INITIAL LOAD
  // ======================================

  useEffect(() => {

    fetchActivities(1);

  }, []);

  // ======================================
  // FILTER LOGS
  // ======================================

  useEffect(() => {

    let data =
      [...activities];

    // SEARCH

    if (searchTerm) {

      data =
        data.filter(
          (item) =>

            item.message
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              ) ||

            item.user
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              )
        );
    }

    // EVENT TYPE

    if (eventType) {

      data =
        data.filter(
          (item) =>
            item.type ===
            eventType
        );
    }

    // DATE

    if (selectedDate) {

      data =
        data.filter(
          (item) => {

            const itemDate =
              new Date(
                item.createdAt
              )
                .toISOString()
                .split('T')[0];

            return (
              itemDate ===
              selectedDate
            );
          }
        );
    }

    setFilteredActivities(
      data
    );

  }, [

    activities,

    searchTerm,

    eventType,

    selectedDate,
  ]);

  // ======================================
  // VIEW DETAILS
  // ======================================

  const handleViewDetails =
    (activity) => {

      setSelectedActivity(
        activity
      );

      setModalOpen(
        true
      );
    };

  // ======================================
  // LOAD MORE
  // ======================================

  const handleLoadMore =
    () => {

      const nextPage =
        page + 1;

      setPage(nextPage);

      fetchActivities(
        nextPage
      );
    };

  // ======================================
  // EXPORT CSV
  // ======================================

  const handleExport =
    () => {

      try {

        const csvRows = [

          [
            'Message',
            'User',
            'Type',
            'Time',
          ],

          ...filteredActivities.map(
            (item) => [

              item.message,

              item.user,

              item.type,

              item.time,
            ]
          ),
        ];

        const csvContent =
          csvRows
            .map(
              (row) =>
                row.join(',')
            )
            .join('\n');

        const blob =
          new Blob(
            [csvContent],
            {
              type:
                'text/csv;charset=utf-8;',
            }
          );

        const url =
          URL.createObjectURL(
            blob
          );

        const link =
          document.createElement(
            'a'
          );

        link.href =
          url;

        link.download =
          'activity_logs.csv';

        link.click();

        toast.success(
          'Activity logs exported'
        );

      } catch (error) {

        console.error(error);

        toast.error(
          'Export failed'
        );
      }
    };

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
        sm:flex-row
        justify-between
        items-start
        sm:items-center
        gap-4
      ">

        <div>

          <h1 className="
            text-2xl
            font-bold
            text-slate-800
          ">
            System Activity Logs
          </h1>

          <p className="
            text-slate-500
            mt-1
          ">
            Audit trail of all
            administrative and
            user actions across
            the platform.
          </p>

        </div>

        <button

          onClick={
            handleExport
          }

          className="
            flex
            items-center
            gap-2
            bg-white
            border
            border-slate-200
            text-slate-600
            px-4
            py-2.5
            rounded-lg
            font-medium
            hover:bg-slate-50
            transition-colors
            shadow-sm
          "
        >

          <Download size={18} />

          Export Logs

        </button>

      </div>

      {/* MAIN CARD */}

      <div className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        overflow-hidden
      ">

        {/* FILTERS */}

        <div className="
          p-5
          border-b
          border-slate-100
          bg-slate-50/50
          flex
          flex-col
          lg:flex-row
          gap-4
          justify-between
        ">

          {/* SEARCH */}

          <div className="
            w-full
            lg:max-w-xl
          ">

            <ActivitySearch

              searchTerm={
                searchTerm
              }

              setSearchTerm={
                setSearchTerm
              }
            />

          </div>

          {/* FILTERS */}

          <ActivityFilters

            eventType={
              eventType
            }

            setEventType={
              setEventType
            }

            selectedDate={
              selectedDate
            }

            setSelectedDate={
              setSelectedDate
            }
          />

        </div>

        {/* TIMELINE */}

        <div className="
          p-6
        ">

          {loading &&
            activities.length ===
            0 ? (

            <div className="
              text-center
              py-20
              text-slate-500
            ">
              Loading activity logs...
            </div>

          ) : (

            <ActivityTimeline

              activities={
                filteredActivities
              }

              onView={
                handleViewDetails
              }
            />
          )}

          {/* LOAD MORE */}

          <LoadMoreButton

            onClick={
              handleLoadMore
            }

            loading={
              loading
            }
          />

        </div>

      </div>

      {/* DETAILS MODAL */}

      <ActivityDetailsModal

        open={
          modalOpen
        }

        onClose={() =>
          setModalOpen(false)
        }

        activity={
          selectedActivity
        }
      />

    </div>
  );
};

export default AdminActivity;