import classes from "./Footer.module.css";
import GithubIcon from "../Icons/GithubIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import og from "../../assets/ogblack.svg";
import TuneTownTextBlack from "../../assets/TuneTownTextBlack.svg";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <div className={classes.brand}>
        <img src={og} alt="logo" />
        <span>©{year}</span>
      </div>
      <div className={classes.slogan}>
        <p>«Tune into the sounds of your imagination»</p>
        <img src={TuneTownTextBlack} alt="TuneTownTextBlack" />
      </div>
      <div className={classes.links}>
        <a href="https://www.linkedin.com/in/orcungurer/">
          <LinkedInIcon />
        </a>
        <a href="https://github.com/orcungurer/">
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
