// models/User.js

const mongoose =
  require('mongoose');

const bcrypt =
  require('bcryptjs');

const userSchema =
  new mongoose.Schema(
    {

      // =====================================
      // BASIC INFO
      // =====================================

      name: {
        type: String,

        required: [
          true,
          'Name is required',
        ],

        trim: true,

        minlength: [
          2,
          'Name must be at least 2 characters',
        ],

        maxlength: [
          100,
          'Name cannot exceed 100 characters',
        ],
      },

      email: {
        type: String,

        required: [
          true,
          'Email is required',
        ],

        unique: true,

        lowercase: true,

        trim: true,

        index: true,

        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,

          'Please enter a valid email',
        ],
      },

      password: {
        type: String,

        required: [
          true,
          'Password is required',
        ],

        minlength: [
          6,
          'Password must be at least 6 characters',
        ],

        select: false,
      },

      // =====================================
      // ROLE SYSTEM
      // =====================================

      role: {
        type: String,

        enum: [
          'student',
          'faculty',
          'hod',
          'coordinator',
          'admin',
          'superadmin',
        ],

        default:
          'student',

        required: true,

        index: true,
      },

      permissions: [
        {
          type: String,
        },
      ],

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'User',
      },

      // =====================================
      // ACADEMIC INFO
      // =====================================

      branch: {
        type: String,

        required: [
          true,
          'Branch is required',
        ],

        trim: true,

        uppercase: true,

        index: true,

        enum: [
          'CSE',
          'ECE',
          'EEE',
          'MECH',
          'CIVIL',
          'IT',
          'AIML',
          'DS',
        ],
      },

      year: {
        type: Number,

        min: 1,

        max: 4,

        validate: {

          validator:
            function (
              value
            ) {

              if (
                this.role ===
                'student'
              ) {

                return (
                  value !==
                  undefined
                );
              }

              return true;
            },

          message:
            'Year is required for students',
        },

        index: true,
      },

      section: {
        type: String,

        trim: true,

        uppercase: true,

        maxlength: 5,
      },

      semester: {
        type: Number,

        min: 1,

        max: 8,
      },

      rollNumber: {
        type: String,

        trim: true,

        uppercase: true,

        sparse: true,

        index: true,
      },

      designation: {
        type: String,

        trim: true,

        maxlength: 100,
      },

      department: {
        type: String,

        trim: true,
      },

      subjects: [
        {
          type:
            mongoose.Schema.Types.ObjectId,

          ref:
            'Subject',
        },
      ],

      // =====================================
      // PROFILE
      // =====================================

      profileImage: {
        type: String,

        default:
          'https://ui-avatars.com/api/?name=User',
      },

      bio: {
        type: String,

        maxlength: 500,

        default: '',
      },

      profileCompleted: {
        type: Boolean,

        default: false,
      },

      phoneNumber: {
        type: String,

        trim: true,

        match: [
          /^[0-9]{10}$/,

          'Please enter a valid phone number',
        ],
      },

      skills: [
        {
          type: String,

          trim: true,
        },
      ],

      achievements: [
        {
          type: String,

          trim: true,
        },
      ],

      socialLinks: {

        linkedin: {
          type: String,
        },

        github: {
          type: String,
        },

        portfolio: {
          type: String,
        },
      },

      // =====================================
      // ACCOUNT STATUS
      // =====================================

      isActive: {
        type: Boolean,

        default: true,

        index: true,
      },

      isVerified: {
        type: Boolean,

        default: false,
      },

      isDeleted: {
        type: Boolean,

        default: false,
      },

      deletedAt: {
        type: Date,
      },

      lastLogin: {
        type: Date,
      },

      lastActive: {
        type: Date,
      },

      passwordChangedAt: {
        type: Date,
      },

      refreshToken: {
        type: String,

        select: false,
      },

      // =====================================
      // OTP SYSTEM
      // =====================================

      otp: {
        type: String,
      },

      otpExpiry: {
        type: Date,
      },

      otpAttempts: {
        type: Number,

        default: 0,
      },

      // =====================================
      // PASSWORD RESET
      // =====================================

      resetPasswordToken: {
        type: String,
      },

      resetPasswordExpire: {
        type: Date,
      },

      // =====================================
      // SECURITY
      // =====================================

      loginAttempts: {
        type: Number,

        default: 0,
      },

      lockUntil: {
        type: Date,
      },

      lastLoginIP: {
        type: String,
      },

      lastLoginDevice: {
        type: String,
      },

      emailNotifications: {
        type: Boolean,

        default: true,
      },
    },

    {
      timestamps: true,
    }
  );

// =====================================
// INDEXES
// =====================================

userSchema.index({
  role: 1,
  branch: 1,
});

userSchema.index({
  branch: 1,
  year: 1,
});

userSchema.index({
  createdAt: -1,
});

userSchema.index({
  name: 'text',
  email: 'text',
  branch: 'text',
});

// =====================================
// ACCOUNT LOCK VIRTUAL
// =====================================

userSchema.virtual(
  'isLocked'
).get(function () {

  return !!(
    this.lockUntil &&
    this.lockUntil >
    Date.now()
  );
});

// =====================================
// HASH PASSWORD BEFORE SAVE
// =====================================

userSchema.pre(
  'save',

  async function (next) {

    if (
      !this.isModified(
        'password'
      )
    ) {

      return next();
    }

    const salt =
      await bcrypt.genSalt(
        12
      );

    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );

    next();
  }
);

// =====================================
// TRACK PASSWORD CHANGE
// =====================================

userSchema.pre(
  'save',

  function (next) {

    if (
      !this.isModified(
        'password'
      ) ||
      this.isNew
    ) {

      return next();
    }

    this.passwordChangedAt =
      Date.now() -
      1000;

    next();
  }
);

// =====================================
// COMPARE PASSWORD
// =====================================

userSchema.methods.comparePassword =
  async function (
    enteredPassword
  ) {

    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

// =====================================
// CHECK PASSWORD CHANGED
// =====================================

userSchema.methods.changedPasswordAfter =
  function (
    JWTTimestamp
  ) {

    if (
      this.passwordChangedAt
    ) {

      const changedTimestamp =
        parseInt(
          this.passwordChangedAt.getTime() /
          1000,

          10
        );

      return (
        JWTTimestamp <
        changedTimestamp
      );
    }

    return false;
  };

// =====================================
// REMOVE SENSITIVE FIELDS
// =====================================

userSchema.methods.toJSON =
  function () {

    const userObject =
      this.toObject();

    delete userObject.password;

    delete userObject.refreshToken;

    delete userObject.otp;

    delete userObject.otpExpiry;

    delete userObject.resetPasswordToken;

    delete userObject.resetPasswordExpire;

    delete userObject.__v;

    return userObject;
  };

const User =
  mongoose.model(
    'User',
    userSchema
  );

module.exports =
  User;