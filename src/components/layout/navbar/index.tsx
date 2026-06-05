


"use client";
import { Button } from "@/components";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconCaretDownFilled, IconMenu, IconX } from "@tabler/icons-react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { ROUTES } from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight } from "@/assets/icons/arrow-right";
import Image from "next/image";
import { cfdIcon, commoditiesIcon, cryptoIcon, forexIcon, indicesIcon, stocksIcon } from "@/assets/images/3d";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Slider } from "@/assets/icons/slider";
import { Settings } from "@/assets/icons/setting";
import { Weight } from "@/assets/icons/weight";
import { Calendar } from "@/assets/icons/calendar";
import { ConvertCard } from "@/assets/icons/convert-card";
import { Calculator } from "@/assets/icons/calculator";
import { VoiceCircle } from "@/assets/icons/voice-cricle";
import { Monitor } from "@/assets/icons/monitor";
import { MonitorMobile } from "@/assets/icons/monitor-mobbile";
import { Mobile } from "@/assets/icons/mobile";
import { NewLogo } from "@/assets/vectors/new-logo";
import { LogoRed } from "@/assets/vectors/logo-red";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { isMobile } = useDeviceSize(1024);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { if (!isMobile) setShowNav(false); }, [isMobile]);
  useEffect(() => { setShowNav(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = showNav ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showNav]);

  const navItems: NavItemData[] = [
    {
      title: "Trading", type: "menu",
      data: [
        {
          options: [
            { title: <>FOREX</>, text: "EUR/USD, GBP/USD, USD/NGN", icon: <Image src={forexIcon} alt="" width={32} height={32} />, path: ROUTES.forex_trading },
            { title: <>INDICES</>, text: "US30, NAS100, FTSE100", icon: <Image src={indicesIcon} alt="" width={32} height={32} />, path: ROUTES.indices_trading },
            { title: <>CRYPTO CFDs</>, text: "BTC/USD, ETH/USD, SOL/USD", icon: <Image src={cryptoIcon} alt="" width={32} height={32} />, path: ROUTES.crypto_trading },
          ]
        },
        {
          options: [
            { title: <>US STOCKS</>, text: "NVDA, AAPL, TSLA", icon: <Image src={stocksIcon} alt="" width={32} height={32} />, path: ROUTES.stocks_trading },
            { title: <>COMMODITIES</>, text: "GOLD, SILVER, OIL", icon: <Image src={commoditiesIcon} alt="" width={32} height={32} />, path: ROUTES.commodities_trading },
            { title: <>COPY TRADING</>, text: "Follow Verified Strategies", icon: <Image src={cfdIcon} alt="" width={32} height={32} />, path: ROUTES.copy_trading ?? "/" },
          ]
        },
      ],
    },
    {
      title: "Platforms", type: "menu",
      data: [{
        options: [
          { title: "DESKTOP", text: "MT5 for desktop", icon: <span className={styles.dropdown__item__icon}><Monitor /></span>, path: ROUTES.platforms_desktop },
          { title: "MOBILE", text: "MT5 for mobile", icon: <span className={styles.dropdown__item__icon}><Mobile /></span>, path: ROUTES.platforms_mobile },
          { title: "WEB", text: "MT5 for web", icon: <span className={styles.dropdown__item__icon}><MonitorMobile /></span>, path: ROUTES.platforms_web },
        ]
      }],
    },
    {
      title: "Accounts", type: "menu",
      data: [
        {
          title: "ACCOUNT", options: [
            { title: "Accounts Comparison", text: "Choose between any of our accounts.", icon: <Slider width={24} height={24} />, path: ROUTES.accounts_comparison },
            { title: "Live Accounts", text: "Start live trading today", icon: <Settings width={24} height={24} />, path: ROUTES.accounts_live },
            { title: "Demo Account", text: "Trade with no limits.", icon: <Weight width={24} height={24} />, path: ROUTES.accounts_demo },
          ]
        },
        {
          title: "TOOLS", options: [
            { title: "Economic Calendar", icon: <Calendar width={24} height={24} />, path: ROUTES.tools_calendar },
            { title: "Deposits & Withdrawals", icon: <ConvertCard width={24} height={24} />, path: ROUTES.tools_deposits },
            { title: "Trading Calculator", icon: <Calculator width={24} height={24} />, path: ROUTES.tools_calculator },
            { title: "Live Quotes", icon: <VoiceCircle width={24} height={24} />, path: ROUTES.tools_quotes },
          ]
        },
      ],
    },
    {
      title: "Copy Trading", type: "menu",
      data: [{
        title: "Copy Trading", options: [
          { title: "Copy Trading", text: "", icon: <Image src={forexIcon} alt="" width={32} height={32} />, path: ROUTES.copy_trading ?? "/" },
          { title: "Investing Mode", text: "Optimize Your Investment Management", icon: <Image src={indicesIcon} alt="" width={32} height={32} />, path: ROUTES.investing_mode ?? "/" },
        ]
      }],
    },
    {
      title: "Partnerships", type: "menu",
      data: [{
        title: "Partnerships", options: [
          { title: "Introducing Brokers", text: "Join Farlo As An Introducing Broker", icon: <Image src={forexIcon} alt="" width={32} height={32} />, path: ROUTES.partnerships_ib },
          { title: "MAM / PAMM Accounts", text: "Optimize Your Investment Management", icon: <Image src={indicesIcon} alt="" width={32} height={32} />, path: ROUTES.partnerships_mam_pamm },
          { title: "Deposit Bonus", text: "Get a 50% Deposit Bonus", icon: <Image src={cryptoIcon} alt="" width={32} height={32} />, path: ROUTES.partnerships_deposit_bonus },
          { title: "Refer a Friend", text: "Earn as Your Friends Trade", icon: <Image src={cryptoIcon} alt="" width={32} height={32} />, path: ROUTES.partnerships_referral },
        ]
      }],
    },
    { title: "Education", path: ROUTES.education, type: "link" },
    { title: "Contact", path: ROUTES.contact, type: "link" },
  ];

  const [scrolledPastViewport, setScrolledPastViewport] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolledPastViewport(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dargBg = pathname.startsWith(ROUTES.blog ?? "/blog");

  return (
    <>
      <header
        className={`${styles.header} 
    ${scrolledPastViewport ? styles["header--scroll"] : ""} 
    ${dargBg ? styles["header--dark"] : ""} 
    ${showNav ? styles["header--hidden"] : ""}`
        }
      >
        <section className={`layout-container ${styles.nav}`}>
          <div className={styles.logoSec}>
            <NewLogo onClick={() => router.push(ROUTES.home)} style={{ cursor: "pointer" }} />
            {isMobile && !showNav && (
              <button className={styles.hamburger} onClick={() => setShowNav(p => !p)} aria-label="Menu">
                <IconMenu size={20} />
              </button>
            )}
          </div>
          {!isMobile && (
            <>
              <nav>
                {navItems.map(item => (
                  <NavItem key={item.title} {...item} callback={() => { if (item.type === "link") setShowNav(false); }} isMobile={false} />
                ))}
              </nav>
              <div className={styles.ctaSec}>
                <Link
                  className={styles.loginLink}
                  href={"https://accounts.farlofx.com/auth/login"}
                  target="_blank"
                  rel="noopener noreferrer">Log in
                </Link>
                <Button onClick={() => window.open("https://accounts.farlofx.com/auth/registw", "_blank", "noopener,noreferrer")}>
                  Open Account
                </Button>
                {/* <Link className={styles.loginLink} href={ROUTES.login}>Log in</Link>
                <Button onClick={() => router.push(ROUTES.signup)}>Open Account</Button> */}
              </div>
            </>
          )}
        </section>
      </header>

      {isMobile && showNav && <div className={styles.mobile_overlay} onClick={() => setShowNav(false)} />}

      {isMobile && showNav && (
        <div className={styles.mobile_nav}>
          <div className={styles.mobile_nav_header}>
            <LogoRed onClick={() => router.push(ROUTES.home)} style={{ cursor: "pointer" }} />
            <button onClick={() => setShowNav(false)}><IconX size={20} /></button>
          </div>
          <nav>
            {navItems.map(item => (
              <NavItem key={item.title} {...item} callback={() => setShowNav(false)} isMobile={true} />
            ))}
          </nav>
          <div className={styles.ctaSec}>
            <Link
              className={styles.loginLink}
              href={"https://accounts.farlofx.com/auth/login"}
              onClick={() => setShowNav(false)}
              target="_blank"
              rel="noopener noreferrer">Log in
            </Link>
            <Button onClick={() => window.open("https://accounts.farlofx.com/auth/registw", "_blank", "noopener,noreferrer")}>
              Open Account
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

interface NavItemData {
  title: string; type: "link" | "menu"; path?: string; data?: NavMenuDropdownData[];
}
interface NavItemProps extends NavItemData { callback: () => void; isMobile: boolean; }

const NavItem = (props: NavItemProps) => {
  const { path, title, type, data, callback, isMobile } = props;
  return type === "link" ? (
    <Link onClick={callback} href={path ?? ""}>{title}</Link>
  ) : (
    <NavMenu title={title} data={data} callback={callback} isMobile={isMobile} />
  );
};

interface NavMenuProps { title: string; data?: NavMenuDropdownData[]; callback: () => void; isMobile: boolean; }

const NavMenu = ({ title, data, callback, isMobile }: NavMenuProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.navMenu}>
      <button onClick={() => setShow(p => !p)} className={`${styles.navBtn} ${show ? styles["navBtn--active"] : ""}`}>
        {title} <IconCaretDownFilled />
      </button>
      {show && data && (
        <NavMenuDropdown data={data} close={() => { setShow(false); callback(); }} isMobile={isMobile} />
      )}
    </div>
  );
};

interface NavMenuDropdownData { title?: string; options: NavMenuDropdownItemData[]; }
interface NavMenuDropdownProps { data: NavMenuDropdownData[]; close: () => void; isMobile: boolean; }

const NavMenuDropdown = ({ data, close, isMobile }: NavMenuDropdownProps) => {
  const router = useRouter();
  const ref = useRef(null);

  useClickOutside(ref, (event) => {
    if (!isMobile) {
      const clickedElement = event.target as HTMLElement;
      if (clickedElement.closest(`.${styles.navBtn}`)) {
        return;
      }

      close();
    }
  });
  return (
    <div ref={ref} className={`${styles.dropdown} ${isMobile ? styles.mobile_dropdown : ""}`}>
      {data.map((item, i) => (
        <div key={i}>
          {item.title && <p className={styles.dropdown__ttl}>{item.title}</p>}
          {item.options.map((option, j) => (
            <NavMenuDropdownItem key={j} {...option} onClick={() => { router.push(option.path); close(); }} />
          ))}
        </div>
      ))}
    </div>
  );
};

interface NavMenuDropdownItemData { title: string | React.ReactNode; text?: string; path: string; icon: React.ReactNode; }
interface NavMenuDropdownItemProps extends NavMenuDropdownItemData { onClick: () => void; }

const NavMenuDropdownItem = ({ title, text, onClick, icon }: NavMenuDropdownItemProps) => (
  <button style={{ alignItems: text ? "center" : "flex-start" }} onClick={onClick} className={styles.dropdown__item}>
    {icon}
    <div>
      <p className={styles.dropdown__item__txt1}>{title} <ArrowRight /></p>
      {text && <p className={styles.dropdown__item__txt2}>{text}</p>}
    </div>
  </button>
);

export { Navbar };
