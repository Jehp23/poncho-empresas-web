import { redirect } from "next/navigation";

export default function DepositosPage() {
  redirect("/operar?tab=depositar");
}
