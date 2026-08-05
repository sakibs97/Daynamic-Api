const settingsService = require('./settings.service');
const asyncHandler = require('../../utils/asyncHandler');
const { sendSuccess } = require('../../common/responses');

/**
 * @openapi
 * /settings:
 *   get:
 *     tags:
 *       - Settings
 *     summary: Get Portfolio Website Settings
 *     description: Returns personal, social, contact, hero, about, and SEO configuration (Public).
 *     responses:
 *       200:
 *         description: Settings retrieved successfully.
 */
const getSettingsHandler = asyncHandler(async (req, res) => {
  const settings = await settingsService.getSettings();
  return sendSuccess(res, 200, 'Settings retrieved successfully', settings);
});

/**
 * @openapi
 * /settings:
 *   put:
 *     tags:
 *       - Settings
 *     summary: Update Portfolio Website Settings
 *     description: Updates website settings content sections (Admin Only).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personal:
 *                 type: object
 *               social:
 *                 type: object
 *               contact:
 *                 type: object
 *               hero:
 *                 type: object
 *               about:
 *                 type: object
 *               seo:
 *                 type: object
 *     responses:
 *       200:
 *         description: Settings updated successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden (Admin role required).
 */
const updateSettingsHandler = asyncHandler(async (req, res) => {
  const settings = await settingsService.updateSettings(req.body);
  return sendSuccess(res, 200, 'Settings updated successfully', settings);
});

module.exports = {
  getSettingsHandler,
  updateSettingsHandler,
};
