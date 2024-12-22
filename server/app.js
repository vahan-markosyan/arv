const PORT = process.env.PORT || 3000
const url = "mongodb://localhost:27017"
const cors = require('cors');
const express = require('express');
const connectToDatabase = require('./config/dbConnect');
const body = require("body-parser")
const app = express();
const path = require("path")
const fs = require("fs")
require('dotenv').config();
const fileUpload = require('express-fileupload');
app.use(fileUpload());




app.use(cors())
app.use(body.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



connectToDatabase(url);
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

const servicesRouter = require("./routers/services")
const servicesItemsRouter = require("./routers/service-item")
const authRoutes = require("./routers/auth-routes")
const equipment = require("./routers/equipment")
const doctor = require("./routers/doctor")
const emailRoutes = require("./routers/email")
const searchRoutes = require("./routers/search")
const loginRoutes = require("./routers/login")


app.use("/api/service" , servicesRouter)
app.use("/api/service-item" , servicesItemsRouter)
app.use("/api/auth" , authRoutes)
app.use("/api/equipment" , equipment)
app.use("/api/doctor" , doctor)
app.use("/api/email" , emailRoutes)
app.use("/api/search" , searchRoutes)
app.use("/api/login" , loginRoutes)


app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
