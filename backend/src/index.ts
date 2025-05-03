import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from "./routes/auth.controller";
import userRoutes from "./routes/user.route";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.get('/', (_req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});
