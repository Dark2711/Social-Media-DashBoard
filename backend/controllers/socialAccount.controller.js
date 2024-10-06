const SocialAccount = require('../models/socialAccount.model');
const zod = require('zod');

const addSocialAccountSchema = zod.object({
  user: zod.string(),
  platform: zod.string(),
  accessToken: zod.string(),
  refreshToken: zod.string(),
  profileId: zod.string(),
  profileName: zod.string(),
});

const addSocialAccount = async (req, res) => {
  const { success } = addSocialAccountSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: 'Incorrect inputs ',
    });
  }
  const socialAccount = await SocialAccount.create({
    user: req.body.user,
    platform: req.body.platform,
    accessToken: req.body.accessToken,
    refreshToken: req.body.refreshToken,
    profileId: req.body.profileId,
    profileName: req.body.profileName,
  });
  res.status(200).json({
    message: 'Social account added successfully',
    socialAccount,
  });
};

const getSocialAccounts = async (req, res) => {
  const socialAccounts = await SocialAccount.find();
  res.status(200).json({
    socialAccounts,
  });
};

const updateAccount = async (req, res) => {
  try {
    // Find the account by ID
    const account = await SocialAccount.findById(req.params.id);

    // If account doesn't exist, return 404
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Check if the account belongs to the logged-in user
    if (account.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update only the provided fields
    account.platform = req.body.platform || account.platform;
    account.accessToken = req.body.accessToken || account.accessToken;
    account.refreshToken = req.body.refreshToken || account.refreshToken;
    account.profileName = req.body.profileName || account.profileName;

    // Save the updated account back to MongoDB
    const updatedAccount = await account.save();

    // Respond with the updated account
    res.status(200).json(updatedAccount);
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).json({ message: 'Error updating account', error });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const account = await SocialAccount.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (account.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await account.remove();
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error });
  }
};

module.exports = {
  addSocialAccount,
  getSocialAccounts,
  updateAccount,
  deleteAccount,
};
