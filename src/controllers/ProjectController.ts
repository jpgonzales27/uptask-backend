import type { Request, Response } from "express";
import Project from "../models/proyect";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    try {
      await project.save();
      res.send("Proyecto Creando Correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    res.send("Todos los proyectos");
  };
}
