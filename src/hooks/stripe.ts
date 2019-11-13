import { useState, useEffect } from "react";
import { paymentIntents } from "stripe";
import { Member } from "../types/member";

export const usePaymentIntent = (member: Member) => {
  const [paymentIntent, setPaymentIntent] = useState<
    paymentIntents.IPaymentIntent
  >();

  useEffect(() => {
    const getPaymentIntent = async (member: Member) => {
      const rawResponse = await fetch("/api/paymentintent", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(member)
      });
      return (await rawResponse.json()) as paymentIntents.IPaymentIntent;
    };

    getPaymentIntent(member)
      .then(paymentIntent => setPaymentIntent(paymentIntent))
      .catch(error => console.error(error));
  }, [member]);

  return paymentIntent;
};
