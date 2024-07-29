import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export const MetricNames = {
  impact_index: 0,
  gas_fees: 0,
  transaction_count: 0,
  trusted_transaction_count: 0,
  trusted_transaction_share: 0,
  trusted_users_onboarded: 0,
  daily_active_addresses: 0,
  trusted_daily_active_users: 0,
  monthly_active_addresses: 0,
  trusted_monthly_active_users: 0,
  recurring_addresses: 0,
  trusted_recurring_users: 0,
  power_user_addresses: 0,
  openrank_trusted_users_count: 0,
  log_gas_fees: 0,
  log_transaction_count: 0,
  log_trusted_transaction_count: 0,
};

export type Metrics = typeof MetricNames;

export interface IMetric {
  label?: string;
  name: keyof Metrics;
  description: string;
  activated: boolean;
  order: number;
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
  activated: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    required: true,
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
