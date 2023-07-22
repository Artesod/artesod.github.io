import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import angularIcon from "@iconify/icons-logos/javascript";
import reactIcon from "@iconify/icons-logos/java";
import vueIcon from "@iconify/icons-logos/python";
import Terminal from "./Terminal";
import Style from "../scss/about-module.scss"

const About = (props) => {
  const {
    sharedBasicInfo,
    resumeBasicInfo
  } = props
  const [profilepic, setProfilepic] = useState("");
  const [about, setAbout] = useState("");

  let colors = ['rgb(0,255,164)', 'rgb(166,104,255)'];

  useEffect(() => {
    if (sharedBasicInfo) {
      setProfilepic("images/" + sharedBasicInfo.image);
    }
    if (resumeBasicInfo) {
      setAbout(resumeBasicInfo.description);
    }
  }, [sharedBasicInfo, resumeBasicInfo]);

  function aboutMeText() {
    return (
      <>
        <p style={{color: 'white'}}>
          <span style={{ color: colors[0] }}>
            {sharedBasicInfo ? sharedBasicInfo.firstName.toLowerCase() : ""}
            {sharedBasicInfo ? sharedBasicInfo.lastName.toLowerCase() : ""} $
          </span>{' '}
          cat about{sharedBasicInfo ? sharedBasicInfo.firstName : ""}{' '}
        </p>
        <p style={{color: 'white'}}>
          <span style={{ color: colors[0] }}>
            about{sharedBasicInfo ? sharedBasicInfo.firstName : ""} <span className={Style.green}>(main)</span> ${' '}
          </span>
          {about}
        </p>
      </>
    );
  }


    return (
      <section id="about">
        <div className = "about_polaroid">
          <div className="row center mx-auto mb-5">
            <div className="col-md-1 mb-5 center">
              <div className="polaroid">
                <span style={{ cursor: "auto" }}>
                  <img
                    height="175px"
                    width = "500px"
                    src={profilepic}
                    alt="Avatar placeholder"
                  />
                  <Icon
                    icon={angularIcon}
                    style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                  />
                  <Icon
                    icon={reactIcon}
                    style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                  />
                  <Icon
                    icon={vueIcon}
                    style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <Terminal text={aboutMeText()} {...props}/>

      </section>
    );
}

export default About;
