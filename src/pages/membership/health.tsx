import {
  Button,
  CircularProgress,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  FormGroup,
  Grid,
  IconButton
} from "@material-ui/core";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import PageWrapper from "../../components/pageWrapper";
import FileUpload from "../../components/core/fileUpload";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

import { useMember, useUpdateMember } from "../../hooks/membership";
import {
  membershipReduction,
  membershipPayment,
  membershipData
} from "../../services/routes";
import { useNavigate } from "../../hooks/router";
import { ValidatorHelper } from "../../utils/validatorHelper";
import { CheckBoxField } from "../../components/core/checkBoxField";
import { Enum_Member_Payment_Status } from "../../types/member";
import { dateToIsoDate, getNowDateString } from "../../utils/membersHelper";

interface IMembershipHealthProps extends RouteComponentProps<{ id: string }> {}

export interface Values {
  healthMeasles: boolean;
  healthMumps: boolean;
  healthRubella: boolean;
  healthChickenpox: boolean;
  healthPertussis: boolean;
  healthTetanus: boolean;
  healthPolio: boolean;
  healthDiphtheria: boolean;
  healthHepatitisB: boolean;
  healthHaemophilus: boolean;
  healthTetanusDate: string;
  healthFoodAllergies: string;
  healthInsectAllergies: string;
  healthDrugsAllergies: string;
  healthSeasonalAllergies: string;
  healthMedicalConditions: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dataHealthForm: {
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

const MembershipHealth: React.FC<IMembershipHealthProps> = ({ match }) => {
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
        <IconButton onClick={() => navigate(membershipData(id))} size="small">
          <ArrowBackIos /> Indietro
        </IconButton>{" "}
      </Typography>

      <Typography variant="h4" component="h2">
        Dati Sanitari
      </Typography>
      <Formik
        initialValues={{
          healthTetanusDate: member.healthTetanusDate || "",
          healthFoodAllergies: member.healthFoodAllergies || "",
          healthInsectAllergies: member.healthInsectAllergies || "",
          healthDrugsAllergies: member.healthDrugsAllergies || "",
          healthSeasonalAllergies: member.healthSeasonalAllergies || "",
          healthMedicalConditions: member.healthMedicalConditions || "",
          healthMeasles: member.healthMeasles || false,
          healthMumps: member.healthMumps || false,
          healthRubella: member.healthRubella || false,
          healthChickenpox: member.healthChickenpox || false,
          healthPertussis: member.healthPertussis || false,
          healthTetanus: member.healthTetanus || false,
          healthPolio: member.healthPolio || false,
          healthDiphtheria: member.healthDiphtheria || false,
          healthHepatitisB: member.healthHepatitisB || false,
          healthHaemophilus: member.healthHaemophilus || false
        }}
        validate={values => {
          const validator = new ValidatorHelper<Values>(values);
          validator.requireField(
            "healthFoodAllergies",
            "Devi indare le allergie alimentari (Nessuna se non presenti)"
          );
          validator.requireField(
            "healthInsectAllergies",
            "Devi indare le allergie agli insetti (Nessuna se non presenti)"
          );
          validator.requireField(
            "healthDrugsAllergies",
            "Devi indare le allergie ai farmaci (Nessuna se non presenti)"
          );
          validator.requireField(
            "healthSeasonalAllergies",
            "Devi indare le allergie stagionali (Nessuna se non presenti)"
          );
          return validator.getErrors();
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await updateMember(id, {
            ...values,
            healthTetanusDate:
              values.healthTetanusDate &&
              dateToIsoDate(values.healthTetanusDate),
            dateLastUpdated: getNowDateString()
          } as any);
          setSubmitting(false);
          if (
            member.paymentStatus === Enum_Member_Payment_Status.PaymentComplete
          ) {
            navigate(membershipPayment(id));
          } else {
            navigate(membershipReduction(id));
          }
        }}
      >
        {({ isSubmitting, errors }: FormikProps<Values>) => {
          return (
            <Form className={classes.dataHealthForm}>
              <Typography variant="h5" component="h3">
                Vaccinazioni o Malattie soggette ad immunizzazione
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <FormGroup>
                    <CheckBoxField<Values>
                      name="healthMeasles"
                      label="Morbillo"
                      errors={errors}
                    />
                    <CheckBoxField<Values>
                      name="healthMumps"
                      label="Parotite"
                      errors={errors}
                    />
                    <CheckBoxField<Values>
                      name="healthRubella"
                      label="Rosolia"
                      errors={errors}
                    />
                    <CheckBoxField<Values>
                      name="healthChickenpox"
                      label="Varicella"
                      errors={errors}
                    />
                    <CheckBoxField<Values>
                      name="healthPertussis"
                      label="Pertosse"
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <CheckBoxField<Values>
                      name="healthPolio"
                      label="Polio"
                      errors={errors}
                    />
                    <CheckBoxField<Values>
                      name="healthDiphtheria"
                      label="Difterite"
                      errors={errors}
                    />
                    <CheckBoxField<Values>
                      name="healthHepatitisB"
                      label="Epatite B"
                      errors={errors}
                    />
                    <CheckBoxField<Values>
                      name="healthHaemophilus"
                      label="Emofilo B"
                      errors={errors}
                    />
                    <CheckBoxField<Values>
                      name="healthTetanus"
                      label="Tetano"
                      errors={errors}
                    />
                  </FormGroup>
                </Grid>
              </Grid>

              <Field
                name="healthTetanusDate"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Data della vaccinazione contro il tetano"
                component={TextField}
              />
              <Typography component="p">
                Se durante le attivitá sorgeranno problemi di natura medica
                (come una puntura di vespa o un trauma) i genitori saranno
                immediatamente contattati. Le informazioni che seguono possono
                essere utili per permettere ai capi educatori di reagire
                tempestivamente nel caso sia necessario fornire informazioni al
                personale medico, e non sia possibile entrare in contatto con i
                genitori del ragazzo iscritto.
              </Typography>
              <Field
                name="healthFoodAllergies"
                type="text"
                label="Allergie e/o intolleranze alimentari e/o diete"
                multiline
                component={TextField}
              />
              <Field
                name="healthInsectAllergies"
                type="text"
                label="Allergie a punture di insetto"
                multiline
                component={TextField}
              />
              <Field
                name="healthDrugsAllergies"
                type="text"
                label="Allergie a farmaci documentate"
                multiline
                component={TextField}
              />
              <Field
                name="healthSeasonalAllergies"
                type="text"
                label="Allergie stagionali documentate"
                multiline
                component={TextField}
              />
              <Typography component="p">
                Ti chiediamo di comunicarci terapie, in atto o occasionali, per
                i quali assume farmaci, traumi o interventi chirurgici ed esiti
                rilevanti, eventuali altre condizioni mediche che pensate sia
                rilevante comunicarci (per esempio condizioni che colpiscono la
                sfera comportamentale, relazionale, cognitiva o affettiva)
              </Typography>
              <Field
                name="healthMedicalConditions"
                type="text"
                label="Terapie e condizioni mediche"
                multiline
                component={TextField}
              />
              <Typography variant="h5" component="h3">
                Documenti Sanitari
              </Typography>
              <Typography component="p">
                Ti chiediamo se possibile di caricare documenti sanitari che
                attestino eventuali patologie e trattamenti sopra riportati che
                ritieni possano essere utili
              </Typography>
              <FileUpload
                memberId={id}
                memberProperty="healthMedicalDocuments"
              />
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Verifica le riduzioni alla quota
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

export default MembershipHealth;
