export type Customer = {
  customerMasDetail: any;
  customerReadDetail: ReadDetails[];
};
export type ReadDetails = {
  billCycle: string;
  days: string;
  kwh: string;
  readDate: string;
  readMet1: string;
  readMet2: string;
  readMet3: string;
  units: string;
  year: string;
};
