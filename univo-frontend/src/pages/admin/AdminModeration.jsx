import React, {
  useState,
  useMemo,
} from 'react';

import toast from 'react-hot-toast';

// COMPONENTS

import ModerationStats
  from '../../components/admin/moderation/ModerationStats';

import ModerationFilters
  from '../../components/admin/moderation/ModerationFilters';

import ModerationTable
  from '../../components/admin/moderation/ModerationTable';

import ModerationReviewModal
  from '../../components/admin/moderation/ModerationReviewModal';

// ======================================
// MOCK DATA
// ======================================

const initialFlags = [

  {
    id: '1',

    content:
      'Buy cheap assignment solutions here! Link in bio.',

    type:
      'Comment',

    reason:
      'Spam/Advertising',

    confidence:
      98,

    status:
      'auto-hidden',

    author:
      'anonymous_user',

    createdAt:
      '2026-05-10 10:30 AM',
  },

  {
    id: '2',

    content:
      'You guys are completely stupid if you think this works.',

    type:
      'Forum Post',

    reason:
      'Harassment/Toxicity',

    confidence:
      85,

    status:
      'pending-review',

    author:
      'student_204',

    createdAt:
      '2026-05-10 11:10 AM',
  },

  {
    id: '3',

    content:
      'Uploaded file: final_exam_answers.pdf',

    type:
      'Resource',

    reason:
      'Academic Dishonesty',

    confidence:
      92,

    status:
      'pending-review',

    author:
      'faculty_12',

    createdAt:
      '2026-05-10 12:00 PM',
  },
];

// ======================================
// COMPONENT
// ======================================

const AdminModeration = () => {

  // ======================================
  // STATES
  // ======================================

  const [
    aiModerationEnabled,
    setAiModerationEnabled
  ] = useState(true);

  const [
    moderationFlags,
    setModerationFlags
  ] = useState(initialFlags);

  const [
    selectedReason,
    setSelectedReason
  ] = useState('all');

  const [
    selectedFlag,
    setSelectedFlag
  ] = useState(null);

  // ======================================
  // FILTERED FLAGS
  // ======================================

  const filteredFlags =
    useMemo(() => {

      if (
        selectedReason === 'all'
      ) {
        return moderationFlags;
      }

      return moderationFlags.filter(
        (flag) =>
          flag.reason ===
          selectedReason
      );

    }, [
      moderationFlags,
      selectedReason
    ]);

  // ======================================
  // COUNTS
  // ======================================

  const pendingCount =
    moderationFlags.filter(
      (flag) =>
        flag.status ===
        'pending-review'
    ).length;

  const autoResolvedCount =
    moderationFlags.filter(
      (flag) =>
        flag.status ===
        'resolved'
    ).length;

  // ======================================
  // TOGGLE AI
  // ======================================

  const handleToggleAI =
    () => {

      setAiModerationEnabled(
        !aiModerationEnabled
      );

      toast.success(
        !aiModerationEnabled
          ? 'AI Moderation Enabled'
          : 'AI Moderation Disabled'
      );
    };

  // ======================================
  // APPROVE
  // ======================================

  const handleApprove =
    (id) => {

      setModerationFlags(
        moderationFlags.map(
          (flag) =>

            flag.id === id
              ? {
                ...flag,
                status:
                  'resolved',
              }
              : flag
        )
      );

      toast.success(
        'Content restored successfully'
      );
    };

  // ======================================
  // REJECT
  // ======================================

  const handleReject =
    (id) => {

      const confirmDelete =
        window.confirm(
          'Confirm content removal?'
        );

      if (
        !confirmDelete
      ) return;

      setModerationFlags(
        moderationFlags.map(
          (flag) =>

            flag.id === id
              ? {
                ...flag,
                status:
                  'rejected',
              }
              : flag
        )
      );

      toast.success(
        'Content removed successfully'
      );
    };

  // ======================================
  // VIEW DETAILS
  // ======================================

  const handleViewDetails =
    (flag) => {

      setSelectedFlag(flag);
    };

  // ======================================
  // CLOSE MODAL
  // ======================================

  const handleCloseModal =
    () => {

      setSelectedFlag(null);
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

      <div>

        <h1 className="
          text-2xl
          font-bold
          text-slate-800
        ">
          Content Moderation & AI
        </h1>

        <p className="
          text-slate-500
          mt-1
        ">
          Review AI-flagged content and manage automated moderation rules.
        </p>

      </div>

      {/* STATS */}

      <ModerationStats

        aiModerationEnabled={
          aiModerationEnabled
        }

        pendingCount={
          pendingCount
        }

        autoResolvedCount={
          autoResolvedCount
        }

        onToggleAI={
          handleToggleAI
        }
      />

      {/* FILTERS */}

      <ModerationFilters

        selectedReason={
          selectedReason
        }

        setSelectedReason={
          setSelectedReason
        }
      />

      {/* TABLE */}

      <ModerationTable

        flags={
          filteredFlags
        }

        onApprove={
          handleApprove
        }

        onReject={
          handleReject
        }

        onViewDetails={
          handleViewDetails
        }
      />

      {/* REVIEW MODAL */}

      <ModerationReviewModal

        selectedFlag={
          selectedFlag
        }

        onClose={
          handleCloseModal
        }
      />
    </div>
  );
};

export default AdminModeration;