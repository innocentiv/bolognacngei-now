import * as React from "react";
import {
  Typography,
  List,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import { Enum_Member_Group } from "../../types/member";
import Loader from "../core/loader";
import { usePermissions } from "../../hooks/permissions";
import { Enum_Permission } from "../../types/permission";
import GroupDownloadButton from "./groupDownloadButton";
import IseeDownloadButton from "./iseeDownloadButton";
import AllUserDownloadButton from "./alluserDownloadButton";

interface IGroupsDownloadProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      margin: `${theme.spacing(1)}px 0 ${theme.spacing(4)}px`
    }
  })
);

const GroupsDownload: React.FC<IGroupsDownloadProps> = props => {
  const [permission, loaded, empty] = usePermissions();
  const classes = useStyles();

  if (!loaded) {
    return <Loader />;
  }

  if (empty) {
    return null;
  }

  return permission ? (
    <>
      <Typography variant="h4" component="h2">
        Scarica l'anagrafica degli iscritti
      </Typography>
      <Typography component="p">
        Clicca sul gruppo per scaricare l'anagrafica associata
      </Typography>
      <List className={classes.list}>
        {Object.values(Enum_Member_Group)
          .filter(
            group =>
              permission[group] === Enum_Permission.Read ||
              permission[group] === Enum_Permission.Write
          )
          .map((group, index) => (
            <GroupDownloadButton key={index} group={group} />
          ))}
        {(permission.manageIsee === Enum_Permission.Read ||
          permission.manageIsee === Enum_Permission.Write) && (
          <>
            <IseeDownloadButton />
            <AllUserDownloadButton />
          </>
        )}
      </List>
    </>
  ) : null;
};

export default GroupsDownload;
