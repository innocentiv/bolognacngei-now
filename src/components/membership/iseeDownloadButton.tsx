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
  getIseeMemberList,
  mapIseeMemberToExport
} from "../../utils/membersHelper";
import { arrayToXlsx } from "../../utils/xslx";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

interface IIseeDownloadButtonProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      cursor: "pointer"
    }
  })
);

const IseeDownloadButton: React.FC<IIseeDownloadButtonProps> = () => {
  const firestore = useFirestore();
  const classes = useStyles();

  return firestore ? (
    <ListItem
      onClick={async () => {
        const members = await getIseeMemberList(firestore);
        const memberExport = members
          .sort(sortMemberToExport)
          .map(mapIseeMemberToExport);
        arrayToXlsx(memberExport, "iseeReduction");
      }}
      className={classes.item}
    >
      <ListItemAvatar>
        <Avatar>
          <CloudDownloadIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Richieste accesso al fondo di Solidarietà" />
    </ListItem>
  ) : null;
};

export default IseeDownloadButton;
