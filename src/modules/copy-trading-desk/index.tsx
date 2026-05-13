"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { useDashboard } from "@/context/DashboardContext";
import { VscVerifiedFilled } from "react-icons/vsc";
import { BiSolidUserCheck, BiSolidUserPlus, BiSolidUserMinus } from "react-icons/bi";
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";
import { ArrowRight } from "@/assets/icons/arrow-right";


interface Position {
  id: number; sym: string; ico: string; side: "buy" | "sell";
  lot: number; open: number; cur: number; pl: number;
}
interface CopyTrader {
  id: string; initials: string; name: string; spec: string;
  years: number; copiers: number; ret: number; dd: number;
  winRate: number; trades: number; color: string;
}

const TRADERS: CopyTrader[] = [
  { id: "aj", initials: "AJ", name: "AlphaJay", spec: "FX Specialist", years: 2, copiers: 1240, ret: 62, dd: 8.2, winRate: 71, trades: 842, color: "#CB1A36" },
  { id: "tr", initials: "TR", name: "TrendRider", spec: "Multi-asset", years: 3, copiers: 892, ret: 44, dd: 12.1, winRate: 64, trades: 1204, color: "#0D7A58" },
];

const INITIAL_POSITIONS: Position[] = [
  { id: 1, sym: "EUR/USD", ico: "€$", side: "buy", lot: 0.5, open: 1.0819, cur: 1.0842, pl: 115 },
  { id: 2, sym: "GBP/USD", ico: "£$", side: "buy", lot: 0.3, open: 1.2614, cur: 1.2634, pl: 42 },
  { id: 3, sym: "GOLD", ico: "XAU", side: "sell", lot: 0.1, open: 2318.40, cur: 2317.2, pl: -29 },
];

const SYMBOLS = ["EUR/USD", "GBP/USD", "GOLD", "BTC/USD", "US30", "USD/NGN"];
const PRICES: Record<string, number> = {
  "EUR/USD": 1.0842, "GBP/USD": 1.2634, "GOLD": 2317.2, "BTC/USD": 67420, "US30": 38420, "USD/NGN": 1610,
};

const ACTIVITY_SEED = [
  { id: 1, trader: "AlphaJay", action: "Opened BUY EUR/USD @ 1.0838", time: "2m ago", color: "#CB1A36", type: "buy" },
  { id: 2, trader: "TrendRider", action: "Closed SELL GBP/JPY +$84.20", time: "14m ago", color: "#0D7A58", type: "profit" },
  { id: 3, trader: "AlphaJay", action: "Opened BUY XAU/USD @ 2314.4", time: "31m ago", color: "#CB1A36", type: "buy" },
  { id: 4, trader: "TrendRider", action: "Closed BUY USD/CAD +$42.50", time: "1h ago", color: "#0D7A58", type: "profit" },
];

function ActivityIcon({ type }: { type: string }) {
  const configs: Record<string, { bg: string; color: string; svg: React.ReactNode }> = {
    buy: {
      bg: "rgba(255, 255, 255, 0.07)",
      color: "#cb1a36",
      svg: (
        <HiArrowTrendingDown />
      ),
    },
    sell: {
      bg: "rgba(203,26,54,0.1)",
      color: "#cb1a36",
      svg: (
        <HiArrowTrendingDown />
      ),
    },
    profit: {
      bg: "rgba(255, 255, 255, 0.07)",
      color: "#6b7280",
      svg: (
        <HiArrowTrendingUp />
      ),
    },
    loss: {
      bg: "rgba(203,26,54,0.1)",
      color: "#CB1A36",
      svg: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      ),
    },
    copy: {
      bg: "rgba(99,102,241,0.12)",
      color: "#6366f1",
      svg: (
        <BiSolidUserPlus />
      ),
    },
    stop: {
      bg: "rgba(245,158,11,0.12)",
      color: "#f59e0b",
      svg: (
        <BiSolidUserMinus />
      ),
    },
    info: {
      bg: "rgba(107,114,128,0.12)",
      color: "#6b7280",
      svg: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
  };

  const c = configs[type] ?? configs.info;
  return (
    <div style={{
      width: 30, height: 30, borderRadius: 8, flexShrink: 0,
      background: c.bg, color: c.color,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {c.svg}
    </div>
  );
}

function MiniChart({ mode, price }: { mode: "trading" | "investing"; price: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>([]);

  useEffect(() => {
    const seed = [];
    let v = price * 0.998;
    for (let i = 0; i < 60; i++) {
      v += (Math.random() - 0.46) * price * 0.0004;
      seed.push(v);
    }
    dataRef.current = seed;
    draw();
  }, [price]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const data = dataRef.current;
    if (data.length < 2) return;
    const w = canvas.width; const h = canvas.height;
    const min = Math.min(...data); const max = Math.max(...data);
    const range = max - min || 1;
    ctx.clearRect(0, 0, w, h);
    const color = mode === "trading" ? "#CB1A36" : "#0D7A58";
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, color + "40");
    grad.addColorStop(1, color + "00");
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 8) - 4;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const data = dataRef.current;
      if (data.length === 0) return;
      const last = data[data.length - 1];
      const next = last + (Math.random() - 0.46) * last * 0.0004;
      dataRef.current = [...data.slice(-59), next];
      draw();
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={160}
      style={{ width: "100%", height: "160px", display: "block" }}
    />
  );
}

function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={styles.cselect_wrap} ref={ref}>
      <button
        type="button"
        className={styles.cselect_trigger}
        onClick={() => setOpen(o => !o)}
      >
        <span>{value}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className={styles.cselect_menu}>
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              className={`${styles.cselect_option} ${value === opt ? styles.cselect_option_active : ""}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >

              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CopyTradingUI() {
  const { wallets, mode } = useDashboard();
  const [positions, setPositions] = useState<Position[]>(INITIAL_POSITIONS);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [sym, setSym] = useState("EUR/USD");
  const [lot, setLot] = useState("0.10");
  const [leverage, setLeverage] = useState("1:100");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");
  const [following, setFollowing] = useState<Record<string, number>>({});
  const [allocInputs, setAllocInputs] = useState<Record<string, string>>({ aj: "500", tr: "500" });
  const [activity, setActivity] = useState(ACTIVITY_SEED);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "warn" | "info" } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ sym: string; side: string; lot: string; price: number; margin: number } | null>(null);
  const [livePrice, setLivePrice] = useState(PRICES[sym]);
  const [priceAnim, setPriceAnim] = useState<"up" | "dn" | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "copy">("dashboard");

  const showToast = (msg: string, type: "success" | "warn" | "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice(prev => {
        const base = PRICES[sym];
        const next = prev + (Math.random() - 0.48) * base * 0.0003;
        setPriceAnim(next > prev ? "up" : "dn");
        setTimeout(() => setPriceAnim(null), 600);
        return parseFloat(next.toFixed(sym === "GOLD" || sym === "BTC/USD" || sym === "US30" || sym === "USD/NGN" ? 2 : 4));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [sym]);

  useEffect(() => {
    setLivePrice(PRICES[sym]);
  }, [sym]);

  const totalPl = positions.reduce((a, p) => a + p.pl, 0);
  const equity = wallets.trading + totalPl;
  const marginUsed = positions.reduce((a, p) => a + p.lot * (PRICES[p.sym] || 1) * 10, 0);
  const marginPct = equity > 0 ? ((marginUsed / equity) * 100).toFixed(1) : "0";
  const copyTotal = Object.values(following).reduce((a, v) => a + v, 0);
  const copyCount = Object.keys(following).length;
  const riskLevel = copyCount === 0 ? "None" : copyCount >= 2 ? "Medium" : "Low";

  const placeOrder = () => {
    const price = livePrice;
    const margin = parseFloat(lot) * price * 10;
    setConfirmModal({ sym, side, lot, price, margin });
  };

  const confirmOrder = () => {
    if (!confirmModal) return;
    const newPos: Position = {
      id: Date.now(), sym: confirmModal.sym, ico: confirmModal.sym.substring(0, 3),
      side: confirmModal.side as "buy" | "sell", lot: parseFloat(confirmModal.lot),
      open: confirmModal.price, cur: confirmModal.price, pl: 0,
    };
    setPositions(prev => [...prev, newPos]);
    setConfirmModal(null);
    showToast(`✓ ${confirmModal.sym} ${confirmModal.side.toUpperCase()} ${confirmModal.lot} lot executed`, "success");
  };

  const closePosition = (id: number) => {
    const pos = positions.find(p => p.id === id);
    if (!pos) return;
    setPositions(prev => prev.filter(p => p.id !== id));
    showToast(`${pos.sym} closed — ${pos.pl >= 0 ? "+" : ""}$${Math.abs(pos.pl).toFixed(2)}`, pos.pl >= 0 ? "success" : "warn");
  };

  const handleFollow = (trader: CopyTrader) => {
    const alloc = parseFloat(allocInputs[trader.id] || "500");

    if (following[trader.id]) {
      setFollowing(prev => {
        const n = { ...prev };
        delete n[trader.id];
        return n;
      });

      showToast(`Stopped copying ${trader.name}`, "warn");

      setActivity(prev => [
        {
          id: Date.now(),
          trader: trader.name,
          action: `You stopped copying ${trader.name}`,
          time: "Just now",
          color: trader.color,
          type: "stop",
        },
        ...prev.slice(0, 7),
      ]);
    } else {
      if (alloc > wallets.trading) {
        showToast("Insufficient trading balance", "warn");
        return;
      }

      setFollowing(prev => ({
        ...prev,
        [trader.id]: alloc,
      }));

      showToast(`✓ Now copying ${trader.name} — $${alloc} allocated`, "success");

      setActivity(prev => [
        {
          id: Date.now(),
          trader: trader.name,
          action: `You started copying ${trader.name} — $${alloc} allocated`,
          time: "Just now",
          color: trader.color,
          type: "copy",
        },
        ...prev.slice(0, 7),
      ]);
    }
  };
  const spreadMap: Record<string, string> = { "EUR/USD": "0.2", "GBP/USD": "0.3", "GOLD": "0.8", "BTC/USD": "24", "US30": "4.0", "USD/NGN": "2.0" };

  return (
    <div className={styles.page}>
      {toast && (
        <div className={`${styles.toast} ${styles[`toast_${toast.type}`]}`}>
          {toast.type === "success" ? "✓" : toast.type === "warn" ? "⚠" : "ℹ"} {toast.msg}
        </div>
      )}

      {confirmModal && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal}>
            <h3 className={styles.modal_title}>Confirm {confirmModal.side.toUpperCase()} Order</h3>
            <p className={styles.modal_sub}>Review your order before executing</p>
            <div className={styles.modal_rows}>
              {[
                ["Symbol", confirmModal.sym],
                ["Side", confirmModal.side.toUpperCase()],
                ["Lot size", confirmModal.lot],
                ["Market price", confirmModal.price.toFixed(4)],
                ["Margin required", `$${confirmModal.margin.toFixed(2)}`],
              ].map(([k, v]) => (
                <div key={k} className={styles.modal_row}>
                  <span>{k}</span>
                  <span className={k === "Side" ? (confirmModal.side === "buy" ? styles.buy_color : styles.sell_color) : ""}>{v}</span>
                </div>
              ))}
            </div>
            <div className={styles.modal_btns}>
              <button className={styles.modal_cancel} onClick={() => setConfirmModal(null)}>Cancel</button>
              <button
                className={`${styles.modal_confirm} ${confirmModal.side === "buy" ? styles.confirm_buy : styles.confirm_sell}`}
                onClick={confirmOrder}
              >
                Confirm {confirmModal.side.charAt(0).toUpperCase() + confirmModal.side.slice(1)}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.page_header}>
        <div>
          <h1 className={styles.page_title}>
            Copy Trading
            <span className={styles.mode_badge}>{mode === "trading" ? "Trading Mode" : "Investing Mode"}</span>
          </h1>
          <p className={styles.page_sub}>Live trading desk · Copy leaders · Manage positions</p>
        </div>
        <div className={styles.header_tabs}>
          <button className={`${styles.htab} ${activeTab === "dashboard" ? styles.htab_active : ""}`} onClick={() => setActiveTab("dashboard")}>
            Trading Desk
          </button>
          <button className={`${styles.htab} ${activeTab === "copy" ? styles.htab_active : ""}`} onClick={() => setActiveTab("copy")}>
            Copy Leaders
          </button>
        </div>
      </div>

      <div className={styles.stats_row}>
        <div className={styles.scard}>
          <p className={styles.sc_l}>EQUITY</p>
          <p className={styles.sc_v}>${equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className={`${styles.sc_c} ${totalPl >= 0 ? styles.up : styles.dn}`}>{totalPl >= 0 ? "+" : ""}${totalPl.toFixed(2)} open P&L</p>
        </div>
        <div className={styles.scard}>
          <p className={styles.sc_l}>MARGIN USED</p>
          <p className={styles.sc_v}>${marginUsed.toFixed(0)}</p>
          <p className={styles.sc_c}>{marginPct}% utilized</p>
        </div>
        <div className={styles.scard}>
          <p className={styles.sc_l}>OPEN POSITIONS</p>
          <p className={styles.sc_v}>{positions.length}</p>
          <p className={`${styles.sc_c} ${styles.up}`}>{positions.filter(p => p.pl > 0).length} in profit</p>
        </div>
        <div className={styles.scard}>
          <p className={styles.sc_l}>COPY ALLOCATED</p>
          <p className={styles.sc_v}>${copyTotal.toLocaleString()}</p>
          <p className={`${styles.sc_c} ${copyCount > 0 ? styles.up : ""}`}>{copyCount} {copyCount === 1 ? "strategy" : "strategies"} · {riskLevel} risk</p>
        </div>
      </div>

      {activeTab === "dashboard" ? (
        <div className={styles.main_grid}>
          <div className={styles.left_col}>
            <div className={styles.panel}>
              <div className={styles.panel_head}>
                <div className={styles.chart_title_row}>
                  <span className={styles.panel_title}>{sym} · Live</span>
                  <div className={styles.timeframes}>
                    {["1m", "5m", "15m", "1H", "4H"].map(tf => (
                      <span key={tf} className={styles.tf}>{tf}</span>
                    ))}
                  </div>
                </div>
                <span className={styles.live_dot}>● Live</span>
              </div>
              <div className={styles.panel_body}>
                <div className={styles.price_row}>
                  <span className={`${styles.live_price} ${priceAnim === "up" ? styles.price_up : priceAnim === "dn" ? styles.price_dn : ""}`}>
                    {livePrice.toFixed(sym === "GOLD" || sym === "BTC/USD" || sym === "US30" || sym === "USD/NGN" ? 2 : 4)}
                  </span>
                  <span className={styles.price_meta}>
                    Bid {(livePrice - 0.0001).toFixed(4)} · Ask {(livePrice + 0.0001).toFixed(4)} · Spread {spreadMap[sym] || "0.2"} pips
                  </span>
                </div>
                <MiniChart mode={mode} price={livePrice} />
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panel_head}>
                <span className={styles.panel_title}>Open Positions ({positions.length})</span>
                {positions.length > 0 && (
                  <button className={styles.close_all_btn} onClick={() => { setPositions([]); showToast("All positions closed", "info"); }}>
                    Close all
                  </button>
                )}
              </div>
              <div className={styles.panel_body}>
                {positions.length === 0 ? (
                  <p className={styles.empty_msg}>No open positions — place an order to get started.</p>
                ) : (
                  <table className={styles.pos_table}>
                    <thead>
                      <tr><th>Symbol</th><th>Side</th><th>Lot</th><th>Open</th><th>P&L</th><th></th></tr>
                    </thead>
                    <tbody>
                      {positions.map(p => (
                        <tr key={p.id}>
                          <td><div className={styles.sym_cell}><div className={styles.sym_ico}>{p.ico}</div>{p.sym}</div></td>
                          <td><span className={p.side === "buy" ? styles.buy_pill : styles.sell_pill}>{p.side.toUpperCase()}</span></td>
                          <td>{p.lot}</td>
                          <td className={styles.mono}>{p.open.toFixed(4)}</td>
                          <td className={p.pl >= 0 ? styles.up : styles.dn}>{p.pl >= 0 ? "+" : ""}${Math.abs(p.pl).toFixed(2)}</td>
                          <td><button className={styles.close_btn} onClick={() => closePosition(p.id)}>Close</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          <div className={styles.right_col}>
            <div className={styles.panel}>
              <div className={styles.panel_head}>
                <span className={styles.panel_title}>Quick Order</span>
              </div>
              <div className={styles.panel_body}>
                <div className={styles.order_tabs}>
                  <button className={`${styles.otab} ${side === "buy" ? styles.otab_buy : ""}`} onClick={() => setSide("buy")}>Buy</button>
                  <button className={`${styles.otab} ${side === "sell" ? styles.otab_sell : ""}`} onClick={() => setSide("sell")}>Sell</button>
                </div>
                <div className={styles.ofield}>
                  <label>Symbol</label>
                  <CustomSelect
                    value={sym}
                    onChange={setSym}
                    options={SYMBOLS}
                  />
                </div>
                <div className={styles.ofield}>
                  <label>Lot size</label>
                  <input type="number" value={lot} onChange={e => setLot(e.target.value)} step="0.01" className={styles.oinput} />
                </div>
                <div className={styles.ofield}>
                  <label>Leverage</label>
                  <CustomSelect
                    value={leverage}
                    onChange={setLeverage}
                    options={["1:50", "1:100", "1:200", "1:500", "1:1000"]}
                  />
                </div>
                <div className={styles.ofield_row}>
                  <div className={styles.ofield}>
                    <label>Stop Loss</label>
                    <input type="number" value={sl} onChange={e => setSl(e.target.value)} placeholder="Optional" className={styles.oinput} />
                  </div>
                  <div className={styles.ofield}>
                    <label>Take Profit</label>
                    <input type="number" value={tp} onChange={e => setTp(e.target.value)} placeholder="Optional" className={styles.oinput} />
                  </div>
                </div>
                <div className={styles.order_est}>
                  <div className={styles.est_row}><span>Margin required</span><span>${(parseFloat(lot || "0") * livePrice * 10).toFixed(2)}</span></div>
                  <div className={styles.est_row}><span>Pip value</span><span>$1.00</span></div>
                  <div className={styles.est_row}><span>Current price</span><span className={styles.mono}>{livePrice.toFixed(4)}</span></div>
                </div>
                <button
                  className={`${styles.order_btn} ${side === "buy" ? styles.order_btn_buy : styles.order_btn_sell}`}
                  onClick={placeOrder}
                >
                  {side === "buy" ? "Place Buy Order" : "Place Sell Order"}
                </button>
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panel_head}>
                <span className={styles.panel_title}>Copy Leaders</span>
                <button className={styles.view_all_btn} onClick={() => setActiveTab("copy")}>View all <ArrowRight /></button>
              </div>
              <div className={styles.panel_body}>
                {TRADERS.map(t => (
                  <div key={t.id} className={styles.copy_card_mini}>
                    <div className={styles.cav} style={{ background: t.color }}>{t.initials}</div>
                    <div className={styles.copy_meta}>
                      <span className={styles.copy_name}>{t.name}</span>
                      <span className={styles.copy_spec}>{t.spec} · {t.years}yr · {t.copiers.toLocaleString()} copiers</span>
                    </div>
                    <div className={styles.copy_ret}>
                      <span className={styles.up}>+{t.ret}%</span>
                      <span className={styles.copy_dd}>DD {t.dd}%</span>
                    </div>
                    <button
                      className={`${styles.follow_pill} ${following[t.id] ? styles.follow_pill_on : ""}`}
                      onClick={() => handleFollow(t)}
                    >
                      {following[t.id] ? <BiSolidUserCheck size={18} /> : <BiSolidUserPlus size={18} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.copy_grid}>
            {TRADERS.map(t => {
              const isFollowing = !!following[t.id];
              return (
                <div key={t.id} className={`${styles.copy_card_full}`}>
                  <div className={styles.copy_head}>
                    <div className={styles.cav_lg} style={{ background: t.color }}>{t.initials}</div>
                    <div className={styles.copy_head_info}>
                      <div className={styles.copy_head_name}>
                        <span className={styles.copy_name_lg}>{t.name}</span>
                        <span className={styles.verified}><VscVerifiedFilled fontSize={20} />
                        </span>
                      </div>
                      <span className={styles.copy_spec_sm}>{t.spec} · {t.years}yr active</span>
                    </div>
                    <button
                      className={`${styles.follow_pill} ${isFollowing ? styles.follow_pill_on : ""}`}
                      onClick={() => handleFollow(t)}
                    >
                      {isFollowing ? <BiSolidUserCheck size={24} />
                        : <BiSolidUserPlus size={24} />
                      }
                    </button>
                  </div>
                  <div className={styles.copy_stats}>
                    <div className={styles.cs}><span className={styles.cs_l}>RETURN</span><span className={`${styles.cs_v} ${styles.up}`}>+{t.ret}%</span></div>
                    <div className={styles.cs}><span className={styles.cs_l}>MAX DD</span><span className={`${styles.cs_v} ${styles.dn}`}>{t.dd}%</span></div>
                    <div className={styles.cs}><span className={styles.cs_l}>WIN RATE</span><span className={styles.cs_v}>{t.winRate}%</span></div>
                    <div className={styles.cs}><span className={styles.cs_l}>TRADES</span><span className={styles.cs_v}>{t.trades}</span></div>
                  </div>
                  {isFollowing && (
                    <div className={styles.following_banner}>
                      ✓ Copying {t.name} — ${following[t.id]?.toFixed(2)} allocated
                    </div>
                  )}
                  <div className={styles.alloc_row}>
                    <label className={styles.alloc_label}>Allocate capital ($)</label>
                    <input
                      type="number" min="100"
                      className={styles.alloc_input}
                      value={allocInputs[t.id] ?? "500"}
                      onChange={e => setAllocInputs(prev => ({ ...prev, [t.id]: e.target.value }))}
                      disabled={isFollowing}
                    />
                  </div>
                  <button
                    className={`${styles.copy_action_btn} ${isFollowing ? styles.copy_stop : styles.copy_start}`}
                    onClick={() => handleFollow(t)}
                  >
                    {isFollowing ? "Stop Copying" : "Start Copying"}
                  </button>
                  <p className={styles.fine_print}>
                    Win rate {t.winRate}% across {t.trades.toLocaleString()} verified trades. Min. 18 months track record required by FARLO compliance.
                  </p>
                </div>
              );
            })}
          </div>

          <div className={`${styles.panel} ${styles.activity_panel}`}>
            <div className={styles.panel_head}>
              <span className={styles.panel_title}>Copy Activity Feed</span>
              <span className={styles.live_dot}>● Live</span>
            </div>
            <div className={styles.panel_body}>
              {activity.map(item => (
                <div key={item.id} className={styles.act_row}>
                  <ActivityIcon type={item.type} />
                  <div className={styles.act_info}>
                    <span className={styles.act_trader}>{item.trader}</span>
                    <span className={styles.act_action}>{item.action}</span>
                  </div>
                  <span className={styles.act_time}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
