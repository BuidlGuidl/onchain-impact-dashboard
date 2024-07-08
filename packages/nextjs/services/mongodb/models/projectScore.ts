import { MetricNames, Metrics } from "./metric";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IProjectScore extends Metrics {
  date: Date;
  projectId: string;
}

interface IProjectScoreMethods {
  getScore(metric: string): string;
}

interface IProjectScoreModel extends Model<IProjectScore, object, IProjectScoreMethods> {
  findBetweenDates(
    startDate: Date,
    endDate: Date,
    projection?: mongoose.ProjectionType<IProjectScore>,
  ): Promise<HydratedDocument<IProjectScore>[]>;
}

const schema: Record<string, any> = {
  date: {
    type: Date,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
};
// Add all the properties of MetricTypes to the schema
for (const key of Object.keys(MetricNames)) {
  schema[key] = {
    type: Number,
  };
}

const ProjectScoreSchema = new Schema<IProjectScore, IProjectScoreModel>(schema);

ProjectScoreSchema.index({ date: 1, projectId: 1 }, { unique: true });

ProjectScoreSchema.statics.findBetweenDates = function (
  startDate: Date,
  endDate: Date,
  projection?: mongoose.ProjectionType<IProjectScore>,
) {
  return this.find(
    {
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    },
    projection,
  );
};

ProjectScoreSchema.methods.getScore = function (metric: string) {
  const record = this.metrics[metric];
  return record ? record.value : "0";
};

const ProjectScore =
  (mongoose.models.ProjectScore as IProjectScoreModel) ||
  mongoose.model<IProjectScore, IProjectScoreModel>("ProjectScore", ProjectScoreSchema);

export default ProjectScore;
