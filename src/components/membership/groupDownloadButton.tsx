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
  mapMemberToExport,
  mapMemberToHealthExport,
  sortMemberToExport
} from "../../utils/membersHelper";
import { arrayToXlsx } from "../../utils/xslx";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import HealingIcon from "@material-ui/icons/Healing";

interface IGroupDownloadButtonProps {
  group: Enum_Member_Group;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    downloadIcon: {
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
    <ListItem>
      <ListItemAvatar>
        <Avatar
          onClick={async () => {
            const members = await getGroupMemberList(firestore, group);
            const memberExport = members
              .sort(sortMemberToExport)
              .map(mapMemberToExport);
            arrayToXlsx(memberExport, group);
          }}
          className={classes.downloadIcon}
        >
          <AssignmentIndIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemAvatar>
        <Avatar
          onClick={async () => {
            const members = await getGroupMemberList(firestore, group);
            const memberExport = members
              .sort(sortMemberToExport)
              .map(mapMemberToHealthExport);
            arrayToXlsx(memberExport, `healthData-${group}`);
          }}
          className={classes.downloadIcon}
        >
          <HealingIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={groupLabels[group]} />
    </ListItem>
  ) : null;
};

export default GroupDownloadButton;
