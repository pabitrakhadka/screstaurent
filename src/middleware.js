// src/middleware.js

const { NextResponse } = require("next/server");

 
function middleware(req) {
    // Check if the request is an API request
    if (req.url.startsWith("/api")) {
        // Add CORS headers to the response
        const res = new NextResponse()
        res.headers.append("Access-Control-Allow-Credentials", "true")
        res.headers.append("Access-Control-Allow-Origin", "*") // Replace "*" with your actual origin
        res.headers.append("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT")
        res.headers.append(
            "Access-Control-Allow-Headers",
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        )
        return res
    }
}

// Specify the path regex to apply the middleware to
  const config = {
    // Apply the middleware to all API routes
    api: {
        bodyParser: false,
    },
}
module.exports = { middleware, config };