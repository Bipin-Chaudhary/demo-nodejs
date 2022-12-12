const UsersModel = require('./model')
const bcrypt = require('bcryptjs')
const statusCode = require('../../utils/statusCode')
const messages = require('../../utils/response')
const { validationResult } = require('express-validator')

const UsersController = {}

UsersController.signup = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(statusCode.UnprocessableEntity).json({ status: statusCode.UnprocessableEntity, errors: errors.array() })

    const { sName, sEmail, sMobile } = req.body
    let { sPassword } = req.body

    sPassword = await bcrypt.hash(sPassword, 10)
    const sProfilePic = req?.file?.path

    const userExist = await UsersModel.findOne({ sEmail }).lean()
    if (userExist) return res.status(statusCode.Conflict).json({ message: messages.accountExist })

    const user = await UsersModel.create({ sName, sEmail, sMobile, sPassword, sProfilePic })

    return res.status(statusCode.OK).json({ message: messages.userRegistered, data: user })
  } catch (error) {
    return res.status(statusCode.InternalServerError).json({
      status: statusCode.InternalServerError,
      message: messages.InternalServerError
    })
  }
}

UsersController.editProfileDetails = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(statusCode.UnprocessableEntity).json({ status: statusCode.UnprocessableEntity, errors: errors.array() })

    const { _id } = req.params
    const { sName, sMobile } = req.body

    const sProfilePic = req?.file?.path

    const userExist = await UsersModel.findOne({ _id }).lean()
    if (!userExist) res.status(statusCode.NotFound).json({ message: messages.notFound.replace('##', 'account') })

    const user = await UsersModel.findByIdAndUpdate({ _id }, { sName, sMobile, sProfilePic }, { new: true })

    return res.status(statusCode.OK).json({ message: messages.editedSuccessfully.replace('##', 'profile'), data: user })
  } catch (error) {
    return res.status(statusCode.InternalServerError).json({
      status: statusCode.InternalServerError,
      message: messages.InternalServerError
    })
  }
}

UsersController.getProfileDetails = async (req, res) => {
  try {
    const { _id } = req.params

    const userExist = await UsersModel.findOne({ _id }).lean()
    if (!userExist) res.status(statusCode.NotFound).json({ message: messages.notFound.replace('##', 'account') })

    const user = await UsersModel.findOne({ _id }, { sName: 1, sMobile: 1, sProfilePic: 1, sEmail: 1 }, { new: true })

    return res.status(statusCode.OK).json({ message: messages.fetchedSuccessfully.replace('##', 'profile'), data: user })
  } catch (error) {
    return res.status(statusCode.InternalServerError).json({
      status: statusCode.InternalServerError,
      message: messages.InternalServerError
    })
  }
}

module.exports = UsersController
