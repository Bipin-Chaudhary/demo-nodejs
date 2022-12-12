const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema(
  {
    sName: { type: String, required: true },
    sEmail: { type: String, required: true },
    sPassword: { type: String, required: true },
    sMobile: { type: String, required: true },
    sProfilePic: { type: String }
  },
  { timestamps: true }
)

UsersSchema.index({ sEmail: -1 }, { unique: true })
UsersSchema.index({ sMobile: -1 }, { unique: true })

module.exports = mongoose.model('users', UsersSchema)
