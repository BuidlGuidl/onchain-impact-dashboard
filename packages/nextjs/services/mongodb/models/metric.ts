import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export const MetricNames = {
  impact_index: 0,
  active_contract_count_90_days: 0,
  address_count: 0,
  address_count_90_days: 0,
  days_since_first_transaction: 0,
  gas_fees_sum: 0,
  gas_fees_sum_6_months: 0,
  high_activity_address_count_90_days: 0,
  low_activity_address_count_90_days: 0,
  medium_activity_address_count_90_days: 0,
  multi_project_address_count_90_days: 0,
  new_address_count_90_days: 0,
  returning_address_count_90_days: 0,
  transaction_count: 0,
  transaction_count_6_months: 0,
};

export type Metrics = typeof MetricNames;

export interface IMetric {
  label?: string;
  name: keyof Metrics;
  description: string;
  weight: number;
  activated: boolean;
}

interface IMetricModel extends Model<IMetric, object> {
  findAllActivated(): Promise<HydratedDocument<IMetric>[]>;
}

const MetricSchema = new Schema<IMetric, IMetricModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  label: {
    type: String,
  },
  weight: {
    type: Number,
    required: true,
  },
  activated: {
    type: Boolean,
    default: false,
  },
});

MetricSchema.statics.findAllActivated = function () {
  return this.find({
    activated: {
      $eq: true,
    },
  });
};
const Metric =
  (mongoose.models.Metric as IMetricModel) || mongoose.model<IMetric, IMetricModel>("Metric", MetricSchema);

export default Metric;
