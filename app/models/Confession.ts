import mongoose, {Schema, Document} from "mongoose";
import User, {UserType} from "./User";

interface ConfessionSchemaType extends Document {
  from: string;
  to: string;
  message: string;
  createdAt: Date;
}

const ConfessionSchema = new Schema<ConfessionSchemaType>({
  from: {
    type: String,
    required: [true, "Please provide a username for this user."],
  },
  to: {
    type: String,
    required: [true, "Please provide a username for this user."],
  },
  message: {
    type: String,
    required: [true, "Please provide a message for this user."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Post-save hook on ReactionSchema
ConfessionSchema.post("save", async function (doc) {
  try {
    // `this` refers to the saved document
    const {to, from, message} = this;

    // Find the user by username
    let user: UserType | null = await User.findOne({username: to});
    if (!user) {
      console.log("User not found. Creating a new user...");
      user = new User({
        username: to,
        name: "",
        image: "",
        scores: {"9": 0, "10": 0, "11": 0, "12": 0, "13": 0},
        total: 0,
        confessionsReceived: [message],
      });
    }

    // Update the user's scores and total
    if (user && user?.confessionsReceived) {
      user?.confessionsReceived.push(message);
      user.markModified("messages");
      await user.save();
    }
  } catch (error) {
    console.error("Failed to update user scores", error);
  }
});

const ConfessionModel =
  mongoose.models.Confession ||
  mongoose.model<ConfessionSchemaType>("Confession", ConfessionSchema);

export default ConfessionModel;
