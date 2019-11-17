import * as React from "react";
import { Typography } from "@material-ui/core";
import { useUser } from "../../hooks/auth";

interface IPrivateAreaProps {}

const PrivateArea: React.FC<IPrivateAreaProps> = () => {
  const user = useUser();
  return (
    <>
      <Typography variant="h4" component="h2">
        Area Privata
      </Typography>
      <Typography component="p">
        Ciao {user.email}, da questa pagina puoi verificare lo stato delle
        iscrizioni e gestire l'iscrizione di nuovi soci.
      </Typography>
    </>
  );
};

export default PrivateArea;
