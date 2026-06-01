

// "use client"

// import { useLayoutEffect, useRef } from "react";
// import styles from "./styles.module.scss";
// import { ArrowRight } from "@/assets/icons/arrow-right";
// import { useRouter } from "next/navigation";
// import { ROUTES } from "@/utils/routes";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { TradingHeroGrid } from "@/assets/vectors/trading-hero-grid";
// import { TradingHeroGridMobile } from "@/assets/vectors/trading-hero-grid-mobile";
// import { LogoIconRed } from "@/assets/vectors/logo-icon-red";
// import { Bolt } from "@/assets/vectors/bolt";
// import { Account } from "@/assets/vectors/account";

// gsap.registerPlugin(ScrollTrigger);

// const tradingFeatures = ["Forex", "Indices", "Crypto CFDs", "Copy Trading", "Prop Trading"];
// const investingFeatures = ["US Stocks", "ETFs", "Options", "Fractional from $1"];

// const DualMode = () => {
//   const router = useRouter();
//   const wrapRef = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {

//       gsap.from(".dm-header", {
//         scrollTrigger: { trigger: ".dm-header", start: "top 88%" },
//         y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
//       });

//       gsap.from(".dm-hub", {
//         scrollTrigger: { trigger: ".dm-hub", start: "top 85%" },
//         scale: 0.85, opacity: 0, duration: 0.7, ease: "back.out(1.4)",
//       });

//       gsap.from(".dm-path-left, .dm-path-right", {
//         scrollTrigger: { trigger: ".dm-hub", start: "top 83%" },
//         strokeDashoffset: 200,
//         opacity: 0,
//         duration: 0.9,
//         stagger: 0.1,
//         ease: "power2.out",
//         delay: 0.3,
//       });

//       gsap.from(".dm-panel-trading", {
//         scrollTrigger: { trigger: ".dm-panels", start: "top 82%" },
//         x: -40, opacity: 0, duration: 0.75, ease: "power3.out",
//       });
//       gsap.from(".dm-panel-investing", {
//         scrollTrigger: { trigger: ".dm-panels", start: "top 82%" },
//         x: 40, opacity: 0, duration: 0.75, ease: "power3.out",
//       });

//       gsap.from(".dm-pill", {
//         scrollTrigger: { trigger: ".dm-panels", start: "top 78%" },
//         y: 12, opacity: 0, duration: 0.35, stagger: 0.05, ease: "power2.out",
//       });

//     }, wrapRef);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={wrapRef}>
//       <section className={styles.bg}>
//         <TradingHeroGrid className={`${styles.grid} ${styles["grid--desktop"]}`} />
//         <TradingHeroGridMobile className={`${styles.grid} ${styles["grid--mobile"]}`} />

//         <div className={styles.inner}>

//           <div className={`dm-header ${styles.header}`}>
//             <p className={styles.overline}>ONE PLATFORM · TWO MODES · EVERY MARKET</p>
//             <h2 className={styles.ttl}>
//               Trade when you want.{" "}
//               <span>Invest when you want.</span>
//               <br />Never choose.
//             </h2>
//           </div>

//           <div className={`dm-hub ${styles.hubWrap}`}>
//             <div className={styles.hub}>
//               <div className={styles.hubCore}>
//                 <LogoIconRed width={80} height={28} />
//               </div>
//               <p className={styles.hubLabel}>FARLO MASTER WALLET</p>
//               <p className={styles.hubSub}>One deposit. Full access.</p>
//             </div>

//             <svg
//               className={styles.svgConnectors}
//               viewBox="0 0 800 90"
//               preserveAspectRatio="none"
//               fill="none"
//             >
//               <path
//                 d="M400,0 C400,50 150,50 150,90"
//                 stroke="#CB1A36"
//                 strokeWidth="1.5"
//                 strokeOpacity="0.4"
//                 strokeDasharray="200"
//                 strokeDashoffset="0"
//                 className="dm-path-left"
//               />
//               <path
//                 d="M400,0 C400,50 650,50 650,90"
//                 stroke="#4ade80"
//                 strokeWidth="1.5"
//                 strokeOpacity="0.35"
//                 strokeDasharray="200"
//                 strokeDashoffset="0"
//                 className="dm-path-right"
//               />
//               <circle cx="150" cy="90" r="3" fill="#CB1A36" fillOpacity="0.6" />
//               <circle cx="650" cy="90" r="3" fill="#4ade80" fillOpacity="0.5" />
//             </svg>
//           </div>

//           <div className={`dm-panels ${styles.panels}`}>

//             <div className={`dm-panel-trading ${styles.panel} ${styles["panel--trading"]}`}>
//               <div className={styles.panelStatus}>
//                 <Bolt />
//                 TRADING MODE
//               </div>
//               <h3 className={styles.panelTitle}>For traders who move fast.</h3>
//               <p className={styles.panelBody}>
//                 FX, CFDs, indices, commodities, and crypto. Copy verified professionals.
//                 Leverage up to 1:1000. 30ms execution via MT5.
//               </p>
//               <div className={styles.pills}>
//                 {tradingFeatures.map((f) => (
//                   <span key={f} className={`dm-pill ${styles.pill} ${styles["pill--red"]}`}>{f}</span>
//                 ))}
//               </div>
//               <button
//                 className={`${styles.cta} ${styles["cta--red"]}`}
//                 onClick={() => router.push(ROUTES.signup)}
//               >
//                 Start Trading <ArrowRight />
//               </button>
//             </div>

//             <div className={`dm-panel-investing ${styles.panel} ${styles["panel--investing"]}`}>
//               <div className={`${styles.panelStatus} ${styles["panelStatus--green"]}`}>
//                 <Account width={20} height={20} />
//                 INVESTING MODE
//               </div>
//               <h3 className={styles.panelTitle}>For builders who think long.</h3>
//               <p className={styles.panelBody}>
//                 Real US equities, ETFs, and options via a regulated brokerage.
//                 Buy Apple and NVIDIA from Lagos without a US bank account.
//               </p>
//               <div className={styles.pills}>
//                 {investingFeatures.map((f) => (
//                   <span key={f} className={`dm-pill ${styles.pill} ${styles["pill--green"]}`}>{f}</span>
//                 ))}
//               </div>
//               <button
//                 className={`${styles.cta} ${styles["cta--green"]}`}
//                 onClick={() => router.push(ROUTES.signup)}
//               >
//                 Start Investing <ArrowRight />
//               </button>
//             </div>

//           </div>

//           <p className={styles.footnote}>
//             One deposit. One wallet. Allocate to either mode. Transfer in seconds.
//           </p>

//         </div>
//       </section>
//     </div>
//   );
// };

// export { DualMode };

"use client"

import { useLayoutEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TradingHeroGrid } from "@/assets/vectors/trading-hero-grid";
import { TradingHeroGridMobile } from "@/assets/vectors/trading-hero-grid-mobile";
import { LogoIconBlack } from "@/assets/vectors/logo-icon-black";
import { LogoIconRed } from "@/assets/vectors/logo-icon-red";

gsap.registerPlugin(ScrollTrigger);

const tradingFeatures = ["Forex", "Indices", "Crypto CFDs", "Copy Trading", "Prop Trading"];
const investingFeatures = ["US Stocks", "ETFs", "Options", "Fractional from $1"];

const DualMode = () => {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dm-overline", {
        scrollTrigger: { trigger: ".dm-overline", start: "top 90%" },
        y: 16, opacity: 0, duration: 0.6, ease: "power3.out",
      });
      gsap.from(".dm-headline", {
        scrollTrigger: { trigger: ".dm-headline", start: "top 88%" },
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from(".dm-divider", {
        scrollTrigger: { trigger: ".dm-divider", start: "top 86%" },
        scaleX: 0, opacity: 0, duration: 0.8, ease: "power3.out",
        transformOrigin: "left center",
      });
      gsap.from(".dm-col", {
        scrollTrigger: { trigger: ".dm-cols", start: "top 82%" },
        y: 50, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.15,
      });
      gsap.from(".dm-tag", {
        scrollTrigger: { trigger: ".dm-cols", start: "top 78%" },
        y: 10, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power2.out",
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef}>
      <section className={styles.bg}>
        <TradingHeroGrid className={`${styles.grid} ${styles["grid--desktop"]}`} />
        <TradingHeroGridMobile className={`${styles.grid} ${styles["grid--mobile"]}`} />

        <div className={styles.inner}>

          <div className={styles.header}>
            <p className={`dm-overline ${styles.overline}`}>
              ONE PLATFORM &nbsp;·&nbsp; TWO MODES &nbsp;·&nbsp; EVERY MARKET
            </p>
            <h2 className={`dm-headline ${styles.ttl}`}>
              Trade when you want.<br />
              <span>Invest when you want.</span><br />
              Never choose.
            </h2>
          </div>

          <div className={`dm-divider ${styles.rule}`} />

          <div className={`dm-cols ${styles.cols}`}>

            <div className={`dm-col ${styles.col} ${styles["col--trading"]}`}>
              <div className={styles.colHeader}>
                <p className={`${styles.modeLabel} ${styles["modeLabel--red"]}`}>Trading Mode</p>
              </div>
              <p className={styles.colHeadline}>For traders<br />who move fast.</p>
              <p className={styles.colBody}>
                FX, CFDs, indices, commodities, and crypto. Copy verified professionals.
                Leverage up to 1:1000. 30ms execution via MT5.
              </p>
              <div className={styles.tags}>
                {tradingFeatures.map((f) => (
                  <span key={f} className={`dm-tag ${styles.tag} ${styles["tag--red"]}`}>{f}</span>
                ))}
              </div>


              <button
                className={`${styles.btn} ${styles["btn--red"]}`}
                // onClick={() => router.push(ROUTES.signup)}
                onClick={() => window.open("https://accounts.farlofx.com/auth/register", "_blank", "noopener,noreferrer")}
              >
                Start Trading <ArrowRight />
              </button>
            </div>

            <div className={styles.colDivider} />

            <div className={`dm-col ${styles.col} ${styles["col--investing"]}`}>
              <div className={styles.colHeader}>
                <p className={`${styles.modeLabel} ${styles["modeLabel--green"]}`}>Investing Mode</p>
              </div>
              <p className={styles.colHeadline}>For builders<br />who think long.</p>
              <p className={styles.colBody}>
                Real US equities, ETFs, and options via a regulated brokerage.
                Buy Apple and NVIDIA from Lagos without a US bank account.
              </p>
              <div className={styles.tags}>
                {investingFeatures.map((f) => (
                  <span key={f} className={`dm-tag ${styles.tag} ${styles["tag--green"]}`}>{f}</span>
                ))}
              </div>
              <button
                className={`${styles.btn} ${styles["btn--green"]}`}
                // onClick={() => router.push(ROUTES.signup)}
                onClick={() => window.open("https://accounts.farlofx.com/auth/register", "_blank", "noopener,noreferrer")}
              >
                Start Investing <ArrowRight />
              </button>
            </div>

          </div>

          <div className={styles.walletNote}>
            <div className={styles.walletIcon}>
              <LogoIconRed width={28} height={28} />
            </div>
            <div className={styles.walletText}>
              <span className={styles.walletLabel}>FARLO MASTER WALLET</span>
              <span className={styles.walletSub}>One deposit. Allocate to either mode. Transfer in seconds.</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export { DualMode };