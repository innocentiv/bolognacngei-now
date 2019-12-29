import * as React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import { useFirestore } from "react-redux-firebase";
import {
  sortMemberToExport,
  getAllMemberList,
  mapAllMemberToExport
} from "../../utils/membersHelper";
import { arrayToXlsx } from "../../utils/xslx";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

interface IAllUserDownloadButtonProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      cursor: "pointer"
    }
  })
);

const AllUserDownloadButton: React.FC<IAllUserDownloadButtonProps> = () => {
  const firestore = useFirestore();
  const classes = useStyles();

  return firestore ? (
    <ListItem
      onClick={async () => {
        const members = await getAllMemberList(firestore);
        const memberExport = members
          .sort(sortMemberToExport)
          .map(mapAllMemberToExport);
        arrayToXlsx(memberExport, "anagrafica");
      }}
      className={classes.item}
    >
      <ListItemAvatar>
        <Avatar>
          <CloudDownloadIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Anagrafica per iscrizioni" />
    </ListItem>
  ) : null;
};

export default AllUserDownloadButton;
