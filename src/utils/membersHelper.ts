import { ExtendedFirestoreInstance } from "react-redux-firebase";
import {
  Enum_Member_Group,
  Member,
  Enum_Member_Payment_Status
} from "../types/member";

export const getGroupMemberList = async (
  firestore: ExtendedFirestoreInstance,
  group: Enum_Member_Group
) => {
  const membersSnapshot = await firestore
    .collection("members")
    .where("group", "==", group)
    .get();
  const members = [] as Member[];
  membersSnapshot.forEach(memberDoc => {
    const member = memberDoc.data() as Member;
    members.push(member);
  });
  return members;
};

export const mapMemberToExport = (member: Member) => ({
  "Iscrizioni Completate":
    member.paymentStatus === Enum_Member_Payment_Status.PaymentComplete ||
    member.paymentStatus === Enum_Member_Payment_Status.Tobeverified,
  Nome: member.name,
  Gruppo: member.group,
  Ruolo: member.role,
  "Luogo di nascita": member.birthplace,
  "Data di Nascita": member.birthdate,
  Indirizzo: member.address,
  "Codice Fiscale": member.fiscalCode,
  Email: member.email,
  Telefono: member.phone,
  "Nome del Tutore": member.tutorName,
  "Trattamento Immagini": member.privacyImages,
  "Allergie Alimentari": member.healthFoodAllergies,
  "Allergie Insetti": member.healthInsectAllergies,
  "Allergie Farmaci": member.healthDrugsAllergies,
  "Allergie Stagionali": member.healthSeasonalAllergies,
  "Condizioni Mediche": member.healthMedicalConditions,
  "Documenti Medici":
    member.healthMedicalDocuments &&
    member.healthMedicalDocuments.map(doc => doc.url).join(", "),
  "Fascia ISEE": member.reductionIsee ? member.reductionIseeRange : ""
});

export const sortMemberToExport = (a: Member, b: Member) => {
  if (!a.role) return 1;
  if (!b.role) return -1;
  const roleComparison = a.role.localeCompare(b.role);
  if (roleComparison !== 0) return roleComparison;
  if (!a.birthdate || !b.birthdate) return roleComparison;
  return a.birthdate.localeCompare(b.birthdate);
};
