import { useCallback } from "react";
import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
  isEmpty
} from "react-redux-firebase";
import { Member, Enum_Member_Group } from "../types/member";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { useUser } from "./auth";
import { usePermissions } from "./permissions";
import { Enum_Permission } from "../types/permission";

export const useUpdateMember = () => {
  const firestore = useFirestore();

  const updateMember = useCallback(
    (memberId: string, memberUpdate: Partial<Member>) => {
      return firestore
        .collection("members")
        .doc(memberId)
        .set(memberUpdate, { merge: true });
    },
    [firestore]
  );

  return updateMember;
};

export const useCreateMember = () => {
  const firestore = useFirestore();
  const [user] = useUser();

  const createMember = useCallback(
    (name: string) => {
      const baseMember: Member = { name, user: user.uid, email: user.email };
      return firestore.collection("members").add(baseMember);
    },
    [firestore, user]
  );

  return createMember;
};

export const useMember = (memberId: string) => {
  useFirestoreConnect(() => [{ collection: "members", doc: memberId }]);
  const member = useSelector<StateType, Member>(
    ({ firestore: { ordered } }) =>
      ordered.members &&
      ordered.members.find((member: Member) => member.id === memberId)
  );
  const loaded = isLoaded(member);
  const empty = isEmpty(member);
  return [member, loaded, empty] as const;
};

export const useGetUserMemberList = () => {
  const [user] = useUser();
  useFirestoreConnect(() => [
    { collection: "members", where: [["user", "==", user.uid]] }
  ]);
  const members = useSelector<StateType, Member[]>(
    ({ firestore: { ordered } }) =>
      ordered.members &&
      ordered.members.filter((member: Member) => member.user === user.uid)
  );
  const loaded = isLoaded(members);
  const empty = isEmpty(members);
  return [members, loaded, empty] as const;
};

export const useGetGroupMemberList = (group: Enum_Member_Group) => {
  const [permissions] = usePermissions();

  useFirestoreConnect(() =>
    permissions[group] === Enum_Permission.Read ||
    permissions[group] === Enum_Permission.Write
      ? [{ collection: "members", where: [["group", "==", group]] }]
      : []
  );
  const members = useSelector<StateType, Member[]>(
    ({ firestore: { ordered } }) =>
      ordered.members &&
      ordered.members.filter((member: Member) => member.group === group)
  );
  const loaded = isLoaded(members);
  const empty = isEmpty(members);
  return [members, loaded, empty] as const;
};

export const useArchiveMember = () => {
  const updateMember = useUpdateMember();
  const archiveMember = useCallback(
    (memberId: string) => updateMember(memberId, { user: "" }),
    [updateMember]
  );

  return archiveMember;
};
