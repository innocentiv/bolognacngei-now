import { useCallback } from "react";
import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
  isEmpty
} from "react-redux-firebase";
import { Member } from "../types/member";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { useUser } from "./auth";

export const useUpdateMember = () => {
  const firestore = useFirestore();

  const createMember = useCallback(
    (memberId: string, memberUpdate: Partial<Member>) => {
      return firestore
        .collection("members")
        .doc(memberId)
        .set(memberUpdate, { merge: true });
    },
    [firestore]
  );

  return createMember;
};

export const useCreateMember = () => {
  const firestore = useFirestore();
  const user = useUser();

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

export const useGetMemberList = () => {
  const user = useUser();
  useFirestoreConnect(() => [
    { collection: "members", where: [["user", "==", user.uid]] }
  ]);
  const members = useSelector<StateType, Member[]>(
    ({ firestore: { ordered } }) => ordered.members
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
