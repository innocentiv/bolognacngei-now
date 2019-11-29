import { ExtendedFirestoreInstance } from "react-redux-firebase";
import {
  Enum_Member_Group,
  Member,
  Enum_Member_Payment_Status,
  UploadFile,
  Enum_Member_Reductioniseerange,
  Enum_Member_Role
} from "../types/member";
import { Maybe } from "../types/utils";
import { database } from "firebase";

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

export const getTypeMapper = <T extends string>(
  map: { [key in T]: string }
) => (value: Maybe<T | undefined>, fallback?: T) => {
  let v = value;
  if (v === null || v === undefined) {
    return fallback ? map[fallback] : null;
  }
  return map[v];
};

export const mapPaymentToExport = getTypeMapper<Enum_Member_Payment_Status>({
  paymentcomplete: "Pagamento Completato",
  tobeverified: "Bonifico caricato",
  needpayment: "Necessario Pagamento"
});

export const mapIseeRangeToExport = getTypeMapper<
  Enum_Member_Reductioniseerange
>({
  under7000: "F1 sotto 7000",
  under13000: "F2 sotto 13000",
  under19000: "F3 sotto 19000"
});

export const mapRoleToExport = getTypeMapper<Enum_Member_Role>({
  cub: "Lupetto",
  scout: "Esporatore",
  rover: "Rover",
  adult: "Adulto",
  supporter: "Sostenitore",
  waitinglist: "Lista di Attesa"
});

export const mapGroupToExport = getTypeMapper<Enum_Member_Group>({
  group1: "Gruppo 1",
  group2: "Gruppo 2",
  group3: "Gruppo 3",
  group5: "Gruppo 5",
  clan: "Clan",
  administrator: "COS e COSEZ"
});

export const mapDocumentToExport = (file?: Maybe<UploadFile[]>) => {
  if (file === null || file === undefined) {
    return null;
  }

  return file.map(doc => doc.url).join(", ");
};

export const mapBooleanToExport = (value?: Maybe<boolean>) => {
  return value ? "Vero" : "Falso";
};

export const mapDateToExport = (date: string) => {
  const isoDate = new Date(
    date.replace(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/, "$2/$1/$3")
  );
  return isoDate.toLocaleDateString("it");
};

export const mapMemberToExport = (
  member: Member
): { [key: string]: string | null | undefined } => ({
  "Stato Pagamento": mapPaymentToExport(
    member.paymentStatus,
    Enum_Member_Payment_Status.Needpayment
  ),
  Nome: member.name,
  Gruppo: mapGroupToExport(member.group),
  Ruolo: mapRoleToExport(member.role),
  "Luogo di nascita": member.birthplace,
  "Data di Nascita": mapDateToExport(member.birthdate),
  Indirizzo: member.address,
  "Codice Fiscale": member.fiscalCode,
  Email: member.email,
  Telefono: member.phone,
  "Nome del Tutore": member.tutorName,
  "Trattamento Immagini": mapBooleanToExport(member.privacyImages),
  "Allergie Alimentari": member.healthFoodAllergies,
  "Allergie Insetti": member.healthInsectAllergies,
  "Allergie Farmaci": member.healthDrugsAllergies,
  "Allergie Stagionali": member.healthSeasonalAllergies,
  "Condizioni Mediche": member.healthMedicalConditions,
  "Documenti Medici": mapDocumentToExport(member.healthMedicalDocuments),
  "Fascia ISEE": member.reductionIsee
    ? mapIseeRangeToExport(member.reductionIseeRange)
    : null
});

export const sortMemberToExport = (a: Member, b: Member) => {
  if (!a.role) return 1;
  if (!b.role) return -1;
  const roleComparison = a.role.localeCompare(b.role);
  if (roleComparison !== 0) return roleComparison;
  if (!a.birthdate || !b.birthdate) return roleComparison;
  return a.birthdate.localeCompare(b.birthdate);
};
