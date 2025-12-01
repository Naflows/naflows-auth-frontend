export type ServiceOverviewTabs = "settings" | "users" | "network" | "safety" | "logs" | "rights" | "overview";
export type accountTabs = "overview" | "capacities" | "security" | "edit" | "network" | "settings" | "users" | "logs" | "rights" | "safety" | "share";

export const SERVICE_OVERVIEW_TABS: { id: ServiceOverviewTabs; label: string }[] = [
    { id : "overview", label: "Overview" },
    { id: "settings", label: "Settings" },
    { id: "users", label: "Users" },
    { id : "rights", label: "Rights" },
    { id: "network", label: "Network" },
    { id: "safety", label: "Safety" },
    { id: "logs", label: "Logs" }
];


export const dirValues: Record<accountTabs, { title: string; description: string }> = {
  "overview": { title: "Service Overview", description: "View and manage your service details, performance metrics, and recent activity." },
  "capacities": { title: "Service Capacities", description: "Monitor and manage the capacities associated with your service." },
  "security": { title: "Service Security", description: "Review and enhance the security settings of your service to protect your data and resources." },
  "edit": { title: "Edit Service", description: "Update your service details and settings to keep your service information accurate and up-to-date." },
  "network": { title: "Service Network", description: "Manage the network settings and configurations for your service." },
  "settings": { title: "Service Settings", description: "Adjust the settings and preferences for your service to optimize its performance." },
  "users": { title: "Service Users", description: "Manage user access and permissions for your service." },
  "logs": { title: "Service Logs", description: "View and analyze the logs associated with your service for monitoring and troubleshooting." },
  "rights": { title: "Service Rights", description: "Manage the rights and permissions associated with your service." },
  "safety": { title: "Service Safety", description: "Review and manage the safety settings of your service to ensure its integrity and reliability." },
  "share": { title: "Share Service", description: "Share your service with others and manage sharing settings." }
};
