import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";
//express server
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
//home route
app.get("", (req, res) => {
  return res.status(200).send({
    message: "Welcome to Users API",
  });
});
//port definition
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `users  Web API listening on port ${port} in ${process.env.NODE_ENV} mode`
  );
});
export default app;
