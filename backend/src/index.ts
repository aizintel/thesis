import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000', 'https://jeffanians-baitrack.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.get('/', (_req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});
