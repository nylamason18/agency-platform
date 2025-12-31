import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import AiAssistantWidget from "./AiAssistantWidget";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <Topbar />
        <div style={{ padding: 16 }}>{children}</div>
      </div>
      <AiAssistantWidget />
    </div>
  );
}
