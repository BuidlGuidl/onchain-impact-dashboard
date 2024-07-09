import { IProject } from "~~/services/mongodb/models/project";

export interface LeaderboardProps {
  project: IProject;
  rating: number;
}

export interface ICustomButton {
  text: string;
  customClassName?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface Mapping {
  application_id: string;
  oso_name: string;
  project_name: string;
  is_approved: string;
}
