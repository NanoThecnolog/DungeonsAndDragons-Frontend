import type { Metadata } from "next";
import DashboardView from "./DashboardView";

export const metadata: Metadata = {
    title: "Dashboard - D&D",
};

export default function DashboardPage() {
    return <DashboardView />;
}