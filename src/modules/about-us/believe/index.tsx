import React from 'react'
import styles from "./styles.module.scss";
import { Section } from '@/components'



const Believe = () => {
  return (
    <Section sectionClassName={styles.section}>
      <div className={styles.header} >
        <p className={styles.header__tag} >What we believe</p>
        <h2 className={styles.header__ttl}>
          <span>We believe that geography should not determine financial opportunity.</span>
          <span>We believe that one platform should serve the full journey from first trade to long-term wealth.</span>
          <span>We believe that trust is earned through transparency, not marketing language.</span>
        </h2>
      </div>
    </Section>
  )
}

export default Believe
