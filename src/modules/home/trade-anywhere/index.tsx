

"use client"

import { qrCodeImg } from "@/assets/images";
import { Button, Section } from "@/components";
import Image from "next/image";
import styles from "./styles.module.scss";

const TradeAnywhere = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div>
        <h4 className={styles.ttl}>Your platform. <br /> Any device. Every market.</h4>
        <p className={styles.txt}>
          MT5 Desktop for power traders. MT5 Mobile for traders on the move. MT5 Web for instant access from any browser. All three sync in real time.
        </p>
        <div className={styles.platforms}>
          <div className={styles.platform}>
            <span className={styles.platform__name}>MT5 Desktop</span>
            <span className={styles.platform__desc}>Full charting suite, custom indicators, multi-screen support</span>
          </div>
          <div className={styles.platform}>
            <span className={styles.platform__name}>MT5 Mobile</span>
            <span className={styles.platform__desc}>iOS and Android, live quotes, one-tap order placement</span>
          </div>
          <div className={styles.platform}>
            <span className={styles.platform__name}>MT5 Web</span>
            <span className={styles.platform__desc}>No download required, runs in any browser on any device</span>
          </div>
        </div>
        <div className={styles.ctas}>
          <Button variant="fill-white">Download MT5</Button>
        </div>
      </div>
      <div className={styles.scan}>
        <p>OR SCAN TO DOWNLOAD</p>
        <Image
          src={qrCodeImg}
          width={200}
          height={200}
          alt="QR code to download"
        />
      </div>
    </Section>
  );
};

export { TradeAnywhere };
