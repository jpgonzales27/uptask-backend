import type { Request, Response } from "express";
import Task from "../models/task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      // await task.save();
      // await req.project.save();
      await Promise.allSettled([task.save(), req.project.save()]);
      res.send("Tarea creada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate("project");
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getProjectTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);
      if (!task) {
        const error = new Error("Tarea no encontrada");
        res.status(404).json({ error: error.message });
        return;
      }

      console.log(task.project);
      console.log(req.project.id);

      if (task.project.toString() !== req.project.id) {
        const error = new Error("Accion no valida");
        res.status(404).json({ error: error.message });
        return;
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findByIdAndUpdate(taskId, req.body);
      if (!task) {
        const error = new Error("Tarea no encontrada");
        res.status(404).json({ error: error.message });
        return;
      }

      console.log(task.project);
      console.log(req.project.id);

      if (task.project.toString() !== req.project.id) {
        const error = new Error("Accion no valida");
        res.status(404).json({ error: error.message });
        return;
      }
      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
