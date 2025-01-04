const User = require("../models/user.model");

const getvolunteers = async (req, res) => {
  console.log("in get volunteers");
  try {
    const volunteers = await User.find({ role: "volunteer" });
    res.status(200).json(volunteers);
    console.log("volunteers fetched successfully");
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ message: "Error fetching volunteers" });
  }
};

module.exports = {
  getvolunteers,
};
