import classes from "./Footer.module.css";
import GithubIcon from "../Icons/GithubIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import og from "../../assets/ogblack.svg";
import TuneTownTextBlack from "../../assets/TuneTownTextBlack.svg";

const Footer = () => {
  const year = new Date().getFullYear();

  const socials = [
    {
      id: 1,
      icon: <LinkedInIcon />,
      link: "https://www.linkedin.com/in/orcungurer/",
    },
    {
      id: 2,
      icon: <GithubIcon />,
      link: "https://github.com/orcungurer/",
    },
  ];

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
        {socials.map((social) => (
          <a key={social.id} href={social.link}>
            {social.icon}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
