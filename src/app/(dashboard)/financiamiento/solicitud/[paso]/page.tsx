import { redirect } from "next/navigation";
import { WIZARD_PASOS_TOTAL } from "@/features/financiamiento/domain/wizard-schema";
import { WizardView } from "@/features/financiamiento/delivery/financiamiento-view";

type Props = {
  params: Promise<{ paso: string }>;
};

export default async function WizardPasoPage({ params }: Props) {
  const { paso: pasoRaw } = await params;
  const paso = Number.parseInt(pasoRaw, 10);

  if (Number.isNaN(paso) || paso < 1 || paso > WIZARD_PASOS_TOTAL) {
    redirect("/financiamiento/solicitud/1");
  }

  return <WizardView paso={paso} />;
}
