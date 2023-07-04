import axios from 'axios'

const BANK_LIST_URL = "https://api.indicina.co/api/v3/banks"


export const StatementType = {
    JSON: "json",
    CSV: "csv",
    PDF: "pdf"
  };


 export const Currency = {
    NGN: "NGN",
    EGP: "EGP",
    KES: "KES"

 }

export const Bank = {
    ACCESS : "044",
    ALAT :"035A",
    CIB : "818147",
    ECOBANK : "050", 
    FBN : "011",
    FCMB : "214",
    FIDELITY : "070",
    GLOBUS : "00103",
    GTB : "058",
    HSBC : "818039",
    KEYSTONE : "082",
    KUDA : "50211",
    MBS : "041",
    MPESA : "404001",
    PROVIDUS :"101",
    POLARIS : "076",
    STANBIC : "221",
    STERLING : "232",
    UBA : "033",
    UNITY : "215",
    UNION : "032",
    ZENITH : "057",
    HERITAGE: "030",

  async getBankList() {
    try {
      const response = await axios.get(BANK_LIST_URL);
      if (response.status === 200) {
        const bankList = response.data.data;
        return bankList.map((bank) => ({ name: bank.name, code: bank.code }));
      } else {
        throw new Error(`Failed to get bank list. Status code: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Failed to get bank list. Error: ${error.message}`);
    }
  }
};


export const StatementFormat = {
  CUSTOM : "custom",
  MBS    : "mbs",
  MONO   : "mono",
  OKRA   : "okra"
}
  


export const PDFStatus = {
  DONE : "DONE",
  FAILED : "FAILED",
  IN_PROGRESS: "IN_PROGRESS",


}
   