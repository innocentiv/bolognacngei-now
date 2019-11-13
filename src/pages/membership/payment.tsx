import {
  Button,
  CircularProgress,
  Typography,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import { Form, Formik, FormikProps } from "formik";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import PageWrapper from "../../components/pageWrapper";
import FileUpload from "../../components/core/fileUpload";

import { useMember, useUpdateMember } from "../../hooks/membership";
import { overview } from "../../services/routes";
import { useLocation } from "../../hooks/router";
import { usePaymentIntent } from "../../hooks/stripe";
import {
  injectStripe,
  ReactStripeElements,
  CardElement
} from "react-stripe-elements";
import { Enum_Member_Payment_Status } from "../../types/member";
import CreateMember from "../../components/membership/createMember";

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
        marginTop: theme.spacing(2)
      }
    },
    loading: {
      marginLeft: theme.spacing(1)
    },
    loadingPlaceholder: {
      minHeight: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    card: {
      fontSize: "125%"
    },
    toOverview: {
      margin: `2em 0`
    }
  })
);

const MembershipPayment: React.FC<IMembershipPaymentProps> = ({
  match,
  stripe
}) => {
  const { id } = match.params;
  const classes = useStyles();
  const { navigate } = useLocation();
  const member = useMember(id);
  const updateMember = useUpdateMember();
  const paymentIntent = usePaymentIntent(member);

  const isPaymentComplete =
    member &&
    member.paymentStatus === Enum_Member_Payment_Status.PaymentComplete;
  const isPaymentToBeVerified =
    member && member.paymentStatus === Enum_Member_Payment_Status.Tobeverified;

  if (isPaymentComplete || isPaymentToBeVerified) {
    return (
      <PageWrapper>
        <Typography variant="h4" component="h2">
          Iscrizione terminata con successo!
        </Typography>
        <Typography component="p">
          I dati di {member.name} sono stati salvati in archivio e puoi
          modificarli in ogni momento utilizzando la mail e la password che hai
          usato per registrarti. Per quanto i dati siano stati salvati
          correttamente potresti essere ricontattato/a per confermare documenti
          o dettagli. Per ora é tutto fatto, buona caccia!
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
                paymentStatus: Enum_Member_Payment_Status.Needpayment
              })
            }
            className={classes.toOverview}
          >
            Modifica i dati di pagamento
          </Button>
        )}
        <CreateMember />
      </PageWrapper>
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
            paymentIntent.client_secret
          );

          if (
            paymentResult.paymentIntent &&
            paymentResult.paymentIntent.status === "succeeded"
          ) {
            await updateMember(id, {
              paymentStatus: Enum_Member_Payment_Status.PaymentComplete
            });
            setSubmitting(false);
            return;
          }

          if (
            member.paymentBankTransfert &&
            member.paymentBankTransfert.length > 0
          ) {
            await updateMember(id, {
              paymentStatus: Enum_Member_Payment_Status.Tobeverified
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
              <Typography variant="h5" component="h3">
                Quota di iscrizione annuale:{" "}
                {paymentIntent ? paymentIntent.amount / 100 : ""}€
              </Typography>
              <Typography variant="h6" component="h4">
                Paga con la carta di Credito
              </Typography>
              <CardElement
                className={classes.card}
                style={{
                  base: {
                    fontSize: "18px"
                  }
                }}
              />

              <Typography variant="h6" component="h4">
                Oppure carica la ricevuta del bonifico
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
            <div className={classes.loadingPlaceholder}>
              <CircularProgress />
            </div>
          );
        }}
      </Formik>
    </PageWrapper>
  ) : null;
};

export default injectStripe(MembershipPayment);
