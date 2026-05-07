export interface Campaign {
	id: string;
	name: string;
	platform: string;
	impressions?: number;
	clicks: number;
	conversions: number;
	cost: number;
	date_start: string;
	date_end: string;
	metrics: {
		ctr: number;
		cpc: number;
		cpa: number;
	};
}

export interface CreateCampaignDTO {
	name: string;
	platform: string;
	impressions: number;
	clicks: number;
	conversions: number;
	cost: number;
	date_start: string;
	date_end: string;
}

export interface AnalyzeResult {
	id: string;
	summary: string;
	issues: string[];
	recommendations: string[];
	priority_actions: string[];
	campaign_name: string;
	campaign_platform: string;
}

export interface CampaignListResponse {
	data: Campaign[];
	meta: {
		page: number;
		limit: number;
		total: number;
		total_pages: number;
	};
}

export interface AnalysisHistory {
	id: string;
	campaign_id: string;
	campaign_name: string;
	platform: string;
	ctr: number;
	created_at: string;
	summary: string;
	issues: string[];
	recommendations: string[];
	priority_actions: string[];
}

export interface AnalysisHistoryListResponse {
	data: AnalysisHistory[];
	meta: {
		page: number;
		limit: number;
		total: number;
		total_pages: number;
	};
}

export interface CsvRow {
	row: number;
	name: string;
	platform: string;
	status: 'valid' | 'invalid';
	error?: string;
	impressions?: number;
	clicks?: number;
	conversions?: number;
	cost?: number;
	date_start?: string;
	date_end?: string;
}

export interface CsvUploadResult {
	imported: number;
	failed: number;
	rows: CsvRow[];
	errors?: string[];
}
