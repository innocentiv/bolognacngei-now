export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents a date and time following the ISO 8601 standard */
  DateTime: any;
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
};

export type CreateMemberInput = {
  data?: Maybe<MemberInput>;
};

export type CreateMemberPayload = {
  __typename?: "createMemberPayload";
  member?: Maybe<Member>;
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: "createRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: "createUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteMemberInput = {
  where?: Maybe<InputId>;
};

export type DeleteMemberPayload = {
  __typename?: "deleteMemberPayload";
  member?: Maybe<Member>;
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: "deleteRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: "deleteUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type EditFileInput = {
  name?: Maybe<Scalars["String"]>;
  hash?: Maybe<Scalars["String"]>;
  sha256?: Maybe<Scalars["String"]>;
  ext?: Maybe<Scalars["String"]>;
  mime?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  provider?: Maybe<Scalars["String"]>;
  public_id?: Maybe<Scalars["String"]>;
  related?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type EditMemberInput = {
  name?: Maybe<Scalars["String"]>;
  user?: Maybe<Scalars["ID"]>;
  renewalDate?: Maybe<Scalars["DateTime"]>;
  group?: Maybe<Enum_Member_Group>;
  role?: Maybe<Enum_Member_Role>;
  birthplace?: Maybe<Scalars["String"]>;
  birthdate?: Maybe<Scalars["DateTime"]>;
  address?: Maybe<Scalars["String"]>;
  fiscalCode?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  tutorName?: Maybe<Scalars["String"]>;
  noOtherScoutMovements?: Maybe<Scalars["Boolean"]>;
  neverBanned?: Maybe<Scalars["Boolean"]>;
  hasCivilRight?: Maybe<Scalars["Boolean"]>;
  isInformed?: Maybe<Scalars["Boolean"]>;
  noAdverse?: Maybe<Scalars["Boolean"]>;
  emailCommunication?: Maybe<Scalars["Boolean"]>;
  privacyImages?: Maybe<Scalars["Boolean"]>;
  privacyEshop?: Maybe<Scalars["Boolean"]>;
  privacyHealth?: Maybe<Scalars["Boolean"]>;
  healthMeasles?: Maybe<Scalars["Boolean"]>;
  healthMumps?: Maybe<Scalars["Boolean"]>;
  healthRubella?: Maybe<Scalars["Boolean"]>;
  healthChickenpox?: Maybe<Scalars["Boolean"]>;
  healthPertussis?: Maybe<Scalars["Boolean"]>;
  healthTetanus?: Maybe<Scalars["Boolean"]>;
  healthPolio?: Maybe<Scalars["Boolean"]>;
  healthDiphtheria?: Maybe<Scalars["Boolean"]>;
  healthHepatitisB?: Maybe<Scalars["Boolean"]>;
  healthHaemophilus?: Maybe<Scalars["Boolean"]>;
  healthTetanusDate?: Maybe<Scalars["DateTime"]>;
  healthFoodAllergies?: Maybe<Scalars["String"]>;
  healthInsectAllergies?: Maybe<Scalars["String"]>;
  healthDrugsAllergies?: Maybe<Scalars["String"]>;
  healthSeasonalAllergies?: Maybe<Scalars["String"]>;
  healthMedicalConditions?: Maybe<Scalars["String"]>;
  healthMedicalDocuments?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  reductionIsee?: Maybe<Scalars["Boolean"]>;
  reductionIseeRange?: Maybe<Enum_Member_Reductioniseerange>;
  reductionIseeDocuments?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  reductionFamily?: Maybe<Scalars["Boolean"]>;
  reductionFamilyRelation?: Maybe<Enum_Member_Reductionfamilyrelation>;
  reductionRelativeName?: Maybe<Scalars["String"]>;
};

export type EditRoleInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  users?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type EditUserInput = {
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  provider?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  resetPasswordToken?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<Scalars["ID"]>;
  members?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export enum Enum_Member_Group {
  Nogroup = "nogroup",
  Group1 = "group1",
  Group2 = "group2",
  Group3 = "group3",
  Group5 = "group5",
  Clan = "clan",
  Cos = "cos"
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

export type FileInput = {
  name: Scalars["String"];
  hash: Scalars["String"];
  sha256?: Maybe<Scalars["String"]>;
  ext?: Maybe<Scalars["String"]>;
  mime: Scalars["String"];
  size: Scalars["String"];
  url: Scalars["String"];
  provider: Scalars["String"];
  public_id?: Maybe<Scalars["String"]>;
  related?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type InputId = {
  id: Scalars["ID"];
};

export type Member = {
  __typename?: "Member";
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name?: Maybe<Scalars["String"]>;
  user?: Maybe<UsersPermissionsUser>;
  renewalDate?: Maybe<Scalars["DateTime"]>;
  group?: Maybe<Enum_Member_Group>;
  role?: Maybe<Enum_Member_Role>;
  birthplace?: Maybe<Scalars["String"]>;
  birthdate?: Maybe<Scalars["DateTime"]>;
  address?: Maybe<Scalars["String"]>;
  fiscalCode?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  tutorName?: Maybe<Scalars["String"]>;
  noOtherScoutMovements?: Maybe<Scalars["Boolean"]>;
  neverBanned?: Maybe<Scalars["Boolean"]>;
  hasCivilRight?: Maybe<Scalars["Boolean"]>;
  isInformed?: Maybe<Scalars["Boolean"]>;
  noAdverse?: Maybe<Scalars["Boolean"]>;
  emailCommunication?: Maybe<Scalars["Boolean"]>;
  privacyImages?: Maybe<Scalars["Boolean"]>;
  privacyEshop?: Maybe<Scalars["Boolean"]>;
  privacyHealth?: Maybe<Scalars["Boolean"]>;
  healthMeasles?: Maybe<Scalars["Boolean"]>;
  healthMumps?: Maybe<Scalars["Boolean"]>;
  healthRubella?: Maybe<Scalars["Boolean"]>;
  healthChickenpox?: Maybe<Scalars["Boolean"]>;
  healthPertussis?: Maybe<Scalars["Boolean"]>;
  healthTetanus?: Maybe<Scalars["Boolean"]>;
  healthPolio?: Maybe<Scalars["Boolean"]>;
  healthDiphtheria?: Maybe<Scalars["Boolean"]>;
  healthHepatitisB?: Maybe<Scalars["Boolean"]>;
  healthHaemophilus?: Maybe<Scalars["Boolean"]>;
  healthTetanusDate?: Maybe<Scalars["DateTime"]>;
  healthFoodAllergies?: Maybe<Scalars["String"]>;
  healthInsectAllergies?: Maybe<Scalars["String"]>;
  healthDrugsAllergies?: Maybe<Scalars["String"]>;
  healthSeasonalAllergies?: Maybe<Scalars["String"]>;
  healthMedicalConditions?: Maybe<Scalars["String"]>;
  reductionIsee?: Maybe<Scalars["Boolean"]>;
  reductionIseeRange?: Maybe<Enum_Member_Reductioniseerange>;
  reductionFamily?: Maybe<Scalars["Boolean"]>;
  reductionFamilyRelation?: Maybe<Enum_Member_Reductionfamilyrelation>;
  reductionRelativeName?: Maybe<Scalars["String"]>;
  healthMedicalDocuments?: Maybe<Array<Maybe<UploadFile>>>;
  reductionIseeDocuments?: Maybe<Array<Maybe<UploadFile>>>;
};

export type MemberHealthMedicalDocumentsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type MemberReductionIseeDocumentsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type MemberAggregator = {
  __typename?: "MemberAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type MemberConnection = {
  __typename?: "MemberConnection";
  values?: Maybe<Array<Maybe<Member>>>;
  groupBy?: Maybe<MemberGroupBy>;
  aggregate?: Maybe<MemberAggregator>;
};

export type MemberConnection_Id = {
  __typename?: "MemberConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionAddress = {
  __typename?: "MemberConnectionAddress";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionBirthdate = {
  __typename?: "MemberConnectionBirthdate";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionBirthplace = {
  __typename?: "MemberConnectionBirthplace";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionCreatedAt = {
  __typename?: "MemberConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionEmail = {
  __typename?: "MemberConnectionEmail";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionEmailCommunication = {
  __typename?: "MemberConnectionEmailCommunication";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionFiscalCode = {
  __typename?: "MemberConnectionFiscalCode";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionGroup = {
  __typename?: "MemberConnectionGroup";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHasCivilRight = {
  __typename?: "MemberConnectionHasCivilRight";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthChickenpox = {
  __typename?: "MemberConnectionHealthChickenpox";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthDiphtheria = {
  __typename?: "MemberConnectionHealthDiphtheria";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthDrugsAllergies = {
  __typename?: "MemberConnectionHealthDrugsAllergies";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthFoodAllergies = {
  __typename?: "MemberConnectionHealthFoodAllergies";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthHaemophilus = {
  __typename?: "MemberConnectionHealthHaemophilus";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthHepatitisB = {
  __typename?: "MemberConnectionHealthHepatitisB";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthInsectAllergies = {
  __typename?: "MemberConnectionHealthInsectAllergies";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthMeasles = {
  __typename?: "MemberConnectionHealthMeasles";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthMedicalConditions = {
  __typename?: "MemberConnectionHealthMedicalConditions";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthMumps = {
  __typename?: "MemberConnectionHealthMumps";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthPertussis = {
  __typename?: "MemberConnectionHealthPertussis";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthPolio = {
  __typename?: "MemberConnectionHealthPolio";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthRubella = {
  __typename?: "MemberConnectionHealthRubella";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthSeasonalAllergies = {
  __typename?: "MemberConnectionHealthSeasonalAllergies";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthTetanus = {
  __typename?: "MemberConnectionHealthTetanus";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionHealthTetanusDate = {
  __typename?: "MemberConnectionHealthTetanusDate";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionId = {
  __typename?: "MemberConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionIsInformed = {
  __typename?: "MemberConnectionIsInformed";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionName = {
  __typename?: "MemberConnectionName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionNeverBanned = {
  __typename?: "MemberConnectionNeverBanned";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionNoAdverse = {
  __typename?: "MemberConnectionNoAdverse";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionNoOtherScoutMovements = {
  __typename?: "MemberConnectionNoOtherScoutMovements";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionPhone = {
  __typename?: "MemberConnectionPhone";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionPrivacyEshop = {
  __typename?: "MemberConnectionPrivacyEshop";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionPrivacyHealth = {
  __typename?: "MemberConnectionPrivacyHealth";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionPrivacyImages = {
  __typename?: "MemberConnectionPrivacyImages";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionReductionFamily = {
  __typename?: "MemberConnectionReductionFamily";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionReductionFamilyRelation = {
  __typename?: "MemberConnectionReductionFamilyRelation";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionReductionIsee = {
  __typename?: "MemberConnectionReductionIsee";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionReductionIseeRange = {
  __typename?: "MemberConnectionReductionIseeRange";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionReductionRelativeName = {
  __typename?: "MemberConnectionReductionRelativeName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionRenewalDate = {
  __typename?: "MemberConnectionRenewalDate";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionRole = {
  __typename?: "MemberConnectionRole";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionTutorName = {
  __typename?: "MemberConnectionTutorName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionUpdatedAt = {
  __typename?: "MemberConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberConnectionUser = {
  __typename?: "MemberConnectionUser";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<MemberConnection>;
};

export type MemberGroupBy = {
  __typename?: "MemberGroupBy";
  _id?: Maybe<Array<Maybe<MemberConnection_Id>>>;
  id?: Maybe<Array<Maybe<MemberConnectionId>>>;
  createdAt?: Maybe<Array<Maybe<MemberConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<MemberConnectionUpdatedAt>>>;
  name?: Maybe<Array<Maybe<MemberConnectionName>>>;
  user?: Maybe<Array<Maybe<MemberConnectionUser>>>;
  renewalDate?: Maybe<Array<Maybe<MemberConnectionRenewalDate>>>;
  group?: Maybe<Array<Maybe<MemberConnectionGroup>>>;
  role?: Maybe<Array<Maybe<MemberConnectionRole>>>;
  birthplace?: Maybe<Array<Maybe<MemberConnectionBirthplace>>>;
  birthdate?: Maybe<Array<Maybe<MemberConnectionBirthdate>>>;
  address?: Maybe<Array<Maybe<MemberConnectionAddress>>>;
  fiscalCode?: Maybe<Array<Maybe<MemberConnectionFiscalCode>>>;
  email?: Maybe<Array<Maybe<MemberConnectionEmail>>>;
  phone?: Maybe<Array<Maybe<MemberConnectionPhone>>>;
  tutorName?: Maybe<Array<Maybe<MemberConnectionTutorName>>>;
  noOtherScoutMovements?: Maybe<
    Array<Maybe<MemberConnectionNoOtherScoutMovements>>
  >;
  neverBanned?: Maybe<Array<Maybe<MemberConnectionNeverBanned>>>;
  hasCivilRight?: Maybe<Array<Maybe<MemberConnectionHasCivilRight>>>;
  isInformed?: Maybe<Array<Maybe<MemberConnectionIsInformed>>>;
  noAdverse?: Maybe<Array<Maybe<MemberConnectionNoAdverse>>>;
  emailCommunication?: Maybe<Array<Maybe<MemberConnectionEmailCommunication>>>;
  privacyImages?: Maybe<Array<Maybe<MemberConnectionPrivacyImages>>>;
  privacyEshop?: Maybe<Array<Maybe<MemberConnectionPrivacyEshop>>>;
  privacyHealth?: Maybe<Array<Maybe<MemberConnectionPrivacyHealth>>>;
  healthMeasles?: Maybe<Array<Maybe<MemberConnectionHealthMeasles>>>;
  healthMumps?: Maybe<Array<Maybe<MemberConnectionHealthMumps>>>;
  healthRubella?: Maybe<Array<Maybe<MemberConnectionHealthRubella>>>;
  healthChickenpox?: Maybe<Array<Maybe<MemberConnectionHealthChickenpox>>>;
  healthPertussis?: Maybe<Array<Maybe<MemberConnectionHealthPertussis>>>;
  healthTetanus?: Maybe<Array<Maybe<MemberConnectionHealthTetanus>>>;
  healthPolio?: Maybe<Array<Maybe<MemberConnectionHealthPolio>>>;
  healthDiphtheria?: Maybe<Array<Maybe<MemberConnectionHealthDiphtheria>>>;
  healthHepatitisB?: Maybe<Array<Maybe<MemberConnectionHealthHepatitisB>>>;
  healthHaemophilus?: Maybe<Array<Maybe<MemberConnectionHealthHaemophilus>>>;
  healthTetanusDate?: Maybe<Array<Maybe<MemberConnectionHealthTetanusDate>>>;
  healthFoodAllergies?: Maybe<
    Array<Maybe<MemberConnectionHealthFoodAllergies>>
  >;
  healthInsectAllergies?: Maybe<
    Array<Maybe<MemberConnectionHealthInsectAllergies>>
  >;
  healthDrugsAllergies?: Maybe<
    Array<Maybe<MemberConnectionHealthDrugsAllergies>>
  >;
  healthSeasonalAllergies?: Maybe<
    Array<Maybe<MemberConnectionHealthSeasonalAllergies>>
  >;
  healthMedicalConditions?: Maybe<
    Array<Maybe<MemberConnectionHealthMedicalConditions>>
  >;
  reductionIsee?: Maybe<Array<Maybe<MemberConnectionReductionIsee>>>;
  reductionIseeRange?: Maybe<Array<Maybe<MemberConnectionReductionIseeRange>>>;
  reductionFamily?: Maybe<Array<Maybe<MemberConnectionReductionFamily>>>;
  reductionFamilyRelation?: Maybe<
    Array<Maybe<MemberConnectionReductionFamilyRelation>>
  >;
  reductionRelativeName?: Maybe<
    Array<Maybe<MemberConnectionReductionRelativeName>>
  >;
};

export type MemberInput = {
  name?: Maybe<Scalars["String"]>;
  user?: Maybe<Scalars["ID"]>;
  renewalDate?: Maybe<Scalars["DateTime"]>;
  group?: Maybe<Enum_Member_Group>;
  role?: Maybe<Enum_Member_Role>;
  birthplace?: Maybe<Scalars["String"]>;
  birthdate?: Maybe<Scalars["DateTime"]>;
  address?: Maybe<Scalars["String"]>;
  fiscalCode?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  tutorName?: Maybe<Scalars["String"]>;
  noOtherScoutMovements?: Maybe<Scalars["Boolean"]>;
  neverBanned?: Maybe<Scalars["Boolean"]>;
  hasCivilRight?: Maybe<Scalars["Boolean"]>;
  isInformed?: Maybe<Scalars["Boolean"]>;
  noAdverse?: Maybe<Scalars["Boolean"]>;
  emailCommunication?: Maybe<Scalars["Boolean"]>;
  privacyImages?: Maybe<Scalars["Boolean"]>;
  privacyEshop?: Maybe<Scalars["Boolean"]>;
  privacyHealth?: Maybe<Scalars["Boolean"]>;
  healthMeasles?: Maybe<Scalars["Boolean"]>;
  healthMumps?: Maybe<Scalars["Boolean"]>;
  healthRubella?: Maybe<Scalars["Boolean"]>;
  healthChickenpox?: Maybe<Scalars["Boolean"]>;
  healthPertussis?: Maybe<Scalars["Boolean"]>;
  healthTetanus?: Maybe<Scalars["Boolean"]>;
  healthPolio?: Maybe<Scalars["Boolean"]>;
  healthDiphtheria?: Maybe<Scalars["Boolean"]>;
  healthHepatitisB?: Maybe<Scalars["Boolean"]>;
  healthHaemophilus?: Maybe<Scalars["Boolean"]>;
  healthTetanusDate?: Maybe<Scalars["DateTime"]>;
  healthFoodAllergies?: Maybe<Scalars["String"]>;
  healthInsectAllergies?: Maybe<Scalars["String"]>;
  healthDrugsAllergies?: Maybe<Scalars["String"]>;
  healthSeasonalAllergies?: Maybe<Scalars["String"]>;
  healthMedicalConditions?: Maybe<Scalars["String"]>;
  healthMedicalDocuments?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  reductionIsee?: Maybe<Scalars["Boolean"]>;
  reductionIseeRange?: Maybe<Enum_Member_Reductioniseerange>;
  reductionIseeDocuments?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  reductionFamily?: Maybe<Scalars["Boolean"]>;
  reductionFamilyRelation?: Maybe<Enum_Member_Reductionfamilyrelation>;
  reductionRelativeName?: Maybe<Scalars["String"]>;
};

export type Morph =
  | UsersPermissionsMe
  | UsersPermissionsMeRole
  | Member
  | CreateMemberPayload
  | UpdateMemberPayload
  | DeleteMemberPayload
  | MemberConnection
  | MemberAggregator
  | MemberGroupBy
  | MemberConnection_Id
  | MemberConnectionId
  | MemberConnectionCreatedAt
  | MemberConnectionUpdatedAt
  | MemberConnectionName
  | MemberConnectionUser
  | MemberConnectionRenewalDate
  | MemberConnectionGroup
  | MemberConnectionRole
  | MemberConnectionBirthplace
  | MemberConnectionBirthdate
  | MemberConnectionAddress
  | MemberConnectionFiscalCode
  | MemberConnectionEmail
  | MemberConnectionPhone
  | MemberConnectionTutorName
  | MemberConnectionNoOtherScoutMovements
  | MemberConnectionNeverBanned
  | MemberConnectionHasCivilRight
  | MemberConnectionIsInformed
  | MemberConnectionNoAdverse
  | MemberConnectionEmailCommunication
  | MemberConnectionPrivacyImages
  | MemberConnectionPrivacyEshop
  | MemberConnectionPrivacyHealth
  | MemberConnectionHealthMeasles
  | MemberConnectionHealthMumps
  | MemberConnectionHealthRubella
  | MemberConnectionHealthChickenpox
  | MemberConnectionHealthPertussis
  | MemberConnectionHealthTetanus
  | MemberConnectionHealthPolio
  | MemberConnectionHealthDiphtheria
  | MemberConnectionHealthHepatitisB
  | MemberConnectionHealthHaemophilus
  | MemberConnectionHealthTetanusDate
  | MemberConnectionHealthFoodAllergies
  | MemberConnectionHealthInsectAllergies
  | MemberConnectionHealthDrugsAllergies
  | MemberConnectionHealthSeasonalAllergies
  | MemberConnectionHealthMedicalConditions
  | MemberConnectionReductionIsee
  | MemberConnectionReductionIseeRange
  | MemberConnectionReductionFamily
  | MemberConnectionReductionFamilyRelation
  | MemberConnectionReductionRelativeName
  | UploadFile
  | UploadFileConnection
  | UploadFileAggregator
  | UploadFileGroupBy
  | UploadFileConnection_Id
  | UploadFileConnectionId
  | UploadFileConnectionCreatedAt
  | UploadFileConnectionUpdatedAt
  | UploadFileConnectionName
  | UploadFileConnectionHash
  | UploadFileConnectionSha256
  | UploadFileConnectionExt
  | UploadFileConnectionMime
  | UploadFileConnectionSize
  | UploadFileConnectionUrl
  | UploadFileConnectionProvider
  | UploadFileConnectionPublic_Id
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | CreateRolePayload
  | UpdateRolePayload
  | DeleteRolePayload
  | UsersPermissionsRoleConnection
  | UsersPermissionsRoleAggregator
  | UsersPermissionsRoleGroupBy
  | UsersPermissionsRoleConnection_Id
  | UsersPermissionsRoleConnectionId
  | UsersPermissionsRoleConnectionName
  | UsersPermissionsRoleConnectionDescription
  | UsersPermissionsRoleConnectionType
  | UsersPermissionsUser
  | CreateUserPayload
  | UpdateUserPayload
  | DeleteUserPayload
  | UsersPermissionsUserConnection
  | UsersPermissionsUserAggregator
  | UsersPermissionsUserGroupBy
  | UsersPermissionsUserConnection_Id
  | UsersPermissionsUserConnectionId
  | UsersPermissionsUserConnectionCreatedAt
  | UsersPermissionsUserConnectionUpdatedAt
  | UsersPermissionsUserConnectionUsername
  | UsersPermissionsUserConnectionEmail
  | UsersPermissionsUserConnectionProvider
  | UsersPermissionsUserConnectionConfirmed
  | UsersPermissionsUserConnectionBlocked
  | UsersPermissionsUserConnectionRole;

export type Mutation = {
  __typename?: "Mutation";
  createMember?: Maybe<CreateMemberPayload>;
  updateMember?: Maybe<UpdateMemberPayload>;
  deleteMember?: Maybe<DeleteMemberPayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  upload: UploadFile;
};

export type MutationCreateMemberArgs = {
  input?: Maybe<CreateMemberInput>;
};

export type MutationUpdateMemberArgs = {
  input?: Maybe<UpdateMemberInput>;
};

export type MutationDeleteMemberArgs = {
  input?: Maybe<DeleteMemberInput>;
};

export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};

export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};

export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};

export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};

export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};

export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
};

export type MutationUploadArgs = {
  refId?: Maybe<Scalars["ID"]>;
  ref?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  file: Scalars["Upload"];
};

export type Query = {
  __typename?: "Query";
  member?: Maybe<Member>;
  members?: Maybe<Array<Maybe<Member>>>;
  membersConnection?: Maybe<MemberConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  me?: Maybe<UsersPermissionsMe>;
};

export type QueryMemberArgs = {
  id: Scalars["ID"];
};

export type QueryMembersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryMembersConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryFilesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryRoleArgs = {
  id: Scalars["ID"];
};

export type QueryRolesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryUsersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type RoleInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  users?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type UpdateMemberInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditMemberInput>;
};

export type UpdateMemberPayload = {
  __typename?: "updateMemberPayload";
  member?: Maybe<Member>;
};

export type UpdateRoleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditRoleInput>;
};

export type UpdateRolePayload = {
  __typename?: "updateRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateUserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditUserInput>;
};

export type UpdateUserPayload = {
  __typename?: "updateUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  hash: Scalars["String"];
  sha256?: Maybe<Scalars["String"]>;
  ext?: Maybe<Scalars["String"]>;
  mime: Scalars["String"];
  size: Scalars["String"];
  url: Scalars["String"];
  provider: Scalars["String"];
  public_id?: Maybe<Scalars["String"]>;
  related?: Maybe<Array<Maybe<Morph>>>;
};

export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UploadFileAggregator = {
  __typename?: "UploadFileAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UploadFileConnection = {
  __typename?: "UploadFileConnection";
  values?: Maybe<Array<Maybe<UploadFile>>>;
  groupBy?: Maybe<UploadFileGroupBy>;
  aggregate?: Maybe<UploadFileAggregator>;
};

export type UploadFileConnection_Id = {
  __typename?: "UploadFileConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCreatedAt = {
  __typename?: "UploadFileConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionExt = {
  __typename?: "UploadFileConnectionExt";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHash = {
  __typename?: "UploadFileConnectionHash";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionId = {
  __typename?: "UploadFileConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionMime = {
  __typename?: "UploadFileConnectionMime";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionName = {
  __typename?: "UploadFileConnectionName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider = {
  __typename?: "UploadFileConnectionProvider";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionPublic_Id = {
  __typename?: "UploadFileConnectionPublic_id";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionSha256 = {
  __typename?: "UploadFileConnectionSha256";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionSize = {
  __typename?: "UploadFileConnectionSize";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUpdatedAt = {
  __typename?: "UploadFileConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUrl = {
  __typename?: "UploadFileConnectionUrl";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileGroupBy = {
  __typename?: "UploadFileGroupBy";
  _id?: Maybe<Array<Maybe<UploadFileConnection_Id>>>;
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  createdAt?: Maybe<Array<Maybe<UploadFileConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<UploadFileConnectionUpdatedAt>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  sha256?: Maybe<Array<Maybe<UploadFileConnectionSha256>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  public_id?: Maybe<Array<Maybe<UploadFileConnectionPublic_Id>>>;
};

export type UserInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  resetPasswordToken?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<Scalars["ID"]>;
  members?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<UsersPermissionsMeRole>;
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  _id: Scalars["ID"];
  id: Scalars["ID"];
  type: Scalars["String"];
  controller: Scalars["String"];
  action: Scalars["String"];
  enabled: Scalars["Boolean"];
  policy?: Maybe<Scalars["String"]>;
  role?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  _id: Scalars["ID"];
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: "UsersPermissionsRoleAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: "UsersPermissionsRoleConnection";
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
};

export type UsersPermissionsRoleConnection_Id = {
  __typename?: "UsersPermissionsRoleConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: "UsersPermissionsRoleConnectionDescription";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: "UsersPermissionsRoleConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: "UsersPermissionsRoleConnectionName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: "UsersPermissionsRoleConnectionType";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: "UsersPermissionsRoleGroupBy";
  _id?: Maybe<Array<Maybe<UsersPermissionsRoleConnection_Id>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  username: Scalars["String"];
  email: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<UsersPermissionsRole>;
  members?: Maybe<Array<Maybe<Member>>>;
};

export type UsersPermissionsUserMembersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UsersPermissionsUserAggregator = {
  __typename?: "UsersPermissionsUserAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UsersPermissionsUserConnection = {
  __typename?: "UsersPermissionsUserConnection";
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
};

export type UsersPermissionsUserConnection_Id = {
  __typename?: "UsersPermissionsUserConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: "UsersPermissionsUserConnectionBlocked";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: "UsersPermissionsUserConnectionConfirmed";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionCreatedAt = {
  __typename?: "UsersPermissionsUserConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: "UsersPermissionsUserConnectionEmail";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: "UsersPermissionsUserConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: "UsersPermissionsUserConnectionProvider";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: "UsersPermissionsUserConnectionRole";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUpdatedAt = {
  __typename?: "UsersPermissionsUserConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: "UsersPermissionsUserConnectionUsername";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: "UsersPermissionsUserGroupBy";
  _id?: Maybe<Array<Maybe<UsersPermissionsUserConnection_Id>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  createdAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdatedAt>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
};
