# Onchain Impact Dashboard

OID enables builders to view their ongoing impact post-Retro Funding 4. Overview [here](https://plaid-cement-e44.notion.site/Post-Retro-Funding-4-Driving-Behavior-4952cf9a99d144759321d392e9612db4).

The goal is to raise awareness of the existence of Retro Funding for onchain builders, encouraging them to:
- sign up
- view their impact based on past rounds outcomes
- be positioned to apply to future rounds

__Raising awareness of RF is the goal so we will be taking every opportunity to celebrate the wins of each project by sharing updates to the leaderboard weekly (or when appropriate) on social media.__

### The MVP will need the following:
- [ ] Design (can use components and general feel of this other [build](https://www.figma.com/design/eVb3MoRIALsWo6AmcgfOiL/Retro-Funding-Round-4%3A-Sign-Up-%26-Application--(Public-Draft)?node-id=0-1&t=Be4LjY2TtxRvsiio-0))
- [ ] Agora API integration - to get project data (profile pic, description, etc.)
- [ ] Navigation Menu with CTA for builders to  
- [ ] View - Leaderboard (Top 10? Top 50?)
- - [ ] Ranked Projects, each project's profile picture and name, scrollable (left)
- - [ ] Chart showing impact of all projects, single overall metric (right) 
- [ ] View - Individual Projects
- - [ ] Project Details
- - [ ] Chart showing individual metrics for the project (15 or so metrics) 
- [ ] Social Media sharing integration 
- [ ] Backend for indexing and serving the metrics

### Extras (We don't need these by deadline but we will add them when we can): 
- [ ] Add timeframes filtering to leaderboard/individual project
- - [ ] Select 1 day, 1 week, 1 month, 1 year and all-time timeframes
- - [ ] Share a link that has a specific timeframe selected 
- [ ] Add metric type filtering to leaderboard
- - [ ] Select which metrics to see on the chart
- - [ ] Share a link that has a specific metrics selected

## Getting Started

1. Clone this repo & install dependencies

    ```
    git clone https://github.com/BuidlGuidl/onchain-impact-dashboard.git
    cd onchain-impact-dashboard
    yarn install
    ```

2. Set up your environment variables (and optionally, a local Firebase instance):
   Make a copy of the `packages/nextjs/.env.example` file and name it `packages/nextjs/.env.local` and fill in the required environment variables.

    (Optional) Start the firebase emulators (vs set up a live Firebase instance). You will need to install the [firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) `npm i -g firebase-tools` and run the following command:

    ```bash
    # You might need to add a real "--project <projectId>" (run firebase projects:list)
    firebase emulators:start
    ```

3. Seed data in your local Firebase instance:

    Copy the `packages/firebase/seed.sample.json` to `packages/firebase/seed.json` and tweak the data as you see fit. Then run the following command:

    ```bash
    yarn seed
    ```

    To seed it to empty _*live*_ firestore instance you can use `yarn seed --force-prod`. If there is data in the live instance, it will not seed it again to bypass it use `yarn seed --reset --force-prod`

4. Start the application

    Execute this command to start the nextjs project in development mode:
    ```bash
    yarn dev
    ```

## API

### Stubbed external APIs

#### Projects (Agora)
To get all:
```
    http://localhost:3000/api/stub/projects
```

To get one by id:
```
    http://localhost:3000/api/stub/projects?id=0x000123456789101112131415...
```

#### Time Series Data (OSO)
The data starts on 2024-01-01 and ends on 2024-04-01.
To get all:
```
    http://localhost:3000/api/stub/series
```

To get specific dates:
```
    http://localhost:3000/api/stub/series?startDate=2024-02-01&endDate=2024-02-28
```

#### Mapping (OSO)
This is how we can associate Agora data to OSO data.
To get all:
```
    http://localhost:3000/api/stub/mapping
```

To search by Agora id or OSO project_name:
```
    http://localhost:3000/api/stub/mapping?id=0x000123456... OR project_name
```