const Subject =
  require(
    '../models/Subject'
  );

const User =
  require(
    '../models/User'
  );

// ======================================
// CREATE SUBJECT + ASSIGN FACULTY
// ======================================

exports.createSubject =
  async (
    req,
    res
  ) => {
    try {
      const {
        name,
        code,
        faculty,
        year,
        semester,
        section,
        credits,
      } = req.body;

      // faculty check
      const facultyUser =
        await User.findById(
          faculty
        );

      if (
        !facultyUser
      ) {
        return res
          .status(
            404
          )
          .json({
            success:
              false,
            message:
              'Faculty not found',
          });
      }

      const subject =
        await Subject.create(
          {
            name,
            code,
            faculty,

            branch:
              req.user
                .branch,

            year,
            semester,
            section,

            credits:
              credits ||
              3,
          }
        );

      res.status(
        201
      ).json({
        success:
          true,

        message:
          'Subject allocated successfully',

        data:
          subject,
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

// ======================================
// GET SUBJECTS
// ======================================

exports.getSubjects =
  async (
    req,
    res
  ) => {
    try {
      const subjects =
        await Subject.find(
          {
            branch:
              req.user
                .branch,
          }
        )
          .populate(
            'faculty',
            'name email designation'
          )
          .sort({
            createdAt:
              -1,
          });

      res.status(
        200
      ).json({
        success:
          true,
        data:
          subjects,
      });
    } catch (
      error
    ) {
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

// ======================================
// GET ONE SUBJECT
// ======================================

exports.getSubjectById =
  async (
    req,
    res
  ) => {
    try {
      const subject =
        await Subject.findById(
          req.params.id
        ).populate(
          'faculty'
        );

      res.json({
        success:
          true,
        data:
          subject,
      });
    } catch (
      error
    ) {
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

// ======================================
// UPDATE SUBJECT
// ======================================

exports.updateSubject =
  async (
    req,
    res
  ) => {
    try {
      const subject =
        await Subject.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new:
              true,
          }
        );

      res.json({
        success:
          true,
        message:
          'Subject updated successfully',
        data:
          subject,
      });
    } catch (
      error
    ) {
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

// ======================================
// DELETE SUBJECT
// ======================================

exports.deleteSubject =
  async (
    req,
    res
  ) => {
    try {
      await Subject.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success:
          true,
        message:
          'Subject deleted successfully',
      });
    } catch (
      error
    ) {
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