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
import { Enum_Member_Group } from "../../types/member";
import { useFirestore } from "react-redux-firebase";
import {
  getGroupMemberList,
  mapMemberToExport
} from "../../utils/membersHelper";
import { arrayToXlsx } from "../../utils/xslx";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

interface IGroupDownloadButtonProps {
  group: Enum_Member_Group;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      cursor: "pointer"
    }
  })
);

const groupLabels: { [key in Enum_Member_Group]: string } = {
  group1: "Gruppo Bologna 1",
  group2: "Gruppo Bologna 2",
  group3: "Gruppo Bologna 3",
  group5: "Gruppo Bologna 5",
  clan: "Clan Sandoclan",
  administrator: "COS e Consiglio"
};

const GroupDownloadButton: React.FC<IGroupDownloadButtonProps> = ({
  group
}) => {
  const firestore = useFirestore();
  const classes = useStyles();

  return group && firestore ? (
    <ListItem
      onClick={async () => {
        const members = await getGroupMemberList(firestore, group);
        const memberExport = members.map(mapMemberToExport);
        arrayToXlsx(memberExport, group);
      }}
      className={classes.item}
    >
      <ListItemAvatar>
        <Avatar>
          <CloudDownloadIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={groupLabels[group]} />
    </ListItem>
  ) : null;
};

export default GroupDownloadButton;
