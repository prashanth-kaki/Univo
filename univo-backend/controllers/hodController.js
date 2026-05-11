const User = require('../models/User');
const Subject = require('../models/Subject');
const Resource = require('../models/Resource');
const Task = require('../models/Task');
const Announcement = require('../models/Announcement');

// =====================================
// GET DASHBOARD STATS
// =====================================

exports.getDepartmentStats =
  async (req, res) => {
    try {
      const branch =
        req.user.branch;

      const [
        totalStudents,
        totalFaculty,
        totalSubjects,
        resourcesUploaded,
        pendingTasks,
        activeAnnouncements,
      ] = await Promise.all([
        User.countDocuments({
          role: 'student',
          branch,
          isActive: true,
        }),

        User.countDocuments({
          role: 'faculty',
          branch,
          isActive: true,
        }),

        Subject.countDocuments({
          branch,
          isActive: true,
        }),

        Resource.countDocuments({
          isActive: true,
        }),

        Task.countDocuments({
          branch,
          isActive: true,
        }),

        Announcement.countDocuments({
          branch,
          isActive: true,
        }),
      ]);

      res.status(200).json({
        success: true,
        data: {
          totalStudents,
          totalFaculty,
          totalSubjects,
          resourcesUploaded,
          pendingTasks,
          activeAnnouncements,
          attendancePercent: 92,
          flaggedPosts: 5,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          'Failed to fetch department stats',
      });
    }
  };

// =====================================
// GET FACULTY LIST
// =====================================

exports.getFacultyList =
  async (req, res) => {
    try {
      const faculty =
        await User.find({
          role: 'faculty',
          branch:
            req.user.branch,
          isActive: true,
        }).select(
          'name designation subjects isActive'
        );

      const formattedFaculty =
        await Promise.all(
          faculty.map(
            async (teacher) => {
              const uploads =
                await Resource.countDocuments(
                  {
                    uploadedBy:
                      teacher._id,
                  }
                );

              return {
                id:
                  teacher._id,
                name:
                  teacher.name,
                role:
                  teacher.designation ||
                  'Faculty',
                subjects:
                  teacher.subjects
                    ?.length || 0,
                uploads,
                status:
                  teacher.isActive
                    ? 'Active'
                    : 'Inactive',
              };
            }
          )
        );

      res.status(200).json({
        success: true,
        data:
          formattedFaculty,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          'Failed to fetch faculty list',
      });
    }
  };

// =====================================
// GET DEPARTMENT ACTIVITY
// =====================================

exports.getDepartmentActivity =
  async (req, res) => {
    try {
      const recentResources =
        await Resource.find()
          .populate(
            'uploadedBy',
            'name'
          )
          .sort({
            createdAt: -1,
          })
          .limit(5);

      const activities =
        recentResources.map(
          (
            resource,
            index
          ) => ({
            id: index + 1,
            user:
              resource
                .uploadedBy
                ?.name ||
              'Faculty',
            action: `uploaded ${resource.title}`,
            time:
              resource.createdAt.toLocaleString(),
            type:
              'resource',
          })
        );

      res.status(200).json({
        success: true,
        data: activities,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          'Failed to fetch activity',
      });
    }
  };

// =====================================
// GET ANALYTICS
// =====================================

exports.getDepartmentAnalytics =
  async (req, res) => {
    try {
      const faculty =
        await User.find({
          role: 'faculty',
          branch:
            req.user.branch,
        });

      const facultyUploads =
        await Promise.all(
          faculty.map(
            async (teacher) => {
              const uploads =
                await Resource.countDocuments(
                  {
                    uploadedBy:
                      teacher._id,
                  }
                );

              return {
                name:
                  teacher.name,
                uploads,
              };
            }
          )
        );

      res.status(200).json({
        success: true,
        data: {
          attendanceTrends:
            [
              {
                name:
                  'Week 1',
                'Year 1': 95,
                'Year 2': 92,
                'Year 3': 89,
                'Year 4': 87,
              },
              {
                name:
                  'Week 2',
                'Year 1': 93,
                'Year 2': 91,
                'Year 3': 88,
                'Year 4': 84,
              },
              {
                name:
                  'Week 3',
                'Year 1': 94,
                'Year 2': 90,
                'Year 3': 87,
                'Year 4': 85,
              },
            ],

          facultyUploads,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          'Failed to fetch analytics',
      });
    }
  };

// =====================================
// CREATE ANNOUNCEMENT
// =====================================

exports.createAnnouncement =
  async (req, res) => {
    try {
      const {
        title,
        message,
        year,
        section,
      } = req.body;

      const announcement =
        await Announcement.create(
          {
            title,
            message,
            sender:
              req.user._id,
            senderRole:
              'hod',
            branch:
              req.user.branch,
            year:
              year || 1,
            section:
              section ||
              'ALL',
            visibility:
              'branch-wide',
          }
        );

      res.status(201).json({
        success: true,
        message:
          'Announcement published',
        data:
          announcement,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          'Failed to publish announcement',
      });
    }
  };

// =====================================
// GET ANNOUNCEMENTS
// =====================================

exports.createFaculty =
  async (
    req,
    res
  ) => {
    try {
      const {
        name,
        email,
        password,
        designation,
      } = req.body;

      // check if faculty already exists
      const existingUser =
        await User.findOne({
          email,
        });

      if (
        existingUser
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              'Faculty already exists',
          });
      }

      // create faculty
      const faculty =
        await User.create({
          name,
          email,
          password,
          designation,

          role:
            'faculty',

          branch:
            req.user.branch,

          createdBy:
            req.user._id,

          isVerified:
            true,

          isActive:
            true,
        });

      res.status(
        201
      ).json({
        success:
          true,

        message:
          'Faculty created successfully',

        data:
          faculty,
      });
    } catch (
      error
    ) {
      console.error(
        error
      );

      res.status(
        500
      ).json({
        success:
          false,

        message:
          error.message,
      });
    }
  };

exports.getAnnouncements =
  async (req, res) => {
    try {
      const announcements =
        await Announcement.find({
          branch:
            req.user.branch,
          isActive: true,
        })
          .populate(
            'sender',
            'name'
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        data:
          announcements,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          'Failed to fetch announcements',
      });
    }
  };