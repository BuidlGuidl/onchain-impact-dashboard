import mongoose, { Model, Schema } from "mongoose";

export interface IProject {
  id: string;
  category: string;
  name: string;
  description: string;
  profileAvatarUrl: string;
  proejctCoverImageUrl: string; // Typo intentional (Agora has typo)
  socialLinks: ISocialLinks;
  team: string[];
  github: string[];
  packages: string[];
  contracts: IContract[];
  grantsAndFunding: IGrantsAndFunding;
}

export interface IContract {
  address: string;
  deploymentTxHash: string;
  deployerAddress: string;
  chainId: number;
}

export interface ISocialLinks {
  twitter: string;
  farcaster: string[];
  mirror: string;
  website: string[];
}

export interface IGrantsAndFunding {
  ventureFunding: IVentureFunding[];
  grants: IGrant[];
  revenue: IRevenue[];
}

export interface IVentureFunding {
  amount: string;
  year: string;
  details: string;
}

export interface IGrant {
  grant: string;
  link: string;
  amount: string;
  date: string;
  details: string;
}

export interface IRevenue {
  amount: string;
  details: string;
}

const RevenueSchema = new Schema<IRevenue>({
  amount: {
    type: String,
  },
  details: {
    type: String,
  },
});

const GrantSchema = new Schema<IGrant>({
  grant: {
    type: String,
  },
  link: {
    type: String,
  },
  amount: {
    type: String,
  },
  date: {
    type: String,
  },
  details: {
    type: String,
  },
});

const VentureFundingSchema = new Schema<IVentureFunding>({
  amount: {
    type: String,
  },
  year: {
    type: String,
  },
  details: {
    type: String,
  },
});

const SocialLinksSchema = new Schema<ISocialLinks>({
  twitter: {
    type: String,
  },
  farcaster: {
    type: [String],
  },
  mirror: {
    type: String,
  },
  website: {
    type: [String],
  },
});

const ContractSchema = new Schema<IContract>({
  address: {
    type: String,
  },
  deploymentTxHash: {
    type: String,
  },
  deployerAddress: {
    type: String,
  },
  chainId: {
    type: Number,
  },
});

const ProjectSchema = new Schema<IProject>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  profileAvatarUrl: {
    type: String,
  },
  proejctCoverImageUrl: {
    type: String,
  },
  socialLinks: {
    type: SocialLinksSchema,
  },
  team: {
    type: [String],
  },
  github: {
    type: [String],
  },
  packages: {
    type: [String],
  },
  contracts: {
    type: [ContractSchema],
  },
  grantsAndFunding: {
    type: {
      ventureFunding: [VentureFundingSchema],
      grants: [GrantSchema],
      revenue: [RevenueSchema],
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProjectModel extends Model<IProject, object> {}

const Project =
  (mongoose.models.Project as unknown as IProjectModel) || mongoose.model<IProjectModel>("Project", ProjectSchema);

export default Project;
