import mongoose from "mongoose";

export interface IUser {
   _id: mongoose.ObjectId;
   address: string;
   username: string;
   role: "USER" | "ADMIN";
   createdAt: Date;
   updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
   {
      address: {
         type: String,
         unique: true,
         required: true,
         lowercase: true
      },
      username: {
         type: String,
         required: true,
         unique: true
      },
      role: {
         type: String,
         enum: ["USER", "ADMIN"],
         default: "USER"
      }
   },
   { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
