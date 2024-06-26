import { Project } from "~~/services/database/schema";

export interface LeaderboardProps {
  project: Project;
  rating: number;
}

export interface ICustomButton {
  text: string;
  customClassName?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
