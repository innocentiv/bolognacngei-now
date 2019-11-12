import { NowRequest, NowResponse } from "@now/node";
import { Member, Enum_Member_Role } from "../src/types/member";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_JCOwxWGOEA9tuXi1n0PbDwWV003XJU4TT2");

export default async (req: NowRequest, res: NowResponse) => {
  const member = req.body as Member;
  let amount = 110.0;
  if (member.reductionFamily) {
    amount -= 15;
  }
  if (member.role === Enum_Member_Role.Adult) {
    amount -= 15;
  }
  if (
    member.role !== Enum_Member_Role.Adult &&
    member.reductionIsee &&
    member.reductionIseeDocuments
  ) {
    amount = 75;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "eur"
  });

  res.json(paymentIntent);
};
