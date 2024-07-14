const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const cors = require("cors");

const app = express();

//Connect to mongodb
const mongoURL =
  "mongodb+srv://nikhilkumarpatra36:S8uNCHOnuxmkPTmB@clustermc.dl4jyw9.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMC";

mongoose
  .connect(mongoURL)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//Cors configuration
const corsOptions = {
  //Trusted frontend
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

//MiddleWares
app.use(express.json());

//Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
//Error
app.use(errorHandler);

//Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port.. ${PORT}`));
