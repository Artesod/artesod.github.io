import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";

const Experience = ({ resumeExperience, resumeBasicInfo, lightMode }) => {
  const [work, setWork] = useState([]);
  const [sectionName, setSectionName] = useState("")

  useEffect(() => {
    if (resumeExperience && resumeBasicInfo) {
      const sn = resumeBasicInfo.section_name.experience;
      const workItems = resumeExperience.map((workItem, i) => {
        const technologies = workItem.technologies;

        const tech = technologies.map((technology, i) => (
          <Badge pill className="experience-badge mr-2 mb-2" key={i} style={{color: lightMode ? 'black' : 'white'}}>
            {technology}
          </Badge>
        ));

        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={workItem.years}
            iconStyle={{
              color: lightMode ? 'black' : 'white',
              textAlign: "center",
            }}
            icon={<i className={workItem.icon}></i>}
            key={i}
          >
            <h3
              className="vertical-timeline-element-title"
              style={{ textAlign: "left" }}
            >
              {workItem.title}
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{ textAlign: "left" }}
            >
              {workItem.company}
            </h4>
            <div style={{ textAlign: "left", marginTop: "15px" }}>{tech}</div>
          </VerticalTimelineElement>
        );
      });

      setWork(workItems);
      setSectionName(sn)
    }
  }, [resumeExperience, resumeBasicInfo, lightMode]);

  return (
    <section id="experience" className="pb-5">
      <div className="col-md-12 mx-auto">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: lightMode ? 'black' : 'white' }}>
            <span style={{ textAlign: "center" }}>
              {sectionName}
            </span>
          </h1>
        </div>
      </div>
      <div className="col-md-8 mx-auto">
        <VerticalTimeline>
          {work}
          <VerticalTimelineElement
            className="vertical-timeline-last"
            iconStyle={{
              color: lightMode ? 'black' : 'white',
              textAlign: "center",
            }}
            icon={
              <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
            }
          />
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Experience;