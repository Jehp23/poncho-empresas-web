import type { Metadata } from "next";
import { BancosView } from "@/features/bancos/delivery/bancos-view";

export const metadata: Metadata = {
  title: "Consolidación Bancaria",
};

export default function ConsolidacionPage() {
  return <BancosView />;
}
