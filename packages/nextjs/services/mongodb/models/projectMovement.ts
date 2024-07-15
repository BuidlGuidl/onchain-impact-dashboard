import mongoose, { Model, Schema } from "mongoose";

interface IMovementByMetric {
  [key: string]: {
    "7": number;
    "30": number;
    "90": number;
  };
}

export interface IProjectMovement {
  projectId: string;
  name: string;
  profileAvatarUrl: string;
  movementByMetric: IMovementByMetric;
}

const MovementByMetricSchema = new Schema({
  7: { type: Number, required: true },
  30: { type: Number, required: true },
  90: { type: Number, required: true },
});

const ProjectMovementSchema: Schema = new Schema({
  projectId: { type: String, required: true },
  name: { type: String, required: true },
  profileAvatarUrl: { type: String, required: true },
  movementByMetric: { type: Map, of: MovementByMetricSchema, required: true },
});

interface IProjectMovementModel extends Model<IProjectMovement, object> {}

export const TempProjectMovement =
  (mongoose.models.ProjectMovement as IProjectMovementModel) ||
  mongoose.model<IProjectMovement, IProjectMovementModel>("temp_ProjectMovement", ProjectMovementSchema);

const ProjectMovement =
  (mongoose.models.ProjectMovement as IProjectMovementModel) ||
  mongoose.model<IProjectMovement, IProjectMovementModel>("ProjectMovement", ProjectMovementSchema);

export default ProjectMovement;
