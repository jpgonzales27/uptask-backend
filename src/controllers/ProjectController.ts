import type { Request, Response } from "express";
import Project from "../models/proyect";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    // Asigna un manager
    project.manager = req.user.id;
    try {
      await project.save();
      res.send("Proyecto Creando Correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        $or: [{ manager: { $in: req.user.id } }],
      });
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  };

  static getProjectById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id).populate("tasks");
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }
      res.json(project);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  static updateProject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }
      project.clientName = req.body.clientName;
      project.projectName = req.body.projectName;
      project.description = req.body.description;

      await project.save();
      res.send("Proyecto actualizado correctamente");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  static deleteProject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      // const project = await Project.findByIdAndDelete(id);
      const project = await Project.findById(id);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }
      await project.deleteOne();
      res.send("Proyecto Eliminado correctamente");
      return;
    } catch (error) {
      console.log(error);
    }
  };
}
