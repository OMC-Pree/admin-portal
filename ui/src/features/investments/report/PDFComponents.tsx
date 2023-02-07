import { ReactNode } from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { textStyles, footerStyles, headerStyles } from "./pdfStyles";
import logo from "../../../assets/OMC_Main_White.png";

interface TextProps {
  children: ReactNode;
}

export const BodyText = ({ children }: TextProps) => {
  return <Text style={textStyles.body}>{children}</Text>;
};

export const SubheadingText = ({ children }: TextProps) => {
  return <Text style={textStyles.subheading}>{children}</Text>;
};

export const TitleText = ({ children }: TextProps) => {
  return <Text style={textStyles.title}>{children}</Text>;
};

interface PageFooterProps {
  pageNumber: number;
}

export const PageFooter = ({ pageNumber }: PageFooterProps) => {
  return (
    <View style={footerStyles.footerSection}>
      <BodyText>
        Page
        <Text style={footerStyles.number}>{pageNumber}</Text>
        of
        <Text style={footerStyles.number}>13</Text>
      </BodyText>
    </View>
  );
};

export const PageHeader = () => {
  return (
    <View style={headerStyles.headerArea}>
      <Image src={logo} style={headerStyles.image} />
    </View>
  );
};
