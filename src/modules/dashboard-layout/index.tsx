"use client";

import { LogoBlack } from "@/assets/vectors";
import styles from "@/modules/overview/styles.module.scss";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { useTheme } from "@/context/ThemeContext";
import {
  IconAnalyze, IconAward, IconBell,
  IconCalendar, IconChartArcs, IconChartBar,
  IconContract, IconFileDownload, IconFileExport, IconGraph,
  IconHome, IconLockDollar, IconLogout, IconMenu, IconMoneybag,
  IconMoneybagMove, IconMoneybagMoveBack, IconMoon, IconNews,
  IconSparkles, IconSun, IconTransfer, IconTransferIn,
  IconUserDollar, IconUsers, IconWallet, IconX,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isMobile } = useDeviceSize(900);
  const { mode, setMode, notifications, markAllRead, unreadCount } = useDashboard();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isMobile) setShowSidebar(false);
  }, [pathname, isMobile]);


  const handleModeChange = (m: "trading" | "investing") => {
    setMode(m);
    if (isMobile) setTimeout(() => setShowSidebar(false), 150);
  };

  const showSidebarContent = (isMobile && showSidebar) || !isMobile;

  return (
    <div className={styles.container}>
      {isMobile && showSidebar && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 2,
            backdropFilter: "blur(2px)",
          }}
          onClick={() => setShowSidebar(false)}
        />
      )}

      {showSidebarContent ? (
        <aside ref={sidebarRef} className={`hide-scrollbar ${styles.sidebar}`}>
          <LogoBlack className={styles.logo} />

          <div className={styles.mode_toggle}>
            <button
              className={`${styles.mode_btn} ${mode === "trading" ? styles.mode_btn_active_trading : ""}`}
              onClick={() => handleModeChange("trading")}
            >Trading</button>
            <button
              className={`${styles.mode_btn} ${mode === "investing" ? styles.mode_btn_active_investing : ""}`}
              onClick={() => handleModeChange("investing")}
            >Investing</button>
          </div>


          <nav className={styles.nav}>
            <p>OVERVIEW</p>
            <SidebarLink href="/overview" active={pathname === "/overview"} onNav={() => isMobile && setShowSidebar(false)}>
              <IconWallet size={20} strokeWidth={1.5} /> Wallets
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconHome size={20} strokeWidth={1.5} /> Accounts
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconGraph size={20} strokeWidth={1.5} /> Invest rating
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconAward size={20} strokeWidth={1.5} /> Challenges
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconSparkles size={20} strokeWidth={1.5} /> Statuses
            </SidebarLink>
          </nav>

          <nav className={styles.nav}>
            <p>FINANCES</p>
            <SidebarLink href="/deposit" active={pathname === "/deposit"} onNav={() => isMobile && setShowSidebar(false)}>
              <IconMoneybagMove size={20} strokeWidth={1.5} /> Deposit
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconTransfer size={20} strokeWidth={1.5} /> Internal transfer
            </SidebarLink>
            <SidebarLink href="/withdraw" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconMoneybagMoveBack size={20} strokeWidth={1.5} /> Withdraw
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconMoneybag size={20} strokeWidth={1.5} /> Payments
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconTransferIn size={20} strokeWidth={1.5} /> Local payments
            </SidebarLink>
          </nav>

          <nav className={styles.nav}>
            <p>HISTORY</p>
            <SidebarLink href="/transactions" active={pathname === "/transactions"} onNav={() => isMobile && setShowSidebar(false)}>
              <IconChartBar size={20} strokeWidth={1.5} /> Transaction history
            </SidebarLink>
          </nav>

          <nav className={styles.nav}>
            <p>PARTNERSHIP</p>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconUsers size={20} strokeWidth={1.5} /> Partnership
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconChartArcs size={20} strokeWidth={1.5} /> Dashboards
            </SidebarLink>
          </nav>

          <nav className={styles.nav}>
            <p>ARTICLES</p>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconNews size={20} strokeWidth={1.5} /> News
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconAnalyze size={20} strokeWidth={1.5} /> Technical analysis
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconCalendar size={20} strokeWidth={1.5} /> Calendar
            </SidebarLink>
          </nav>

          <nav className={styles.nav}>
            <p>FILES</p>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconFileExport size={20} strokeWidth={1.5} /> Exports
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconFileDownload size={20} strokeWidth={1.5} /> Downloads
            </SidebarLink>
          </nav>

          <nav className={styles.nav}>
            <p>BONUSES</p>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconLockDollar size={20} strokeWidth={1.5} /> All bonuses
            </SidebarLink>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconUserDollar size={20} strokeWidth={1.5} /> My bonuses
            </SidebarLink>
          </nav>

          <nav className={styles.nav}>
            <p>INFO</p>
            <SidebarLink href="/overview" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconContract size={20} strokeWidth={1.5} /> Contract specifications
            </SidebarLink>
          </nav>

          <a className={styles.signout} href="/"><IconLogout /> Sign out</a>
        </aside>
      ) : null}

      <div className={styles.main}>
        <header className={styles.header}>



          <div className={styles.mobile_header}>
            <LogoBlack className={styles.logo} />

            <div className={styles.mobile_header_actions}>
              <button className={styles.mobile_icon_btn} onClick={() => {
                if (isMobile) {
                  setShowSidebar(false);
                }
                toggleTheme();
              }}>
                {theme === "light" ? (
                  <IconMoon size={18} strokeWidth={1.5} />
                ) : (
                  <IconSun size={18} strokeWidth={1.5} />
                )}
              </button>

              <div className={styles.notif_wrap}>
                <button
                  className={styles.mobile_icon_btn}
                  onClick={() => {
                    if (isMobile) {
                      setShowSidebar(false);
                    }

                    setShowNotifications((prev) => {
                      const next = !prev;
                      if (next) markAllRead();
                      return next;
                    });
                  }}
                >
                  <IconBell size={18} strokeWidth={1.5} />
                  {unreadCount > 0 && (
                    <span className={styles.notif_badge}>{unreadCount}</span>
                  )}
                </button>

                {showNotifications && (
                  <div className={`${styles.notif_dropdown} ${styles.notif_dropdown_mobile}`}>
                    <div className={styles.notif_header}>
                      <p className={styles.notif_title}>Notifications</p>
                      <button
                        className={styles.notif_close}
                        onClick={() => setShowNotifications(false)}
                      >
                        <IconX size={14} />
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <div className={styles.notif_empty}>No notifications yet</div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`${styles.notif_item} ${!n.read ? styles.notif_unread : ""}`}
                        >
                          <div
                            className={`${styles.notif_dot} ${n.type === "success"
                              ? styles.dot_success
                              : n.type === "warning"
                                ? styles.dot_warning
                                : styles.dot_info
                              }`}
                          />
                          <div className={styles.notif_text}>
                            <p className={styles.notif_item_title}>{n.title}</p>
                            <p className={styles.notif_item_msg}>{n.message}</p>
                            <p className={styles.notif_time}>{n.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <button className={styles.mobile_menu}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={() => setShowSidebar((prev) => !prev)}
              >
                {!showSidebar ? <IconMenu /> : <IconX />}
              </button>
            </div>
          </div>
          <div className={styles.header_content}>
            <div className={styles.header_actions}>
              <button className={styles.icon_btn} onClick={toggleTheme}>
                {theme === "light" ? <IconMoon size={18} strokeWidth={1.5} /> : <IconSun size={18} strokeWidth={1.5} />}
              </button>

              <div className={styles.notif_wrap}>
                <button className={styles.icon_btn} onClick={() => { setShowNotifications(p => !p); if (!showNotifications) markAllRead(); }}>
                  <IconBell size={18} strokeWidth={1.5} />
                  {unreadCount > 0 && <span className={styles.notif_badge}>{unreadCount}</span>}
                </button>
                {showNotifications && (
                  <div className={styles.notif_dropdown}>
                    <div className={styles.notif_header}>
                      <p className={styles.notif_title}>Notifications</p>
                      <button className={styles.notif_close} onClick={() => setShowNotifications(false)}><IconX size={14} /></button>
                    </div>
                    {notifications.map(n => (
                      <div key={n.id} className={`${styles.notif_item} ${!n.read ? styles.notif_unread : ""}`}>
                        <div className={`${styles.notif_dot} ${n.type === "success" ? styles.dot_success : n.type === "warning" ? styles.dot_warning : styles.dot_info}`} />
                        <div className={styles.notif_text}>
                          <p className={styles.notif_item_title}>{n.title}</p>
                          <p className={styles.notif_item_msg}>{n.message}</p>
                          <p className={styles.notif_time}>{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className={styles.deposit_btn} onClick={() => window.location.href = "/deposit"}>
                <IconMoneybagMove size={16} strokeWidth={1.5} /> Deposit Funds
              </button>

              <div className={styles.profile}>
                <div className={styles.avatar}>JD</div>
                <div className={styles.details}>
                  <p className={styles.name}>John Doe</p>
                  <p className={styles.email}>john.doe@yopmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
};

const SidebarLink = ({
  href,
  active,
  children,
  onNav,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onNav?: () => void;
}) => (
  <a href={href} onClick={onNav} className={active ? styles.nav_active : undefined}>
    {children}
  </a>
);

export { DashboardLayout };
