
"use client";
import styles from "./styles.module.scss";
import { Button } from "@/components";
import { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import {
  IconArrowDownLeft,
  IconArrowRight,
  IconBusinessplan,
  IconChartBar,
  IconChevronRight,
  IconCoinBitcoin,
  IconRefresh,
  IconShieldCheck,
  IconTrendingUp,
  IconX,
} from "@tabler/icons-react";
import { ComingSoonModal, DestinationModal, TransferModal } from "@/components/modal/overview";



const OverviewUI = () => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferConfig, setTransferConfig] = useState<{
    from: "main" | "trading" | "investing";
    to: "main" | "trading" | "investing";
  }>({ from: "main", to: "trading" });
  const [comingSoon, setComingSoon] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [activeSource, setActiveSource] = useState<"main" | "trading" | "investing" | null>(null);

  const {
    mode,
    wallets,
    transactions,
    kycStatus,
    transfer,
  } = useDashboard();

  const recentActivity = transactions.slice(0, 5);

  const openTransfer = (
    from: "main" | "trading" | "investing",
    to: "main" | "trading" | "investing"
  ) => {
    setTransferConfig({ from, to });
    setShowTransferModal(true);
  };

  const handleActionClick = (source: "main" | "trading" | "investing") => {
    setActiveSource(source);
    setShowDestinationModal(true);
  };

  const selectDestination = (to: "main" | "trading" | "investing") => {
    if (activeSource) {
      setTransferConfig({ from: activeSource, to });
      setShowDestinationModal(false);
      setShowTransferModal(true);
    }
  };



  return (
    <>
      <ComingSoonModal
        isOpen={comingSoon}
        onClose={() => setComingSoon(false)}
      />

      <DestinationModal
        isOpen={showDestinationModal}
        onClose={() => setShowDestinationModal(false)}
        source={activeSource}
        onSelect={selectDestination}
      />
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        from={transferConfig.from}
        to={transferConfig.to}
        transfer={transfer}
        wallets={wallets}
      />

      <section className={styles.body}>
        {kycStatus === "pending" && (
          <div className={styles.kyc_banner}>
            <div className={styles.kyc_icon}>
              <IconShieldCheck size={20} strokeWidth={1.5} />
            </div>
            <div className={styles.kyc_text}>
              <p className={styles.kyc_title}>
                Complete your identity verification
              </p>
              <p className={styles.kyc_sub}>
                Verify your identity to unlock full access
              </p>
            </div>
            <Button
              variant="fill-red"
              className={styles.kyc_btn}
              onClick={() => (window.location.href = "/kyc")}
            >
              Verify Now
            </Button>
          </div>
        )}

        {kycStatus === "submitted" && (
          <div className={`${styles.kyc_banner} ${styles.kyc_banner_pending}`}>
            <div className={`${styles.kyc_icon} ${styles.kyc_icon_pending}`}>
              <IconShieldCheck size={20} strokeWidth={1.5} />
            </div>
            <div className={styles.kyc_text}>
              <p className={styles.kyc_title}>Verification under review</p>
              <p className={styles.kyc_sub}>
                We&apos;ll notify you within 24–48 hours
              </p>
            </div>
            <span className={styles.kyc_review_badge}>Under Review</span>
          </div>
        )}

        <div className={styles.greeting}>
          <h1 className={styles.title}>Welcome back, John</h1>
          <p className={styles.subtitle}>
            {mode === "trading"
              ? "Monitor your positions and manage your trading activity."
              : "Track your portfolio and manage your investments."}
          </p>
        </div>

        <section className={styles.wallets_grid}>
          <div className={`${styles.wallet_card} ${styles.wallet_parent}`}>
            <div className={styles.wallet_label}>
              <span className={`${styles.wallet_dot} ${styles.dot_parent}`} />
              Main Wallet
            </div>
            <h2 className={styles.wallet_balance}>
              $
              {wallets.main.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
              <span className={styles.wallet_currency}>USD</span>
            </h2>
            <p className={styles.wallet_note}>Available · Not deployed</p>
            <div className={styles.wallet_actions}>
              <button
                className={styles.wallet_btn_light}
                onClick={() => (window.location.href = "/deposit")}
              >
                Deposit
              </button>
              <button className={styles.wallet_btn_light} onClick={() => (window.location.href = "/withdraw")}>Withdraw</button>
              <button
                className={styles.wallet_btn_light}
                onClick={() => handleActionClick("main")}
              >
                Transfer
              </button>
            </div>
          </div>

          <div className={`${styles.wallet_card} ${styles.wallet_trading}`}>
            <div className={styles.wallet_label}>
              <span className={`${styles.wallet_dot} ${styles.dot_trading}`} />
              Trading Wallet
            </div>
            <h2 className={styles.wallet_balance}>
              $
              {wallets.trading.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
              <span className={styles.wallet_currency}>USD</span>
            </h2>
            <p className={`${styles.wallet_change} ${styles.negative}`}>
              ↓ $120.00 today
            </p>
            <div className={styles.wallet_actions}>
              <button
                className={styles.wallet_btn_outline}
                onClick={() => (window.location.href = "/deposit")}
              >
                Deposit
              </button>

              <button
                className={styles.wallet_btn_outline}
                onClick={() => handleActionClick("trading")}
              >
                Move Funds
              </button>
            </div>
          </div>

          <div className={`${styles.wallet_card} ${styles.wallet_investing}`}>
            <div className={styles.wallet_label}>
              <span
                className={`${styles.wallet_dot} ${styles.dot_investing}`}
              />
              Investing Wallet
            </div>
            <h2 className={styles.wallet_balance}>
              $
              {wallets.investing.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
              <span className={styles.wallet_currency}>USD</span>
            </h2>
            <p className={`${styles.wallet_change} ${styles.positive}`}>
              ↑ $240.00 today
            </p>
            <div className={styles.wallet_actions}>
              <button
                className={styles.wallet_btn_outline}
                onClick={() => (window.location.href = "/deposit")}
              >
                Deposit
              </button>
              <button
                className={styles.wallet_btn_outline}
                onClick={() => handleActionClick("investing")}
              >
                Move Funds
              </button>
            </div>
          </div>
        </section>

        {mode === "trading" ? (
          <TradingModeSection onComingSoon={() => setComingSoon(true)} />
        ) : (
          <InvestingModeSection onComingSoon={() => setComingSoon(true)} />
        )}

        <div className={styles.bottom_grid}>
          <div className={styles.card}>
            <div className={styles.card_header}>
              <h3 className={styles.card_title}>Recent Activity</h3>
              <button
                className={styles.card_action}
                onClick={() => (window.location.href = "/transactions")}
              >
                View all <IconChevronRight size={14} />
              </button>
            </div>
            {recentActivity.length === 0 ? (
              <EmptyState
                icon={<IconChartBar size={28} strokeWidth={1.2} />}
                title="No activity yet"
                sub="Your transaction history will appear here once you make your first deposit."
              />
            ) : (
              <div className={styles.activity_list}>
                {recentActivity.map((tx) => (
                  <div key={tx.id} className={styles.activity_item}>
                    <div
                      className={`${styles.activity_icon} ${tx.type === "deposit" || tx.type === "transfer_in"
                        ? styles.icon_deposit
                        : tx.type === "transfer_out" ||
                          tx.type === "withdrawal"
                          ? styles.icon_transfer
                          : styles.icon_trade
                        }`}
                    >
                      {tx.type === "deposit" || tx.type === "transfer_in" ? (
                        <IconArrowDownLeft size={16} strokeWidth={1.5} />
                      ) : tx.type === "transfer_out" ||
                        tx.type === "withdrawal" ? (
                        <IconRefresh size={16} strokeWidth={1.5} />
                      ) : (
                        <IconChartBar size={16} strokeWidth={1.5} />
                      )}
                    </div>
                    <div className={styles.activity_info}>
                      <p className={styles.activity_title}>{tx.label}</p>
                      <p className={styles.activity_time}>
                        {new Date(tx.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p
                      className={`${styles.activity_amount} ${tx.type === "deposit" || tx.type === "transfer_in"
                        ? styles.positive
                        : tx.type === "transfer_out"
                          ? styles.neutral
                          : tx.amount > 0
                            ? styles.positive
                            : styles.negative
                        }`}
                    >
                      {tx.type === "deposit" || tx.type === "transfer_in"
                        ? "+"
                        : tx.type === "transfer_out"
                          ? ""
                          : tx.amount > 0
                            ? "+"
                            : "-"}
                      ${Math.abs(tx.amount).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={[styles.card_header, styles.product_header].join("")}>
              <h3 className={[styles.card_title, styles.product_title].join("")}>Explore Products</h3>
              <p className={styles.product_description}>
                Discover a range of trading and investment products tailored for
                every trader.
              </p>
            </div>
            <div className={styles.products_cards}>
              <div
                role="button"
                className={`${styles.product_card} ${styles.product_card_red}`}
                onClick={() =>
                  window.open("https://accounts.farlofx.com/", "_blank")
                }
              >
                <div className={styles.product_card_icon}>
                  <IconTrendingUp size={22} strokeWidth={1.5} />
                </div>
                <div className={styles.product_card_content}>
                  <h3 className={styles.product_card_title}>
                    CFDs &amp; Social Trading
                  </h3>
                  <p className={styles.product_card_desc}>
                    Trade global markets. Copy top traders or manage portfolios
                    with PAMM.
                  </p>
                </div>
                <IconArrowRight size={16} className={styles.product_arrow} />
              </div>

              <div
                role="button"
                className={`${styles.product_card} ${styles.product_card_blue}`}
                onClick={() => setComingSoon(true)}
              >
                <div className={styles.product_card_icon}>
                  <IconCoinBitcoin size={22} strokeWidth={1.5} />
                </div>
                <div className={styles.product_card_content}>
                  <h3 className={styles.product_card_title}>
                    U.S. Futures Access
                  </h3>
                  <p className={styles.product_card_desc}>
                    CME micro futures in S&amp;P, Bitcoin, and FX.
                  </p>
                </div>
                <span className={styles.coming_soon_badge}>Soon</span>
              </div>

              <div
                role="button"
                className={`${styles.product_card} ${styles.product_card_green}`}
                onClick={() => setComingSoon(true)}
              >
                <div className={styles.product_card_icon}>
                  <IconBusinessplan size={22} strokeWidth={1.5} />
                </div>
                <div className={styles.product_card_content}>
                  <h3 className={styles.product_card_title}>
                    U.S. Equities &amp; Options
                  </h3>
                  <p className={styles.product_card_desc}>
                    Trade U.S. stocks, ETFs, and listed options.
                  </p>
                </div>
                <span className={styles.coming_soon_badge}>Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const TradingModeSection = ({
  onComingSoon,
}: {
  onComingSoon: () => void;
}) => (
  <section className={styles.mode_section}>
    <div className={styles.mode_section_header}>
      <div className={`${styles.mode_badge} ${styles.mode_badge_trading}`}>
        Trading Mode
      </div>
    </div>

    <div className={styles.stats_row}>
      <div className={styles.stat_card}>
        <p className={styles.stat_label}>Total P&amp;L</p>
        <h3 className={`${styles.stat_value} ${styles.positive}`}>
          +$1,240.50
        </h3>
        <span className={`${styles.stat_badge} ${styles.badge_up}`}>
          ↑ 8.4% all time
        </span>
      </div>
      <div className={styles.stat_card}>
        <p className={styles.stat_label}>Open Positions</p>
        <h3 className={styles.stat_value}>7</h3>
        <span className={`${styles.stat_badge} ${styles.badge_up}`}>
          3 in profit
        </span>
      </div>
      <div className={styles.stat_card}>
        <p className={styles.stat_label}>Today&apos;s P&amp;L</p>
        <h3 className={`${styles.stat_value} ${styles.negative}`}>-$120.00</h3>
        <span className={`${styles.stat_badge} ${styles.badge_down}`}>
          ↓ 2.3%
        </span>
      </div>
    </div>

    <div className={styles.positions_card}>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>Open Positions</h3>
        <button className={styles.card_action} onClick={onComingSoon}>
          View all <IconChevronRight size={14} />
        </button>
      </div>
      <div className={styles.positions_list}>
        {MOCK_POSITIONS.map((p) => (
          <div key={p.id} className={styles.position_item}>
            <div className={styles.position_pair}>
              <p className={styles.position_symbol}>{p.symbol}</p>
              <span
                className={`${styles.position_type} ${p.type === "BUY" ? styles.type_buy : styles.type_sell
                  }`}
              >
                {p.type}
              </span>
            </div>
            <div className={styles.position_details}>
              <p className={styles.position_detail}>Size: {p.size}</p>
              <p className={styles.position_detail}>Entry: {p.entry}</p>
              <p className={styles.position_detail}>Current: {p.current}</p>
            </div>
            <p
              className={`${styles.position_pnl} ${p.pnl >= 0 ? styles.positive : styles.negative
                }`}
            >
              {p.pnl >= 0 ? "+" : ""}${p.pnl.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MOCK_POSITIONS = [
  {
    id: 1,
    symbol: "EUR/USD",
    type: "BUY",
    size: "0.10",
    entry: "1.0842",
    current: "1.0871",
    pnl: 29.0,
  },
  {
    id: 2,
    symbol: "GBP/USD",
    type: "SELL",
    size: "0.05",
    entry: "1.2654",
    current: "1.2690",
    pnl: -18.0,
  },
  {
    id: 3,
    symbol: "XAU/USD",
    type: "BUY",
    size: "0.01",
    entry: "2010.50",
    current: "2024.30",
    pnl: 13.8,
  },
];


const InvestingModeSection = ({
  onComingSoon,
}: {
  onComingSoon: () => void;
}) => (
  <section className={styles.mode_section}>
    <div className={styles.mode_section_header}>
      <div className={`${styles.mode_badge} ${styles.mode_badge_investing}`}>
        Investing Mode
      </div>
    </div>

    <div className={styles.stats_row}>
      <div className={styles.stat_card}>
        <p className={styles.stat_label}>Portfolio Value</p>
        <h3 className={styles.stat_value}>$3,800.00</h3>
        <span className={`${styles.stat_badge} ${styles.badge_up}`}>
          ↑ 6.3% this month
        </span>
      </div>
      <div className={styles.stat_card}>
        <p className={styles.stat_label}>Total Return</p>
        <h3 className={`${styles.stat_value} ${styles.positive}`}>+$227.80</h3>
        <span className={`${styles.stat_badge} ${styles.badge_up}`}>
          ↑ 6.37%
        </span>
      </div>
      <div className={styles.stat_card}>
        <p className={styles.stat_label}>Assets Held</p>
        <h3 className={styles.stat_value}>4</h3>
        <span className={`${styles.stat_badge} ${styles.badge_up}`}>
          All performing
        </span>
      </div>
    </div>

    <div className={styles.positions_card}>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>Portfolio Holdings</h3>
        <button className={styles.card_action} onClick={onComingSoon}>
          View all <IconChevronRight size={14} />
        </button>
      </div>
      <div className={styles.holdings_list}>
        {MOCK_HOLDINGS.map((h) => (
          <div key={h.id} className={styles.holding_item}>
            <div
              className={styles.holding_icon}
              style={{ background: h.color + "18", color: h.color }}
            >
              {h.symbol[0]}
            </div>
            <div className={styles.holding_info}>
              <p className={styles.holding_name}>{h.name}</p>
              <p className={styles.holding_symbol}>
                {h.symbol} · {h.shares} shares
              </p>
            </div>
            <div className={styles.holding_right}>
              <p className={styles.holding_value}>${h.value.toFixed(2)}</p>
              <p
                className={`${styles.holding_change} ${h.change >= 0 ? styles.positive : styles.negative
                  }`}
              >
                {h.change >= 0 ? "+" : ""}
                {h.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MOCK_HOLDINGS = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: "2",
    value: 340.0,
    change: 1.2,
    color: "#378add",
  },
  {
    id: 2,
    symbol: "NVDA",
    name: "Nvidia Corp.",
    shares: "1",
    value: 890.5,
    change: 3.4,
    color: "#1a9e75",
  },
  {
    id: 3,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    shares: "1",
    value: 415.2,
    change: -0.8,
    color: "#CB1A36",
  },
  {
    id: 4,
    symbol: "SPY",
    name: "S&P 500 ETF",
    shares: "3",
    value: 1540.0,
    change: 0.5,
    color: "#b45309",
  },
];


const EmptyState = ({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) => (
  <div className={styles.empty_state}>
    <div className={styles.empty_icon}>{icon}</div>
    <p className={styles.empty_title}>{title}</p>
    <p className={styles.empty_sub}>{sub}</p>
  </div>
);


export { OverviewUI };