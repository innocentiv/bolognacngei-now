import React, { useCallback } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { useStorage } from "../../hooks/storage";
import { useMember, useUpdateMember } from "../../hooks/membership";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { Member, UploadFile } from "../../types/member";
import { KeysOfType, Maybe } from "../../types/utils";

type DocumentProperty = KeysOfType<Required<Member>, Maybe<Array<UploadFile>>>;

interface FileUploadProps {
  memberId: string;
  memberProperty: DocumentProperty;
  errors?: {
    [k: string]: string | undefined;
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      margin: `${theme.spacing(1)}px 0 ${theme.spacing(2)}px`
    },
    item: {
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.grey[100]
    },
    url: {
      display: "block",
      textDecoration: "none",
      color: "inherit",
      overflow: "hidden"
    },
    error: {
      color: theme.palette.error.main
    }
  })
);

const FileUpload: React.FC<FileUploadProps> = ({
  memberId,
  memberProperty,
  errors
}) => {
  const [member] = useMember(memberId);
  const updateMember = useUpdateMember();
  const [uploadFiles, deleteFile] = useStorage(`${memberId}/${memberProperty}`);
  const classes = useStyles();

  const handleUploadRequest = useCallback(
    async files => {
      const urlList = await uploadFiles(files);
      await updateMember(memberId, {
        [memberProperty]: [...(member[memberProperty] || []), ...urlList]
      });
    },
    [member, memberId, memberProperty, updateMember, uploadFiles]
  );

  const handleDeleteFileRequest = useCallback(
    async file => {
      try {
        await deleteFile(file);
      } catch (e) {
        console.error(e);
      }
      const files = member[memberProperty];
      const filesAfterDelete = files
        ? files.filter((docs: UploadFile) => docs.name !== file.name)
        : [];
      await updateMember(memberId, {
        [memberProperty]: filesAfterDelete
      });
    },
    [deleteFile, member, memberId, memberProperty, updateMember]
  );

  const hasError = errors && !!errors[memberProperty];
  const hasFiles = member && !!member[memberProperty];
  const filesList = hasFiles ? member[memberProperty] : [];

  return (
    <>
      <DropzoneArea
        onDrop={handleUploadRequest}
        onDelete={handleDeleteFileRequest}
        acceptedFiles={["image/*", "application/pdf", "application/x-pdf"]}
        dropzoneText="Trascina i documenti o clicca"
        showPreviewsInDropzone={false}
      />
      {filesList && (
        <List className={classes.list}>
          {filesList.map((file: UploadFile, index: number) => (
            <ListItem className={classes.item} key={index}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.url}
              >
                <ListItemText primary={file.name} />
              </a>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteFileRequest(file)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      {hasError && (
        <FormControl>
          <FormHelperText className={classes.error}>
            {errors && errors[memberProperty]}
          </FormHelperText>
        </FormControl>
      )}
    </>
  );
};

export default FileUpload;
