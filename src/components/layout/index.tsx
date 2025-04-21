"use client";
import React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import styles from "./styles.module.scss";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
