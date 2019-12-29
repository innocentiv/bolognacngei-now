import { Typography, Button } from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import PageWrapper from "../../components/pageWrapper";
import { useFirestore } from "react-redux-firebase";
import { Member, Enum_Member_Payment_Status } from "../../types/member";
import { computeMembershipFeeForMember } from "../../utils/payment";

interface IAdminActionsProps extends RouteComponentProps<{}> {}

export interface Values {
  reductionIsee: boolean;
  reductionIseeRange: string;
  reductionFamily: boolean;
  reductionFamilyRelation: string;
  reductionRelativeName: string;
}

const AdminActions: React.FC<IAdminActionsProps> = () => {
  const firestore = useFirestore();

  return (
    <PageWrapper>
      <Typography variant="h4" component="h2">
        Pagina di Amministrazione
      </Typography>
      <Typography component="p">In questa pagina alcune utility</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const membersSnapshot = await firestore.collection("members").get();
          membersSnapshot.forEach(memberDoc => {
            const member = memberDoc.data() as Member;
            if (
              member.paymentStatus !==
                Enum_Member_Payment_Status.PaymentComplete &&
              member.paymentStatus !==
                Enum_Member_Payment_Status.Tobeverified &&
              member.paymentStatus !==
                Enum_Member_Payment_Status.Needintegration
            ) {
              memberDoc.ref.update({
                dateLastUpdated:
                  member.dateLastUpdated ||
                  (member.paymentDue ? "2019-12-20" : "2019-12-10"),
                dateFirstCompleted: (firestore as any).FieldValue.delete()
              });
            } else {
              memberDoc.ref.update({
                dateLastUpdated:
                  member.dateLastUpdated ||
                  (member.paymentDue ? "2019-12-20" : "2019-12-10"),
                dateFirstCompleted:
                  member.dateFirstCompleted ||
                  (member.paymentDue ? "2019-12-20" : "2019-12-10")
              });
            }
          });
        }}
      >
        Fill in missing date
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const membersSnapshot = await firestore.collection("members").get();
          membersSnapshot.forEach(memberDoc => {
            const member = memberDoc.data() as Member;
            const fee = computeMembershipFeeForMember(member);
            console.log(
              member.id,
              member.name,
              fee,
              member.paymentDue && fee !== member.paymentDue ? "ERROR" : "OK"
            );
          });
        }}
      >
        Fill in payment required
      </Button>
    </PageWrapper>
  );
};

export default AdminActions;
