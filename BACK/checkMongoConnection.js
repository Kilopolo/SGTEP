import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI; // tu string SRV con usuario y contraseña

async function main() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Conectado a MongoDB Atlas con TLS/SSL!");
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err);
  }
}

main();
