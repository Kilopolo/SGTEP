import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns/promises";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI no está definido en el .env");
    process.exit(1);
  }

  try {
    // if (process.env.NODE_ENV === "development") {
    //   console.log("⚡ Modo desarrollo: resolviendo hosts con DNS público");
    //   // Forzar resolución de hosts SRV usando DNS público
    //   const srvRecords = await dns.resolveSrv("_mongodb._tcp." + MONGO_URI.split("@")[1].split("/")[0]);
    //   console.log("✅ DNS resolvió Mongo Atlas:", srvRecords);
    // }

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout de conexión
    });

    console.log("✅ Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err.message || err);
    process.exit(1);
  }
};
