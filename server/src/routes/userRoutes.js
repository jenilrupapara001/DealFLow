const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    getUserProfile,
    getUsers,
    updateUserProfile,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.get('/', protect, authorize('admin', 'manager'), getUsers);

module.exports = router;
