import React, {
  useEffect,
  useState,
} from 'react';

import AnnouncementPanel
  from '../../components/hod/AnnouncementPanel';

import {
  createAnnouncement,
  getAnnouncements,
} from '../../services/hodService';

const HodAnnouncements =
  () => {
    const [
      announcements,
      setAnnouncements,
    ] = useState([]);

    const [formData,
      setFormData] =
      useState({
        title: '',
        message: '',
        year: 1,
        section:
          'ALL',
      });

    const [
      loading,
      setLoading,
    ] =
      useState(false);

    const fetchAnnouncements =
      async () => {
        try {
          const data =
            await getAnnouncements();

          setAnnouncements(
            data
          );
        } catch (
          error
        ) {
          console.error(
            error
          );
        }
      };

    useEffect(() => {
      fetchAnnouncements();
    }, []);

    const handleChange =
      (e) => {
        setFormData({
          ...formData,
          [
          e.target
            .name
          ]:
            e.target
              .value,
        });
      };

    const handlePublish =
      async () => {
        try {
          setLoading(
            true
          );

          await createAnnouncement(
            formData
          );

          alert(
            'Announcement published successfully!'
          );

          setFormData(
            {
              title:
                '',
              message:
                '',
              year:
                1,
              section:
                'ALL',
            }
          );

          fetchAnnouncements();

        } catch (
          error
        ) {
          console.error(
            error
          );

          alert(
            'Failed to publish announcement'
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    return (
      <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Department Announcements
          </h1>

          <p className="text-slate-500 mt-1">
            Broadcast official information
            to faculty and students.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">

          <div className="lg:col-span-2 h-full overflow-hidden">
            <AnnouncementPanel
              announcements={
                announcements
              }
            />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Create Official Notice
              </h3>

              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={
                      formData.title
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    placeholder="Notice subject..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={
                      formData.message
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 h-32"
                    placeholder="Write message..."
                  />
                </div>

                <button
                  onClick={
                    handlePublish
                  }
                  disabled={
                    loading
                  }
                  className="w-full bg-emerald-600 text-white rounded-lg py-2.5 font-medium hover:bg-emerald-700"
                >
                  {loading
                    ? 'Publishing...'
                    : 'Publish Notice'}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default
HodAnnouncements;