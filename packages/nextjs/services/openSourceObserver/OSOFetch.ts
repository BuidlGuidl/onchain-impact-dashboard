import { OSOResponse } from "~~/app/types/OSO";

export const fetchOSOProjectData = async () => {
  const query = `{
      onchain_metrics_by_project_v1(where: {event_source: {_eq: "OPTIMISM"}}) {
        active_contract_count_90_days
        address_count
        address_count_90_days
        days_since_first_transaction
        display_name
        event_source
        gas_fees_sum
        gas_fees_sum_6_months
        high_activity_address_count_90_days
        low_activity_address_count_90_days
        medium_activity_address_count_90_days
        multi_project_address_count_90_days
        new_address_count_90_days
        project_id
        project_name
        project_namespace
        project_source
        returning_address_count_90_days
        transaction_count
        transaction_count_6_months
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
