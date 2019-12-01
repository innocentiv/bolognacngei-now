import * as React from "react";
import { membershipData, membershipSupporter } from "../../services/routes";
import { Link } from "react-router-dom";
import { useGetUserMemberList } from "../../hooks/membership";
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
import {
  Enum_Member_Payment_Status,
  Enum_Member_Role
} from "../../types/member";
import Loader from "../core/loader";
import { getTypeMapper } from "../../utils/membersHelper";

export const mapPaymentToNote = getTypeMapper<Enum_Member_Payment_Status>({
  paymentcomplete: "Iscrizioni e pagamento completati",
  tobeverified: "Bonifico caricato in attesa di verifica",
  needpayment: "Iscrizioni da completare",
  needintegration: "Necessaria integrazione alla quota"
});

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
    },
    paymentcomplete: {
      backgroundColor: "rgb(181, 220, 167)"
    },
    tobeverified: {
      backgroundColor: "rgb(255, 230, 138)"
    },
    needpayment: {
      backgroundColor: theme.palette.grey[100]
    },
    needintegration: {
      backgroundColor: "rgb(255, 175, 108)"
    }
  })
);

const MemberList: React.FC<IMemberListProps> = props => {
  const [members, loaded, empty] = useGetUserMemberList();
  const classes = useStyles();

  if (!loaded) {
    return <Loader />;
  }

  if (empty) {
    return null;
  }

  return members && members.length > 0 ? (
    <>
      <Typography variant="h4" component="h2">
        Modifica un socio
      </Typography>
      <Typography component="p">
        Clicca sul nome per modificare l'iscrizione
      </Typography>
      <List className={classes.list}>
        {members.map((member, index) => {
          return (
            <Link
              key={index}
              to={
                member.role === Enum_Member_Role.Supporter
                  ? membershipSupporter(member.id)
                  : membershipData(member.id)
              }
              className={`${classes.item} ${
                member.paymentStatus ? classes[member.paymentStatus] : ""
              }`}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={member.name}
                  secondary={mapPaymentToNote(
                    member.paymentStatus,
                    Enum_Member_Payment_Status.Needpayment
                  )}
                />
                {/* <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => member.id && archiveMember(member.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction> */}
              </ListItem>
            </Link>
          );
        })}
      </List>
    </>
  ) : null;
};

export default MemberList;
