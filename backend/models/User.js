const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
      trim: true, 
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash the password  
userSchema.pre("save", async function (next) { 
  if (!this.isModified("password")) return next();

  try { 
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

//compare hashed password with the provided password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

module.exports = mongoose.model("User", userSchema);
