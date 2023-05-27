import "./Footer.css";
import logo from "../../assets/images/lion.jpeg";
const Footer = () => {
  return (
    <footer>
      <div className="copyright-container">
        <img className="logo" src={logo} alt="logo"></img>
        <span id="copyright-text" className="copyright">SNU LION 2023</span>
      </div>
    </footer>
  );
}

export default Footer;