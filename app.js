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
//const corsOptions = {
//  //Trusted frontend
//  origin: [
//    "https://66945c8033078dd8bd24dde6--regal-kangaroo-2cab09.netlify.app/",
//  ],
//  methods: ["GET", "POST", "PUT", "DELETE"],
//  credentials: true,
//};
//app.use(cors(corsOptions));

//MiddleWares
app.use(express.json());
app.use(cors());

//Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
//Error
app.use(errorHandler);

//Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port.. ${PORT}`));
