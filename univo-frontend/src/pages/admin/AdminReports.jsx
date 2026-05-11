import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import toast from 'react-hot-toast';

// COMPONENTS

import ReportsStats
  from '../../components/admin/reports/ReportsStats';

import ReportsFilters
  from '../../components/admin/reports/ReportsFilters';

import ReportsTable
  from '../../components/admin/reports/ReportsTable';

import ReportDetailsModal
  from '../../components/admin/reports/ReportDetailsModal';

// SERVICES

import {

  getReports,

  resolveReport,

  dismissReport,

  banUserFromReport,

} from '../../services/reportService';

// ======================================
// COMPONENT
// ======================================

const AdminReports = () => {

  // ======================================
  // STATES
  // ======================================

  const [
    reports,
    setReports
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
    statusFilter,
    setStatusFilter
  ] = useState('all');

  const [
    selectedReport,
    setSelectedReport
  ] = useState(null);

  // ======================================
  // FETCH REPORTS
  // ======================================

  const fetchReports =
    async () => {

      try {

        setLoading(true);

        const response =
          await getReports();

        setReports(
          response.data || []
        );

      } catch (error) {

        console.error(error);

        toast.error(
          'Failed to fetch reports'
        );

      } finally {

        setLoading(false);
      }
    };

  // ======================================
  // INITIAL LOAD
  // ======================================

  useEffect(() => {

    fetchReports();

  }, []);

  // ======================================
  // FILTERED REPORTS
  // ======================================

  const filteredReports =
    useMemo(() => {

      return reports.filter(
        (report) => {

          // SEARCH

          const matchesSearch =

            report.description
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              )

            ||

            report.targetUser
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              )

            ||

            report.reporter
              ?.toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              );

          // STATUS

          const matchesStatus =

            statusFilter === 'all'

              ? true

              : report.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    }, [

      reports,

      searchTerm,

      statusFilter,
    ]);

  // ======================================
  // STATS
  // ======================================

  const pendingCount =
    reports.filter(
      (r) =>
        r.status ===
        'pending'
    ).length;

  const resolvedCount =
    reports.filter(
      (r) =>
        r.status ===
        'resolved'
    ).length;

  const dismissedCount =
    reports.filter(
      (r) =>
        r.status ===
        'dismissed'
    ).length;

  const bannedCount =
    reports.filter(
      (r) =>
        r.status ===
        'banned'
    ).length;

  // ======================================
  // RESOLVE REPORT
  // ======================================

  const handleResolve =
    async (report) => {

      try {

        await resolveReport(
          report._id
        );

        toast.success(
          'Report resolved'
        );

        fetchReports();

      } catch (error) {

        console.error(error);

        toast.error(
          'Failed to resolve report'
        );
      }
    };

  // ======================================
  // DISMISS REPORT
  // ======================================

  const handleDismiss =
    async (report) => {

      try {

        await dismissReport(
          report._id
        );

        toast.success(
          'Report dismissed'
        );

        fetchReports();

      } catch (error) {

        console.error(error);

        toast.error(
          'Failed to dismiss report'
        );
      }
    };

  // ======================================
  // BAN USER
  // ======================================

  const handleBan =
    async (report) => {

      const confirmBan =
        window.confirm(
          'Are you sure you want to ban this user?'
        );

      if (!confirmBan)
        return;

      try {

        await banUserFromReport(
          report._id
        );

        toast.success(
          'User banned successfully'
        );

        fetchReports();

      } catch (error) {

        console.error(error);

        toast.error(
          'Failed to ban user'
        );
      }
    };

  // ======================================
  // VIEW REPORT
  // ======================================

  const handleView =
    (report) => {

      setSelectedReport(
        report
      );
    };

  // ======================================
  // CLOSE MODAL
  // ======================================

  const handleCloseModal =
    () => {

      setSelectedReport(
        null
      );
    };

  // ======================================
  // LOADING
  // ======================================

  if (loading) {

    return (

      <div className="
        flex
        items-center
        justify-center
        h-96
      ">

        <div className="
          text-slate-500
          text-lg
        ">
          Loading reports...
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

      <div>

        <h1 className="
          text-2xl
          font-bold
          text-slate-800
        ">
          Reports & Violations
        </h1>

        <p className="
          text-slate-500
          mt-1
        ">
          Manage user reports,
          violations, bans,
          and moderation actions.
        </p>

      </div>

      {/* STATS */}

      <ReportsStats

        pending={
          pendingCount
        }

        resolved={
          resolvedCount
        }

        dismissed={
          dismissedCount
        }

        bansIssued={
          bannedCount
        }

        setStatusFilter={
          setStatusFilter
        }
      />

      {/* FILTERS */}

      <ReportsFilters

        searchTerm={
          searchTerm
        }

        setSearchTerm={
          setSearchTerm
        }

        statusFilter={
          statusFilter
        }

        setStatusFilter={
          setStatusFilter
        }
      />

      {/* TABLE */}

      <ReportsTable

        reports={
          filteredReports
        }

        onResolve={
          handleResolve
        }

        onDismiss={
          handleDismiss
        }

        onBan={
          handleBan
        }

        onView={
          handleView
        }
      />

      {/* DETAILS MODAL */}

      <ReportDetailsModal

        report={
          selectedReport
        }

        onClose={
          handleCloseModal
        }
      />
    </div>
  );
};

export default AdminReports;