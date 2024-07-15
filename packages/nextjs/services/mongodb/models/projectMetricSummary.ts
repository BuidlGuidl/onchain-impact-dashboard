import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IProjectMetricSummary {
  date: Date;
  projectId: string;
  metricName: string;
  7: number;
  30: number;
  90: number;
}

interface IProjectMetricSummaryModel extends Model<IProjectMetricSummary, object> {
  findBetweenDates(
    startDate: Date,
    endDate: Date,
    projection?: mongoose.ProjectionType<IProjectMetricSummary>,
  ): Promise<HydratedDocument<IProjectMetricSummary>[]>;
}

const ProjectMetricSummarySchema = new Schema<IProjectMetricSummary, IProjectMetricSummaryModel>({
  date: {
    type: Date,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  metricName: {
    type: String,
    required: true,
  },
  7: {
    type: Number,
  },
  30: {
    type: Number,
  },
  90: {
    type: Number,
  },
});

ProjectMetricSummarySchema.statics.findBetweenDates = function (
  startDate: Date,
  endDate: Date,
  projection?: mongoose.ProjectionType<IProjectMetricSummary>,
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

export const TempProjectMetricSummary =
  (mongoose.models.temp_ProjectMetricSummary as IProjectMetricSummaryModel) ||
  mongoose.model<IProjectMetricSummary, IProjectMetricSummaryModel>(
    "temp_ProjectMetricSummary",
    ProjectMetricSummarySchema,
  );

const ProjectMetricSummary =
  (mongoose.models.ProjectMetricSummary as IProjectMetricSummaryModel) ||
  mongoose.model<IProjectMetricSummary, IProjectMetricSummaryModel>("ProjectMetricSummary", ProjectMetricSummarySchema);

export default ProjectMetricSummary;
