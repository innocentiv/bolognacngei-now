import { NowRequest, NowResponse } from "@now/node";
import { Member, Enum_Member_Role } from "../src/types/member";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async (req: NowRequest, res: NowResponse) => {
  const member = req.body as Member;
  let amount = 11000;
  if (member.reductionFamily) {
    amount -= 1500;
  }
  if (member.role === Enum_Member_Role.Adult) {
    amount -= 1500;
  }
  if (
    member.role !== Enum_Member_Role.Adult &&
    member.reductionIsee &&
    member.reductionIseeDocuments
  ) {
    amount = 7500;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "eur",
    receipt_email: member.email || undefined,
    description: `Iscrizione ${member.name ||
      "Sconosciuto"} ${member.fiscalCode || ""}`
  });

  res.json(paymentIntent);
};
