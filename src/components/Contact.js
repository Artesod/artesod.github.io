import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Typical from "react-typical";
import Style from "../scss/about-module.scss";
import Terminal from "./Terminal";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';

const Contact = (props) => {
  const {
    sharedBasicInfo,
    lightMode
  } = props
  const [showForm, setShowForm] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [formStatus, setFormStatus] = useState('');
  const formRef = useRef();
  const recaptchaRef = useRef();

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setShowForm(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [inView]);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!captchaToken) {
        setFormStatus('Please complete the reCAPTCHA');
        return;
    }  

    emailjs.sendForm('service_o2audz8', 'template_emt9njd', formRef.current, 'xPkJW_xWB9tJ-s1zB')
      .then((result) => {
          console.log(result.text);
          setFormStatus('Message sent successfully!');
          formRef.current.reset();
          recaptchaRef.current.reset();
          setCaptchaToken(null);
      }, (error) => {
          console.log(error.text);
          setFormStatus('Failed to send message. Please try again.');
      });
  };

  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const colors = ["rgb(0,255,164)", "rgb(166,104,255)"];

  const contactText = () => {
    if (!inView) return null;

    return (
      <>
        <p style={{ color: "white" }}>
          <span style={{ color: colors[0] }}>
            {sharedBasicInfo ? sharedBasicInfo.firstName.toLowerCase() : ""}
            {sharedBasicInfo ? sharedBasicInfo.lastName.toLowerCase() : ""} $
          </span>{" "}
          <Typical steps={["sudo systemctl start contact.service", 1000]} loop={1} wrapper="span" />
        </p>
        {showForm && (
          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <input type="text" name="user_name" placeholder="Name" required />
            <input type="email" name="user_email" placeholder="Email" required />
            <textarea name="message" placeholder="Message" required></textarea>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lct70QqAAAAABjnpG7gF6Ka3sW3hv2dqHuoNhYz"
              onChange={onCaptchaChange}
            />
            <button type="submit" className={Style.green}>
              Send Message
            </button>
            {formStatus && <p className="form-status" style={{ color: "white" }}>{formStatus}</p>}
          </form>
        )}
      </>
    );
  };

  return (
    <section id="contact" ref={ref}>
      <div className="col-md-12" style = {{width: '90%'}}>
        <h1 className="section-title" style={{ color: lightMode ? "black" : "white" }}>
          <span>Contact Me</span>
        </h1>
      </div>
    <Terminal text={contactText()} {...props}/>

    </section>
  );
};

export default Contact;