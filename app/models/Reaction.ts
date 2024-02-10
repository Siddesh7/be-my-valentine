import mongoose from "mongoose";
import User from "./User";

// Define the schema interface extending mongoose.Document
interface ReactionType extends mongoose.Document {
  from: string;
  to: string;
  reaction: string;
  point: number;
  createdAt: Date;
}

const ReactionSchema = new mongoose.Schema<ReactionType>({
  from: {
    type: String,
    required: [true, "Please provide a username for this user."],
  },
  to: {
    type: String,
    required: [true, "Please provide a username for this user."],
  },
  reaction: {
    type: String,
    required: [true, "Please provide a reaction for this user."],
  },
  point: {
    type: Number,
    required: [true, "Please provide a point for this user."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Post-save hook on ReactionSchema
ReactionSchema.post("save", async function () {
  try {
    const {to, reaction, point} = this;

    // Find the user by username
    let user = await User.findOne({username: to});

    if (!user) {
      console.log("User not found. Creating a new user...");
      user = new User({
        username: to,
        name: "",
        image: "",
        scores: {"9": 0, "10": 0, "11": 0, "12": 0, "13": 0},
        total: 0,
      });
    } else {
      // Ensure reaction is treated as a string key, and update the score
      const reactionKey = reaction.toString(); // Make sure reaction is a string to use as key
      user.scores[reactionKey] = (user.scores[reactionKey] || 0) + point;

      // Mark the scores object as modified
      user.markModified("scores");

      // Recalculate the total (optional here since you have a pre-save middleware doing it)
      // But if you want to explicitly set it here as well, you can do so
    }

    await user.save();
  } catch (error) {
    console.error("Failed to update user scores", error);
  }
});

export default mongoose.models.Reaction ||
  mongoose.model<ReactionType>("Reaction", ReactionSchema);
