"use strict"

const Hapi = require("@hapi/hapi");
const Handlebars = require("handlebars");
const Vision = require('@hapi/vision');
const Path = require("path");
const Inert = require("@hapi/inert");
require("dotenv").config({path: __dirname + "/.env"});

const PORT = process.env.PORT || 3000;

const init = async ()=>{

    const server = Hapi.server({
        host: "localhost",
        port: PORT,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'assets')
            }
        }
    });
    
    const plugin = {
        name: "file",
        multiple: false,
        register: (server)=>{
            server.route({
                path: "/assets/{path*}",
                method: "GET",
                config: {
                    auth: false,
                    handler: {
                        directory: {
                            path: Path.join(__dirname, "assets"),
                        }
                    }
                }
            })
        }
    }

    await server.register(Vision);
    await server.register(Inert);

    server.views({
        engines: {
            html: Handlebars,
        },
        path: Path.join(__dirname, "/view")
    });

    server.route({
        method: "GET",
        path: "/assets/{path*}",
        handler: {
            directory: {
                path: Path.join(__dirname, "assets"),
                redirectToSlash: true,
                index: true,
            }
        }
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
        path: "/kadro",
        handler: (request, h)=>{
    
            return h.view("kadro.html");
        }
    });

    server.route({
        method: "GET",
        path: "/hasan-rovesata",
        handler: (request, h)=>{
    
            return h.view("hasan.html");
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