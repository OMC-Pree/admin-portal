import { Page, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { AllDataAnswerAggregation } from "../../aggregations/types";
import { IUser } from "../../user/userModels";
import { styles } from "./pdfStyles";
import { BodyText, SubheadingText, TitleText, PageFooter, PageHeader } from "./PDFComponents";

interface Page1Props {
  client: IUser;
  rawData: AllDataAnswerAggregation;
}

const Page1 = ({ rawData, client }: Page1Props) => {
  const addresses = client.addresses;
  return (
    <Page size="A4">
      <PageHeader />
      <View style={styles.pageContent}>
        <View>
          <TitleText>Octopus MoneyCoach Investments - Suitability Letter</TitleText>
        </View>
        <View style={styles.detailsSection}>
          <BodyText>{`${client.firstName} ${client.lastName}`}</BodyText>
          {addresses ? (
            <View>
              <BodyText>{addresses[0].street1}</BodyText>
              <BodyText>{addresses[0].street2}</BodyText>
              <BodyText>{addresses[0].city}</BodyText>
              <BodyText>{addresses[0].zipCode}</BodyText>
              <BodyText>{addresses[0].subDivision1}</BodyText>
            </View>
          ) : (
            <BodyText>No Addresses Available</BodyText>
          )}
          <BodyText>Date Generated: {format(new Date(), "PPPP")}</BodyText>
          <BodyText>{`REPORT_ID: ${rawData.id}`}</BodyText>
        </View>
        <View style={styles.smallSection}>
          <BodyText>{`Dear ${client.firstName}`}</BodyText>
        </View>
        <View style={styles.smallSection}>
          <SubheadingText>
            You&apos;re so close to getting invested, (woohoo!) but this document is very important
            to read . . .
          </SubheadingText>
          <BodyText>
            This letter confirms the investment advice provided on{" "}
            {format(
              new Date(
                rawData.items.UK_INVESTMENT_ADVICE_PLAN_CREATED_AT.answer?.valueString as string,
              ),
              "PPPP",
            )}{" "}
            and explains why our recommendations are suitable, given your circumstances and
            objectives. It also includes details of the costs, and importantly, risks which are
            associated with investing. If you disagree with anything in this letter, please let us
            know as soon as possible. Our contact details are here, so give us a call – we’re always
            happy to help!
          </BodyText>
        </View>
        <View style={styles.smallSection}>
          <SubheadingText>Warning</SubheadingText>
          <BodyText>
            {`We've created this recommendation based on the answers you gave when using our online
            "investment advice service" on ${format(
              new Date(
                rawData.items.UK_INVESTMENT_ADVICE_PLAN_CREATED_AT.answer?.valueString as string,
              ),
              "PPPP",
            )} and on the data present in the "Active” financial plan you built with your Money Coach, last updated on ${format(
              new Date(
                rawData.items.UK_INVESTMENT_ADVICE_ACTIVE_PLAN_UPDATED_AT.answer
                  ?.valueString as string,
              ),
              "PPPP",
            )}. If you made any changes to your Active Plan after this date, they haven't been considered in this recommendation report.`}
          </BodyText>
          <BodyText>
            If you&apos;ve had any major changes in your financial life since then, please speak
            with your coach to get your Active Plan up to date. Then you&apos;ll be able to revisit
            the investment advice service for the most up to date recommendations.
          </BodyText>
        </View>
        <View style={styles.smallSection}>
          <BodyText>Octopus MoneyCoach</BodyText>
          <BodyText>support@octopusmoneycoach.com</BodyText>
          <BodyText>Tel: 0203 111 0589</BodyText>
          <BodyText>Name of adviser: </BodyText>
          <BodyText>FCA number: </BodyText>
        </View>
        <PageFooter pageNumber={1} />
      </View>
    </Page>
  );
};

export default Page1;
