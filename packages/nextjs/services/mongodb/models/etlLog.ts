import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IETLLog {
  date: Date;
  error: boolean;
  status: "success" | "error" | "pending";
  message: string;
}

interface IETLLogModel extends Model<IETLLog, object> {
  findAllInState(state: IETLLog["status"]): HydratedDocument<IETLLog>;
}

const ETLLogSchema = new Schema<IETLLog, IETLLogModel>({
  date: {
    type: Date,
    required: true,
  },
  error: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
});

ETLLogSchema.statics.findAllInState = function (state: IETLLog["status"]) {
  return this.find({
    status: state,
  });
};

const ETLLog =
  (mongoose.models.ETLLog as IETLLogModel) || mongoose.model<IETLLog, IETLLogModel>("ETLLog", ETLLogSchema);

export default ETLLog;
