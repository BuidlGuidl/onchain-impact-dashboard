import { OSOResponse } from "~~/app/types/OSO";

export const fetchOSOProjectData = async () => {
  const query = `{
      onchain_metrics_by_project(distinct_on: project_id, where: {network: {_eq: "OPTIMISM"}}) {
        active_users
        first_txn_date
        high_frequency_users
        l2_gas_6_months
        less_active_users
        more_active_users
        multi_project_users
        network
        new_user_count
        num_contracts
        project_id
        project_name
        total_l2_gas
        total_txns
        total_users
        txns_6_months
        users_6_months
      }
      code_metrics_by_project(distinct_on: project_id) {
        avg_active_devs_6_months
        avg_fulltime_devs_6_months
        commits_6_months
        contributors
        contributors_6_months
        first_commit_date
        forks
        issues_closed_6_months
        issues_opened_6_months
        last_commit_date
        new_contributors_6_months
        project_id
        project_name
        pull_requests_merged_6_months
        pull_requests_opened_6_months
        repositories
        source
        stars
      }
    }`;

  const OSOGraphQLEndpoint = process.env.OSO_GRAPHQL_ENDPOINT as string;

  if (!OSOGraphQLEndpoint) {
    throw new Error("OSO_GRAPHQL_ENDPOINT env var is not defined");
  }

  const response = await fetch(OSOGraphQLEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const { data: projectsByMetricType }: { data: OSOResponse } = await response.json();
  return projectsByMetricType;
};
