// Type definitions for J38 Corporation Web Platform

export type ServiceType =
  | 'Digital Marketing'
  | 'AI'
  | 'Automation'
  | 'Branding'
  | 'Web Solutions'
  | 'Multiple Services';

export type BudgetTier = '$2K–$5K' | '$5K–$10K' | '$10K–$25K' | '$25K+';

export type TimelineType =
  | 'Immediately'
  | 'Within 30 days'
  | 'This quarter'
  | 'Still planning';

export type MarketRegion =
  | 'United States'
  | 'Australia'
  | 'New Zealand'
  | 'Europe'
  | 'Middle East'
  | 'Other';

export type AuditStatus =
  | 'NEW'
  | 'REVIEWING'
  | 'AUDIT_SENT'
  | 'ONBOARDING'
  | 'ARCHIVED';

export interface GrowthAudit {
  id: string;
  name: string;
  company?: string;
  email: string;
  website?: string;
  phone?: string;
  service: string;
  budget?: string;
  timeline: string;
  market: string;
  goal?: string;
  status: AuditStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  ip?: string;
  userAgent?: string;
}

export interface AuditStats {
  total: number;
  newCount: number;
  reviewingCount: number;
  sentCount: number;
  closedCount: number;
  conversionRate: number;
}
