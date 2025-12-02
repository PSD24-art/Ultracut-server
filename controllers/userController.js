// controllers/userCtrl.js

const User = require("../models/User");

exports.userProfile = async (req, res) => {
  try {
    // req.user is already populated by authMiddleware
    const user = req.user;

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user, // sends name, email, phone, etc. minus password
    });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

exports.completeProfile = async (req, res) => {
  try {
    const { name, email, company } = req.body;
    const user = req.user; // set by authMiddleware

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Unauthenticated" });

    // Basic validation (adjust rules to your needs)
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Valid name is required (min 2 chars)",
      });
    }
    // email is optional but if present, validate simple format
    let normalizedEmail = null;
    if (email) {
      if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email format" });
      }
      normalizedEmail = email.trim().toLowerCase();
    }

    // If email provided and different from current, ensure uniqueness
    if (normalizedEmail && user.email !== normalizedEmail) {
      const existing = await User.findOne({ email: normalizedEmail }).select(
        "_id"
      );
      if (existing && existing._id.toString() !== user._id.toString()) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }
    }

    // Build update payload (whitelist fields)
    const updatePayload = {
      name: name.trim(),
      profileCompleted: true,
      profileCompletedAt: new Date(),
      lastLoginAt: new Date(),
    };
    if (normalizedEmail) updatePayload.email = normalizedEmail;
    if (company && typeof company === "string" && company.trim().length) {
      updatePayload.companyName = company.trim();
    }

    // Update user and return the new object (omit __v, password if any)
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: updatePayload },
      { new: true, select: "-__v -password" }
    ).lean();

    return res.status(200).json({
      success: true,
      message: "Profile completed successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("completeProfile error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
