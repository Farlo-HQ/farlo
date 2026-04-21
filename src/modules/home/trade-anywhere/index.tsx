"use client"


import { qrCodeImg } from "@/assets/images";
import { AppStore2, PlayStore2 } from "@/assets/vectors";
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
        <ul className={styles.bullet}>
          <li>
            <span>MT5 Desktop</span> — full charting suite, custom indicators, multi-screen support
          </li>
          <li><span> MT5 Mobile</span> — iOS and Android, live quotes, one-tap order placement
          </li>
          <li> <span> MT5 Web</span> — no download required, runs in any browser on any device
          </li>
        </ul>
        <div className={styles.ctas} >
          {/* <AppStore2 />
          <PlayStore2 /> */}
          <Button variant="fill-white"> Download MT5</Button>
        </div>
      </div>
      <div className={styles.scan} >
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
