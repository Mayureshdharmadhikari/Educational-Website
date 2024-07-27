import React, { useState } from 'react';
import './Contact.css';
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';
import white_arrow from '../../assets/white-arrow.png';

const Contact = () => {
  const [result, setResult] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending....');
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      message: event.target.message.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult('Form Submitted Successfully');
        event.target.reset();

        // Clear the message after 3 seconds
        setTimeout(() => {
          setResult('');
        }, 3000);
      } else {
        console.log('Error', data);
        setResult(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResult('An error occurred while submitting the form');

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setResult('');
      }, 3000);
    }
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3>
          Send us a message <img src={msg_icon} alt="" />
        </h3>
        <p>
          Feel free to reach out through contact form or find our contact
          information below. Your feedback, questions, and suggestions are
          important to us as we strive to provide exceptional service to our
          university community.
        </p>
        <ul>
          <li>
            <img src={mail_icon} alt="" /> contact@msd123.in
          </li>
          <li>
            <img src={phone_icon} alt="" />+9 12-345-56
          </li>
          <li>
            <img src={location_icon} alt="" />735, Central Road, Bombay
            highway, Delhi
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type="text" name="name" placeholder="Enter your name" required />
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" required />
          <label>Write your message here</label>
          <textarea name="message" rows="6" placeholder="Enter your message" required></textarea>
          <button className="btn dark-btn">
            Submit Now <img src={white_arrow} alt="" />
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
