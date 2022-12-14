const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bctypt = require("bcrypt");

//GET all users

const getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select("-password").lean();
  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// Create new user
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body; //take info from input

  // confirm data
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //check for duplicate
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate user name" });
  }
  // hash password
  const hashedPassword = await bctypt.hash(password, 10); // salt round

  //create new user
  const userObject =
    !Array.isArray(roles) || !roles.length
      ? { username, password: hashedPassword }
      : { username, password: hashedPassword, roles };

  //create and store new user
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

//  Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  //Confirm data
  if (
    !id ||
    !username ||
    // !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }
  //find user // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //check for duplicate
  const duplicate = await Note.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  //update info
  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    // hashing password
    user.password = await bctypt.hash(password, 10); // salt rounds
  }
  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

// DELETE a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: "User ID required" });
  }
  const note = await Note.findOne({ user: id }).lean().exec();

  if (note) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  //define user
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Useraname ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
