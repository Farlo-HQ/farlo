"use client";

import styles from "@/modules/overview/styles.module.scss";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { useTheme } from "@/context/ThemeContext";
import {
  IconAnalyze, IconAward, IconBell,
  IconBook,
  IconCalendar, IconChartArcs, IconChartBar,
  IconContract, IconFileExport, IconGraph,
  IconHome, IconLockDollar, IconLogout, IconMenu, IconMoneybag,
  IconMoneybagMove, IconMoneybagMoveBack, IconMoon, IconNews,
  IconSparkles, IconSun, IconTransfer,
  IconUserDollar, IconUsers, IconWallet, IconX, IconUser,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LogoRed } from "@/assets/vectors/logo-red";
import { NewLogo } from "@/assets/vectors/new-logo";
import { supabase } from "@/lib/supabase";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const { isMobile } = useDeviceSize(900);
  const { mode, setMode, notifications, markAllRead, unreadCount, userProfile, loading } = useDashboard();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isMobile) setShowSidebar(false);
  }, [pathname, isMobile]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      }
    };
    checkAuth();
  }, []);

  // Close profile / notification dropdowns when clicking anywhere outside them
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown="profile"]')) {
        setShowProfileMenu(false);
      }
      if (!target.closest('[data-dropdown="notif"]')) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleModeSwitch = (newMode: "trading" | "investing") => {
    setMode(newMode);
    if (newMode === "investing" && pathname === "/copy-trading-desk") {
      router.push("/investing-desk");
    }
    if (newMode === "trading" && pathname === "/investing-desk") {
      router.push("/copy-trading-desk");
    }
  };

  const showSidebarContent = (isMobile && showSidebar) || !isMobile;

  const displayName = userProfile?.firstName
    ? `${userProfile.firstName}${userProfile.lastName ? ` ${userProfile.lastName}` : ""}`
    : userProfile?.email?.split("@")[0] ?? "User";

  const displayEmail = userProfile?.email ?? "";

  const hasName = !!userProfile?.firstName;
  const initials = hasName
    ? `${userProfile!.firstName![0]}${userProfile!.lastName ? userProfile!.lastName[0] : ""}`.toUpperCase()
    : null;



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
          {theme === "light" ? <LogoRed className={styles.logo} /> : <NewLogo className={styles.logo} />}

          <div className={styles.mode_toggle}>
            <button
              className={`${styles.mode_btn} ${mode === "trading" ? styles.mode_btn_active_trading : ""}`}
              onClick={() => handleModeSwitch("trading")}
            >
              Trading
            </button>
            <button
              className={`${styles.mode_btn} ${mode === "investing" ? styles.mode_btn_active_investing : ""}`}
              onClick={() => handleModeSwitch("investing")}
            >
              Investing
            </button>
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

          {mode === "trading" && (
            <nav className={styles.nav}>
              <p>TRADING</p>
              <SidebarLink href="/copy-trading-desk" active={pathname === "/copy-trading-desk"} onNav={() => isMobile && setShowSidebar(false)}>
                <IconUsers size={20} strokeWidth={1.5} /> Copy Trading
              </SidebarLink>
            </nav>
          )}

          {mode === "investing" && (
            <nav className={styles.nav}>
              <p>INVESTING</p>
              <SidebarLink href="/investing-desk" active={pathname === "/investing-desk"} onNav={() => isMobile && setShowSidebar(false)}>
                <IoBriefcaseOutline size={18} strokeWidth={1.5} /> Portfolio Mirror
              </SidebarLink>
            </nav>
          )}

          <nav className={styles.nav}>
            <p>FINANCES</p>
            <SidebarLink href="/deposit" active={pathname === "/deposit"} onNav={() => isMobile && setShowSidebar(false)}>
              <IconMoneybagMove size={20} strokeWidth={1.5} /> Deposit
            </SidebarLink>
            <SidebarLink href="/internal-transfer" active={pathname === "/internal-transfer"} onNav={() => isMobile && setShowSidebar(false)}>
              <IconTransfer size={20} strokeWidth={1.5} /> Internal transfer
            </SidebarLink>
            <SidebarLink href="/withdraw" active={pathname === "/withdraw"} onNav={() => isMobile && setShowSidebar(false)}>
              <IconMoneybagMoveBack size={20} strokeWidth={1.5} /> Withdraw
            </SidebarLink>
            <SidebarLink href="/payments" active={pathname === "/payments"} onNav={() => isMobile && setShowSidebar(false)}>
              <IconMoneybag size={20} strokeWidth={1.5} /> Payments
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
            <p>LEARN</p>
            <SidebarLink href="/education" active={pathname === "/education"} onNav={() => isMobile && setShowSidebar(false)}>
              <IconBook size={20} strokeWidth={1.5} /> Education
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
            <SidebarLink href="/transactions" active={false} onNav={() => isMobile && setShowSidebar(false)}>
              <IconFileExport size={20} strokeWidth={1.5} /> Exports
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

          <button
            className={styles.signout}
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
          >
            <IconLogout /> Sign out
          </button>
        </aside>
      ) : null}

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.mobile_header}>
            {theme === "light" ? <LogoRed className={styles.logo} /> : <NewLogo className={styles.logo} />}

            <div className={styles.mobile_header_actions}>
              <button className={styles.mobile_icon_btn} onClick={() => {
                if (isMobile) setShowSidebar(false);
                toggleTheme();
              }}>
                {theme === "light" ? <IconMoon size={18} strokeWidth={1.5} /> : <IconSun size={18} strokeWidth={1.5} />}
              </button>

              <div className={styles.notif_wrap} data-dropdown="notif">
                <button
                  className={styles.mobile_icon_btn}
                  onClick={() => {
                    if (isMobile) setShowSidebar(false);
                    setShowNotifications((prev) => {
                      const next = !prev;
                      if (next) markAllRead();
                      return next;
                    });
                  }}
                >
                  <IconBell size={18} strokeWidth={1.5} />
                  {unreadCount > 0 && <span className={styles.notif_badge}>{unreadCount}</span>}
                </button>

                {showNotifications && (
                  <div className={`${styles.notif_dropdown} ${styles.notif_dropdown_mobile}`}>
                    <div className={styles.notif_header}>
                      <p className={styles.notif_title}>Notifications</p>
                      <button className={styles.notif_close} onClick={() => setShowNotifications(false)}>
                        <IconX size={14} />
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <div className={styles.notif_empty}>No notifications yet</div>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className={`${styles.notif_item} ${!n.read ? styles.notif_unread : ""}`}>
                          <div className={`${styles.notif_dot} ${n.type === "success" ? styles.dot_success : n.type === "warning" ? styles.dot_warning : styles.dot_info}`} />
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

              <button
                className={styles.mobile_menu}
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

              <div className={styles.notif_wrap} data-dropdown="notif">
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

              <div className={styles.profile_wrap} data-dropdown="profile">
                <button
                  className={styles.profile}
                  onClick={() => setShowProfileMenu((p) => !p)}
                >
                  <div className={styles.avatar}>
                    {initials ? initials : <IconUser size={16} strokeWidth={1.5} />}
                  </div>
                  <div className={styles.details}>
                    <p className={styles.name}>{displayName}</p>
                    <p className={styles.email}>{displayEmail}</p>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className={styles.profile_dropdown}>
                    <button
                      className={styles.profile_dropdown_item}
                      onClick={() => { setShowProfileMenu(false); router.push("/accounts"); }}
                    >
                      <IconHome size={15} strokeWidth={1.5} /> My Account
                    </button>
                    <div className={styles.profile_dropdown_divider} />
                    <button
                      className={`${styles.profile_dropdown_item} ${styles.profile_dropdown_danger}`}
                      onClick={async () => {
                        setShowProfileMenu(false);
                        await supabase.auth.signOut();
                        router.push("/login");
                      }}
                    >
                      <IconLogout size={15} strokeWidth={1.5} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "inherit",
          }}>
            <style>{`
          @keyframes farlo-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.92); }
          }
          .farlo-loader { animation: farlo-pulse 1.4s ease-in-out infinite; }
        `}</style>
            {theme === "light" ? <LogoRed className="farlo-loader" style={{ width: 78, height: 78 }} /> : <NewLogo className="farlo-loader" style={{ width: 78, height: 78 }} />}
          </div>) : children
        }

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