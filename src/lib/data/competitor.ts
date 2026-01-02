export type Competitor = {
  id: string;
  name: string;
  domain: string;
  industry: string;
  clientIds: string[]; // which client(s) this competitor relates to
  suggestedFor?: string[]; // clientIds it is suggested for
  suggestionReasons?: Record<string, string[]>; // keyed by clientId
  lastScannedAt: string;

  scan: {
    homepageTitle: string;
    metaDescription: string;
    h1: string;
    cta: string;
    notes: string[];
  };

  ads: {
    platform: "google" | "meta";
    headline: string;
    primaryText: string;
    offer: string;
    seenAt: string;
  }[];

  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };

  trends: {
    keywords: string[];
    note: string;
  };
};

export const CLIENTS = [
  { id: "c1", name: "TechCorp", industry: "B2B SaaS" },
  { id: "c2", name: "GreenLeaf Industries", industry: "Manufacturing" },
  { id: "c3", name: "RetailMax", industry: "Retail / eCommerce" },
];

export const COMPETITORS: Competitor[] = [
  {
    id: "k1",
    name: "BrightMetric",
    domain: "brightmetric.com",
    industry: "B2B SaaS",
    clientIds: ["c1"],
    suggestedFor: ["c1"],
    suggestionReasons: {
      c1: [
        "Shares top keywords: “analytics dashboard”, “pipeline reporting”",
        "Similar pricing model detected (tiered plans + add-ons)",
        "Messaging overlap: “faster insights for teams”",
      ],
    },
    lastScannedAt: "2026-01-02",
    scan: {
      homepageTitle: "BrightMetric — Dashboards that drive revenue",
      metaDescription: "Real-time KPI tracking, forecasting, and pipeline analytics for modern revenue teams.",
      h1: "Move from reporting to revenue impact",
      cta: "Book a demo",
      notes: ["Has “Solutions” landing page per industry", "Strong social proof section above the fold", "Pricing page includes calculator"],
    },
    ads: [
      {
        platform: "meta",
        headline: "Stop guessing. Track revenue KPIs.",
        primaryText: "Teams using BrightMetric report faster decisions and better forecasts.",
        offer: "Free KPI audit",
        seenAt: "2026-01-01",
      },
      {
        platform: "google",
        headline: "KPI Dashboard for SaaS Teams",
        primaryText: "Connect CRM + Ads + GA. Share weekly reports automatically.",
        offer: "Book a demo",
        seenAt: "2025-12-28",
      },
    ],
    swot: {
      strengths: ["Clear value proposition", "Pricing transparency", "Strong demo CTA"],
      weaknesses: ["Limited integrations called out", "Few technical deep-dives"],
      opportunities: ["Target mid-market use cases", "Lead with integration breadth"],
      threats: ["Aggressive paid search on ‘KPI dashboard’ keywords", "Strong category messaging"],
    },
    trends: {
      keywords: ["kpi dashboard", "revenue analytics", "pipeline forecasting"],
      note: "Prototype: later replace with Google Trends interest + related queries.",
    },
  },

  {
    id: "k2",
    name: "ShopPulse",
    domain: "shoppulse.io",
    industry: "Retail / eCommerce",
    clientIds: ["c3"],
    suggestedFor: ["c3"],
    suggestionReasons: {
      c3: [
        "Ad creatives match your category (seasonal promos)",
        "Similar product assortment & pricing range",
        "High overlap in search intent: “same-day pickup”, “bundle deals”",
      ],
    },
    lastScannedAt: "2026-01-01",
    scan: {
      homepageTitle: "ShopPulse — Deals that move fast",
      metaDescription: "Trending products, bundles, and same-day pickup — built for busy shoppers.",
      h1: "Shop smarter. Save more.",
      cta: "Shop now",
      notes: ["Homepage hero rotates promos", "Heavy emphasis on bundles", "Email capture popup with discount"],
    },
    ads: [
      {
        platform: "meta",
        headline: "Bundle & Save This Week",
        primaryText: "Limited-time bundles on best sellers. Pickup available.",
        offer: "15% off",
        seenAt: "2025-12-31",
      },
    ],
    swot: {
      strengths: ["Strong promo strategy", "Clear CTAs", "Fast conversion funnel"],
      weaknesses: ["Brand messaging is generic", "Less trust-building content"],
      opportunities: ["Differentiate with quality + reviews + long-term loyalty"],
      threats: ["Aggressive discounting", "High ad frequency during peaks"],
    },
    trends: {
      keywords: ["bundle deals", "same day pickup", "holiday savings"],
      note: "Prototype: later replace with Google Trends + ad library signals.",
    },
  },

  {
    id: "k3",
    name: "LeadForge",
    domain: "leadforge.com",
    industry: "B2B SaaS",
    clientIds: ["c1"],
    suggestedFor: ["c1"],
    suggestionReasons: {
      c1: ["Shares keywords: “lead scoring”, “pipeline automation”", "Competitor content ranks for ‘sales ops’ queries"],
    },
    lastScannedAt: "2025-12-30",
    scan: {
      homepageTitle: "LeadForge — Automate pipeline operations",
      metaDescription: "Lead scoring, enrichment, and routing that keeps pipeline moving.",
      h1: "Automate the steps that slow your pipeline",
      cta: "Start free trial",
      notes: ["Very strong blog content", "SEO-first landing pages", "Case studies emphasized"],
    },
    ads: [],
    swot: {
      strengths: ["SEO content depth", "Strong product story", "Free trial entry point"],
      weaknesses: ["Less analytics focus", "Pricing not obvious"],
      opportunities: ["Position as analytics + automation combined"],
      threats: ["Owns TOFU keywords that feed pipeline"],
    },
    trends: {
      keywords: ["lead scoring", "pipeline automation", "sales ops"],
      note: "Prototype only.",
    },
  },
];
