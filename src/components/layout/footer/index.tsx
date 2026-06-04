// import Link from "next/link";
// import styles from "./styles.module.scss";
// import { AppStore } from "@/assets/vectors/app-store";
// import { PlayStore } from "@/assets/vectors/play-store";
// import { TwitterLogo } from "@/assets/icons/twitter";
// import { YoutubeLogo } from "@/assets/icons/youtube";
// import { LinkedinLogo } from "@/assets/icons/linkedin";
// import { InstagramLogo } from "@/assets/icons/instagram";
// import { ROUTES } from "@/utils/routes";
// import { NewLogoText } from "@/assets/vectors/new-logo-text";

// const Footer = () => {
//   const links = [
//     {
//       title: "Farlo",
//       links: [
//         {
//           title: "About Us",
//           path: ROUTES.about,
//         },
//         {
//           title: "Careers",
//           path: `${ROUTES.about}#careers`,
//         },
//         {
//           title: "Contact",
//           path: ROUTES.contact,
//         },
//         {
//           title: "Blog",
//           path: "",
//         },
//         {
//           title: "hello@farlo.io",
//           path: "mailto:hello@farlo.io",
//         },
//         // {
//         //   title: "Terms of Use",
//         //   path: ROUTES.terms_of_use,
//         // },
//         // {
//         //   title: "Legal",
//         //   path: ROUTES.legal,
//         // },
//       ],
//     },
//     {
//       title: "Trading",
//       links: [
//         {
//           title: "Forex",
//           path: ROUTES.forex_trading,
//         },
//         {
//           title: "Commodities",
//           path: ROUTES.commodities_trading,
//         },
//         {
//           title: "Stocks",
//           path: ROUTES.stocks_trading,
//         },
//         {
//           title: "Indices",
//           path: ROUTES.indices_trading,
//         },
//         {
//           title: "Crypto",
//           path: ROUTES.crypto_trading,
//         },
//         {
//           title: "Conditions",
//           path: ROUTES.conditions,
//         },
//         {
//           title: "Copy trading",
//           path: ROUTES.assisted_trading,
//         },
//       ],
//     },
//     {
//       type: "dual",
//       sublinks: [

//         // {
//         //   title: "Partnerships",
//         //   links: [
//         //     {
//         //       title: "MAM Account",
//         //       path: ROUTES.partnerships_mam_pamm,
//         //     },
//         //     {
//         //       title: "PAMM Account",
//         //       path: ROUTES.partnerships_mam_pamm,
//         //     },
//         //     {
//         //       title: "Introducing Broker",
//         //       path: ROUTES.partnerships_ib,
//         //     },
//         //   ],
//         // },
//         {
//           title: "Investing",
//           links: [
//             {
//               title: "Investing Mode",
//               path: "",
//             },
//             {
//               title: "US Stocks",
//               path: "",
//             },
//             {
//               title: "ETFs",
//               path: "",
//             },
//             {
//               title: "Fractional Shares",
//               path: "",
//             },
//           ],
//         },
//         {
//           title: "Platforms",
//           links: [
//             {
//               title: "MT5 Desktop",
//               path: ROUTES.platforms_desktop,
//             },
//             {
//               title: "MT5 Mobile",
//               path: ROUTES.platforms_mobile,
//             },
//             {
//               title: "MT5 Web",
//               path: ROUTES.platforms_web,
//             },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Accounts",
//       links: [
//         {
//           title: "Account Comparison",
//           path: ROUTES.accounts_comparison,
//         },
//         {
//           title: "Demo Account",
//           path: ROUTES.accounts_demo,
//         },
//         {
//           title: "Live Account",
//           path: ROUTES.accounts_live,
//         },
//         {
//           title: "Deposits & Withdrawals",
//           path: ROUTES.tools_deposits,
//         },
//       ],
//     },
//     {
//       title: "Resources",
//       links: [
//         {
//           title: "Educate a friend",
//           path: "",
//         },
//         {
//           title: "Economic Calender",
//           path: ROUTES.tools_calendar,
//         },
//         {
//           title: "Trading Calculator",
//           path: ROUTES.tools_calculator,
//         },
//         {
//           title: "Live Quotes",
//           path: ROUTES.tools_quotes,
//         },
//         {
//           title: "Refer a friend",
//           path: "",
//         },
//       ],
//     },
//     // {
//     //   title: "Additional Links",
//     //   links: [
//     //     {
//     //       title: "FAQs",
//     //       path: "",
//     //     },
//     //     {
//     //       title: "Education",
//     //       path: "",
//     //     },
//     //     {
//     //       title: "Blog",
//     //       path: ROUTES.blog,
//     //     },
//     //     {
//     //       title: "Deposit Bonus",
//     //       path: ROUTES.partnerships_deposit_bonus,
//     //     },
//     //     {
//     //       title: "Refer a Friend",
//     //       path: ROUTES.partnerships_referral,
//     //     },
//     //   ],
//     // },
//   ];
//   return (
//     <>
//       <footer className={styles.footerBg}>
//         <section className={`layout-container ${styles.footer}`}>
//           <div className={styles.label}>Building the platform emerging markets deserve.</div>
//           <div className={styles.sec1}>
//             {links.map((item) =>
//               item.type === "dual" ? (
//                 <div key={item.title} className={styles.linkSubWrap}>
//                   {item.sublinks.map((item) => (
//                     <div className={styles.linkWrap}>
//                       <p>{item.title}</p>
//                       {item.links?.map((link) => (
//                         <Link href={link.path}>{link.title}</Link>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div key={item.title} className={styles.linkWrap}>
//                   <p>{item.title}</p>
//                   {item.links?.map((link) => (
//                     <Link href={link.path}>{link.title}</Link>
//                   ))}
//                 </div>
//               )
//             )}
//           </div>
//           <div className={styles.sec2}>
//             <NewLogoText />
//             <div>
//               <div className={styles.sec2__item}>
//                 <p>Follow us</p>
//                 <div className={styles.socials} >
//                   <a
//                     href={"https://x.com/farloFx_global"}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     <TwitterLogo />
//                   </a>
//                   <YoutubeLogo />
//                   <LinkedinLogo />
//                   {/* <FacebookLogo /> */}
//                   <a
//                     href="https://www.instagram.com/farlofx_global?igsh=NGsxcjBwZGF2bjZh&utm_source=qr"
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     <InstagramLogo />
//                   </a>
//                 </div>
//               </div>
//               <div className={styles.sec2__item}>
//                 <p>Get the app</p>
//                 <div>
//                   <AppStore /> <PlayStore />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </footer>
//     </>
//   );
// };

// export { Footer };


import Link from "next/link";
import styles from "./styles.module.scss";
import { AppStore } from "@/assets/vectors/app-store";
import { PlayStore } from "@/assets/vectors/play-store";
import { TwitterLogo } from "@/assets/icons/twitter";
import { YoutubeLogo } from "@/assets/icons/youtube";
import { LinkedinLogo } from "@/assets/icons/linkedin";
import { FacebookLogo } from "@/assets/icons/facebook";
import { InstagramLogo } from "@/assets/icons/instagram";
import { ROUTES } from "@/utils/routes";
import { NewLogoText } from "@/assets/vectors/new-logo-text";
import { IoIosWarning } from "react-icons/io";
import { IoInformationCircleSharp } from "react-icons/io5";


const Footer = () => {
  return (
    <footer className={styles.footerBg}>
      <section className={`layout-container ${styles.footer}`}>

        <div className={styles.legal}>
          <p className={styles.legal__company}>
            <strong>Farlo Markets Ltd</strong>&nbsp; is an international business company incorporated in Saint Lucia
            under registration number &nbsp;<strong>2025-00057</strong>. The company is duly registered in accordance
            with the laws of Saint Lucia. Its registered office is located at Top Floor,
            Rodney Court Building, Rodney Bay, Gros-Islet, Saint Lucia LC01 101.
          </p>

          <div className={styles.legal__notices}>
            <div className={`${styles.legal__notice} ${styles.legal__notice_warning}`}>
              <div className={styles.legal__noticeHeader}>
                <IoIosWarning color="#ca8a04" size={15} />
                <span className={styles.legal__noticeLabel}>Risk Warning</span>
              </div>
              <p>Trading Contracts for Difference (CFDs) and other leveraged products involve a high level of risk and may not be suitable for all traders and investors. CFDs are complex instruments and the use of leverage magnifies both potential profits and losses, meaning you could incur losses greater than your initial deposit. You should carefully consider your investment objectives, level of experience, and risk appetite before deciding to trade CFDs. Ensure you fully understand the risks involved and seek independent financial advice if necessary.</p>
            </div>

            <div className={`${styles.legal__notice} ${styles.legal__notice_info}`}>
              <div className={styles.legal__noticeHeader}>
                <IoInformationCircleSharp color="#4D8DFF" size={15} />
                <span className={styles.legal__noticeLabel}>Disclaimer</span>
              </div>
              <p>Farlo Markets Ltd does not offer services to the United States of America, Pakistan, Iraq, Iran, Uzbekistan, or any other jurisdiction listed on the FATF &ldquo;blacklist&rdquo;, and the major global sanctions lists. It is also not intended for distribution or use in any jurisdiction where such distribution or use would violate local laws or regulations.</p>
            </div>
          </div>

          <p className={styles.legal__plain}>
            The information provided on this website does not constitute investment advice,
            a recommendation, or a solicitation to engage in any investment activity.
            By accessing this website, users acknowledge that their interaction with its content
            is personal and voluntary, and undertaken at their own discretion.
            The content does not constitute an offer or invitation to enter into any contractual
            agreement or to acquire financial services or products provided by Farlo Markets Ltd.
            All rights are reserved. Any possible action by a non-authorized person concerning intellectual property objects is prohibited.
          </p>

          <div className={styles.legal__strip}>
            <div className={styles.legal__links}>
              <Link href={ROUTES.privacy_policy}>Privacy Policy</Link>
              <Link href={ROUTES.terms_of_use}>Terms of Use</Link>
              <Link href={ROUTES.legal}>Legal</Link>
            </div>
            <span className={styles.legal__copy}>
              Copyright &copy; 2026 Farlo. All rights reserved.
            </span>
          </div>
        </div>

        <div className={styles.top}>
          <NewLogoText />
          <div className={styles.top__right}>
            <div className={styles.top__item}>
              <p>Follow us</p>
              <div className={styles.socials}>

                <a href="https://x.com/farloFx_global"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterLogo />
                </a>
                <YoutubeLogo />
                <LinkedinLogo />
                <FacebookLogo />

                <a href="https://www.instagram.com/farlofx_global?igsh=NGsxcjBwZGF2bjZh&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramLogo />
                </a>
              </div>
            </div>
            <div className={styles.top__item}>
              <p>Get the app</p>
              <div>
                <AppStore /> <PlayStore />
              </div>
            </div>
          </div>
        </div>


      </section >
    </footer >
  );
};

export { Footer };
