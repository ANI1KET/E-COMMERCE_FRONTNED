import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
// import GitHubIcon from '@mui/icons-material/GitHub';
import GitHubIcon from '@mui/icons-material/GitHub';
import photo from '../../../images/ANIKET.jpg';

const About = () => {
  const visitInstagram = () => {
    window.location = "https://github.com/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={photo}
              alt="Founder"
            />
            <Typography>Aniket Rouniyar</Typography>
            <Button onClick={visitInstagram}>
              <GitHubIcon />
            </Button>
            <span>
              This is a sample wesbite made by @AniketRouniyar.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://github.com/" target="blank">
              <GitHubIcon className="githubSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
