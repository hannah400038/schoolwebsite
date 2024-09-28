import React from 'react';
import { Link } from 'react-router-dom'; // Keep this import even without full routing
// import heroImage from './heroimage.png';
import indoorGames from './assets/indoor-games.jpg';
import outdoorGames from './assets/outdoor-games.jpg';
import campingKids from './assets/camping-kids.jpg';
import aboutImage from './assets/about-image.jpg'; // Import the image separately

import janeDoe from './assets/jane-doe.jpg';
import johnSmith from './assets/john-smith.jpg';
import emilyJohnson from './assets/emily-johnson.jpg';
import michaelBrown from './assets/michael-brown.jpg';
import './all.css';

const All = ({ handleDashboardClick }) => {
    // Error handling function for navigation to home
    const navigateToHome = () => {
        try {
            handleDashboardClick();
        } catch (error) {
            console.error("Error navigating to home:", error);
            alert("An error occurred while navigating to the home page. Please try again later.");
        }
    };

    return (
        <>
            {/* Navigation Bar */}
            <nav className="navbar">
                <Link to="/" className="logo">hilaac school</Link>
                <ul className="nav-links">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="#about" className="nav-link">About</Link></li>
                    <li><Link to="#teachers" className="nav-link">Teachers</Link></li>
                    <li><Link to="#contact" className="nav-link">Contact</Link></li>
                </ul>
                <button className="dashboard-button" onClick={navigateToHome}>Dashboard</button>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>Welcome</h1>
                        <p>
                          to our school! <br />
                          Discover fun activities that spark curiosity.  <br />
                          Join our community and build a bright future together!
                      </p>                      
                       <button className="learn-more">Learn More</button>
                    </div>
                </div>
            </section>

            {/* Feature Cards Section */}
            <h1 style={{ textAlign: "center", color: "#1e3a8a" }}>Our Activities</h1>
            <section className="features">
                <div className="feature-card">
                    <img src={indoorGames} alt="Indoor Games" style={{ width: "100%", height: "auto",  marginBottom: "8px" }} />
                    <h2>Indoor Games</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="feature-card">
                    <img src={outdoorGames} alt="Outdoor Games and Events" style={{ width: "100%", height: "auto",  marginBottom: "8px" }} />
                    <h2>Outdoor Games and Events</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="feature-card">
                    <img src={campingKids} alt="Camping for Kids" style={{ width: "100%", height: "auto",  marginBottom: "8px" }} />
                    <h2>Camping for Kids</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </section>
{/* About Us Section */}
<section className="about" id="about">
    <h2>About Us</h2>
    <div className="about-content">
        <img src={aboutImage} alt="About Us" className="about-image" />
        <p>
            At our school, we believe in nurturing young minds.<br />
            Our dedicated teachers inspire creativity and curiosity.<br />
            We offer a wide range of engaging activities.<br />
            Our goal is to develop lifelong learners and leaders.<br />
            Join us in creating a bright future for all!
        </p>
    </div>
</section>

            {/* Teachers Section */}
            <section className="teachers" id="teachers">
                <h2>Meet Our Teachers</h2>
                <div className="teacher-grid">
                    <div className="teacher">
                        <img src={janeDoe} alt="Teacher 1" />
                        <h3>Jane Doe</h3>
                        <p>Mathematics</p>
                    </div>
                    <div className="teacher">
                        <img src={johnSmith} alt="Teacher 2" />
                        <h3>John Smith</h3>
                        <p>Science</p>
                    </div>
                    <div className="teacher">
                        <img src={emilyJohnson} alt="Teacher 3" />
                        <h3>Emily Johnson</h3>
                        <p>History</p>
                    </div>
                        <div className="teacher">
                        <img src={michaelBrown} alt="Teacher 3" />
                        <h3>Emily Johnson</h3>
                        <p>History</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact" id="contact">
                <div className="contact-content">
                    <h2>Contact Us</h2>
                    <form>
                        <input type="text" placeholder="Name" required />
                        <input type="tel" placeholder="Phone Number" required />
                        <input type="email" placeholder="Email" required />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default All;