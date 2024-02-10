import mongoose, {Schema, Document} from "mongoose";
import User, {UserType} from "./User";

// Define the schema interface extending mongoose.Document
interface ReactionType extends Document {
  from: string;
  to: string;
  reaction: string;
  point: number;
  createdAt: Date;
}

const ReactionSchema = new Schema<ReactionType>({
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
// Pre-save middleware to calculate total
ReactionSchema.pre("save", async function (next) {
  const {reaction, from} = this;

  const fromUser = await User.findOne({username: from});

  const reactionKey = reaction.toString();

  if (
    fromUser &&
    fromUser.reactionCount &&
    fromUser.reactionCount[reactionKey] > 0
  ) {
    next();
  } else {
    const err = new Error("User does not have enough reactions left to send");
    next(err);
  }
});

// Post-save hook on ReactionSchema
ReactionSchema.post("save", async function (doc) {
  try {
    // `this` refers to the saved document
    const {to, reaction, point, from} = this;

    // Find the user by username
    let user: UserType | null = await User.findOne({username: to});
    const fromUser: UserType | null = await User.findOne({username: from});
    if (!user) {
      console.log("User not found. Creating a new user...");
      user = new User({
        username: to,
        name: "",
        image: "",
        scores: {"9": 0, "10": 0, "11": 0, "12": 0, "13": 0},
        total: 0,
      });
    }
    const reactionKey = reaction.toString();
    if (fromUser) {
      console.log("fromUser found");
      console.log(fromUser.reactionCount[reactionKey]);
      fromUser.reactionCount[reactionKey] -= point;
      fromUser.markModified("reactionCount");
      await fromUser.save();
    }

    // Update the user's scores and total
    if (user) {
      user.scores[reactionKey] = (user.scores[reactionKey] || 0) + point;

      user.markModified("scores");
      await user.save();
    }
  } catch (error) {
    console.error("Failed to update user scores", error);
  }
});

const ReactionModel =
  mongoose.models.Reaction ||
  mongoose.model<ReactionType>("Reaction", ReactionSchema);

export default ReactionModel;
