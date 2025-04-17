export interface User {
  uid: string;
  name: string;
  email: string;
  role: 'investor' | 'entrepreneur';
  phone?: string;
  address?: string;
  bio?: string;
  kycDocumentUrl?: string;
  businessPlanUrl?: string;
  onboardingCompleted: boolean;
  onboardingCompletedAt?: string;
  createdAt: string;
}

export interface Startup {
  id: string;
  name: string;
  description: string;
  founderId: string;
  founderName: string;
  businessPlanUrl: string;
  fundingGoal: number;
  currentFunding: number;
  tokenPrice: number;
  totalTokens: number;
  availableTokens: number;
  status: 'active' | 'funded' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface Investment {
  id: string;
  startupId: string;
  investorId: string;
  amount: number;
  tokens: number;
  transactionHash: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  creatorName: string;
  memberCount: number;
  monthlyContribution: number;
  totalFunds: number;
  status: 'active' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface CommunityMember {
  id: string;
  communityId: string;
  userId: string;
  userName: string;
  role: 'member' | 'admin';
  contributionAmount: number;
  joinedAt: string;
}

export interface CommunityContribution {
  id: string;
  communityId: string;
  memberId: string;
  amount: number;
  transactionHash: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
} 