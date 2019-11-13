import { useCallback } from "react";
import { useUser } from "./auth";
import { useFirebase } from "react-redux-firebase";
import { UploadFile } from "../types/member";

export const useStorage = (folder?: string) => {
  const user = useUser();
  const filesPath = folder ? `${user.uid}/${folder}` : user.uid;
  const firebase = useFirebase();

  const uploadFiles = useCallback(
    async files => {
      const result = await firebase.uploadFiles(filesPath, [].concat(files));
      return await Promise.all(
        result.map(
          async (snapshot): Promise<UploadFile> => ({
            url: await snapshot.uploadTaskSnapshot.ref.getDownloadURL(),
            name: snapshot.uploadTaskSnapshot.ref.name,
            path: snapshot.uploadTaskSnapshot.ref.fullPath
          })
        )
      );
    },
    [firebase, filesPath]
  );

  const deleteFile = useCallback(
    (file: UploadFile) => firebase.deleteFile(`${filesPath}/${file.name}`),
    [firebase, filesPath]
  );

  return [uploadFiles, deleteFile] as const;
};
