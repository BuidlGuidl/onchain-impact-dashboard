import { Project } from "~~/services/database/schema";

type ProtoType =
  | {
      avatarUrl: string;
      name: string;
      description: string;
    }
  | Project;
export const IMAGE_URL =
  "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo34.png?raw=true";
export const TEST_PROJECTS: ProtoType[] = [
  {
    id: "1",
    avatarUrl:
      "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo34.png?raw=true",
    name: "BuidlGuidl AllStars",
    description: "Cool builders building open source stuff",
  },
  {
    id: "2",
    avatarUrl:
      "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo_2.png?raw=true",
    name: "Guild Warriors",
    description: "Cyber punk gamers on the blockchain",
  },
  {
    id: "3",
    avatarUrl:
      "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo_2.png?raw=true",
    name: "Tech Titans",
    description: "Innovators leading the tech revolution",
  },
  {
    id: "4",
    avatarUrl:
      "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo_2.png?raw=true",
    name: "Crypto Crusaders",
    description: "Pioneers of the cryptocurrency world",
  },
  {
    id: "5",
    avatarUrl:
      "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo_2.png?raw=true",
    name: "Code Masters",
    description: "Masters of coding and development",
  },
  {
    id: "6",
    avatarUrl:
      "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo_2.png?raw=true",
    name: "Blockchain Builders",
    description: "Building the future with blockchain technology",
  },
  {
    id: "7",
    avatarUrl:
      "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo_2.png?raw=true",
    name: "DeFi Dreamers",
    description: "Dreamers of decentralized finance solutions",
  },
  {
    id: "8",
    avatarUrl:
      "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo_2.png?raw=true",
    name: "Smart Contract Wizards",
    description: "Experts in creating smart contracts",
  },
  {
    id: "9",
    avatarUrl:
      "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo_2.png?raw=true",
    name: "NFT Innovators",
    description: "Innovating in the NFT space",
  },
  {
    id: "10",
    avatarUrl:
      "https://github.com/blahkheart/OP-RetroPGF3-Discovery-Voting/blob/main/packages/nextjs/public/assets/projects/Logo_2.png?raw=true",
    name: "Open Source Heroes",
    description: "Heroes of the open source community",
  },
];
