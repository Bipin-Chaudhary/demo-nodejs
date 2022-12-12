const multer = require('multer')
const fs = require('fs')

const multerService = (path) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const dir = `./uploads/${path}`

        fs.access(dir, (err) => {
          if (err) return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir))
          return cb(null, dir)
        })
      },

      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      }
    })

    const fileFilter = function (req, file, cb) {
      if (
        file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/svg' ||
                file.mimetype === 'image/gif'
      ) {
        cb(null, true)
      } else {
        cb(
          new Error(
            'Please upload profile picture with extension jpg,jpeg,png,svg,gif'
          ),
          false
        )
      }
    }

    const upload = multer({ storage, fileFilter, limits: { fileSize: 2000000 } }) // 2 mb
    return upload
  } catch (error) {
    return error
  }
}

// const handleMulterError = () => {

// }

module.exports = { multerService }
