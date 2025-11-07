import { LogoBlack } from "@/assets/vectors";
import styles from "./styles.module.scss";
import { Button } from "@/components";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useState } from "react";
import {
  IconAnalyze,
  IconArrowLeft,
  IconAward,
  IconBusinessplan,
  IconCalendar,
  IconChartArcs,
  IconCoinBitcoin,
  IconContract,
  IconFileDownload,
  IconFileExport,
  IconGraph,
  IconHome,
  IconLockDollar,
  IconLogout,
  IconMenu,
  IconMoneybag,
  IconMoneybagMove,
  IconMoneybagMoveBack,
  IconNews,
  IconSparkles,
  IconTransfer,
  IconTransferIn,
  IconTrendingUp,
  IconUserDollar,
  IconUsers,
  IconWallet,
  IconX,
} from "@tabler/icons-react";

const OverviewUI = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [showCFDs, setShowCFDs] = useState(false);

  const { isMobile } = useDeviceSize(900);

  const handleCFDClick = () => {
    // Logic to navigate to the CFDs & Social Trading section
    // window.location.href = "/overview#accounts";
    // setShowCFDs(true);
    window.open("https://accounts.farlofx.com/", "_blank");
  };

  const handleComingSoon = () => {
    setComingSoon(true);
  };

  return (
    <>
      <ComingSoonModal
        isOpen={comingSoon}
        onClose={() => setComingSoon(false)}
      />
      <div className={styles.container}>
        {(isMobile && showSidebar) || !isMobile ? (
          <aside className={`hide-scrollbar ${styles.sidebar}`}>
            <LogoBlack className={styles.logo} />

            <nav className={styles.nav}>
              <p>OVERVIEW</p>
              <a href="/overview">
                <IconWallet size={20} strokeWidth={1.5} /> Wallets
              </a>
              <a href="/overview">
                <IconHome size={20} strokeWidth={1.5} /> Accounts
              </a>
              <a href="/overview">
                <IconGraph size={20} strokeWidth={1.5} /> Invest rating
              </a>
              <a href="/overview">
                <IconGraph size={20} strokeWidth={1.5} /> PAMM rating
              </a>
              <a href="/overview">
                <IconAward size={20} strokeWidth={1.5} /> Challenges
              </a>
              <a href="/overview">
                <IconSparkles size={20} strokeWidth={1.5} /> Statuses
              </a>
            </nav>

            <nav className={styles.nav}>
              <p>FINANCES</p>
              <a href="/overview">
                <IconMoneybagMove size={20} strokeWidth={1.5} /> Deposit
              </a>
              <a href="/overview">
                <IconTransfer size={20} strokeWidth={1.5} /> Internal transfer
              </a>
              <a href="/overview">
                <IconMoneybagMoveBack size={20} strokeWidth={1.5} /> Withdraw
              </a>
              <a href="/overview">
                <IconMoneybag size={20} strokeWidth={1.5} /> Payments
              </a>
              <a href="/overview">
                <IconTransferIn size={20} strokeWidth={1.5} /> Local payments
              </a>
            </nav>

            <nav className={styles.nav}>
              <p>PARTNERSHIP</p>
              <a href="/overview">
                <IconUsers size={20} strokeWidth={1.5} /> Partnership
              </a>
              <a href="/overview">
                <IconChartArcs size={20} strokeWidth={1.5} /> Dashboards
              </a>
            </nav>

            <nav className={styles.nav}>
              <p>ARTICLES</p>
              <a href="/overview">
                <IconNews size={20} strokeWidth={1.5} /> News
              </a>
              <a href="/overview">
                <IconAnalyze size={20} strokeWidth={1.5} /> Technical analysis
              </a>
              <a href="/overview">
                <IconCalendar size={20} strokeWidth={1.5} /> Calendar
              </a>
            </nav>

            <nav className={styles.nav}>
              <p>FILES</p>
              <a href="/overview">
                <IconFileExport size={20} strokeWidth={1.5} /> Exports
              </a>
              <a href="/overview">
                <IconFileDownload size={20} strokeWidth={1.5} /> Downloads
              </a>
            </nav>

            <nav className={styles.nav}>
              <p>BONUSES</p>
              <a href="/overview">
                {" "}
                <IconLockDollar size={20} strokeWidth={1.5} /> All bonuses
              </a>
              <a href="/overview">
                {" "}
                <IconUserDollar size={20} strokeWidth={1.5} /> My bonuses
              </a>
            </nav>

            <nav className={styles.nav}>
              <p>INFO</p>
              <a href="/overview">
                <IconContract size={20} strokeWidth={1.5} /> Contract
                specifications
              </a>
            </nav>

            <a className={styles.signout} href="/">
              <IconLogout /> Sign out
            </a>
          </aside>
        ) : null}
        <header className={styles.header}>
          <div className={styles.mobile_header}>
            <LogoBlack className={styles.logo} />
            <button onClick={() => setShowSidebar((prev) => !prev)}>
              {!showSidebar ? <IconMenu /> : <IconX />}
            </button>
          </div>
          <div className={styles.header_content}>
            <p className={styles.page_title}>Accounts</p>
            <div className={styles.profile}>
              <div className={styles.avatar}>JD</div>
              <div className={styles.details}>
                <p className={styles.name}>John Doe</p>
                <p className={styles.email}>john.doe@yopmail.com</p>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.body}>
          {showCFDs ? (
            <>
              <button
                className={styles.back_btn}
                onClick={() => setShowCFDs(false)}
              >
                <IconArrowLeft /> Back
              </button>
              <div>
                <h1 className={styles.title}>Welcome back, John</h1>
                <p className={styles.subtitle}>
                  Here’s what’s happening with your account today.
                </p>
              </div>

              <section className={styles.cards}>
                <div className={styles.card}>
                  <p className={styles.card_title}>Total balance</p>
                  <h2 className={styles.card_amount}>$12,345.67</h2>
                </div>

                <div className={styles.card}>
                  <p className={styles.card_title}>Most profitable trade</p>
                  <h2 className={styles.card_amount}>$8,910.11</h2>
                </div>

                <div className={styles.card}>
                  <p className={styles.card_title}>
                    Number of trades this week
                  </p>
                  <h2 className={styles.card_amount}>50</h2>
                </div>
              </section>
              <section id="accounts" className={styles.accounts}>
                <div className={styles.accounts_header}>
                  <h2>Live accounts</h2>

                  <Button>Add account</Button>
                </div>
                <div className={styles.table_container}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Balance</th>
                        <th>Equity</th>
                        <th>Available to Withdraw</th>
                        <th>Leverage</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>MT5</td>
                        <td>$10,000.00</td>
                        <td>$10,000.00</td>
                        <td>$10,000.00</td>
                        <td>1:100</td>
                        <td className={styles.status_active}>Active</td>
                      </tr>

                      <tr>
                        <td>MT5</td>
                        <td>$2,345.67</td>
                        <td>$2,345.67</td>
                        <td>$2,345.67</td>
                        <td>1:100</td>
                        <td className={styles.status_inactive}>Inactive</td>
                      </tr>

                      <tr>
                        <td>MT5</td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                        <td>1:100</td>
                        <td className={styles.status_active}>Active</td>
                      </tr>
                      <tr>
                        <td>MT5</td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                        <td>1:100</td>
                        <td className={styles.status_active}>Active</td>
                      </tr>
                      <tr>
                        <td>MT5</td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                        <td>1:100</td>
                        <td className={styles.status_active}>Active</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className={styles.accounts}>
                <div className={styles.accounts_header}>
                  <h2>Demo accounts</h2>

                  <Button variant="outline-red">Add account</Button>
                </div>

                <div className={styles.empty_state}>
                  <p>You don't have any demo accounts</p>
                </div>
              </section>

              <section className={styles.accounts}>
                <div className={styles.accounts_header}>
                  <h2>Invest accounts</h2>

                  <Button variant="outline-red">Add account</Button>
                </div>

                <div className={styles.empty_state}>
                  <p>You don't have any invest accounts</p>
                </div>
              </section>

              <section className={styles.accounts}>
                <div className={styles.accounts_header}>
                  <h2>PAMM accounts</h2>

                  <Button variant="outline-red">Add account</Button>
                </div>

                <div className={styles.empty_state}>
                  <p>You don't have any PAMM accounts</p>
                </div>
              </section>
            </>
          ) : (
            <section className={styles.products_section}>
              <h2 className={styles.products_title}>Explore Our Products</h2>
              <p className={styles.products_description}>
                Discover a range of trading and investment products tailored for
                every trader.
              </p>
              <div className={styles.products_cards}>
                <div
                  role="button"
                  onClick={handleCFDClick}
                  className={styles.product_card}
                >
                  <h3 className={styles.product_card_title}>
                    <IconTrendingUp />
                    <span> CFDs &amp; Social Trading</span>
                  </h3>

                  <p className={styles.product_card_desc}>
                    Trade forex, gold, indices, and crypto CFDs.
                    <br />
                    Copy top traders or manage portfolios with PAMM.
                  </p>
                </div>
                <div
                  role="button"
                  onClick={handleComingSoon}
                  className={styles.product_card}
                >
                  <h3 className={styles.product_card_title}>
                    <IconCoinBitcoin />
                    Real U.S. Futures Access
                  </h3>
                  <p className={styles.product_card_desc}>
                    Access CME micro futures in S&amp;P, Bitcoin, and FX.
                    <br />
                    Built for scalable, institutional-grade trading.
                  </p>
                </div>
                <div
                  role="button"
                  onClick={handleComingSoon}
                  className={styles.product_card}
                >
                  <h3 className={styles.product_card_title}>
                    <IconBusinessplan />
                    U.S. Equities &amp; Options Access
                  </h3>
                  <p className={styles.product_card_desc}>
                    Trade U.S. stocks, ETFs, and listed options.
                    <br />
                    Fully regulated access to U.S. markets.
                  </p>
                </div>
              </div>
            </section>
          )}
        </section>
      </div>
    </>
  );
};

export { OverviewUI };

const ComingSoonModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h2>Coming Soon!</h2>
        <p>This feature is under development and will be available soon.</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};
