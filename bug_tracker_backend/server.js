require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const bugRoutes = require("./routes/bugRoutes");
const projectRoutes = require("./routes/projectRoutes");
const rolesRouter = require("./routes/roleRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/bugs", bugRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", rolesRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
