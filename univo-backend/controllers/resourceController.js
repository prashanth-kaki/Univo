const Resource = require("../models/Resource");

// ======================================
// CREATE RESOURCE
// ======================================

exports.createResource = async (
  req,
  res
) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const resource =
      await Resource.create({

        title: req.body.title,

        subject:
          req.body.subject,

        subjectName:
          req.body.subjectName,

        uploadedBy:
          req.user._id,

        facultyName:
          req.user.name,

        department:
          req.body.department,

        year:
          req.body.year,

        semester:
          req.body.semester,

        section:
          req.body.section,

        type:
          req.body.type,

        description:
          req.body.description,

        file: {

          filename:
            req.file.key,

          originalName:
            req.file.originalname,

          url:
            req.file.location,

          key:
            req.file.key,

          size:
            req.file.size,

          mimetype:
            req.file.mimetype,
        },
      });

    res.status(201).json({

      success: true,

      message:
        "Resource uploaded successfully",

      data: resource,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

// ======================================
// GET ALL RESOURCES
// ======================================

exports.getResources = async (
  req,
  res
) => {
  try {

    const resources =
      await Resource.find()

        .populate(
          "uploadedBy",
          "name email"
        )

        .sort({
          createdAt: -1,
        });

    res.status(200).json({

      success: true,

      count:
        resources.length,

      data:
        resources,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

// ======================================
// GET FACULTY RESOURCES
// ======================================

exports.getFacultyResources =
  async (req, res) => {

    try {

      const resources =
        await Resource.find({

          uploadedBy:
            req.user._id,
        })

          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        count:
          resources.length,

        data:
          resources,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

// ======================================
// GET STUDENT RESOURCES
// ======================================

exports.getStudentResources =
  async (req, res) => {

    try {

      const resources =
        await Resource.find({

          year:
            req.user.year,

          department:
            req.user.department,

          $or: [

            {
              section:
                req.user.section,
            },

            {
              section:
                {
                  $exists: false,
                },
            },
          ],
        })

          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        count:
          resources.length,

        data:
          resources,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

// ======================================
// GET SINGLE RESOURCE
// ======================================

exports.getResourceById =
  async (req, res) => {

    try {

      const resource =
        await Resource.findById(
          req.params.id
        );

      if (!resource) {

        return res.status(404).json({

          success: false,

          message:
            "Resource not found",
        });
      }

      res.status(200).json({

        success: true,

        data:
          resource,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

// ======================================
// UPDATE RESOURCE
// ======================================

exports.updateResource =
  async (req, res) => {

    try {

      const resource =
        await Resource.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        );

      res.status(200).json({

        success: true,

        message:
          "Resource updated successfully",

        data:
          resource,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

// ======================================
// DELETE RESOURCE
// ======================================

exports.deleteResource =
  async (req, res) => {

    try {

      const resource =
        await Resource.findById(
          req.params.id
        );

      if (!resource) {

        return res.status(404).json({

          success: false,

          message:
            "Resource not found",
        });
      }

      await resource.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "Resource deleted successfully",
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };