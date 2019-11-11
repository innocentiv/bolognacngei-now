export type Maybe<T> = T | null;

export type Reference = string;
export type UploadFile = string;
export type DateTime = any;

export enum Enum_Member_Group {
  Group1 = "group1",
  Group2 = "group2",
  Group3 = "group3",
  Group5 = "group5",
  Clan = "clan",
  Administrator = "administrator"
}

export enum Enum_Member_Reductionfamilyrelation {
  Sibling = "sibling",
  Child = "child",
  Parent = "parent"
}

export enum Enum_Member_Reductioniseerange {
  Under7000 = "under7000",
  Under13000 = "under13000",
  Under19000 = "under19000"
}

export enum Enum_Member_Role {
  Cub = "cub",
  Scout = "scout",
  Rover = "rover",
  Adult = "adult",
  Supporter = "supporter",
  Waitinglist = "waitinglist"
}

export type Member = {
  id?: string;
  name: string;
  user: string;
  renewalDate?: Maybe<DateTime>;
  group?: Maybe<Enum_Member_Group>;
  role?: Maybe<Enum_Member_Role>;
  birthplace?: Maybe<string>;
  birthdate?: Maybe<DateTime>;
  address?: Maybe<string>;
  fiscalCode?: Maybe<string>;
  email?: Maybe<string>;
  phone?: Maybe<string>;
  tutorName?: Maybe<string>;
  noOtherScoutMovements?: Maybe<boolean>;
  neverBanned?: Maybe<boolean>;
  hasCivilRight?: Maybe<boolean>;
  isInformed?: Maybe<boolean>;
  noAdverse?: Maybe<boolean>;
  emailCommunication?: Maybe<boolean>;
  privacyImages?: Maybe<boolean>;
  privacyEshop?: Maybe<boolean>;
  privacyHealth?: Maybe<boolean>;
  healthMeasles?: Maybe<boolean>;
  healthMumps?: Maybe<boolean>;
  healthRubella?: Maybe<boolean>;
  healthChickenpox?: Maybe<boolean>;
  healthPertussis?: Maybe<boolean>;
  healthTetanus?: Maybe<boolean>;
  healthPolio?: Maybe<boolean>;
  healthDiphtheria?: Maybe<boolean>;
  healthHepatitisB?: Maybe<boolean>;
  healthHaemophilus?: Maybe<boolean>;
  healthTetanusDate?: Maybe<DateTime>;
  healthFoodAllergies?: Maybe<string>;
  healthInsectAllergies?: Maybe<string>;
  healthDrugsAllergies?: Maybe<string>;
  healthSeasonalAllergies?: Maybe<string>;
  healthMedicalConditions?: Maybe<string>;
  reductionIsee?: Maybe<boolean>;
  reductionIseeRange?: Maybe<Enum_Member_Reductioniseerange>;
  reductionFamily?: Maybe<boolean>;
  reductionFamilyRelation?: Maybe<Enum_Member_Reductionfamilyrelation>;
  reductionRelativeName?: Maybe<string>;
  healthMedicalDocuments?: Maybe<Array<Maybe<UploadFile>>>;
  reductionIseeDocuments?: Maybe<Array<Maybe<UploadFile>>>;
};
