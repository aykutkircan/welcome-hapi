"use strict"

const Hapi = require("@hapi/hapi");
const Handlebars = require("handlebars");
const Vision = require('@hapi/vision');
const Path = require("path");
require("dotenv").config({path: __dirname + "/.env"});

const PORT = process.env.PORT || 3000;

const init = async ()=>{

    const server = Hapi.server({
        host: "localhost",
        port: PORT
    });

    await server.register(Vision);

    server.views({
        engines: {
            html: Handlebars,
        },
        path: Path.join(__dirname, "/view")
    });

    server.route({
        method: "GET",
        path: "/",
        handler: (request, h)=>{
    
            return h.view("welcome.html");
        }
    });

    server.route({
        method: "GET",
        path: "/port",
        handler: (request, h)=>{
    
            return h.response(`İsteğin cevaplandığı port:  ${PORT}`);
        }
    });

    await server.start();
    console.log(`Server running on port http://localhost:${PORT}`);
};



process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();