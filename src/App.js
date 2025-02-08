import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState, useEffect } from "react";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/aos/aos.css";
import "./assets/vendor/glightbox/css/glightbox.min.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import "./assets/css/main.css";


function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [otherOccupation, setOtherOccupation] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration (in ms)
      easing: "ease-in-out", // Animation easing
      once: true, // Whether animation should happen only once
      mirror: false // Animation on scroll when element is already visible
    });
  }, []);

  // Effect to toggle "Other Occupation" field visibility
  useEffect(() => {
    if (occupation !== "Other") {
      setOtherOccupation("");
    }
  }, [occupation]);

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    let finalOccupation = occupation === "Other" ? otherOccupation.trim() : occupation;

    // Input validations
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!nameRegex.test(name)) {
      alert("Name should contain only letters and spaces (min 2 characters).");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert("Phone number should be 10 digits and start with 6, 7, 8, or 9.");
      return;
    }

    setLoading(true);

    const formData = { name, email, phone, occupation: finalOccupation, organization };

    try {
      const response = await fetch("https://api.flowt.co.in/v1/pre-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        setName("");
        setEmail("");
        setPhone("");
        setOccupation("");
        setOtherOccupation("");
        setOrganization("");
      } else {
        alert("Failed to register. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="#" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">Flowt</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#hero" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#team">Team</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="btn-getstarted" href="#preregistration">
            Get Started
          </a>
        </div>
      </header>

      <main className="main">
        {/* Hero section */}
        <section id="hero" className="hero section dark-background vh-100 d-flex align-items-center">
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
                data-aos="zoom-out"
              >
                <h1>AI Meets Accounting</h1>
                <ul>
                  <li>Purchase and sales entries in seconds</li>
                  <li>No errors</li>
                  <li>End-to-end encrypted</li>
                </ul>
                <div className="d-flex">
                  <a href="#preregistration" className="preregisterbtn">
                    Get Started
                  </a>
                </div>
              </div>
              <div
                className="col-lg-6 order-1 order-lg-2 hero-img"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <img
                  src="assets/img/hero-img.png"
                  className="img-fluid animated"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>


        {/* Preregister section */}
        <section id="preregistration" className="preregistration section">
          <div className="container">
            <div className="row gy-4 justify-content-center">
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                data-aos="zoom-out"
              >
                <h1>Pre-Register Now</h1>
                <p>Secure your spot by providing your details below.</p>
                <form id="preregistration-form" className="w-50" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      className="form-control w-100"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="form-control w-100"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Phone"
                      className="form-control w-100"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 position-relative">
                    <select
                      id="occupation"
                      className="form-select w-100"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Occupation
                      </option>
                      <option value="Charted Accountant">Chartered Accountant</option>
                      <option value="Freelancer Accountant">Freelancer Accountant</option>
                      <option value="Employed Accountant">Employed Accountant</option>
                      <option value="Business Owner">Business Owner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    {occupation === 'Other' && (
                      <input
                        type="text"
                        id="other-occupation"
                        placeholder="Other Occupation"
                        className="form-control w-100"
                        value={otherOccupation}
                        onChange={(e) => setOtherOccupation(e.target.value)}
                        required
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      id="organization"
                      placeholder="Organization"
                      className="form-control w-100"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="preregisterbtn w-50"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>


        {/* About section */}
        <section id="about" className="about section">
          <div className="container section-title" data-aos="fade-up">
            <h2>About Us</h2>
          </div>

          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-6 content"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <p>
                  At Flowt, we revolutionize accounting by automating data entry,
                  saving accountants hours of manual work. Our intelligent platform
                  enables seamless receipt and invoice processing—just upload your
                  invoices, and we’ll handle the rest.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check2-circle"></i>{' '}
                    <span>
                      Upload your invoices in jpg, png, or pdf format.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check2-circle"></i>{' '}
                    <span>
                      Get a preview of your entry in Tally and edit if you want to.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check2-circle"></i>{' '}
                    <span>
                      Click the submit button. Voila!! Your invoice has been entered
                      in your Tally.
                    </span>
                  </li>
                </ul>
              </div>

              <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <p>
                  Our mission is simple: Empower accountants with cutting-edge
                  automation so they can focus on what truly matters—strategic
                  decision-making and business growth. Join us in transforming
                  accounting. Experience the Flowt advantage today!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section id="team" className="team section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Team</h2>
          </div>

          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img src="" className="img-fluid" alt="" />
                  </div>
                  <div className="member-info">
                    <h4>Kush Jain</h4>
                    <span>Dalla</span>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img src="" className="img-fluid" alt="" />
                  </div>
                  <div className="member-info">
                    <h4>Sukhpreet Singh</h4>
                    <span>CTO</span>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="team-member d-flex align-items-start">
                  <div className="pic">
                    <img src="" className="img-fluid" alt="" />
                  </div>
                  <div className="member-info">
                    <h4>Vedant Tamhane</h4>
                    <span>CTO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="contact section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Contact</h2>
          </div>

          <div
            className="container"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="row gy-4">
              <div className="col-lg-5">
                <div className="info-wrap">
                  <div
                    className="info-item d-flex"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i className="bi bi-geo-alt flex-shrink-0"></i>
                    <div>
                      <h3>Address</h3>
                      <p>IIT Delhi, Hauz Khas, New Delhi, 110016</p>
                    </div>
                  </div>

                  <div
                    className="info-item d-flex"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i className="bi bi-telephone flex-shrink-0"></i>
                    <div>
                      <h3>Call Us</h3>
                      <p>+91 8770936337</p>
                    </div>
                  </div>

                  <div
                    className="info-item d-flex"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <i className="bi bi-envelope flex-shrink-0"></i>
                    <div>
                      <h3>Email Us</h3>
                      <p>admin@flowt.co.in</p>
                    </div>
                  </div>

                  {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
                    frameBorder="0"
                    style={{ border: 0, width: '100%', height: '270px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe> */}
                </div>
              </div>

              <div className="col-lg-7">
                <form
                  action="forms/contact.php"
                  method="post"
                  className="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <label htmlFor="name-field" className="pb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name-field"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email-field" className="pb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email-field"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="subject-field" className="pb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        id="subject-field"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="message-field" className="pb-2">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        name="message"
                        rows="10"
                        id="message-field"
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message"></div>
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>

                      <button type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="index.html" className="d-flex align-items-center">
                <span className="sitename">Flowt</span>
              </a>
              <div className="footer-contact pt-3">
                <p>IIT Delhi, Hauz Khas</p>
                <p>New Delhi, 110016</p>
                <p className="mt-3">
                  <strong>Phone:</strong> <span>+91 8770936337</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>admin@flowt.co.in</span>
                </p>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right"></i>{' '}
                  <a href="#">Home</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>{' '}
                  <a href="#">About us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{' '}
            <strong className="px-1 sitename">Flowt</strong>{' '}
            <span>All Rights Reserved</span>
          </p>
          <div className="credits"></div>
        </div>
      </footer>

      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
      
    </div>
  );
}

export default App;
