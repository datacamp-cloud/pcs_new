// /constants/bankData.ts

export const bankReferences: Record<string, {
  accountName: string;
  codeBanque: string;
  codeGuichet: string;
  numeroCompte: string;
  cleRib: string;
  logo: any; // Adjust type as needed, e.g., ImageSourcePropType if using React Native
}> = {
  "Banque Atlantique": {
    accountName: "PCS Xpress",
    codeBanque: "ATLX",
    codeGuichet: "1001",
    numeroCompte: "12345678901",
    cleRib: "83",
    logo: require('../assets/images/banks/baci.png'),
  },
  "BNI": {
    accountName: "PCS Xpress",
    codeBanque: "BNIC",
    codeGuichet: "2002",
    numeroCompte: "98765432109",
    cleRib: "52",
    logo: require('../assets/images/banks/bni.png'),
  },
  "Ecobank": {
    accountName: "PCS Xpress",
    codeBanque: "ECOC",
    codeGuichet: "kl14",
    numeroCompte: "99563",
    cleRib: "178",
    logo: require('../assets/images/banks/ecobank.png'),
  },
  "NSIA Banque": {
    accountName: "PCS Xpress",
    codeBanque: "NSIA",
    codeGuichet: "3011",
    numeroCompte: "5566778899",
    cleRib: "11",
    logo: require('../assets/images/banks/nsia.jpg'),
  },
  "Société Générale": {
    accountName: "PCS Xpress",
    codeBanque: "SGCI",
    codeGuichet: "4001",
    numeroCompte: "1122334455",
    cleRib: "60",
    logo: require('../assets/images/banks/societegenerale.png'),
  },
};
