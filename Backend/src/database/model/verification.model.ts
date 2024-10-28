import mongoose from "mongoose";
import verificationCodeTypes from "../../@types/verification";

export interface IVerification extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: verificationCodeTypes;
  expiredAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<IVerification>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    type: {
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
    },
  },
  {
    timestamps: true,
  }
);

const verificationModel = mongoose.model<IVerification>(
  "Verification",
  verificationCodeSchema,
  "verifications_code"
);
export default verificationModel;
