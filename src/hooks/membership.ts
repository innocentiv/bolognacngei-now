import { useCallback } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { Member } from "../types/member";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { useUser } from "./auth";

export const useUpdateMember = (
  memberId: string,
  memberUpdate: Partial<Member>
) => {
  const firestore = useFirestore();

  const createMember = useCallback(() => {
    return firestore
      .collection("members")
      .doc(memberId)
      .set(memberUpdate, { merge: true });
  }, [firestore, memberId, memberUpdate]);

  return createMember;
};

export const useCreateMember = () => {
  const firestore = useFirestore();
  const user = useUser();

  const createMember = useCallback(
    (name: string) => {
      const baseMember: Member = { name, user: user.uid };
      return firestore.collection("members").add(baseMember);
    },
    [firestore, user]
  );

  return createMember;
};

export const useGetMember = (memberId: string) => {
  useFirestoreConnect(() => [{ collection: "members", doc: memberId }]);
  const member = useSelector<StateType, Member>(
    ({ firestore: { ordered } }) => ordered.members && ordered.members[memberId]
  );
  return member;
};

export const useGetMemberList = () => {
  const user = useUser();
  useFirestoreConnect(() => [
    { collection: "members", where: [["user", "==", user.uid]] }
  ]);
  const members = useSelector<StateType, Member[]>(
    ({ firestore: { ordered } }) => ordered.members
  );
  return members;
};

export const useArchiveMember = (memberId: string) => {
  useUpdateMember(memberId, { user: "" });
};
