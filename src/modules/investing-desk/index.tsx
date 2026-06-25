"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { useDashboard } from "@/context/DashboardContext";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";


interface Holding {
  sym: string; name: string; shares: number; avg: number; cur: number; val: number; color: string;
}
interface PortManager {
  id: string; initials: string; name: string; strategy: string; annRet: number; ytd: number;
  dd: number; holdings: number; followers: number; color: string; style: string;
  topHoldings: { sym: string; pct: number }[];
}

const STOCKS: Record<string, { name: string; price: number; color: string }> = {
  "AAPL": { name: "Apple Inc.", price: 191.20, color: "#6366f1" },
  "NVDA": { name: "NVIDIA Corp.", price: 878.40, color: "#16a34a" },
  "SPY": { name: "SPDR S&P 500 ETF", price: 512.10, color: "#0D7A58" },
  "TSLA": { name: "Tesla Inc.", price: 175.50, color: "#CB1A36" },
  "MSFT": { name: "Microsoft Corp.", price: 419.80, color: "#3b82f6" },
  "AMZN": { name: "Amazon.com", price: 189.60, color: "#f59e0b" },
};

const MOVERS = [
  { sym: "MSFT", chg: "+2.4%", up: true }, { sym: "META", chg: "+3.1%", up: true },
  { sym: "AMZN", chg: "+1.8%", up: true }, { sym: "GOOGL", chg: "-0.6%", up: false },
  { sym: "TSLA", chg: "-1.2%", up: false },
];

const MANAGERS: PortManager[] = [
  {
    id: "gl", initials: "GL", name: "GrowthLab", strategy: "US Large-Cap Growth",
    annRet: 34.2, ytd: 12.8, dd: 11.4, holdings: 12, followers: 2140,
    color: "#CB1A36", style: "Growth",
    topHoldings: [{ sym: "NVDA", pct: 22 }, { sym: "AAPL", pct: 18 }, { sym: "MSFT", pct: 14 }, { sym: "META", pct: 11 }],
  },
  {
    id: "si", initials: "SI", name: "SteadyIncome", strategy: "Dividend & Value",
    annRet: 18.4, ytd: 7.2, dd: 5.8, holdings: 20, followers: 1820,
    color: "#0D7A58", style: "Dividend",
    topHoldings: [{ sym: "SPY", pct: 20 }, { sym: "JNJ", pct: 16 }, { sym: "KO", pct: 14 }, { sym: "VYM", pct: 12 }],
  },
];

const INITIAL_HOLDINGS: Holding[] = [
  { sym: "AAPL", name: "Apple Inc.", shares: 4, avg: 168.40, cur: 191.20, val: 764.80, color: "#6366f1" },
  { sym: "NVDA", name: "NVIDIA Corp.", shares: 2, avg: 620.00, cur: 878.40, val: 1756.80, color: "#16a34a" },
  { sym: "SPY", name: "SPDR S&P 500 ETF", shares: 3, avg: 490.00, cur: 512.10, val: 1536.30, color: "#0D7A58" },
  { sym: "TSLA", name: "Tesla Inc.", shares: 2, avg: 204.00, cur: 175.50, val: 351.00, color: "#CB1A36" },
];

function PortfolioChart({ holdings }: { holdings: Holding[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>([]);

  useEffect(() => {
    const totalVal = holdings.reduce((a, h) => a + h.val, 0) || 4000;
    const seed: number[] = [];
    let v = totalVal * 0.92;
    for (let i = 0; i < 60; i++) {
      v += (Math.random() - 0.44) * totalVal * 0.003;
      seed.push(v);
    }
    dataRef.current = seed;
    draw();
  }, [holdings]);

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
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#0D7A5840");
    grad.addColorStop(1, "#0D7A5800");
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 8) - 4;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#0D7A58"; ctx.lineWidth = 2; ctx.stroke();
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();
  };

  useEffect(() => {
    const i = setInterval(() => {
      const data = dataRef.current;
      if (!data.length) return;
      const last = data[data.length - 1];
      dataRef.current = [...data.slice(-59), last + (Math.random() - 0.44) * last * 0.003];
      draw();
    }, 900);
    return () => clearInterval(i);
  }, []);

  return <canvas ref={canvasRef} width={600} height={160} style={{ width: "100%", height: "160px", display: "block" }} />;
}

function CustomSelect({
  value,
  onChange,
  options,
  displayValue,
  resolveValue,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  displayValue?: string;
  resolveValue?: (opt: string) => string;
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

  const handleSelect = (opt: string) => {
    onChange(resolveValue ? resolveValue(opt) : opt);
    setOpen(false);
  };

  const isActive = (opt: string) =>
    resolveValue ? resolveValue(opt) === value : opt === value;

  return (
    <div className={styles.cselect_wrap} ref={ref}>
      <button
        type="button"
        className={styles.cselect_trigger}
        onClick={() => setOpen(o => !o)}
      >
        <span>{displayValue ?? value}</span>
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
              className={`${styles.cselect_option} ${isActive(opt) ? styles.cselect_option_active : ""}`}
              onClick={() => handleSelect(opt)}
            >

              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CopyInvestingUI() {
  const { wallets, trade } = useDashboard();
  const [holdings, setHoldings] = useState<Holding[]>(INITIAL_HOLDINGS);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [selectedSym, setSelectedSym] = useState("AAPL");
  const [shares, setShares] = useState("1");
  const [orderType, setOrderType] = useState("Market Order");
  const [limitPrice, setLimitPrice] = useState("");
  const [mirroring, setMirroring] = useState<Record<string, number>>({});
  const [allocInputs, setAllocInputs] = useState<Record<string, string>>({ gl: "500", si: "500" });
  const [activeTab, setActiveTab] = useState<"portfolio" | "mirror">("portfolio");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "warn" | "info" } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ sym: string; side: string; shares: string; price: number; total: number } | null>(null);

  const showToast = (msg: string, type: "success" | "warn" | "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const totalPortfolioValue = holdings.reduce((a, h) => a + h.val, 0);
  const totalCost = holdings.reduce((a, h) => a + h.avg * h.shares, 0);
  const totalReturn = totalPortfolioValue - totalCost;
  const totalReturnPct = totalCost > 0 ? ((totalReturn / totalCost) * 100).toFixed(2) : "0.00";
  const mirrorTotal = Object.values(mirroring).reduce((a, v) => a + v, 0);
  const mirrorCount = Object.keys(mirroring).length;

  const curPrice = STOCKS[selectedSym]?.price || 191.20;
  const estTotal = parseFloat(shares || "0") * curPrice;

  const placeOrder = () => {
    if (!shares || parseFloat(shares) < 1) { showToast("Enter a valid number of shares", "warn"); return; }
    setConfirmModal({ sym: selectedSym, side, shares, price: curPrice, total: estTotal });
  };

  const confirmOrder = async () => {
    if (!confirmModal) return;
    const { sym, side: s, shares: sh, price } = confirmModal;
    const numShares = parseInt(sh);
    const total = price * numShares;
    const stock = STOCKS[sym];
    if (s === "buy") {
      if (wallets.investing < total) { showToast("Insufficient investing balance", "warn"); setConfirmModal(null); return; }

      const ok = await trade({
        wallet: "investing",
        amount: -total,
        label: `Buy ${numShares}x ${sym} @ $${price.toFixed(2)}`,
      });

      if (!ok) { showToast("Insufficient investing balance", "warn"); setConfirmModal(null); return; }

      setHoldings(prev => {
        const existing = prev.find(h => h.sym === sym);
        if (existing) {
          return prev.map(h => h.sym === sym ? { ...h, shares: h.shares + numShares, val: (h.shares + numShares) * price } : h);
        }
        return [...prev, { sym, name: stock?.name || sym, shares: numShares, avg: price, cur: price, val: total, color: stock?.color || "#6366f1" }];
      });
      showToast(`✓ ${numShares}x ${sym} purchased @ $${price.toFixed(2)}`, "success");
    } else {
      const existing = holdings.find(h => h.sym === sym);
      if (!existing || existing.shares < numShares) { showToast(`You don't have ${numShares} shares of ${sym}`, "warn"); setConfirmModal(null); return; }
      const pnl = (price - existing.avg) * numShares;

      await trade({
        wallet: "investing",
        amount: total,
        label: `Sell ${numShares}x ${sym} @ $${price.toFixed(2)} — P&L ${pnl >= 0 ? "+" : ""}$${pnl.toFixed(2)}`,
      });

      setHoldings(prev => prev.map(h => h.sym === sym ? { ...h, shares: h.shares - numShares, val: (h.shares - numShares) * price } : h).filter(h => h.shares > 0));
      showToast(`✓ ${numShares}x ${sym} sold — P&L ${pnl >= 0 ? "+" : ""}$${pnl.toFixed(2)}`, pnl >= 0 ? "success" : "warn");
    }
    setConfirmModal(null);
  };

  const handleMirror = async (manager: PortManager) => {
    const alloc = parseFloat(allocInputs[manager.id] || "500");
    if (mirroring[manager.id]) {
      const refund = mirroring[manager.id];
      await trade({ wallet: "investing", amount: refund, label: `Stopped mirroring ${manager.name} — capital returned` });
      setMirroring(prev => { const n = { ...prev }; delete n[manager.id]; return n; });
      showToast(`Stopped mirroring ${manager.name}`, "warn");
    } else {
      if (alloc > wallets.investing) { showToast("Insufficient investing balance", "warn"); return; }
      const ok = await trade({ wallet: "investing", amount: -alloc, label: `Mirroring ${manager.name} — capital allocated` });
      if (!ok) { showToast("Insufficient investing balance", "warn"); return; }
      setMirroring(prev => ({ ...prev, [manager.id]: alloc }));
      showToast(`✓ Mirroring ${manager.name} — $${alloc} allocated`, "success");
    }
  };

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
            <h3 className={styles.modal_title}>Confirm {confirmModal.side === "buy" ? "Purchase" : "Sale"}</h3>
            <p className={styles.modal_sub}>Review before executing</p>
            <div className={styles.modal_rows}>
              {[
                ["Stock", confirmModal.sym], ["Action", confirmModal.side === "buy" ? "Buy" : "Sell"],
                ["Shares", confirmModal.shares], ["Price", `$${confirmModal.price.toFixed(2)}`],
                ["Total", `$${confirmModal.total.toFixed(2)}`],
              ].map(([k, v]) => (
                <div key={k} className={styles.modal_row}>
                  <span>{k}</span>
                  <span className={k === "Action" ? (confirmModal.side === "buy" ? styles.buy_color : styles.sell_color) : ""}>{v}</span>
                </div>
              ))}
            </div>
            <div className={styles.modal_btns}>
              <button className={styles.modal_cancel} onClick={() => setConfirmModal(null)}>Cancel</button>
              <button className={`${styles.modal_confirm} ${confirmModal.side === "buy" ? styles.confirm_invest : styles.confirm_sell}`} onClick={confirmOrder}>
                Confirm {confirmModal.side === "buy" ? "Purchase" : "Sale"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={styles.page_header}>
        <div>
          <h1 className={styles.page_title}>
            Portfolio & Investing
            <span className={styles.mode_badge}>Investing Mode</span>
          </h1>
          <p className={styles.page_sub}>US stocks, ETFs · Buy/Sell · Mirror top portfolios</p>
        </div>
        <div className={styles.header_tabs}>
          <button className={`${styles.htab} ${activeTab === "portfolio" ? styles.htab_active : ""}`} onClick={() => setActiveTab("portfolio")}>My Portfolio</button>
          <button className={`${styles.htab} ${activeTab === "mirror" ? styles.htab_active : ""}`} onClick={() => setActiveTab("mirror")}>Portfolio Mirror</button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats_row}>
        <div className={styles.scard}>
          <p className={styles.sc_l}>PORTFOLIO VALUE</p>
          <p className={styles.sc_v}>${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className={`${styles.sc_c} ${styles.up}`}>+$210 today</p>
        </div>
        <div className={styles.scard}>
          <p className={styles.sc_l}>TOTAL RETURN</p>
          <p className={`${styles.sc_v} ${totalReturn >= 0 ? styles.up : styles.dn}`}>{totalReturn >= 0 ? "+" : ""}${totalReturn.toFixed(2)}</p>
          <p className={`${styles.sc_c} ${totalReturn >= 0 ? styles.up : styles.dn}`}>{totalReturn >= 0 ? "+" : ""}{totalReturnPct}% all-time</p>
        </div>
        <div className={styles.scard}>
          <p className={styles.sc_l}>HOLDINGS</p>
          <p className={styles.sc_v}>{holdings.length}</p>
          <p className={styles.sc_c}>US equities</p>
        </div>
        <div className={styles.scard}>
          <p className={styles.sc_l}>MIRROR ALLOCATED</p>
          <p className={styles.sc_v}>${mirrorTotal.toLocaleString()}</p>
          <p className={`${styles.sc_c} ${mirrorCount > 0 ? styles.up : ""}`}>{mirrorCount} {mirrorCount === 1 ? "portfolio" : "portfolios"}</p>
        </div>
      </div>

      {activeTab === "portfolio" ? (
        <div className={styles.main_grid}>
          <div className={styles.left_col}>
            {/* Portfolio chart */}
            <div className={styles.panel}>
              <div className={styles.panel_head}>
                <span className={styles.panel_title}>Portfolio Performance</span>
                <div className={styles.timeframe_row}>
                  {["1M", "3M", "6M", "1Y", "All"].map(tf => <span key={tf} className={styles.tf}>{tf}</span>)}
                </div>
              </div>
              <div className={styles.panel_body}>
                <div className={styles.price_row}>
                  <span className={styles.port_value}>${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  <span className={`${styles.port_return} ${styles.up}`}>▲ +{totalReturnPct}% all-time</span>
                </div>
                <PortfolioChart holdings={holdings} />
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panel_head}>
                <span className={styles.panel_title}>Holdings ({holdings.length})</span>
                <span className={styles.panel_action}><FaPlus /> Add position</span>
              </div>
              <div className={styles.panel_body}>
                {holdings.length === 0 ? (
                  <p className={styles.empty_msg}>No holdings yet — buy your first stock.</p>
                ) : (
                  holdings.map(h => {
                    const pnl = (h.cur - h.avg) * h.shares;
                    const pct = ((h.cur - h.avg) / h.avg * 100).toFixed(1);
                    return (
                      <div key={h.sym} className={styles.holding_row}>
                        <div className={styles.holding_left}>
                          <div className={styles.h_ico} style={{ background: h.color + "20", color: h.color }}>{h.sym}</div>
                          <div>
                            <p className={styles.h_name}>{h.name}</p>
                            <p className={styles.h_meta}>{h.shares} shares · avg ${h.avg.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className={styles.h_mid}><p className={styles.h_cur}>${h.cur.toFixed(2)}</p></div>
                        <div className={styles.h_right}>
                          <p className={styles.h_val}>${h.val.toFixed(2)}</p>
                          <p className={pnl >= 0 ? styles.up : styles.dn}>{pnl >= 0 ? "+" : ""}${Math.abs(pnl).toFixed(2)} ({pnl >= 0 ? "+" : ""}{pct}%)</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className={styles.right_col}>
            {/* Buy/Sell form */}
            <div className={styles.panel}>
              <div className={styles.panel_head}>
                <span className={styles.panel_title}>Buy / Sell Stock</span>
              </div>
              <div className={styles.panel_body}>
                <div className={styles.order_tabs}>
                  <button className={`${styles.otab} ${side === "buy" ? styles.otab_invest : ""}`} onClick={() => setSide("buy")}>Buy</button>
                  <button className={`${styles.otab} ${side === "sell" ? styles.otab_sell : ""}`} onClick={() => setSide("sell")}>Sell</button>
                </div>
                <div className={styles.ofield}>
                  <label>Stock / ETF</label>
                  <CustomSelect
                    value={selectedSym}
                    onChange={setSelectedSym}
                    options={Object.entries(STOCKS).map(([sym, s]) => `${sym} — ${s.name}`)}
                    displayValue={`${selectedSym} — ${STOCKS[selectedSym]?.name}`}
                    resolveValue={(opt) => opt.split(" — ")[0]}
                  />

                </div>
                <div className={styles.ofield}>
                  <label>Order type</label>
                  <CustomSelect
                    value={orderType}
                    onChange={setOrderType}
                    options={["Market Order", "Limit Order", "Stop Order"]}
                  />
                </div>
                <div className={styles.ofield}>
                  <label>Shares</label>
                  <input type="number" min="1" value={shares} onChange={e => setShares(e.target.value)} className={styles.oinput} />
                </div>
                {orderType === "Limit Order" && (
                  <div className={styles.ofield}>
                    <label>Limit Price</label>
                    <input type="number" value={limitPrice} onChange={e => setLimitPrice(e.target.value)} placeholder="e.g. 188.00" className={styles.oinput} />
                  </div>
                )}
                <div className={styles.order_est}>
                  <div className={styles.est_row}><span>Current price</span><span>${curPrice.toFixed(2)}</span></div>
                  <div className={styles.est_row}><span>Estimated total</span><span>${estTotal.toFixed(2)}</span></div>
                  <div className={styles.est_row}><span>Available cash</span><span className={styles.up}>${wallets.investing.toLocaleString()}</span></div>
                </div>
                <button className={`${styles.order_btn} ${side === "buy" ? styles.order_btn_invest : styles.order_btn_sell}`} onClick={placeOrder}>
                  {side === "buy" ? `Buy ${selectedSym}` : `Sell ${selectedSym}`}
                </button>
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panel_head}>
                <span className={styles.panel_title}>Market Movers</span>
                <span className={styles.live_dot}>● Live</span>
              </div>
              <div className={styles.panel_body}>
                {MOVERS.map(m => (
                  <div key={m.sym} className={styles.mover_row}>
                    <span className={styles.mover_sym}>{m.sym}</span>
                    <span className={m.up ? styles.up : styles.dn}>{m.chg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.mirror_grid}>
            {MANAGERS.map(manager => {
              const isMirroring = !!mirroring[manager.id];
              return (
                <div key={manager.id} className={`${styles.mirror_card} ${isMirroring ? styles.mirror_card_active : ""}`}>
                  <div className={styles.mirror_head}>
                    <div className={styles.m_av} style={{ background: manager.color }}>{manager.initials}</div>
                    <div className={styles.mirror_info}>
                      <div className={styles.mirror_name_row}>
                        <span className={styles.mirror_name}>{manager.name}</span>
                        <span className={styles.verified}><VscVerifiedFilled fontSize={20} /> </span>
                        <span className={styles.style_badge} style={{ color: manager.color, background: manager.color + "15" }}>{manager.style}</span>
                      </div>
                      <span className={styles.mirror_strat}>{manager.strategy}</span>
                    </div>
                    <div className={styles.mirror_return}>
                      <span className={styles.up}>+{manager.annRet}%</span>
                      <span className={styles.mirror_ret_label}>Annual</span>
                    </div>
                  </div>
                  <div className={styles.mirror_stats}>
                    <div className={styles.ms}><span className={styles.ms_l}>MAX DD</span><span className={`${styles.ms_v} ${styles.dn}`}>{manager.dd}%</span></div>
                    <div className={styles.ms}><span className={styles.ms_l}>YTD</span><span className={`${styles.ms_v} ${styles.up}`}>+{manager.ytd}%</span></div>
                    <div className={styles.ms}><span className={styles.ms_l}>HOLDINGS</span><span className={styles.ms_v}>{manager.holdings}</span></div>
                    <div className={styles.ms}><span className={styles.ms_l}>FOLLOWERS</span><span className={styles.ms_v}>{manager.followers.toLocaleString()}</span></div>
                  </div>
                  {/* Top holdings bars */}
                  <div className={styles.top_holdings}>
                    <p className={styles.th_title}>Top Holdings</p>
                    {manager.topHoldings.map(h => (
                      <div key={h.sym} className={styles.th_row}>
                        <span className={styles.th_sym}>{h.sym}</span>
                        <div className={styles.th_bar_wrap}><div className={styles.th_bar} style={{ width: `${h.pct}%`, background: manager.color + "80" }} /></div>
                        <span className={styles.th_pct}>{h.pct}%</span>
                      </div>
                    ))}
                  </div>
                  {isMirroring && (
                    <div className={styles.mirror_banner}>✓ Mirroring {manager.name} — ${mirroring[manager.id]?.toFixed(2)} allocated</div>
                  )}
                  <div className={styles.alloc_row}>
                    <label className={styles.alloc_label}>Allocation (USD)</label>
                    <input type="number" min="100" className={styles.alloc_input} value={allocInputs[manager.id] ?? "500"}
                      onChange={e => setAllocInputs(prev => ({ ...prev, [manager.id]: e.target.value }))} disabled={isMirroring} />
                  </div>
                  <button className={`${styles.mirror_btn} ${isMirroring ? styles.mirror_stop : styles.mirror_start}`} onClick={() => handleMirror(manager)}>
                    {isMirroring ? "Stop Mirroring" : "Mirror this Portfolio"}
                  </button>
                  <p className={styles.fine_print}>Holdings replicated proportionally · Auto-rebalanced · Real US securities via Alpaca</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}