import ClientDetailView from "@/components/ClientDetailView";

import AppShell from "@/components/AppShell";


export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  return <AppShell><ClientDetailView clientId={clientId} /></AppShell>AppShell>;
}

