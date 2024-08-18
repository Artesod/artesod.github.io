import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./App.scss";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { Parallax } from 'react-scroll-parallax';
import Navbar from "./components/Navbar";

const App = () => {
  const [resume, setResume] = useState({})
  const [info, setInfo] = useState({})
  const [lightMode, setLightMode] = useState(false)
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {

    const loadSharedData = () => {
      $.ajax({
        url: `portfolio_shared_data.json`,
        dataType: "json",
        cache: false,
        success: function (data) {
          setInfo(data)
        },
        error: function (xhr, status, err) {
          alert(err);
        },
      });
    };

    const loadResumeFromPath = (path) => {
      $.ajax({
        url: path,
        dataType: "json",
        cache: false,
        success: function (data) {
          setResume(data)
        },
        error: function (xhr, status, err) {
          alert(err);
        },
      });
    };

    loadSharedData();
    loadResumeFromPath("resume.json");
  }, []);

  const onThemeSwitchChange = (checked) => {
    setChecked(checked);
    setTheme();
  };

  const setTheme = () => {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    let mode = body.getAttribute(dataThemeAttribute)
    var newTheme =
      mode === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
    setLightMode(newTheme === "light" ? true : false)

  };

    return (
      <div>
        <Navbar lightMode={lightMode} setLightMode={setLightMode} checked={checked} setChecked={setChecked} onThemeSwitchChange={onThemeSwitchChange}/>
        <div className="main-content">
          <Home sharedData={ info ? info.basic_info : {}} lightMode = {lightMode} setLightMode = {setLightMode}
          checked = {checked} setChecked = {setChecked} onThemeSwitchChange = {onThemeSwitchChange}
          ></Home>
          <About
            resumeBasicInfo={resume ? resume.basic_info : {}}
            sharedBasicInfo={ info ? info.basic_info : {}}
            lightMode = {lightMode} setLightMode = {setLightMode}
          />
          <Projects
            resumeProjects={resume.projects ? resume.projects : []}
            resumeBasicInfo={resume.basic_info}
          />
          <Skills
            sharedBasicInfo={ info ? info.basic_info : {}}
            skills={ info ? info.skills : {}}
            lightMode = {lightMode}
          />
          <Experience
            resumeExperience={resume.experience ? resume.experience : []}
            resumeBasicInfo={resume.basic_info}
            lightMode = {lightMode}
          />
          <Footer sharedBasicInfo={info ? info.basic_info : {}} lightMode = {lightMode}/>
        </div>
      </div>
    );
};

export default App;