import React from "react";
import "./Main.scss";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export default function Main() {
  return (
    <div className="portfolio-main">
      <div className="portfolio-introduction">
        <Card className="title-div">
          <Typography variant="h2" color="primary" id="main-title">
            Paul Brooks
          </Typography>
          <div className="portfolio-contact">
            <div className="portfolio-contact-top">
              <Typography variant="h6" color="secondary">
                385-335-9797
              </Typography>
              <Typography variant="h6" color="secondary">
                paulbrooks646@gmail.com
              </Typography>
            </div>
            <div className="portfolio-contact-bottom">
              <a href="https://linkedin.com/in/paulbrooks646">
                <Typography variant="h6" color="primary">
                  LinkedIn
                </Typography>
              </a>
              <a href="https://https://github.com/paulbrooks646">
                <Typography variant="h6" color="primary">
                  Github
                </Typography>
              </a>
              <a href="https://docs.google.com/document/d/1Ra_d5EcmzO577EGnFPjcIT4N1HfvwzEK5xy1V0PC3Wg/edit?usp=sharing">
                <Typography variant="h6" color="primary">
                  Resume
                </Typography>
              </a>
            </div>
          </div>
        </Card>
        <Card className="portfolio-description-div">
          <div className="portfolio-picture-div">
            <Card className="portfolio-picture"></Card>
          </div>
          <div className="about-me-div">
            <Typography variant="h6" color="secondary">
              About Me
            </Typography>
            <Typography variant="h6" color="primary" id="portfolio-description">
              I am a passionate web developer. I love both the creative and
              problem solving apsects of development. I eagerly use the things
              I've learned but am constantly looking to expand my knowledge and
              skills.
            </Typography>
          </div>
        </Card>
      </div>

      <Card className="portfolio-projects-div">
        <Typography variant="h6" color="secondary">
          Projects:
        </Typography>

        <div className="portfolio-projects">
          <a href="http://theandroidsdungeon.co" className="project-link">
            <Card id="simpsons"></Card>
            <Typography variant="h6" color="primary">
              The Android's Dungeon
            </Typography>
          </a>
          <a href="http://disneylandtripplanner.co" className="project-link">
            <Card id="disneyland"></Card>
            <Typography variant="h6" color="primary">
              Micksamize
            </Typography>
          </a>
          <a href="http://csstutorials.co" className="project-link">
            <Card id="css"></Card>
            <Typography variant="h6" color="primary">
              CSS Tutorials
            </Typography>
          </a>
        </div>
        <div className="melvins-div">
          <a href="http://thecodepound.com" className="project-link">
            <Card id="codepound"></Card>
            <Typography variant="h6" color="primary">
              The Code Pound
            </Typography>
          </a>
          <Link to="/Auth" className="project-link">
            <Card id="melvins"></Card>
            <Typography variant="h6" color="primary">
              Melvin's Quest
            </Typography>
          </Link>
        </div>
      </Card>
    </div>
  );
}
