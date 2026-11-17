
import fastify from "fastify";
import { techsRoutes } from "./routes/techs-routes.js";
import cors from "@fastify/cors";

export function buildApp() {
    const app = fastify({ logger: true });

    app.register(cors, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    });

    app.register(techsRoutes, { prefix: "/techs" });

    return app;
}
