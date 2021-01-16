"use strict"

const Hapi = require("@hapi/hapi");

const init = async ()=>{

    const server = Hapi.server({
        host: "localhost",
        port: 1234
    });

    server.route({
        method: "GET",
        path: "/",
        handler: (request, h)=>{
    
            return h.response("url path e '/welcome' ekleyin, ve /welcome path'ine gidin.");
        }
    });

    server.route({
        method: "GET",
        path: "/welcome",
        handler: (request, h)=>{
    
            return h.response("Welcome to Hapi.JS");
        }
    });

    await server.start();
    console.log("Server running on port http://localhost:1234");
    

};



process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();