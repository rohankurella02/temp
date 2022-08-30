import React from "react";
// import "./Footer.css"
function Footer() {
  return (
    <footer className="bg-dark text-white text-center footer">
      <div className="wrapper mt-3">
        <small>
          @2022 <strong>Medicare meant for e-service</strong>, All Rights Reserved
          <nav className="footer-nav">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy</a>
        </nav>
        </small>
        
      </div>
    </footer>
  );
}

export default Footer;