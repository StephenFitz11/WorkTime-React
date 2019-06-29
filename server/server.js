const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const app = express();

app.use(cors());

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/time", require("./routes/time"));
app.use("/api/users", require("./routes/users"));
app.use("/api/clients", require("./routes/clients"));
app.use("/api/employees", require("./routes/employees"));

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server initated on port: ${PORT}`));
