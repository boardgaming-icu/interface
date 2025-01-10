import jwt from "jsonwebtoken"
import cookie from 'cookie'
import Head from "next/head"
import styles from "../styles/Styles.module.css"
import { NextPageContext } from "next"
import { JWTUser, Props } from "@/types"
export default function Home({auth, cur_url}: Props) {
    if (auth) {
      return (
        <Head>
          <meta httpEquiv="refresh" content="0; url=/dash" />
        </Head>
      )
    }
    // Unauthed
    return (
      <div>
        <Head>
          <title>boardgaming.icu</title>
          <link rel="icon" href="./favicon.ico" />
        </Head>
        <main className={styles.main}>
          <span><img src="./ico_256x.png"></img><h1>boardgaming.icu</h1></span>
          <a href="./login">Login</a>
        </main>
      </div>
    )
}

Home.getInitialProps = async (ctx: NextPageContext): Promise<{props: Props}> => {
  const cookies = ctx.req?.headers.cookie
  if (!cookies) {
    return {
      props: {cookies: undefined, auth: false, decoded: undefined, cur_url:ctx.req?.headers.referer}
    }
  }
  let auth = false
  let parsed_cookies = cookie.parse(cookies)
  if(!parsed_cookies["gtkn"]) {
    return {props: {cookies: parsed_cookies, auth: false, decoded: undefined, cur_url: ctx.req?.headers.referer}}
  }
  //@ts-ignore
  let decoded = new JWTUser(parsed_cookies["bgicu_token"])
  return {
    props: {cookies: parsed_cookies, auth, decoded, cur_url: ctx.req?.headers.referer}
  }
}
