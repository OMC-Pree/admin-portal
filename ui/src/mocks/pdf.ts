const mockPDF = {
  something: jest.fn(),
  create: jest.fn(),
  StyleSheet: {
    create: jest.fn(),
  },
};

jest.mock("@react-pdf/renderer", () => mockPDF);
export default mockPDF;
