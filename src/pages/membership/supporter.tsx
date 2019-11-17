import {
  Button,
  CircularProgress,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  IconButton
} from "@material-ui/core";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import PageWrapper from "../../components/pageWrapper";
import { useMember, useUpdateMember } from "../../hooks/membership";
import { overview, membershipPayment } from "../../services/routes";
import { useNavigate } from "../../hooks/router";
import { ValidatorHelper } from "../../utils/validatorHelper";
import { CheckBoxField } from "../../components/core/checkBoxField";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

interface IMembershipSupporterProps
  extends RouteComponentProps<{ id: string }> {}

export interface Values {
  name: string;
  group: string;
  role: string;
  birthplace: string;
  birthdate: string;
  address: string;
  fiscalCode: string;
  email: string;
  phone: string;
  tutorName: string;
  noOtherScoutMovements: boolean;
  neverBanned: boolean;
  hasCivilRight: boolean;
  isInformed: boolean;
  noAdverse: boolean;
  emailCommunication: boolean;
  privacyImages: boolean;
  privacyEshop: boolean;
  privacyHealth: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dataMemberForm: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      "& > *": {
        marginTop: theme.spacing(3)
      }
    },
    loading: {
      marginLeft: theme.spacing(1)
    }
  })
);

const MembershipSupporter: React.FC<IMembershipSupporterProps> = ({
  match
}) => {
  const { id } = match.params;
  const classes = useStyles();
  const navigate = useNavigate();
  const [member] = useMember(id);
  const updateMember = useUpdateMember();

  return member ? (
    <PageWrapper>
      <Typography
        variant="body1"
        component="span"
        style={{ margin: "0 auto 1.5rem 0" }}
      >
        <IconButton onClick={() => navigate(overview())} size="small">
          <ArrowBackIos /> Indietro
        </IconButton>{" "}
      </Typography>
      <Typography variant="h4" component="h2">
        Dati anagrafici del socio
      </Typography>
      <Typography component="p">
        Compila tutti i campi per {member.name}
      </Typography>

      <Formik
        initialValues={{
          name: member.name || "",
          group: member.group || "",
          role: member.role || "",
          birthplace: member.birthplace || "",
          birthdate: member.birthdate || "",
          address: member.address || "",
          fiscalCode: member.fiscalCode || "",
          email: member.email || "",
          phone: member.phone || "",
          tutorName: member.tutorName || "",
          noOtherScoutMovements: member.noOtherScoutMovements || false,
          neverBanned: member.neverBanned || false,
          hasCivilRight: member.hasCivilRight || false,
          isInformed: member.isInformed || false,
          noAdverse: member.noAdverse || false,
          emailCommunication: member.emailCommunication || false,
          privacyImages: member.privacyImages || false,
          privacyEshop: member.privacyEshop || false,
          privacyHealth: member.privacyHealth || false
        }}
        validate={values => {
          const validator = new ValidatorHelper<Values>(values);
          validator.requireField(
            "name",
            "Devi inserire Nome e Cognome del socio"
          );
          validator.requireField(
            "birthplace",
            "Devi inserire il luogo di nascita"
          );
          validator.requireField(
            "birthdate",
            "Devi inserire la data di nascita"
          );
          validator.requireField("address", "Devi insirire l'indirizzo");
          validator.requireField(
            "fiscalCode",
            "Devi inserire il codice fiscale"
          );
          validator.requireField("email", "Devi inserire l'indirizzo email");
          validator.requireField(
            "phone",
            "Devi inserire un numero di telefono"
          );
          validator.requireField(
            "noOtherScoutMovements",
            "Devi accettare questo campo per proseguire"
          );
          validator.requireField(
            "neverBanned",
            "Devi accettare questo campo per proseguire"
          );
          validator.requireField(
            "hasCivilRight",
            "Devi accettare questo campo per proseguire"
          );
          validator.requireField(
            "isInformed",
            "Devi accettare questo campo per proseguire"
          );
          validator.requireField(
            "noAdverse",
            "Devi accettare questo campo per proseguire"
          );
          validator.requireField(
            "emailCommunication",
            "Devi accettare questo campo per proseguire"
          );
          validator.requireField(
            "privacyHealth",
            "Devi accettare questo campo per proseguire"
          );
          validator.validateRegex(
            "email",
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            "L'indirizzo mail non è valido"
          );
          validator.validateRegex(
            "fiscalCode",
            /^[A-Za-z]{6}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{3}[A-Za-z]{1}$/,
            "Il codice fiscale non è valido"
          );
          return validator.getErrors();
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await updateMember(id, values as any);
          setSubmitting(false);
          navigate(membershipPayment(id));
        }}
      >
        {({ isSubmitting, errors }: FormikProps<Values>) => {
          return (
            <Form className={classes.dataMemberForm}>
              <Field
                name="name"
                type="text"
                label="Nome e Cognome socio da censire"
                component={TextField}
              />
              <Field
                name="birthplace"
                type="text"
                label="Luogo di nascita socio da censire"
                component={TextField}
              />
              <Field
                name="birthdate"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Data di nascita socio da censire"
                component={TextField}
              />
              <Field
                name="address"
                type="text"
                label="Indirizzo socio da censire"
                component={TextField}
              />
              <Field
                name="fiscalCode"
                type="text"
                label="Codice Fiscale del socio da censire"
                component={TextField}
              />
              <Field
                name="email"
                type="text"
                label="Posta elettronica per le comunicazioni"
                component={TextField}
              />
              <Field
                name="phone"
                type="text"
                label="Telefono di contatto"
                component={TextField}
              />
              <CheckBoxField<Values>
                name="noOtherScoutMovements"
                label="Dichiarate che la persona che state censendo non faccia parte di altre organizzazioni Scout, riconosciute o meno dagli Organismi Internazionali, o che si qualificano come tali, operanti sul territorio nazionale."
                errors={errors}
              />

              <CheckBoxField<Values>
                name="neverBanned"
                label="Dichiarate che la persona che state censendo non sia mai stata espulsa dal CNGEI"
                errors={errors}
              />
              <CheckBoxField<Values>
                name="hasCivilRight"
                label="Dichiarate che la persona che state censendo non sia priva dei diritti civili e politici previsti dalla Costituzione Italiana."
                errors={errors}
              />
              <CheckBoxField<Values>
                name="isInformed"
                label="Dichiarate di essere informato su che cosa le attivitá scout comportano ed in che tempi e modi si svolgono. Dichiarate di accettare il rischio ad esse connesso come parte del metodo scout."
                errors={errors}
              />
              <CheckBoxField<Values>
                name="noAdverse"
                label="Dichiarate che la persona che state censendo non svolga attività in conflitto con il Regolamento di Sezione, lo Statuto di Sezione, il Regolamento Nazionale e lo Statuto Nazionale"
                errors={errors}
              />
              <CheckBoxField<Values>
                name="emailCommunication"
                label="Accetto di ricevere le comunicazioni ufficiali della Sezione come le convocazione alle Assemblee di Sezione a mezzo posta elettronica rinunciando al loro invio a mezzo posta cartacea."
                errors={errors}
              />
              <Typography variant="h5" component="h3">
                Informativa sul trattamento dei dati personali
              </Typography>
              <Typography component="p">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://bolognacngei.it/wp-content/uploads/2018/11/Informativa-sul-trattamento-dei-dati-personali-ai-sensi-dell%E2%80%99articolo-13-GDPR-679-2016.pdf"
                >
                  Clicca qui per visionere l'informativa sul trattamento dei
                  dati personali
                </a>
              </Typography>
              <Typography component="p">
                Con riferimento agli art.6 e 7 del GDPR 679/16, è opportuno
                precisare che: non è necessario esprimere il consenso per il
                trattamento dei dati personali rilasciati dall’interessato per
                la corretta gestione dell'iscrizione. É importante peró
                ricordare che in assenza dell'ultimo consenso non sará possibile
                prendere parte agli eventi organizzati dal CNGEI
              </Typography>

              <CheckBoxField<Values>
                name="privacyImages"
                label="Acconsento al trattamento dei dati personali del socio da censire per le finalità indicate al punto 3a dell’informativa consegnatami, relativa alla liberatoria per l'utilizzo delle immagini."
                errors={errors}
              />
              <CheckBoxField<Values>
                name="privacyEshop"
                label="Acconsento al trattamento dei dati personali del socio da censire di natura comune per l’invio di informazioni di carattere promozionale e commerciale, a mezzo posta o telefono e/o mediante comunicazioni elettroniche quali e-mail, fax, messaggi del tipo Sms o MMS o con altri sistemi automatizzati in futuro implementati, relative alla promozione delle attività di CNGEI e a nuove offerte di prodotti o servizi complementari proposti attraverso il sito eshop.cngei.it, come espresso al punto 3b dell’informativa."
                errors={errors}
              />
              <CheckBoxField<Values>
                name="privacyHealth"
                label="Acconsento al trattamento dei dati personali del socio da censire di natura comune per finalità di comunicazione dei dati relativi alla salute (ad esempio per tener conto di necessità particolari in tema di alimentazione) verso soggetti terzi, operanti nel settore ricettivo, individuate da CNGEI per fornire servizi complementari alla gestione delle finalità, come espresso al punto 4a dell’informativa, consapevole del fatto che in assenza di questo consenso non sarà possibile prendere parti agli eventi organizzati da CNGEI. "
                errors={errors}
              />

              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Vai al pagamento
                {isSubmitting && (
                  <CircularProgress size="1em" className={classes.loading} />
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </PageWrapper>
  ) : null;
};

export default MembershipSupporter;
