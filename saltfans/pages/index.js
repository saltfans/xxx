import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

export default function Home() {
  const { data: session, status} = useSession();
  const loading = status === "loading";
  const {systemTheme, theme, setTheme} = useTheme();
  
  const [mounted, setMounted] = useState(false);
  useEffect(()=> setMounted(true), []);

  const renderThemeChanger = () => {
    if(!mounted) return null;

    const currentTheme = theme = 'system' ? systemTheme : theme;
    if (currentTheme === 'dark'){
      return (
        <SunIcon
          className="p-10 h-80"
          role="button"
          onClick={() => setTheme('light')}
        ></SunIcon>
      );
    }else{
      return (
        <MoonIcon
          className="p-10 h-80"
          role="button"
          onClick={() => setTheme('dark')}
        ></MoonIcon>
      );
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>SaltFanss</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="relative container dark:bg-blue-900 bg-rose-500 mx-auto">
          {!session && (
            <div className="grid h-80 zenta">
              <div className="bg-cover bg-[url('/pics/bg-log.jpg')] items-center justify-between">
              {renderThemeChanger()}
              </div>
              <div className="m-auto">
                <a onClick={signIn} className="text-center decoration-rose-900">Sign In</a>
              </div>
            </div>
          )}
          {session && (
            <>
              Signed in as {session.user.email} <br />
              <div>You can now access our super secret pages</div>
              <button>
                <Link href="/secret">To the secret</Link>
              </button>
              <button onClick={signOut}>sign out</button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
