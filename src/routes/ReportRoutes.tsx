import { Route } from "react-router-dom";
import Layout from "../Layout";
import General from "../pages/General";
import Analysis from "../pages/Analysis";
import PucslLiss from "../pages/PucslLiss";
import Inventory from "../pages/Inventory";
import Collections from "../pages/Collections";
import TrialBalance from "../pages/TrialBalance";
import BillingPayment from "../pages/BillingPayment";
import SolarInformation from "../pages/SolarInformation";
import ConsumptionAnalysis from "../pages/ConsumptionAnalysis";
import BulkReporting from "../components/mainTopics/billing&payments/customerDetails/reports/BulkReporting";
import OrdinaryReadingHistory from "../components/mainTopics/billing&payments/customerDetails/reports/OrdinaryReadingHistory";
import TransactionHistoryReport from "../components/mainTopics/billing&payments/customerDetails/reports/TransactionHistoryReport";

const ReportRoutes = () => (
  <>
    <Route
      path="/report/general"
      element={
        <Layout>
          <General />
        </Layout>
      }
    />
    <Route
      path="/report/billing-payment"
      element={
        <Layout>
          <BillingPayment />
        </Layout>
      }
    />
    <Route
      path="/report/analysis"
      element={
        <Layout>
          <Analysis />
        </Layout>
      }
    />
    <Route
      path="/report/collections"
      element={
        <Layout>
          <Collections />
        </Layout>
      }
    />
    <Route
      path="/report/consumption-analysis"
      element={
        <Layout>
          <ConsumptionAnalysis />
        </Layout>
      }
    />
    <Route
      path="/report/solar-information"
      element={
        <Layout>
          <SolarInformation />
        </Layout>
      }
    />
    <Route
      path="/report/pucsl-liss"
      element={
        <Layout>
          <PucslLiss />
        </Layout>
      }
    />
    <Route
      path="/report/inventory"
      element={
        <Layout>
          <Inventory />
        </Layout>
      }
    />
    <Route
      path="/report/billing-payment/transaction-history"
      element={
        <Layout>
          <TransactionHistoryReport />
        </Layout>
      }
    />
    <Route
      path="/report/billing-payment/reading-history"
      element={
        <Layout>
          <OrdinaryReadingHistory />
        </Layout>
      }
    />
    <Route
      path="/report/billing-payment/bulk-report"
      element={
        <Layout>
          <BulkReporting />
        </Layout>
      }
    />
    <Route
      path="/report/trialBalance"
      element={
        <Layout>
          <TrialBalance />
        </Layout>
      }
    />
  </>
);
export default ReportRoutes;
