import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../../utils/date";

export interface Isesssion extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  userAgent: string;
  expiredAt: Date;
  createdAt: Date;
}

const sessionSchema = new mongoose.Schema<Isesssion>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    dafault: Date.now,
  },
  expiredAt: {
    type: Date,
    required: true,
    default: thirtyDaysFromNow,
  },
});

const SessionModel = mongoose.model<Isesssion>("Session", sessionSchema);
export default SessionModel;
