import Link from "next/link";
import styles from "./styles.module.scss";
import { LogoText } from "@/assets/vectors/logo-text";
import { AppStore } from "@/assets/vectors/app-store";
import { PlayStore } from "@/assets/vectors/play-store";
import { TwitterLogo } from "@/assets/icons/twitter";
import { YoutubeLogo } from "@/assets/icons/youtube";
import { LinkedinLogo } from "@/assets/icons/linkedin";
import { FacebookLogo } from "@/assets/icons/facebook";
import { InstagramLogo } from "@/assets/icons/instagram";
import { ROUTES } from "@/utils/routes";

const Footer = () => {
  const links = [
    {
      title: "Company",
      links: [
        {
          title: "About Farlo",
          path: ROUTES.about,
        },
        {
          title: "Farlo Careers",
          path: `${ROUTES.about}#careers`,
        },
        {
          title: "Contact us",
          path: ROUTES.contact,
        },
        {
          title: "Support",
          path: "",
        },
        {
          title: "Privacy Policy",
          path: ROUTES.privacy_policy,
        },
        {
          title: "Terms of Use",
          path: ROUTES.terms_of_use,
        },
        {
          title: "Legal",
          path: ROUTES.legal,
        },
      ],
    },
    {
      title: "Trading",
      links: [
        {
          title: "Forex",
          path: ROUTES.forex_trading,
        },
        {
          title: "Commodities",
          path: ROUTES.commodities_trading,
        },
        {
          title: "Stocks",
          path: ROUTES.stocks_trading,
        },
        {
          title: "Indices",
          path: ROUTES.indices_trading,
        },
        {
          title: "Crypto",
          path: ROUTES.crypto_trading,
        },
        {
          title: "Conditions",
          path: ROUTES.conditions,
        },
        {
          title: "Assisted trading",
          path: ROUTES.assisted_trading,
        },
      ],
    },
    {
      type: "dual",
      sublinks: [
        {
          title: "Platforms",
          links: [
            {
              title: "MT5 Desktop",
              path: ROUTES.platforms_desktop,
            },
            {
              title: "MT5 Mobile",
              path: ROUTES.platforms_mobile,
            },
            {
              title: "MT5 Web",
              path: ROUTES.platforms_web,
            },
          ],
        },
        {
          title: "Partnerships",
          links: [
            {
              title: "MAM Account",
              path: ROUTES.partnerships_mam_pamm,
            },
            {
              title: "PAMM Account",
              path: ROUTES.partnerships_mam_pamm,
            },
            {
              title: "Introducing Broker",
              path: ROUTES.partnerships_ib,
            },
          ],
        },
      ],
    },
    {
      title: "Accounts",
      links: [
        {
          title: "Account Comparison",
          path: ROUTES.accounts_comparison,
        },
        {
          title: "Demo Account",
          path: ROUTES.accounts_demo,
        },
        {
          title: "Live Account",
          path: ROUTES.accounts_live,
        },
        {
          title: "Deposits & Withdrawals",
          path: ROUTES.tools_deposits,
        },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          title: "Economic Calender",
          path: ROUTES.tools_calendar,
        },
        {
          title: "Trading Calculator",
          path: ROUTES.tools_calculator,
        },
        {
          title: "Live Quotes",
          path: ROUTES.tools_quotes,
        },
      ],
    },
    {
      title: "Additional Links",
      links: [
        {
          title: "FAQs",
          path: "",
        },
        {
          title: "Education",
          path: "",
        },
        {
          title: "Blog",
          path: ROUTES.blog,
        },
        {
          title: "Deposit Bonus",
          path: ROUTES.partnerships_deposit_bonus,
        },
        {
          title: "Refer a Friend",
          path: ROUTES.partnerships_referral,
        },
      ],
    },
  ];
  return (
    <>
      <footer className={styles.footerBg}>
        <section className={`layout-container ${styles.footer}`}>
          <div className={styles.sec1}>
            {links.map((item) =>
              item.type === "dual" ? (
                <div key={item.title} className={styles.linkSubWrap}>
                  {item.sublinks.map((item) => (
                    <div className={styles.linkWrap}>
                      <p>{item.title}</p>
                      {item.links?.map((link) => (
                        <Link href={link.path}>{link.title}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div key={item.title} className={styles.linkWrap}>
                  <p>{item.title}</p>
                  {item.links?.map((link) => (
                    <Link href={link.path}>{link.title}</Link>
                  ))}
                </div>
              )
            )}
          </div>
          <div className={styles.sec2}>
            <LogoText />
            <div>
              <div className={styles.sec2__item}>
                <p>Follow us</p>
                <div className={styles.socials} >
                  <a
                    href={"https://x.com/farloFx_global"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterLogo />
                  </a>
                  <YoutubeLogo />
                  <LinkedinLogo />
                  <FacebookLogo />
                  <a
                    href="https://www.instagram.com/farlofx_global?igsh=NGsxcjBwZGF2bjZh&utm_source=qr"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramLogo />
                  </a>
                </div>
              </div>
              <div className={styles.sec2__item}>
                <p>Get the app</p>
                <div>
                  <AppStore /> <PlayStore />
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export { Footer };
