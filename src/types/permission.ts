import { Maybe } from "./utils";
import { Enum_Member_Group } from "./member";

export enum Enum_Permission {
  Read = "read",
  Write = "write"
}

export type Permission = {
  id?: string;
  managePermission?: Maybe<Enum_Permission>;
} & MemberPermission;

export type MemberPermission = {
  [key in Enum_Member_Group]?: Maybe<Enum_Permission>;
};
