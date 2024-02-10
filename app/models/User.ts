import mongoose from "mongoose";

// Define the schema interface extending mongoose.Document
interface UserType extends mongoose.Document {
  name: string;
  username: string;
  image: string;
  scores: {9: number; 10: number; 11: number; 12: number; 13: number};
  total: number;
}

// Schema definition
const UserSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "Please provide a username for this user."],
    unique: true,
  },
  image: {
    type: String,
  },
  scores: {
    type: Object,
    default: {9: 0, 10: 0, 11: 0, 12: 0, 13: 0},
  },

  total: {
    type: Number,
    default: 0,
  },
});

// Pre-save middleware to calculate total
UserSchema.pre("save", function (next) {
  // Initialize total to 0
  this.total = 0;

  // Loop through each score and add it to the total
  this.total = Object.values(this.scores).reduce(
    (acc, score) => acc + score,
    0
  );

  next();
});

export default mongoose.models.User ||
  mongoose.model<UserType>("User", UserSchema);
