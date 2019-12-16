import { NowRequest, NowResponse } from "@now/node";
import Stripe from "stripe";
import { Member } from "../src/types/member";
import { computeMembershipFeeForMember } from "../src/utils/payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async (req: NowRequest, res: NowResponse) => {
  const member = req.body as Member;
  const amount = computeMembershipFeeForMember(member);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "eur",
    receipt_email: member.email || undefined,
    description: `Iscrizione ${member.name ||
      "Sconosciuto"} ${member.fiscalCode || ""}`
  });

  res.json(paymentIntent);
};
