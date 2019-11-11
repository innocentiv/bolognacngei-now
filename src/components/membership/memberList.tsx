import * as React from "react";
import { membershipData } from "../../services/routes";
import { Link } from "react-router-dom";
import { useGetMemberList } from "../../hooks/membership";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

interface IMemberListProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      margin: `${theme.spacing(1)}px 0 ${theme.spacing(4)}px`
    },
    item: {
      color: "inherit",
      textDecoration: "none",
      margin: theme.spacing(2),
      backgroundColor: theme.palette.grey[100],
      display: "block"
    }
  })
);

const MemberList: React.FC<IMemberListProps> = props => {
  const members = useGetMemberList();
  const classes = useStyles();
  return members && members.length > 0 ? (
    <>
      <Typography variant="h4" component="h2">
        Modifica un socio
      </Typography>
      <Typography component="p">
        Clicca sul nome per modificare l'iscrizione
      </Typography>
      <List className={classes.list}>
        {members.map((member, index) => (
          <Link
            key={index}
            to={membershipData(member.id)}
            className={classes.item}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member.name}
                secondary={member.fiscalCode}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  ) : null;
};

export default MemberList;
