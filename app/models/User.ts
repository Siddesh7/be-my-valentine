import mongoose, {Schema, Document} from "mongoose";

// Define the schema interface extending mongoose.Document
export interface UserType extends Document {
  name: string;
  username: string;
  image: string;
  reactionCount: {[key: string]: number};
  scores: {[key: string]: number};
  total: number;
  confessionsReceived: String[];
}

const UserSchema = new Schema<UserType>({
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
  reactionCount: {
    type: Object,
    default: {9: 20, 10: 20, 11: 20, 12: 20, 13: 20},
  },
  scores: {
    type: Object,
    default: {9: 0, 10: 0, 11: 0, 12: 0, 13: 0},
  },
  total: {
    type: Number,
    default: 0,
  },
  confessionsReceived: {
    type: [String],
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

const UserModel =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);

export default UserModel;
