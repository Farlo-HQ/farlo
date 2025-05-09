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

const Footer = () => {
  const links = [
    {
      title: "Company",
      links: [
        {
          title: "About Farlo",
          path: "",
        },
        {
          title: "Farlo Careers",
          path: "",
        },
        {
          title: "Contact us",
          path: "",
        },
        {
          title: "Support",
          path: "",
        },
        {
          title: "Privacy Policy",
          path: "",
        },
        {
          title: "Terms of Use",
          path: "",
        },
        {
          title: "Legal",
          path: "",
        },
      ],
    },
    {
      title: "Trading",
      links: [
        {
          title: "Forex",
          path: "",
        },
        {
          title: "Commodities",
          path: "",
        },
        {
          title: "Stocks",
          path: "",
        },
        {
          title: "Indices",
          path: "",
        },
        {
          title: "Crypto",
          path: "",
        },
        {
          title: "TConditions",
          path: "",
        },
        {
          title: "Assisted trading",
          path: "",
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
              path: "",
            },
            {
              title: "MT5 Mobile",
              path: "",
            },
            {
              title: "MT5 Web",
              path: "",
            },
          ],
        },
        {
          title: "Partnerships",
          links: [
            {
              title: "MAM Account",
              path: "",
            },
            {
              title: "PAMM Account",
              path: "",
            },
            {
              title: "Introducing Broker",
              path: "",
            },
          ],
        },
      ],
    },
    {
      title: "Accounts",
      links: [
        {
          title: "Demo Account",
          path: "",
        },
        {
          title: "Demo Account",
          path: "",
        },
        {
          title: "Flex Leverage Account",
          path: "",
        },
        {
          title: "Payment Methods",
          path: "",
        },
        {
          title: "Withdrawal Methods",
          path: "",
        },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          title: "Economic Calender",
          path: "",
        },
        {
          title: "Trading Calculator",
          path: "",
        },
        {
          title: "Live Quotes",
          path: "",
        },
      ],
    },
    {
      title: "Additional Links",
      links: [
        {
          title: "EFAQs",
          path: "",
        },
        {
          title: "Education",
          path: "",
        },
        {
          title: "Blog",
          path: "",
        },
        {
          title: "Deposit Bonus",
          path: "",
        },
        {
          title: "Refer a Friend",
          path: "",
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
                <div>
                  <TwitterLogo />
                  <YoutubeLogo />
                  <LinkedinLogo />
                  <FacebookLogo />
                  <InstagramLogo />
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
