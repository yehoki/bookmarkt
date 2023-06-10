import React from "react";
import Link from "next/link";
import Image from "next/image";
import githubLogo from "../github-mark.svg";
import styles from "../page.module.css";
type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
        Copyright © 2023 yehoki;
        <Link href="https://github.com/yehoki/">
          {/* <Image
            src={githubLogo}
            alt="Github logo"
          /> */}
        </Link>
    </footer>
  );
};

export default Footer;
