import { redirect } from "next/navigation";

export default function TransferenciasPage() {
  redirect("/operar?tab=transferir");
}
