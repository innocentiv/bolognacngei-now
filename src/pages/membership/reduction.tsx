import {
  Button,
  CircularProgress,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  MenuItem
} from "@material-ui/core";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import PageWrapper from "../../components/pageWrapper";
import FileUpload from "../../components/core/fileUpload";

import { useGetMember, useUpdateMember } from "../../hooks/membership";
import { membershipPayment } from "../../services/routes";
import { useLocation } from "../../hooks/router";
import { ValidatorHelper } from "../../utils/validatorHelper";
import { CheckBoxField } from "../../components/core/checkBoxField";
import { SelectField } from "../../components/core/selectField";

interface IMembershipReductionProps
  extends RouteComponentProps<{ id: string }> {}

export interface Values {
  reductionIsee: boolean;
  reductionIseeRange: string;
  reductionFamily: boolean;
  reductionFamilyRelation: string;
  reductionRelativeName: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dataHealthForm: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      "& > *": {
        marginTop: theme.spacing(2)
      }
    },
    loading: {
      marginLeft: theme.spacing(1)
    }
  })
);

const MembershipReduction: React.FC<IMembershipReductionProps> = ({
  match
}) => {
  const { id } = match.params;
  const classes = useStyles();
  const { navigate } = useLocation();
  const member = useGetMember(id);
  const updateMember = useUpdateMember();

  return member ? (
    <PageWrapper>
      <Typography variant="h4" component="h2">
        Riduzioni alla quota di iscrizione
      </Typography>
      <Formik
        initialValues={{
          reductionIsee: member.reductionIsee || false,
          reductionIseeRange: member.reductionIseeRange || "",
          reductionFamily: member.reductionFamily || false,
          reductionFamilyRelation: member.reductionFamilyRelation || "",
          reductionRelativeName: member.reductionRelativeName || ""
        }}
        validate={values => {
          const validator = new ValidatorHelper<Values>(values);
          if (values.reductionIsee) {
            validator.requireField(
              "reductionIseeRange",
              "Devi indicare una fascia di reddito ISEE"
            );
            validator.requireField(
              "reductionIseeRange",
              "Devi indicare una fascia di reddito ISEE"
            );
          }
          if (values.reductionFamily) {
            validator.requireField(
              "reductionFamilyRelation",
              "Devi indicare il grado di parentela"
            );
            validator.requireField(
              "reductionRelativeName",
              "Devi indicare il nome del parente"
            );
          }

          return validator.getErrors();
        }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          if (
            (values.reductionIsee && !member.reductionIseeDocuments) ||
            (member.reductionIseeDocuments &&
              member.reductionIseeDocuments.length === 0)
          ) {
            setStatus({
              reductionIseeDocuments: "Devi caricare una copia del modulo ISEE"
            });
            setSubmitting(false);
            return;
          }
          await updateMember(id, values as any);

          navigate(membershipPayment(id));
        }}
      >
        {({ isSubmitting, errors, values, status }: FormikProps<Values>) => {
          return (
            <Form className={classes.dataHealthForm}>
              <Typography variant="h5" component="h3">
                Accesso al fondo di solidarietà
              </Typography>

              <CheckBoxField<Values>
                name="reductionIsee"
                label="Voglio accedere al Fondo di Solidarietá e dichiaro di avere i requisiti per farlo"
                errors={errors}
              />

              {values.reductionIsee && (
                <>
                  <Typography component="p">
                    l genitore del socio giovane può richiedere opzionalmente
                    l’accesso al Fondo di Solidarietà caricando nella procedura
                    online al momento dell’iscrizione, il modulo ISEE mini o il
                    Modulo ISEE Minorenni nel caso in qui vi sia un solo
                    genitore nel nucleo famigliare, che attesti un valore
                    inferiore a 19˙000€, affinché la Sezione di Bologna provveda
                    a coprire parte delle spese relative alle attività scout per
                    colui/colei che state iscrivendo (per maggiori dettagli
                    vedere circolare allegata). In alternativa è possibile
                    pagare il censimento come previsto per chi non carica il
                    modulo ISEE inferiore a 19.000 euro.
                  </Typography>
                  <Typography component="p">
                    Ricordiamo che il Fondo di Solidarietà è uno strumento
                    interno della Sezione di Bologna per agevolare le famiglie
                    che sono in reale difficoltà. Per la Sezione è un enorme
                    sforzo economico programmare e gestire questo Fondo che
                    crediamo essere fondamentale per garantire a tutti l’accesso
                    alle attività scout: come sapete la Sezione è totalmente
                    gestita da volontari e si autosostiene nelle attività e
                    nelle gestione del Fondo, accantonando anno dopo anno parte
                    delle quote che vengono versate da tutti noi e attraverso
                    gli autofinanziamenti.
                  </Typography>
                  <SelectField
                    name="reductionIseeRange"
                    label="Fascia ISEE"
                    errors={errors}
                  >
                    <MenuItem value="under7000">F1 - fino a 7000€</MenuItem>
                    <MenuItem value="under13000">
                      F2 - da 7001€ a 13000€
                    </MenuItem>
                    <MenuItem value="under19000">
                      F3 - da 13001€ a 19000€
                    </MenuItem>
                  </SelectField>
                  <Typography variant="h5" component="h3">
                    Copia del modulo ISEE
                  </Typography>
                  <Typography component="p">
                    Fai una scansione o una foto del modulo di certificazione
                    ISEE emesso dal comune di riferimento. Ricordiamo che per i
                    soci appartenenti ad un nucleo famigliare con un solo
                    genitore è necessario caricare l'ISEE Minorenni.
                  </Typography>
                  <FileUpload
                    memberId={id}
                    memberProperty="reductionIseeDocuments"
                    errors={status}
                  />
                </>
              )}

              {!values.reductionIsee && (
                <>
                  <Typography variant="h5" component="h3">
                    Quota ridotta per famigliari iscritti CNGEI di Bologna
                  </Typography>
                  <CheckBoxField<Values>
                    name="reductionFamily"
                    label="Dichiaro che iscriverò per l'anno scout 2018 - 2019 almeno due membri dello stesso nucleo famigliare"
                    errors={errors}
                  />

                  {values.reductionFamily && (
                    <>
                      <SelectField
                        name="reductionFamilyRelation"
                        label="Rapporto di parentela"
                        errors={errors}
                      >
                        <MenuItem value="sibling">Fratello o Sorella</MenuItem>
                        <MenuItem value="child">Figlio o Figlia</MenuItem>
                        <MenuItem value="parent">Genitore</MenuItem>
                      </SelectField>

                      <Field
                        name="reductionRelativeName"
                        type="text"
                        label="Nome del familiare iscritto al CNGEI di Bologna"
                        component={TextField}
                      />
                    </>
                  )}
                </>
              )}

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

export default MembershipReduction;
