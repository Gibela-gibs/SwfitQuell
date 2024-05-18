import mongoose from "mongoose";

const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    "db connected"
  } catch (error) {
    "connection failed"
    console.log(error)
    throw new Error(error);
  }
};
