import { OSOResponse } from "~~/app/types/OSO";

export const fetchOSOProjectData = async () => {
  const query = `{
      onchain_metrics_by_project_v1(where: {event_source: {_eq: "OPTIMISM"}}) {
        appplication_id
        is_oss
        gas_fees
        transaction_count
        trusted_transaction_count
        trusted_transaction_share
        trusted_users_onboarded
        daily_active_addresses
        trusted_daily_active_users
        monthly_active_addresses
        trusted_monthly_active_users
        recurring_addresses
        trusted_recurring_users
        power_user_addresses
        openrank_trusted_users_count
        log_gas_fees
        log_transaction_count
        log_trusted_transaction_count
      }
    }`;

  const OSOGraphQLEndpoint = process.env.OSO_GRAPHQL_ENDPOINT as string;
  const OSOApiKey = process.env.OSO_API_KEY as string;

  if (!OSOGraphQLEndpoint) {
    throw new Error("OSO_GRAPHQL_ENDPOINT env var is not defined");
  }

  if (!OSOApiKey) {
    throw new Error("OSO_API_KEY env var is not defined");
  }

  const response = await fetch(OSOGraphQLEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OSOApiKey}`,
    },
    body: JSON.stringify({ query }),
  });

  const { data: projectsByMetricType }: { data: OSOResponse } = await response.json();
  return projectsByMetricType;
};
