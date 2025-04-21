import { Button } from "@/components";
import { Logo, LogoBlack } from "@/assets/vectors";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconCaretDownFilled, IconMenu, IconX } from "@tabler/icons-react";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@/assets/icons/arrow-right";
import Image from "next/image";
import {
  cfdIcon,
  commoditiesIcon,
  cryptoIcon,
  forexIcon,
  indicesIcon,
  stocksIcon,
} from "@/assets/images/3d";
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

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  const { isMobile } = useDeviceSize(1024);

  useEffect(() => {
    setShowNav((prev) => (isMobile ? prev : false));
  }, [isMobile]);

  const navItems: NavItemProps[] = [
    {
      title: "About us",
      path: ROUTES.about,
      type: "link",
    },
    {
      title: "Trading",
      type: "menu",
      data: [
        {
          options: [
            {
              title: <>FOREX </>,
              text: "EURUSD, GBPUSD, NZDUSD",
              icon: <Image src={forexIcon} alt="" width={32} height={32} />,
              path: "/",
            },
            {
              title: <>INDICIES </>,
              text: "NASDAQ100, S&P500, FTSE100",
              icon: <Image src={indicesIcon} alt="" width={32} height={32} />,
              path: "/",
            },
            {
              title: <>CRYPTOCURRENCIES </>,
              text: "BTCUSD, ETHUSD, SOLUSD",
              icon: <Image src={cryptoIcon} alt="" width={32} height={32} />,
              path: "/",
            },
          ],
        },
        {
          options: [
            {
              title: <>STOCKS </>,
              text: "NVDA, AAPL, GOOGL, MSFT",
              icon: <Image src={stocksIcon} alt="" width={32} height={32} />,
              path: "/",
            },
            {
              title: <>COMMODITIES </>,
              text: "XAU, XAG, USOIL",
              icon: (
                <Image src={commoditiesIcon} alt="" width={32} height={32} />
              ),
              path: "/",
            },
            {
              title: <>CFDs </>,
              icon: <Image src={cfdIcon} alt="" width={32} height={32} />,
              path: "/",
            },
          ],
        },
      ],
    },
    {
      title: "Platforms",
      type: "menu",
      data: [
        {
          options: [
            {
              title: "DESKTOP",
              text: "MT5 or desktop",
              icon: (
                <span className={styles.dropdown__item__icon}>
                  <Monitor />
                </span>
              ),
              path: "/",
            },
            {
              title: "MOBILE",
              text: "MT5 or mobile",
              icon: (
                <span className={styles.dropdown__item__icon}>
                  <Mobile />
                </span>
              ),
              path: "/",
            },
            {
              title: "WEB",
              text: "MT5 or web",
              icon: (
                <span className={styles.dropdown__item__icon}>
                  <MonitorMobile />
                </span>
              ),
              path: "/",
            },
          ],
        },
      ],
    },
    {
      title: "Accounts",
      type: "menu",
      data: [
        {
          title: "ACCOUNT",
          options: [
            {
              title: "Accounts Comparison",
              text: "Choose between any of our accounts.",
              icon: <Slider width={24} height={24} />,
              path: "/",
            },
            {
              title: "Live Accounts",
              text: "Start live trading today",
              icon: <Settings width={24} height={24} />,
              path: "/",
            },
            {
              title: "Demo Account",
              text: "Trade with no limits.",
              icon: <Weight width={24} height={24} />,
              path: "/",
            },
          ],
        },
        {
          title: "TOOLS",
          options: [
            {
              title: "Economic Calendar",
              icon: <Calendar width={24} height={24} />,
              path: "/",
            },
            {
              title: "Deposits & Withdrawals",
              icon: <ConvertCard width={24} height={24} />,
              path: "/",
            },
            {
              title: "Trading Calculator",
              icon: <Calculator width={24} height={24} />,
              path: "/",
            },
            {
              title: "Live Quotes",
              icon: <VoiceCircle width={24} height={24} />,
              path: "/",
            },
          ],
        },
      ],
    },
    {
      title: "Partnerships",
      type: "menu",
      data: [
        {
          title: "Partnerships",
          options: [
            {
              title: "Introducing Brokers",
              text: "Join FarloFX As An Introducing Broker",
              icon: <Image src={forexIcon} alt="" width={32} height={32} />,
              path: "/",
            },
            {
              title: " MAM / PAMM Accounts",
              text: "Optimize Your Investment Management",
              icon: <Image src={indicesIcon} alt="" width={32} height={32} />,
              path: "/",
            },
            {
              title: "Deposit Bonus",
              text: "Get a 50% Deposit Bonus",
              icon: <Image src={cryptoIcon} alt="" width={32} height={32} />,
              path: "/",
            },
            {
              title: "Refer a Friend",
              text: "Earn as Your Friends Trade",
              icon: <Image src={cryptoIcon} alt="" width={32} height={32} />,
              path: "/",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <section
          className={`container ${styles.nav} ${
            showNav ? styles["nav--open"] : ""
          }`}
        >
          <div className={styles.logoSec}>
            {!showNav ? <Logo /> : <LogoBlack />}
            {isMobile ? (
              <button
                className={styles.hamburger}
                onClick={() => setShowNav((prev) => !prev)}
              >
                {!showNav ? <IconMenu /> : <IconX />}
              </button>
            ) : null}
          </div>
          {!isMobile ? (
            <>
              <nav>
                {navItems.map((item) => (
                  <NavItem key={item.title} {...item} />
                ))}
              </nav>
              <div className={styles.ctaSec}>
                <Link className={styles.loginLink} href={"#"}>
                  Log in
                </Link>
                <Button>Open Account</Button>
              </div>
            </>
          ) : showNav ? (
            <div className={`${styles.mobile_nav} hide-scrollbar`}>
              <nav>
                {navItems.map((item) => (
                  <NavItem key={item.title} {...item} />
                ))}
              </nav>
              <div className={styles.ctaSec}>
                <Link className={styles.loginLink} href={"#"}>
                  Log in
                </Link>
                <Button>Open Account</Button>
              </div>
            </div>
          ) : null}
        </section>
      </header>
    </>
  );
};

interface NavItemProps {
  title: string;
  type: "link" | "menu";
  path?: string;
  data?: NavMenuDropdownData[];
}

const NavItem = (props: NavItemProps) => {
  const { path, title, type, data } = props;
  return (
    <>
      {type === "link" ? (
        <Link href={path ?? ""}>{title}</Link>
      ) : (
        <NavMenu {...props} />
      )}
    </>
  );
};

interface NavMenuProps {
  title: string;
  data?: NavMenuDropdownData[];
}

const NavMenu = (props: NavMenuProps) => {
  const { title, data } = props;
  const [show, setShow] = useState(false);

  return (
    <div className={styles.navMenu}>
      <button
        onClick={() => setShow((prev) => !prev)}
        className={`${styles.navBtn} ${show ? styles["navBtn--active"] : ""}`}
      >
        {title} <IconCaretDownFilled />
      </button>
      {show && data ? (
        <NavMenuDropdown data={data} close={() => setShow(false)} />
      ) : null}
    </div>
  );
};

interface NavMenuDropdownProps {
  data: NavMenuDropdownData[];
  close: () => void;
}

interface NavMenuDropdownData {
  title?: string;
  options: NavMenuDropdownItemData[];
}

const NavMenuDropdown = ({ data, close }: NavMenuDropdownProps) => {
  const router = useRouter();

  const ref = useRef(null);

  useClickOutside(ref, close);

  return (
    <div ref={ref} className={styles.dropdown}>
      {data.map((item) => (
        <div key={item.title}>
          {item.title ? (
            <p className={styles.dropdown__ttl}>{item.title}</p>
          ) : null}
          {item.options.map((option) => (
            <NavMenuDropdownItem
              {...option}
              onClick={() => router.push(option.path)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface NavMenuDropdownItemData {
  title: string | React.ReactNode;
  text?: string;
  path: string;
  icon: React.ReactNode;
}

interface NavMenuDropdownItemProps extends NavMenuDropdownItemData {
  onClick: () => void;
}

const NavMenuDropdownItem = (props: NavMenuDropdownItemProps) => {
  const { title, text, onClick, icon } = props;
  return (
    <button
      style={{ alignItems: text ? "center" : "flex-start" }}
      onClick={onClick}
      className={styles.dropdown__item}
    >
      {icon}
      <div>
        <p className={styles.dropdown__item__txt1}>
          {title} <ArrowRight />{" "}
        </p>
        {text ? <p className={styles.dropdown__item__txt2}>{text}</p> : null}
      </div>
    </button>
  );
};

export { Navbar };
