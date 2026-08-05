const express = require('express');
const { getSettingsHandler, updateSettingsHandler } = require('./settings.controller');
const { validateBody } = require('../../common/validation');
const { updateSettingsSchema } = require('./settings.validator');
const { authenticate, authorizeRoles } = require('../auth');

const router = express.Router();

router.get('/', getSettingsHandler);
router.put('/', authenticate, authorizeRoles('ADMIN'), validateBody(updateSettingsSchema), updateSettingsHandler);

module.exports = router;
