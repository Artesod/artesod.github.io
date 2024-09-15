import React, {useEffect, useState} from "react";
import Style from "../scss/about-module.scss"
import Terminal from "./Terminal";
import { useInView } from "react-intersection-observer";
import Typical from "react-typical";

export default function Skills(props) {
  const {
    skills,
    sharedBasicInfo
  } = props
  const [showSecondPart, setShowSecondPart] = useState(false);
  const [showThirdPart, setShowThirdPart] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true 
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setShowSecondPart(true);
      }, 1500);

      const timer2 = setTimeout(() => {
        setShowThirdPart(true);
      }, 2500);

      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [inView]);


  let colors = ['rgb(0,255,164)', 'rgb(166,104,255)'];

  const skillsSection = (skill) => {
    const keyName = Object.keys(skill)[0];
    const values = skill[keyName];

    return (
      <div key={keyName}>
        <p style={{ color: colors[0] }}> {keyName}</p>
        <ul className="skills" style={{color: 'white'}}>
          {values.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  };

  function skillsText() {
    if (!inView) return null;

    return (
      <>
        <p  style={{color: 'white'}}>
          <span style={{ color: colors[0] }}>
            {sharedBasicInfo ? sharedBasicInfo.firstName.toLowerCase() : ""}
            {sharedBasicInfo ? sharedBasicInfo.lastName.toLowerCase() : ""} $
          </span>{' '}
          <Typical
            steps={["cd skills", 1000]}
            loop={1}
            wrapper="span"
          />
        </p>
        {
          showSecondPart && (
            <p style={{color: 'white'}}>
          <span style={{ color: colors[0] }}>
            skills <span className={Style.green}>(main)</span> $
          </span>{' '}
          <Typical
            steps={["ls", 1000]}
            loop={1}
            wrapper="span"
          />
        </p>
          )
        }
        {
          showThirdPart && (
            skills !== undefined ? Object.keys(skills).map((key) => {
              return skillsSection({ [key]: skills[key] });
            }) : <></>
          )
        }
      </>
    );
  }

  return (
    <section id="skills" ref={ref}>
      <Terminal text={skillsText()} {...props}/>
    </section>
  );
};