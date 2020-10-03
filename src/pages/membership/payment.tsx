import {
  Button,
  CircularProgress,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Tooltip,
} from "@material-ui/core";
import { Form, Formik, FormikProps } from "formik";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import PageWrapper from "../../components/pageWrapper";
import FileUpload from "../../components/core/fileUpload";

import { useMember, useUpdateMember } from "../../hooks/membership";
import { overview } from "../../services/routes";
import { useNavigate } from "../../hooks/router";
import { usePaymentIntent } from "../../hooks/stripe";
import {
  injectStripe,
  ReactStripeElements,
  CardElement,
} from "react-stripe-elements";
import { Enum_Member_Payment_Status } from "../../types/member";
import CreateMember from "../../components/membership/createMember";
import Loader from "../../components/core/loader";
import {
  computeDefaultInterest,
  END_REGISTRATION_DATE,
} from "../../utils/payment";
import { getNowDateString } from "../../utils/membersHelper";

type IMembershipPaymentProps = RouteComponentProps<{ id: string }> &
  ReactStripeElements.InjectedStripeProps;

export interface Values {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paymentForm: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      "& > *": {
        marginTop: theme.spacing(3),
      },
    },
    loading: {
      marginLeft: theme.spacing(1),
    },
    card: {
      fontSize: "125%",
    },
    toOverview: {
      margin: `1rem 0`,
    },
    modifyPayment: {
      margin: `1rem 0 4rem`,
    },
    logo: {
      display: "block",
      margin: "1rem auto",
      width: "40%",
    },
  })
);

const MembershipPayment: React.FC<IMembershipPaymentProps> = ({
  match,
  stripe,
}) => {
  const { id } = match.params;
  const classes = useStyles();
  const navigate = useNavigate();
  const [member] = useMember(id);
  const updateMember = useUpdateMember();
  const paymentIntent = usePaymentIntent(member);

  const isPaymentComplete =
    member &&
    member.paymentStatus === Enum_Member_Payment_Status.PaymentComplete;
  const isPaymentToBeVerified =
    member && member.paymentStatus === Enum_Member_Payment_Status.Tobeverified;
  const isPaymentNeedIntegration =
    member &&
    member.paymentStatus === Enum_Member_Payment_Status.Needintegration;
  const paymentDefaultInterest = computeDefaultInterest(
    END_REGISTRATION_DATE,
    member.dateFirstCompleted ? new Date(member.dateFirstCompleted) : new Date()
  );

  if (
    !isPaymentNeedIntegration &&
    (isPaymentComplete || isPaymentToBeVerified)
  ) {
    return (
      <>
        <PageWrapper>
          <img src="/assets/success.png" alt="" className={classes.logo} />
          <Typography variant="h4" component="h2">
            Iscrizione terminata con successo!
          </Typography>
          <Typography component="p">
            I dati di {member.name} sono stati salvati in archivio e puoi
            modificarli in ogni momento utilizzando la mail e la password che
            hai usato per registrarti. Per quanto i dati siano stati salvati
            correttamente potresti essere ricontattato/a per confermare
            documenti o dettagli. Per ora é tutto fatto, buona caccia!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(overview())}
            className={classes.toOverview}
          >
            Vai alla pagina Principale
          </Button>
          {isPaymentToBeVerified && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                updateMember(id, {
                  paymentStatus: Enum_Member_Payment_Status.Needpayment,
                })
              }
              className={classes.modifyPayment}
            >
              Modifica i dati di pagamento
            </Button>
          )}
        </PageWrapper>
        <PageWrapper>
          <CreateMember />
        </PageWrapper>
      </>
    );
  }

  return member ? (
    <PageWrapper>
      <Typography variant="h4" component="h2">
        Pagamento della quota di iscrizione
      </Typography>
      <Formik
        initialValues={{}}
        onSubmit={async (_, { setSubmitting, setStatus }) => {
          if (!stripe || !paymentIntent) {
            setSubmitting(false);
            return;
          }

          const paymentResult = await stripe.handleCardPayment(
            paymentIntent.client_secret || ""
          );

          if (
            paymentResult.paymentIntent &&
            paymentResult.paymentIntent.status === "succeeded"
          ) {
            await updateMember(id, {
              paymentStatus: Enum_Member_Payment_Status.PaymentComplete,
              paymentId: paymentResult.paymentIntent.id,
              dateLastUpdated: getNowDateString(),
              dateFirstCompleted:
                member.dateFirstCompleted || getNowDateString(),
            });
            setSubmitting(false);
            return;
          }

          if (
            member.paymentBankTransfert &&
            member.paymentBankTransfert.length > 0
          ) {
            await updateMember(id, {
              paymentStatus: Enum_Member_Payment_Status.Tobeverified,
              paymentDue: paymentIntent ? paymentIntent.amount : 0,
              dateLastUpdated: getNowDateString(),
              dateFirstCompleted:
                member.dateFirstCompleted || getNowDateString(),
            });
            setSubmitting(false);
          }

          if (paymentResult.error) {
            setStatus({ paymentBankTransfert: paymentResult.error.message });
            setSubmitting(false);
            return;
          }
        }}
      >
        {({ isSubmitting, status }: FormikProps<Values>) => {
          return paymentIntent && stripe ? (
            <Form className={classes.paymentForm}>
              {paymentDefaultInterest > 0 && (
                <>
                  <Typography component="p">
                    Mora per ritardo iscrizione (compresa):{" "}
                    {paymentDefaultInterest / 100}€
                  </Typography>
                </>
              )}
              {member.paymentPayedAmount ? (
                <>
                  <Typography component="p">
                    Quota di iscrizione già pagata:{" "}
                    {member.paymentPayedAmount / 100}€
                  </Typography>
                  <Typography variant="h5" component="h3">
                    Quota di iscrizione annuale da integrare:{" "}
                    {paymentIntent ? paymentIntent.amount / 100 : ""}€
                  </Typography>
                </>
              ) : (
                <Typography variant="h5" component="h3">
                  Quota di iscrizione annuale:{" "}
                  {paymentIntent ? paymentIntent.amount / 100 : ""}€
                </Typography>
              )}
              <Typography variant="h6" component="h4">
                Paga con la carta di Credito
              </Typography>
              <Typography component="p">
                Inserisci il numero della carta di credito seguito dalla data di
                scadenza e dal{" "}
                <Tooltip
                  title="Sulle carte di credito (Visa, MasterCard) si tratta delle ultime tre cifre del numero che si trova nell’area della firma sul retro della carta"
                  aria-label="cvv"
                >
                  <span>CVC/CVV</span>
                </Tooltip>
              </Typography>

              <CardElement
                className={classes.card}
                style={{
                  base: {
                    fontSize: "18px",
                  },
                }}
              />
              <Typography variant="body2" component="p">
                Il pagamento della quota con carta di credito avviene tramite la
                creazione di una richiesta di pagamento una tantum tramite il
                servizio di pagamenti{" "}
                <a
                  href="https://stripe.com/it/payments"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stripe
                </a>
                . Non conserviamo il numero della carta di credito e non
                condividiamo con Stripe nessun dato sensibile degli iscritti.
              </Typography>

              <Typography variant="h6" component="h4">
                Oppure carica la ricevuta del bonifico
              </Typography>
              <Typography component="p">
                Effettua un pagamento tramite bonifico alle seguenti coordinate
                bancarie:
              </Typography>
              <Typography component="div">
                <dl>
                  <dt>
                    <b>IBAN: </b>
                  </dt>
                  <dd>IT25E0306909606100000060610</dd>
                  <dt>
                    <b>Beneficiario: </b>
                  </dt>
                  <dd>“CNGEI Sezione di Bologna”</dd>
                  <dt>
                    <b>Causale: </b>
                  </dt>
                  <dd>
                    ”Nome Cognome ruolo 19/20”
                    <br />( es:“Paolino Paperino lupetto 19/20”).
                  </dd>
                </dl>
              </Typography>
              <FileUpload
                memberId={id}
                memberProperty="paymentBankTransfert"
                errors={status}
              />

              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Completa le iscrizioni
                {isSubmitting && (
                  <CircularProgress size="1em" className={classes.loading} />
                )}
              </Button>
            </Form>
          ) : (
            <Loader />
          );
        }}
      </Formik>
    </PageWrapper>
  ) : null;
};

export default injectStripe(MembershipPayment);
