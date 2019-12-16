import { Member, Enum_Member_Role, Enum_Member_Group } from "../types/member";

const BASE_MEMBERSHIP_FEE = 11000;
const BASE_SUPPORTER_FEE = 5000;
const REDUCTION_FAMILY = 1500;
const REDUCTION_ADULT = 1500;
const BASE_DEFAULT_INTEREST = 1000;
const DEFAULT_INTEREST_EACH_MONTH = 1000;
const MAX_DEFAULT_INTEREST = 5000;

export const END_REGISTRATION_DATE = new Date("2019-12-16");

export const computeDefaultInterest = (
  registrationEndDate: Date,
  targetDate: Date
) => {
  const dateDifference = new Date(+targetDate - +registrationEndDate);
  if (+dateDifference > 31622400000) return MAX_DEFAULT_INTEREST;
  if (+dateDifference <= 0) return 0;
  const numberOfMonth = dateDifference.getMonth() + 1;
  return Math.min(
    MAX_DEFAULT_INTEREST,
    BASE_DEFAULT_INTEREST + DEFAULT_INTEREST_EACH_MONTH * numberOfMonth
  );
};

export const computeMembershipFeeForMember = (member: Member) => {
  if (member.role === Enum_Member_Role.Supporter) {
    return BASE_SUPPORTER_FEE;
  }
  let amount = BASE_MEMBERSHIP_FEE;
  if (member.reductionFamily) {
    amount -= REDUCTION_FAMILY;
  }
  if (
    member.role === Enum_Member_Role.Adult &&
    member.group !== Enum_Member_Group.Administrator
  ) {
    amount -= REDUCTION_ADULT;
  }
  if (
    member.paymentPayedAmount !== undefined &&
    member.paymentPayedAmount !== null
  ) {
    amount -= member.paymentPayedAmount;
  }

  amount += computeDefaultInterest(END_REGISTRATION_DATE, new Date());

  return amount;
};
