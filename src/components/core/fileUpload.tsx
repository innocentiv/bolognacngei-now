import React, { useCallback } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { useStorage } from "../../hooks/storage";
import { useGetMember, useUpdateMember } from "../../hooks/membership";
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
  createStyles
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { Member, UploadFile } from "../../types/member";

interface FileUploadProps {
  memberId: string;
  memberProperty: keyof Member;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      margin: `${theme.spacing(1)}px 0 ${theme.spacing(4)}px`
    },
    item: {
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.grey[100]
    },
    url: {
      display: "block",
      textDecoration: "none",
      color: "inherit"
    }
  })
);

const FileUpload: React.FC<FileUploadProps> = ({
  memberId,
  memberProperty
}) => {
  const member = useGetMember(memberId);
  const updateMember = useUpdateMember();
  const [uploadFiles, deleteFile] = useStorage(memberProperty);
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
      await updateMember(memberId, {
        [memberProperty]: member[memberProperty]
          ? member[memberProperty].filter(
              (docs: UploadFile) => docs.name !== file.name
            )
          : []
      });
    },
    [deleteFile, member, memberId, memberProperty, updateMember]
  );

  return (
    <>
      <DropzoneArea
        onDrop={handleUploadRequest}
        onDelete={handleDeleteFileRequest}
        acceptedFiles={["image/*", "application/pdf", "application/x-pdf"]}
        dropzoneText="Trascina i documenti o clicca"
        showPreviewsInDropzone={false}
      />
      {member && member.healthMedicalDocuments && (
        <List className={classes.list}>
          {member.healthMedicalDocuments.map((file, index) => (
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
    </>
  );
};

export default FileUpload;
