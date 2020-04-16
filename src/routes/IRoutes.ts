import { Router } from "express";

export interface IRoutes {
    routes(): Router;
}