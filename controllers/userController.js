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

exports.addAddress = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Unauthenticated" });

    const {
      label = "Home",
      fullName,
      phone,
      pincode,
      state,
      city,
      addressLine1,
      addressLine2,
      landmark,
      isDefault = false,
    } = req.body || {};

    // Basic validation
    if (
      !fullName ||
      typeof fullName !== "string" ||
      fullName.trim().length < 2
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Valid fullName is required" });
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Valid phone is required" });
    }
    if (!pincode || typeof pincode !== "string" || pincode.trim().length < 3) {
      return res
        .status(400)
        .json({ success: false, message: "Valid pincode is required" });
    }
    if (!state || !city || !addressLine1) {
      return res.status(400).json({
        success: false,
        message: "state, city and addressLine1 are required",
      });
    }

    // Normalize inputs
    const newAddress = {
      label: String(label).trim(),
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      pincode: String(pincode).trim(),
      state: String(state).trim(),
      city: String(city).trim(),
      addressLine1: String(addressLine1).trim(),
      addressLine2: addressLine2 ? String(addressLine2).trim() : undefined,
      landmark: landmark ? String(landmark).trim() : undefined,
      isDefault: Boolean(isDefault),
    };

    // Ensure addresses array exists
    if (!Array.isArray(user.addresses)) user.addresses = [];

    // If this is the first address, make it default regardless
    if (user.addresses.length === 0) {
      newAddress.isDefault = true;
    }

    // If the new address is default, unset default on existing addresses
    if (newAddress.isDefault) {
      user.addresses.forEach((a) => {
        a.isDefault = false;
      });
    }

    // Push new address (Mongoose will assign _id automatically)
    user.addresses.push(newAddress);

    // Save user
    await user.save();

    // Return the newly added address (last element) and the updated addresses list
    const added = user.addresses[user.addresses.length - 1].toObject
      ? user.addresses[user.addresses.length - 1].toObject()
      : user.addresses[user.addresses.length - 1];

    // Prepare safe user object (omit sensitive fields)
    const safeUser = user.toObject ? user.toObject() : { ...user };
    delete safeUser.password;
    delete safeUser.__v;

    return res.status(201).json({
      success: true,
      message: "Address added",
      address: added,
      addresses: safeUser.addresses,
      user: {
        _id: safeUser._id,
        phone: safeUser.phone,
        name: safeUser.name,
        email: safeUser.email,
      },
    });
  } catch (err) {
    console.error("addAddress error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
