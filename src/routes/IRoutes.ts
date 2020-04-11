import { Router } from "express";

export interface IRoutes {
    routes(router: Router): Router;
}