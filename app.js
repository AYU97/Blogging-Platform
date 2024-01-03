const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./db");
const swagger = require("./swagger");
const app = express();

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

// Routes
app.use("/blogPost/auth", authRoutes);
app.use("/blogPost", blogRoutes);

//swagger
app.use("/api-docs", swagger.serve, swagger.setup);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
