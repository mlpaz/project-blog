"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";
import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";
import Cookies from "js-cookie";
import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";
import styles from "./Header.module.css";
import Link from "next/link";

function Header({ initTheme = "light", className, ...delegated }) {
  const [theme, setTheme] = React.useState(initTheme);
  function handlerClick() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    Cookies.set("color-theme", nextTheme);
    const root = document.documentElement;
    root.setAttribute("data-color-theme", nextTheme);
    const tokens = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />
      <div className={styles.actions}>
        <button className={styles.action}>
          <Link href="/rss.xml">
            <Rss
              size="1.5rem"
              style={{
                // Optical alignment
                transform: "translate(2px, -2px)",
              }}
            />
          </Link>
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button onClick={handlerClick} className={styles.action}>
          {theme === "light" && <Sun size="1.5rem" />}
          {theme === "dark" && <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
