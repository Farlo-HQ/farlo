"use client";
import styles from "./styles.module.scss";
import {
  IconClock,
  IconRocket,
} from "@tabler/icons-react";

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

// Generic coming soon page — use this for any unlinked nav item
const ComingSoonPage = ({ title, description, icon }: ComingSoonPageProps) => (
  <div className={styles.container}>
    <div className={styles.inner}>
      <div className={styles.icon_wrap}>
        {icon || <IconRocket size={36} strokeWidth={1.2} />}
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.badge}>
        <IconClock size={14} strokeWidth={1.5} />
        Coming soon
      </div>
    </div>
  </div>
);

// Pre-configured pages for each nav item
// Import whichever you need and drop into the relevant page.tsx

const AccountsPage = () => (
  <ComingSoonPage
    title="Accounts"
    description="Manage your live and demo trading accounts, track performance, and add new account types all from one place."
  />
);

const InvestRatingPage = () => (
  <ComingSoonPage
    title="Invest Rating"
    description="See performance scores and ratings for your investment portfolio, benchmarked against market indices."
  />
);

const PAMMRatingPage = () => (
  <ComingSoonPage
    title="PAMM Rating"
    description="Browse and compare PAMM fund managers by return, drawdown, and track record before allocating capital."
  />
);

const ChallengesPage = () => (
  <ComingSoonPage
    title="Challenges"
    description="Complete trading challenges to unlock account upgrades, increased leverage, and exclusive Farlo rewards."
  />
);

const StatusesPage = () => (
  <ComingSoonPage
    title="Statuses"
    description="Your trading status and tier on Farlo — view the benefits unlocked at your current level and what comes next."
  />
);

const InternalTransferPage = () => (
  <ComingSoonPage
    title="Internal Transfer"
    description="Move funds instantly between your Main, Trading, and Investing wallets with a full transfer history log."
  />
);

const PaymentsPage = () => (
  <ComingSoonPage
    title="Payments"
    description="View your full payment history, scheduled transfers, and manage your saved payment methods."
  />
);

const LocalPaymentsPage = () => (
  <ComingSoonPage
    title="Local Payments"
    description="Deposit and withdraw using local payment rails including Paystack, mobile money, and bank transfers in your currency."
  />
);

const PartnershipPage = () => (
  <ComingSoonPage
    title="Partnership"
    description="Refer clients, manage your introducing broker network, and track your commission earnings in real time."
  />
);

const DashboardsPage = () => (
  <ComingSoonPage
    title="Dashboards"
    description="Advanced analytics dashboards showing your combined trading and investing performance over time."
  />
);

const NewsPage = () => (
  <ComingSoonPage
    title="Market News"
    description="Stay informed with curated financial news, market commentary, and analysis relevant to your open positions."
  />
);

const TechnicalAnalysisPage = () => (
  <ComingSoonPage
    title="Technical Analysis"
    description="Access chart patterns, indicator signals, and analyst recommendations across your active instruments."
  />
);

const CalendarPage = () => (
  <ComingSoonPage
    title="Economic Calendar"
    description="Track upcoming economic events, earnings releases, and central bank decisions that could impact your positions."
  />
);

const ExportsPage = () => (
  <ComingSoonPage
    title="Exports"
    description="Download your trade history, statements, and tax reports in CSV or PDF format."
  />
);

const DownloadsPage = () => (
  <ComingSoonPage
    title="Downloads"
    description="Download the Farlo mobile app, MT5 desktop platform, and other trading tools."
  />
);

const AllBonusesPage = () => (
  <ComingSoonPage
    title="All Bonuses"
    description="Browse available deposit bonuses, referral rewards, and seasonal promotions on Farlo."
  />
);

const MyBonusesPage = () => (
  <ComingSoonPage
    title="My Bonuses"
    description="Track your active bonuses, progress toward rewards, and claim any pending incentives."
  />
);

const ContractSpecsPage = () => (
  <ComingSoonPage
    title="Contract Specifications"
    description="View detailed contract specs for all available instruments including spreads, leverage limits, and trading hours."
  />
);

export {
  ComingSoonPage,
  AccountsPage,
  InvestRatingPage,
  PAMMRatingPage,
  ChallengesPage,
  StatusesPage,
  InternalTransferPage,
  PaymentsPage,
  LocalPaymentsPage,
  PartnershipPage,
  DashboardsPage,
  NewsPage,
  TechnicalAnalysisPage,
  CalendarPage,
  ExportsPage,
  DownloadsPage,
  AllBonusesPage,
  MyBonusesPage,
  ContractSpecsPage,
};