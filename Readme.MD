This Node.js application generates primary and secondary MAC addresses from a provided 128-bit Client Identifier (CID). The application utilizes Express.js for the server-side framework and provides a simple API endpoint for MAC address generation.

Features:
• Validates input CID for correct format before generating MAC addresses.
• Implements MAC address generation logic according to IEEE standards.
• Formats MAC addresses with colons for easy readability.
• Provides error handling for invalid input CID and server errors.

Technologies Used:
• Node.js: Backend JavaScript runtime environment.
• Express.js: Web application framework for building APIs and web servers.
• CORS: Cross-Origin Resource Sharing middleware for enabling cross-origin requests.
• BigInt: JavaScript built-in object for representing arbitrary-precision integers.
• Regular Expressions: Used for CID format validation.

Usage:
1.Enter the 128-bit CID:
2.In the input field provided, enter a valid 128-bit CID (in hexadecimal format) that you wish to generate MAC addresses for Generate MAC Addresses.
3.Click on the "Generate MAC" button to initiate the process.
4.View MAC Addresses.

If the CID is valid, the primary and secondary MAC addresses will be displayed on the page.

If the CID is invalid, an error message will be shown indicating that the CID is invalid.

If an error occurs or if you want to generate MAC addresses for another CID, you can click the "Try Again" button to reload the page and start over.

Development:
•This web application is developed using HTML, CSS, and JavaScript.
•It utilizes asynchronous fetch requests to communicate with the server-side logic.
•The server-side logic implemented in Node.js extracts the last 64 bits of the CID and generates primary and secondary MAC addresses based on it.

