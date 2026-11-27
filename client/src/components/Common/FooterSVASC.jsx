import React from "react";
import styles from "./FooterSvasc.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBox}>
          <div className={styles.footerIcon}>
            <i className="fa-solid fa-mobile-screen-button"></i>
          </div>
          <span>MOBILE</span>
          <strong>+91 9150868666</strong>
          <strong>+91 9865066242</strong>
        </div>

        <div className={styles.footerBox}>
          <div className={styles.footerIcon}>
            <i className="fa-solid fa-phone"></i>
          </div>
          <span>PHONE</span>
          <strong>+91 9150868666</strong>
          <strong>+91 9865066242</strong>
        </div>

        <div className={styles.footerBox}>
          <div className={styles.footerIcon}>
            <i className="fa-regular fa-envelope"></i>
          </div>
          <span>EMAIL</span>
          <strong>principal@svasc.org</strong>
        </div>
      </div>

      <div className={styles.footerSocial}>
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
      </div>

      <div className={styles.footerBottom}>
        © 2025 <strong>SVASC</strong> | Developed by <strong>Procols</strong>
      </div>
    </footer>
  );
}
