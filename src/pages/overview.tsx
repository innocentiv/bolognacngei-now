import * as React from "react";
import { useUser } from "../hooks/auth";
import MemberList from "../components/membership/memberList";
import CreateMember from "../components/membership/createMember";
import { Grid, Paper } from "@material-ui/core";

const Overview: React.FC = () => {
  const classes = {} as any;
  const { user, error, loading, jwt } = useUser();
  return (
    <div>
      {loading && <p>Caricamento in corso...</p>}
      {error && <p>{error}</p>}
      {user && (
        <>
          <p>
            Ciao {user.username}, il tuo codice è {jwt}
          </p>
          <Grid container justify="center" className={classes.container}>
            <Grid item className={classes.item}>
              <Paper className={classes.loginWrapper}>
                <MemberList />
                <CreateMember />
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Overview;
