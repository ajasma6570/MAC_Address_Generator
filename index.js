const express = require("express");
const cors = require("cors") ;
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname)));
app.use(cors()); 

app.get("/", (req, res) => {
  res.send("Server Ready");
});

app.post("/generate-mac", (req, res) => {
  const cid = req.body.cid;
  
  if (!/^[0-9a-fA-F]{32}$/.test(cid)) {
    return res.status(400).json({ error: "Invalid 128-bit CID format" });
  }

  // Extract last 64 bits
  const last64Bits = cid.slice(-16);

  // Convert to 48-bit MAC address
  const macInt = BigInt(`0x${last64Bits}`);
  const primaryMacInt = macInt & BigInt("0xFFFFFFFFFFFF");

  // Clear the multicast bit (least significant bit of the first byte)
  const primaryMac = (primaryMacInt & BigInt("0xFEFFFFFFFFFF"))
    .toString(16)
    .padStart(12, "0");

  // Increment to get the secondary MAC address
  const secondaryMacInt =
    (primaryMacInt + BigInt(1)) & BigInt("0xFFFFFFFFFFFF");
  const secondaryMac = secondaryMacInt.toString(16).padStart(12, "0");

  // Format MAC address with colons
  const formatMAC = (mac) => mac.match(/.{1,2}/g).join(":");

  res.json({
    primary: formatMAC(primaryMac),
    secondary: formatMAC(secondaryMac),
  });
});


// Middleware to handle undefined routes
app.use((req, res, next) => {
  // Create a 404 Not Found error
  const error = new Error("Not Found");
  error.status = 404;
  // Pass the error to the next middleware
  next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  // Set the response status code
  res.status(err.status || 500);
  // Send the error message as JSON
  res.send("404! Page not Found");
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
