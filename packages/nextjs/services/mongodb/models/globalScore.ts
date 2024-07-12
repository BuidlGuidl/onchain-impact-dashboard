import { MetricNames, Metrics } from "./metric";
import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IGlobalScore extends Metrics {
  date: Date;
}

interface IGlobalScoreModel extends Model<IGlobalScore, object> {
  findBetweenDates(
    startDate: Date,
    endDate: Date,
    projection?: mongoose.ProjectionType<IGlobalScore>,
  ): Promise<HydratedDocument<IGlobalScore>[]>;
}

const schema: Record<string, any> = {
  date: {
    type: Date,
    required: true,
    unique: true,
  },
};
// Add all the properties of MetricTypes to the schema
for (const key of Object.keys(MetricNames)) {
  schema[key] = {
    type: Number,
  };
}

const GlobalScoreSchema = new Schema<IGlobalScore, IGlobalScoreModel>(schema);

GlobalScoreSchema.statics.findBetweenDates = function (
  startDate: Date,
  endDate: Date,
  projection?: mongoose.ProjectionType<IGlobalScore>,
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

export const TempGlobalScore =
  (mongoose.models.temp_GlobalScore as IGlobalScoreModel) ||
  mongoose.model<IGlobalScore, IGlobalScoreModel>("temp_GlobalScore", GlobalScoreSchema);

const GlobalScore =
  (mongoose.models.GlobalScore as IGlobalScoreModel) ||
  mongoose.model<IGlobalScore, IGlobalScoreModel>("GlobalScore", GlobalScoreSchema);

export default GlobalScore;
