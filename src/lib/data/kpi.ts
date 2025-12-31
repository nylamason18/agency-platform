export type Channel = "google_ads" | "meta_ads" | "email" | "seo";

export type KpiPoint = {
  date: string; // YYYY-MM-DD
  channel: Channel;
  spend: number;
  clicks: number;
  impressions: number;
  leads: number;
  revenue: number;
};

export function getMockKpis(clientId: string): KpiPoint[] {
  return [
    {
      date: "2025-12-01",
      channel: "google_ads",
      spend: 420,
      clicks: 210,
      impressions: 8200,
      leads: 12,
      revenue: 1800,
    },
    {
      date: "2025-12-02",
      channel: "google_ads",
      spend: 390,
      clicks: 198,
      impressions: 7900,
      leads: 10,
      revenue: 1600,
    },
    {
      date: "2025-12-03",
      channel: "google_ads",
      spend: 460,
      clicks: 240,
      impressions: 8600,
      leads: 14,
      revenue: 2100,
    },
    {
      date: "2025-12-01",
      channel: "meta_ads",
      spend: 300,
      clicks: 160,
      impressions: 9100,
      leads: 9,
      revenue: 1200,
    },
    {
      date: "2025-12-02",
      channel: "meta_ads",
      spend: 320,
      clicks: 170,
      impressions: 9500,
      leads: 11,
      revenue: 1400,
    },
    {
      date: "2025-12-03",
      channel: "meta_ads",
      spend: 280,
      clicks: 150,
      impressions: 8800,
      leads: 8,
      revenue: 1100,
    },
  ];
}
