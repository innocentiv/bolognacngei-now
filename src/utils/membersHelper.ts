import { ExtendedFirestoreInstance } from "react-redux-firebase";
import { Enum_Member_Group, Member } from "../types/member";

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
  "Documenti Medici": member.healthMedicalDocuments,
  "Fascia ISEE": member.reductionIsee ? member.reductionIseeRange : ""
});
