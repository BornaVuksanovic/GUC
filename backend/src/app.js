import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

import { connectDB } from './db.js';
import express from "express";
import appRouter from "./auth/appRoutes.js";
import authRouter from "./auth/authRoutes.js";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter);
app.use("/api/app", appRouter);

app.get('/ping', (req,res) => {
    res.send("Ne spavaj!");
    console.log("Ping");
});

app.listen(PORT, () => {
    console.log(`Slušam na portu: ${PORT}`);
    connectDB();
})