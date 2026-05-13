"use client"


import { qrCodeImg } from "@/assets/images";
import { AppStore2, PlayStore2 } from "@/assets/vectors";
import { Section } from "@/components";
import Image from "next/image";
import styles from "./styles.module.scss";

const TradeAnywhere = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div>
        <h4 className={styles.ttl}>Trade anytime, <br /> anywhere, on any device.</h4>
        <p className={styles.txt}>
          Never miss a market move, FarloFX gives you seamless access to trading
          on desktop, mobile, and tablet.
        </p>
        <div className={styles.ctas} >
          <AppStore2 />
          <PlayStore2 />
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
