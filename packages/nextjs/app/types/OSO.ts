export interface OSOResponse {
  onchain_metrics_by_project_v1: OnchainMetricsByProject[];
}

export interface OnchainMetricsByProject {
  active_contract_count_90_days: number;
  address_count: number;
  address_count_90_days: number;
  days_since_first_transaction: number;
  display_name: string;
  event_source: string;
  gas_fees_sum: number;
  gas_fees_sum_6_months: number;
  high_activity_address_count_90_days: number;
  low_activity_address_count_90_days: number;
  medium_activity_address_count_90_days: number;
  multi_project_address_count_90_days: number;
  new_address_count_90_days: number;
  project_id: string;
  project_name: string;
  project_namespace: string;
  project_source: string;
  returning_address_count_90_days: number;
  transaction_count: number;
  transaction_count_6_months: number;
}
