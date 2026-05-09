// src/services/announcementService.js

import api from "./api";

// ======================================
// GET ALL ANNOUNCEMENTS
// ======================================

export const getAnnouncements =
  async () => {

    const response =
      await api.get(
        "/announcements"
      );

    return response.data;
  };

// ======================================
// CREATE ANNOUNCEMENT
// ======================================

export const postAnnouncement =
  async (data) => {

    const response =
      await api.post(
        "/announcements",
        data
      );

    return response.data;
  };

// ======================================
// UPDATE ANNOUNCEMENT
// ======================================

export const updateAnnouncement =
  async (id, data) => {

    const response =
      await api.put(
        `/announcements/${id}`,
        data
      );

    return response.data;
  };

// ======================================
// DELETE ANNOUNCEMENT
// ======================================

export const deleteAnnouncement =
  async (id) => {

    const response =
      await api.delete(
        `/announcements/${id}`
      );

    return response.data;
  };

// ======================================
// PIN / UNPIN
// ======================================

export const togglePinAnnouncement =
  async (id) => {

    const response =
      await api.patch(
        `/announcements/${id}/pin`
      );

    return response.data;
  };

// ======================================
// SEND NOTIFICATION
// ======================================

export const sendAnnouncementNotification =
  async (id) => {

    const response =
      await api.post(
        `/announcements/${id}/notify`
      );

    return response.data;
  };
export const reactToAnnouncement = async (
  announcementId,
  reaction
) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const response =
    await fetch(
      `http://localhost:5000/api/announcements/${announcementId}/react`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          reaction,
        }),
      }
    );

  return response.json();
};