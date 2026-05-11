const multer = require("multer");

const path = require("path");

const multerS3 = require("multer-s3");

const { s3Client } = require("./s3");

// ======================================
// S3 STORAGE
// ======================================

const storage = multerS3({

  s3: s3Client,

  bucket:
    process.env.AWS_S3_BUCKET_NAME,

  contentType:
    multerS3.AUTO_CONTENT_TYPE,

  metadata: function (
    req,
    file,
    cb
  ) {

    cb(null, {

      fieldName:
        file.fieldname,
    });
  },

  key: function (
    req,
    file,
    cb
  ) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(
        Math.random() * 1e9
      );

    const userName =
      req.user.name
        .replace(/\s+/g, "-");

    let filePath;

    if (req.originalUrl.includes("/tasks") || req.originalUrl.includes("/submissions")) {
      const folderName = req.originalUrl.includes("/submissions") ? "submissions" : "tasks";
      filePath = `${folderName}/${userName}/${uniqueName}${path.extname(file.originalname)}`;
    } else {
      const year = req.body.year || "general";
      const subject = req.body.subjectName ? req.body.subjectName.replace(/\s+/g, "-") : "general";
      filePath = `resources/${userName}/year-${year}/${subject}/${uniqueName}${path.extname(file.originalname)}`;
    }

    cb(
      null,
      filePath
    );
  },
});

// ======================================
// FILE FILTER
// ======================================

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedMimeTypes = [

    "application/pdf",

    "image/png",

    "image/jpeg",

    "image/jpg",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (
    allowedMimeTypes.includes(
      file.mimetype
    )
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Unsupported file type"
      ),
      false
    );
  }
};

// ======================================
// MULTER CONFIG
// ======================================

const upload = multer({

  storage,

  limits: {

    fileSize:
      20 * 1024 * 1024,
  },

  fileFilter,
});

module.exports = upload;