import { useState, useEffect } from "react";
import { paymentIntents } from "stripe";
import { Member, Enum_Member_Payment_Status } from "../types/member";

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

    let paymentRequestStale = false;
    if (
      member.paymentStatus !== Enum_Member_Payment_Status.PaymentComplete &&
      member.paymentStatus !== Enum_Member_Payment_Status.Tobeverified
    ) {
      getPaymentIntent(member)
        .then(paymentIntent => {
          if (paymentRequestStale) return;
          setPaymentIntent(paymentIntent);
        })
        .catch(error => console.error(error));
    }
    return () => {
      paymentRequestStale = true;
    };
  }, [member]);

  return paymentIntent;
};
