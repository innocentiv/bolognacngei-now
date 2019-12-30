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
import { CellObject } from "xlsx/types";
import { computeMembershipFeeForMember } from "./payment";

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

export const getIseeMemberList = async (
  firestore: ExtendedFirestoreInstance
) => {
  const membersSnapshot = await firestore
    .collection("members")
    .where("reductionIsee", "==", true)
    .get();
  const members = [] as Member[];
  membersSnapshot.forEach(memberDoc => {
    const member = memberDoc.data() as Member;
    members.push(member);
  });
  return members;
};

export const getAllMemberList = async (
  firestore: ExtendedFirestoreInstance
) => {
  const membersSnapshot = await firestore.collection("members").get();
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
  needpayment: "Necessario Pagamento",
  needintegration: "Necessaria Integrazione"
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

export const mapDocumentToExport = (
  file?: Maybe<UploadFile[]>,
  index: number = 0
) => {
  if (file === null || file === undefined) {
    return null;
  }

  return file.map(doc => {
    const cellObj: CellObject = {
      l: { Target: doc.url, Tooltip: doc.name },
      t: "s",
      v: doc.name
    };
    return cellObj;
  })[index];
};

export const mapBooleanToExport = (value?: Maybe<boolean>) => {
  return value ? "Vero" : "Falso";
};

export const isValidDate = (date: Date) => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const dateStringToDate = (date: string) => {
  return new Date(date.replace(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/, "$2/$1/$3"));
};

export const dateToIsoDate = (date: string) => {
  const dateObj = dateStringToDate(date);
  return isValidDate(dateObj)
    ? new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10)
    : "";
};

export const mapDateToExport = (date: string) => {
  const dateObj = dateStringToDate(date);
  return isValidDate(dateObj) ? dateObj.toLocaleDateString("it") : "";
};

export const mapPriceToExport = (price: number) => {
  return (price / 100).toLocaleString() + "€";
};

export const mapMemberToExport = (
  member: Member
): { [key: string]: CellObject | string | null | undefined } => ({
  "Stato Pagamento": mapPaymentToExport(
    member.paymentStatus,
    Enum_Member_Payment_Status.Needpayment
  ),
  Nome: member.name,
  Gruppo: mapGroupToExport(member.group),
  Ruolo: mapRoleToExport(member.role),
  "Luogo di nascita": member.birthplace,
  "Data di Nascita": member.birthdate && mapDateToExport(member.birthdate),
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
  "Documenti Medici 1": mapDocumentToExport(member.healthMedicalDocuments, 0),
  "Documenti Medici 2": mapDocumentToExport(member.healthMedicalDocuments, 1),
  "Fascia ISEE": member.reductionIsee
    ? mapIseeRangeToExport(member.reductionIseeRange)
    : null
});

export const mapIseeMemberToExport = (
  member: Member
): { [key: string]: CellObject | string | null | undefined } => ({
  Nome: member.name,
  Gruppo: mapGroupToExport(member.group),
  Ruolo: mapRoleToExport(member.role),
  "Codice Fiscale": member.fiscalCode,
  Email: member.email,
  Telefono: member.phone,
  "Nome del Tutore": member.tutorName,
  "Fascia ISEE": member.reductionIsee
    ? mapIseeRangeToExport(member.reductionIseeRange)
    : null,
  "Documenti Isee 1": mapDocumentToExport(member.reductionIseeDocuments, 0),
  "Documenti Isee 2": mapDocumentToExport(member.reductionIseeDocuments, 1),
  "Documento Pagamento": mapDocumentToExport(member.paymentBankTransfert, 0),
  "Stato Pagamento": mapPaymentToExport(
    member.paymentStatus,
    Enum_Member_Payment_Status.Needpayment
  )
});

export const mapAllMemberToExport = (
  member: Member
): { [key: string]: CellObject | string | null | undefined } => ({
  Nome: member.name,
  Gruppo: mapGroupToExport(member.group),
  Ruolo: mapRoleToExport(member.role),
  "Luogo di nascita": member.birthplace,
  "Data di Nascita": member.birthdate && mapDateToExport(member.birthdate),
  Indirizzo: member.address,
  "Indirizzo Formattato": member.formattedAddress,
  "Codice Fiscale": member.fiscalCode,
  Email: member.email,
  Telefono: member.phone,
  "Nome del Tutore": member.tutorName,
  "Fascia ISEE": member.reductionIsee
    ? mapIseeRangeToExport(member.reductionIseeRange)
    : null,
  "Documenti Isee 1": mapDocumentToExport(member.reductionIseeDocuments, 0),
  "Documenti Isee 2": mapDocumentToExport(member.reductionIseeDocuments, 1),
  "Documento Pagamento 1": mapDocumentToExport(member.paymentBankTransfert, 0),
  "Documento Pagamento 2": mapDocumentToExport(member.paymentBankTransfert, 1),
  "Stato Pagamento": mapPaymentToExport(
    member.paymentStatus,
    Enum_Member_Payment_Status.Needpayment
  ),
  "Pagamento Verificato": member.paymentPayedAmount
    ? mapPriceToExport(member.paymentPayedAmount)
    : "",
  "Pagamento Richesto": mapPriceToExport(
    member.paymentDue || computeMembershipFeeForMember(member)
  ),
  "Data ultima modifica":
    member.dateLastUpdated && mapDateToExport(member.dateLastUpdated),
  "Data iscrizione":
    member.dateFirstCompleted && mapDateToExport(member.dateFirstCompleted)
});

export const sortMemberToExport = (a: Member, b: Member) => {
  if (!a.group) return 1;
  if (!b.group) return -1;
  const groupComparison = a.group.localeCompare(b.group);
  if (groupComparison !== 0) return groupComparison;
  if (!a.role) return 1;
  if (!b.role) return -1;
  const roleComparison = a.role.localeCompare(b.role);
  if (roleComparison !== 0) return roleComparison;
  if (!a.birthdate || !b.birthdate) return roleComparison;
  return a.birthdate.localeCompare(b.birthdate);
};

export const getNowDateString = () => {
  return new Date().toISOString().substr(0, 10);
};
