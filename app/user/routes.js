const router = require('express').Router()
const UsersController = require('./controller')
const { body } = require('express-validator')
const { multerService } = require('../../utils/multerService')

const upload = multerService('user-profile')

router.post('/signup', upload.single('sProfilePic'), [
  body('sName').not().isEmpty(),
  body('sEmail').isEmail(),
  body('sMobile').not().isEmpty(),
  body('sPassword').not().isEmpty()
], UsersController.signup)

router.put('/edit-profile/:_id', upload.single('sProfilePic'), [
  body('sName').not().isEmpty(),
  body('sMobile').not().isEmpty()
], UsersController.editProfileDetails)

router.get('/profile-details/:_id', UsersController.editProfileDetails)

module.exports = router
