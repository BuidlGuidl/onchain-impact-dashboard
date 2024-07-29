export interface OSOResponse {
  onchain_metrics_by_project_v1: RF4ImpactMetricsByProject[];
}

// These are the actual metrics we will be using when the data is provided by OSO
export interface RF4ImpactMetricsByProject {
  project_name: string;
  application_id: string; // Application ID: A unique project application id (generated by Agora).
  is_oss: boolean; // Eligible for OSS Multiplier: Whether the project's contract code and GitHub repo(s) were approved by the review committee as meeting open source software (OSS) requirements.
  gas_fees: number; //**Gas Fees**: Sum of a project's total contribution to gas fees across the Superchain. Gas fees are the primary recurring revenue source for the Superchain and a key indicator of aggregate blockspace demand. A project’s gas fee contribution is influenced by its total volume of contract interactions, the computational complexity of those interactions, and the state of the underlying gas market at the time of those transactions. In the long run, gas fees are what will power Retro Funding and enable it to continue in perpetuity. All members of the Superchain have committed at least 15% of their gross profit from gas fees to Retro Funding. Supporting projects that generate revenue in the form of gas fees helps power the economic engine of the Superchain.
  transaction_count: number; //**Total Transactions**: Count of a project’s transactions over the RF4 scope period October 2023 - June 2024. Optimism is a Layer 2 roll-up designed to improve the transaction throughput and reduce the fees on Ethereum. Layer 2s are crucial for scaling Ethereum because they help address the network's congestion issues without compromising its security or decentralization. Transaction counts are an important indicator for assessing the adoption and usage of all the new blockspace made available by the Superchain. Projects that have a sustained, high transaction count provide a clear signal of network growth and blockspace demand.
  trusted_transaction_count: number; //**Interactions from Trusted Optimism Users**: Count of a project’s transactions performed by trusted users, over the RF4 scope period October 2023 - June 2024. Bots, airdrop farming, and sybil attacks are longstanding problems in crypto. There are several teams in the Optimism ecosystem building reputation models for labeling “trusted users” in a privacy-preserving way. This metric aggregates reputation data from multiple platforms ([Farcaster](https://docs.farcaster.xyz/learn/architecture/hubs), [Passport](https://www.passport.xyz/), [EigenTrust by Karma3Labs](https://docs.karma3labs.com/eigentrust)) and only considers transactions that come from trusted users, a small subset of all active addresses on the Superchain. By tracking interactions specifically from trusted users, we gain a picture of blockspace demand that is less influenced by the effects of bots / farmers / sybils.
  trusted_transaction_share: number; //**Trusted Optimism Users' Share of Total Interactions**: Percentage of a project's total transactions that were made by trusted users over the RF4 scope period (October 2023 - June 2024). This metric expresses Interactions from Trusted Optimism Users and Total Transactions as a simple ratio. Using a ratio makes it easier to compare trusted user levels across big projects and small projects side-by-side. For example, a project with 10K trusted transactions out of 20K total transactions would score better than a project with 10K trusted transactions out of 50K total transactions. This indicator is nuanced because it recognizes that minimizing bot / farming / sybil activity might go against economic incentives in the short term but is important for network quality in the long term. Given that this indicator is calculated on a percentage basis, projects with fewer than 100 users are not evaluated.
  trusted_users_onboarded: number; //**Users Onboarded**: Count of trusted users to the Superchain who were onboarded over the RF4 scope period (October 2023 - June 2024) and who interacted with a project within their first 30 days on the Superchain. Getting 1 billion users onchain won’t be easy. It will require better onramps and onchain UX than crypto natives are accustomed to. This metric identifies projects that helped onboard new users to the Superchain since October 2023. In order to qualify, a new user has to also be in the set of trusted users. Then, any project on any chain that a user interacted with in their first month on the Superchain is counted. This is often multiple projects per new user. Supporting projects that are the first port of call for new users is essential for expanding the size and reach of the Superchain user’s base.
  daily_active_addresses: number; //**Average Daily Active Addresses (DAAs)**: Average of a project’s daily active addresses over the RF4 scope period (October 2023 - June 2024). Daily Active Addresses (DAAs) is a more granular view of a project's daily user activity and engagement levels than MAAs (Monthly Active Addresses). A high number of DAAs is a sign that Layer 2s have widespread adoption. While there is minimal cost to creating new addresses to farm a protocol, such farming or Sybil activity is usually short-lived. By averaging the number of active addresses on a daily basis over the RF4 period, this metric smooths out some of the blips and spikes in the data. New projects receive 0s for the days before they launched. Steady or rising DAAs over an extended period is a good signal of widespread adoption.
  trusted_daily_active_users: number; //**Average Trusted Daily Active Users (DAUs)**: Average of a project’s daily active users (trusted users only) over the RF4 scope period (October 2023 - June 2024). Daily Active Users (DAUs) is a more granular view of a project's daily user activity and engagement levels than MAUs (Monthly Active Users). A high number of trusted DAUs would be a sign that Layer 2s have widespread adoption. The reality today is that there are very few apps that generate high levels of daily, revenue-generating activity from users. By averaging the number of active users on a daily basis over the RF4 period, this metric smooths out some of the blips and spikes in the data. New projects receive 0s for the days before they launched. Indeed, trusted DAUs is a hard metric to crack, but it truly hones in on projects that give their users a reason to come back frequently.
  monthly_active_addresses: number; //**Average Monthly Active Addresses (MAAs)**: Average of a project’s monthly active addresses over the RF4 scope period (October 2023 - June 2024). Not all projects have lots of daily users. Some projects are more like utilities that are used once a month or at less regular intervals. Monthly Active Addresses (MAAs) is a key metric for understanding the size and engagement of a project’s user base over a more extended period. One word of cauation: as there is minimal cost to creating new addresses, MAAs may be more susceptible to farming than other metrics like Daily Active Addresses or ones that look only at "trusted users". However, by averaging the number of active addresses on a monthly basis over the RF4 period, this metric does smooth out some of the blips and spikes in the data. New projects receive 0s for the months before they launched.
  trusted_monthly_active_users: number; //**Average Trusted Monthly Active Users (MAUs)**: Average of a project’s monthly active users (trusted users only) over the RF4 scope period (October 2023 - June 2024). We all know that attention is fleeting, especially in crypto. MAUs is one of the most important metrics for any project looking to grow a large user base. A project’s average MAUs also provides insights into its ongoing popularity and relevance within the Optimism ecosystem. The metric is calculated by counting the number of distinct trusted users for each month included in the RF4 scope period and then averaging the monthly totals. Newer projects receive 0s for the months before they launched. A consistent or growing base of trusted MAUs is a sign that there is a healthy, thriving community around a project.
  recurring_addresses: number; //**Recurring Addresses**: Count of addresses that have interacted with the project in at least 3 separate months over the RF4 scope period (October 2023 - June 2024). Recurring addresses are a proxy for recurring users. It is especially relevant to projects where users may explicitly choose to interact with the project from a distinct addresses in order to preserve their privacy. By counting the number of distinct addresses that have interacted with a project over the course of at least three distinct calendar months during the RF4 scope period, this metric provides a view of user quality that complements metrics derived from the "trusted user" model. A high count of recurring addresses signals strong project loyalty and a good user experience.
  trusted_recurring_users: number; //**Trusted Recurring Users**: Count of trusted users who have interacted with the project in at least 3 separate months over the RF4 scope period (October 2023 - June 2024). Many crypto natives are curious to try out new protocols. But churn and user retention are major issues. Recurring users represent the most loyal and committed segment of a project's user base. This metric considers users who have interacted with a project over the course of at least three distinct calendar months during the RF4 scope period. Thus, it is intended to reflect sustained interest and ongoing engagement over time. A high count of recurring users signals strong project loyalty and a good user experience, and helps separate the fads from the future.
  power_user_addresses: number; //**Power User Addresses**: Count of 'power user' addresses that have interacted with the project over the RF4 scope period (October 2023 - June 2024). This metric reflects the degree which a project has attracted attention from the most active and engaged users on the Superchain. A `power user` is defined as an address that has made at least 100 transactions, across at least 10 different projects, on at least 30 days, over the RF4 scope period. A project is counted by this metric if has at least one interaction from a power user. Power users are critical early adopters for the ecosystem.
  openrank_trusted_users_count: number; // OpenRank Trusted Users: Count of addresses in the badgeholder "web of trust" who have interacted with the project over the RF4 scope period (October 2023 - June 2024). EigenTrust, aka OpenRank, is a reputation algorithm being applied by Karma3Labs to the Farcaster social graph. To seed the "web of trust", we begin with a list of 132 badgeholder addresses, look up their Farcaster IDs (present for 68 of the 132 addresses), and use OpenRank to identify those users' 100 closest connections. The result is a set of around 5000 addresses that have the closest social connection to the badgeholder community. Finally, we counts the number of addresses in the web of trust who have interacted with a given project. Note: this is an experimental metric designed and results in an even smaller but potentially higher signal subset of users than the "trusted user" model applied elsewhere.
  log_gas_fees: number; // LOGSCALE: Gas Fees: Sum of a project's total contribution to gas fees across the Superchain over the RF4 scope period October 2023 - June 2024, adjusted to a logarithmic scale. Gas fees are the primary recurring revenue source for the Superchain and a key indicator of aggregate blockspace demand. A project’s gas fee contribution is influenced by its total volume of contract interactions, the computational complexity of those interactions, and the state of the underlying gas market at the time of those transactions. In the long run, gas fees are what will power Retro Funding and enable it to continue in perpetuity. All members of the Superchain have committed at least 15% of their gross profit from gas fees to Retro Funding. Supporting projects that generate revenue in the form of gas fees helps power the economic engine of the Superchain. This indicator is transformed to a logarithmic scale (log10(gas_fees + 1)). Logarithmic scales are useful for metrics that span several orders of magnitude such as gas fees and transactions and have strong compounding effects. On a log scale, a project with an impact metric value of 100 (10^2) is 2X more impactful than one with a value of 10 (10^1), not 10X. Badgeholders are advised to use either a log scale or a normal (linear) scale in their ballots, not both.
  log_transaction_count: number; // LOGSCALE: Total Transactions: Count of a project’s transactions over the RF4 scope period October 2023 - June 2024, adjusted to a logarithmic scale. Optimism is a Layer 2 roll-up designed to improve the transaction throughput and reduce the fees on Ethereum. Layer 2s are crucial for scaling Ethereum because they help address the network's congestion issues without compromising its security or decentralization. Transaction counts are an important indicator for assessing the adoption and usage of all the new blockspace made available by the Superchain. Projects that have a sustained, high transaction count provide a clear signal of network growth and blockspace demand. This indicator includes successful transactions with a to_address owned by the project, as well as internal transactions that originate from one of the project's contracts and interact with the canonical EntryPoint (EIP 4337) contracts. This indicator is transformed to a logarithmic scale (log10(gas_fees + 1)). Logarithmic scales are useful for metrics that span several orders of magnitude such as gas fees and transactions and have strong compounding effects. On a log scale, a project with an impact metric value of 100 (10^2) is 2X more impactful than one with a value of 10 (10^1), not 10X. Badgeholders are advised to use either a log scale or a normal (linear) scale in their ballots, not both.
  log_trusted_transaction_count: number; // LOGSCALE: Interactions from Trusted Optimism Users: Count of a project’s transactions performed by trusted users over the RF4 scope period October 2023 - June 2024, adjusted to a logarithmic scale. Bots, airdrop farming, and sybil attacks are longstanding problems in crypto. This metric is designed to filter out these types of interactions and focus on the activity of a small subset of trusted users (less than 5% of all active addresses on the Superchain). By tracking interactions specifically from trusted users, we gain a picture of blockspace demand that is less influenced by the effects of bots / farmers / sybils. A "trusted user" represents an address linked to an account the meets a certain threshold of reputation. Currently, there are several teams in the Optimism ecosystem building reputation models in a privacy-preserving way. This metric aggregates reputation data from multiple platforms (Farcaster, Passport, EigenTrust by Karma3Labs), and the Optimist NFT collection. In order to be consider a trusted user, an address must meet at least two of the following requirements as of 2024-05-21: have a Farcaster ID of 20939, have a Passport score of 20 points or higher, have a Karma3Labs EigenTrust GlobalRank in the top 42,000 of Farcaster users, hold an Optimist NFT in their wallet, or qualified for at least two (out of four) Optimism airdrops. This indicator is transformed to a logarithmic scale (log10(gas_fees + 1)). Logarithmic scales are useful for metrics that span several orders of magnitude such as gas fees and transactions and have strong compounding effects. On a log scale, a project with an impact metric value of 100 (10^2) is 2X more impactful than one with a value of 10 (10^1), not 10X. Badgeholders are advised to use either a log scale or a normal (linear) scale in their ballots, not both.
}
