import fs from 'fs';
import path from 'path';

export interface GrowthAudit {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  market: string;
  goal: string;
  status: 'NEW' | 'REVIEWING' | 'AUDIT_SENT' | 'ONBOARDING' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  notes?: string;
  ip?: string;
  userAgent?: string;
}

const SEED_AUDITS: GrowthAudit[] = [
  {
    id: 'audit_01j9a8b1',
    name: 'Marcus Vance',
    company: 'Apex Apparel Co.',
    email: 'marcus@apexapparel.com',
    phone: '+1 (415) 890-2145',
    service: 'Digital Marketing',
    budget: '$10K–$25K',
    timeline: 'Immediately',
    market: 'United States',
    goal: 'Scale DTC e-commerce acquisition from 1.8X to 3.5X ROAS across Meta and TikTok ads.',
    status: 'AUDIT_SENT',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    notes: 'Audit completed. Recommendations sent for catalog retargeting and creative testing.'
  },
  {
    id: 'audit_01j9a8b2',
    name: 'Elena Rostova',
    company: 'FinPulse AI',
    email: 'elena@finpulse.io',
    phone: '+44 20 7946 0912',
    service: 'AI',
    budget: '$25K+',
    timeline: 'Within 30 days',
    market: 'Europe',
    goal: 'Build intelligent autonomous sales agent workflows and CRM routing for B2B fintech.',
    status: 'REVIEWING',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    notes: 'Initial requirements match custom AI workflow engine. Discovery call scheduled.'
  },
  {
    id: 'audit_01j9a8b3',
    name: 'Liam Chen',
    company: 'Horizon Developments',
    email: 'liam@horizonrealestate.com.au',
    phone: '+61 2 9876 5432',
    service: 'Web Solutions',
    budget: '$10K–$25K',
    timeline: 'This quarter',
    market: 'Australia',
    goal: 'High-converting project landing pages with interactive floorplan selector and lead qualification funnel.',
    status: 'NEW',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: 'Inquiry received today. Needs prompt follow-up.'
  }
];

function getDbPath(): string {
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    return path.join('/tmp', 'j38_audits.json');
  }
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      return path.join('/tmp', 'j38_audits.json');
    }
  }
  return path.join(dataDir, 'audits.json');
}

function readData(): GrowthAudit[] {
  const filePath = getDbPath();
  try {
    if (!fs.existsSync(filePath)) {
      writeData(SEED_AUDITS);
      return SEED_AUDITS;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_AUDITS;
  } catch (err) {
    console.error('[db] Error reading audits database:', err);
    return SEED_AUDITS;
  }
}

function writeData(data: GrowthAudit[]): boolean {
  const filePath = getDbPath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[db] Error writing audits database:', err);
    return false;
  }
}

export async function getAllAudits(): Promise<GrowthAudit[]> {
  const audits = readData();
  return audits.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getAuditById(id: string): Promise<GrowthAudit | null> {
  const audits = readData();
  return audits.find(a => a.id === id) || null;
}

export async function createAudit(payload: Omit<GrowthAudit, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<GrowthAudit> {
  const audits = readData();
  const id = 'audit_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
  const now = new Date().toISOString();
  
  const newAudit: GrowthAudit = {
    ...payload,
    id,
    status: 'NEW',
    createdAt: now,
    updatedAt: now,
  };

  audits.unshift(newAudit);
  writeData(audits);
  return newAudit;
}

export async function updateAuditStatus(id: string, status: GrowthAudit['status'], notes?: string): Promise<GrowthAudit | null> {
  const audits = readData();
  const index = audits.findIndex(a => a.id === id);
  if (index === -1) return null;

  audits[index].status = status;
  audits[index].updatedAt = new Date().toISOString();
  if (notes !== undefined) {
    audits[index].notes = notes;
  }

  writeData(audits);
  return audits[index];
}

export async function deleteAudit(id: string): Promise<boolean> {
  const audits = readData();
  const filtered = audits.filter(a => a.id !== id);
  if (filtered.length === audits.length) return false;
  writeData(filtered);
  return true;
}

export async function getAuditStats() {
  const audits = readData();
  const total = audits.length;
  const newCount = audits.filter(a => a.status === 'NEW').length;
  const reviewingCount = audits.filter(a => a.status === 'REVIEWING').length;
  const sentCount = audits.filter(a => a.status === 'AUDIT_SENT').length;
  const closedCount = audits.filter(a => a.status === 'ONBOARDING').length;

  return {
    total,
    newCount,
    reviewingCount,
    sentCount,
    closedCount,
    conversionRate: total > 0 ? Math.round(((sentCount + closedCount) / total) * 100) : 0,
  };
}
