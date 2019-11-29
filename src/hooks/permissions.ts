import { useCallback } from "react";
import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
  isEmpty
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import { StateType } from "../store";
import { useUser } from "./auth";
import { Permission } from "../types/permission";

export const useUpdatePermission = () => {
  const firestore = useFirestore();
  const [user] = useUser();

  const updatePermissions = useCallback(
    (permissionsUpdate: Partial<Permission> = {}) => {
      return firestore
        .collection("permissions")
        .doc(user.uid)
        .set(permissionsUpdate, { merge: true });
    },
    [firestore, user.uid]
  );

  return updatePermissions;
};

export const usePermissions = () => {
  const [user] = useUser();
  useFirestoreConnect(() => [{ collection: "permissions", doc: user.uid }]);
  const permission = useSelector<StateType, Permission>(
    ({ firestore: { data } }) => data.permissions && data.permissions[user.uid]
  );
  const loaded = isLoaded(permission);
  const empty = isEmpty(permission);
  return [permission, loaded, empty] as const;
};
