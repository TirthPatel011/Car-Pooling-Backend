const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const roleRoutes = require("./src/routes/RoleRoutes");
app.use("/api", roleRoutes);

const userRoutes = require("./src/routes/UserRoutes");
app.use("/api", userRoutes);

// const stateRoutes = require("./src/routes/StateRoutes")
// app.use("/state", stateRoutes); //http://localhost:3000/addState
//http://localhost:3000/state/addState 

// const cityRoutes = require("./src/routes/CityRoutes")
// app.use("/city", cityRoutes); //http://localhost:3000/city/addCity

// const areaRoutes = require("./src/routes/AreaRoutes")
// app.use("/area", areaRoutes); //http://localhost:3000/area/add

const vehicleRoutes = require("./src/routes/VehicleRoutes")
app.use("/vehicle", vehicleRoutes); //http://localhost:3000/vehicle/addVehicle


const rideRoutes = require("./src/routes/RideRoutes");
app.use("/rides", rideRoutes);

const bookingRoutes = require("./src/routes/BookingRoutes");
app.use("/booking", bookingRoutes);

const rideRequestRoutes = require("./src/routes/RideRequestRoutes");
app.use("/ride-requests", rideRequestRoutes); 


mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(() => {
    console.log("Database connected...");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port number ${PORT}`);
});
