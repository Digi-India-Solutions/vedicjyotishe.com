import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import Designstar from "../../Assets/DesignStar.png";
import Rashifal from "../../Assets/Rashifal.png";
import "./About.css";
import { Link } from "react-router-dom";
import Testimonial from "../../Components/Testimonial/Testimonial";
import { Helmet } from "react-helmet";

const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [active, setActive] = useState(false);

  const handleActiveChange = () => {
    setActive(!active);
  };

  return (
    <>
      <Helmet>
        <title>About Us - Vedic Jyotishe</title>
        <meta
          name="description"
          content="Learn about Vedic Jyotishe, a traditional system of Vedic astrology offering guidance on life's purpose and challenges through ancient wisdom."
        />
        <meta
          name="keywords"
          content="Vedic astrology, Jyotish Shastra, horoscope, cosmic order, karmic patterns, ancient wisdom"
        />
        <meta property="og:title" content="About Us - Vedic Jyotishe" />
        <meta
          property="og:description"
          content="Vedic Jyotishe offers insights into cosmic order and karmic patterns through Vedic astrology."
        />
        <meta property="og:image" content="/images/vedic-astrology-banner.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vedicjyotishe.com/about" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section>
        <div className="container">
          <div className="row">
            <div className="pagetop py-2">
              <div className="pagetitle">
                <h1>About Us</h1>
              </div>
              <div className="changepage">
                <p>
                  <Link
                    onClick={handleActiveChange}
                    to={"/"}
                    className="render"
                  >
                    Home
                  </Link>{" "}
                  <span>
                    <FaAngleRight /> About
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <hr className="divide" />
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid pt-3">
          <div className="row">
            <div className="designstar mt-2">
              <img src={Designstar} alt="Design star" />
            </div>
            <div className="aboutpage">
              <h1>About Vedic astrology</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <div className="Rashifal">
                <img src={Rashifal} alt="Rashifal" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="RashifalText">
                <p>
                  Vedic astrology, also known as Jyotish Shastra or Jyotisha, is
                  a traditional system of astrology that originated in ancient
                  India. It is based on the Vedas, the oldest sacred texts of
                  Hinduism, and has been practiced for thousands of years. Vedic
                  Astrology or Jyotisha connects human life with cosmic order
                  and karmic patterns. It is not just about making predictions
                  or analyzing personality traits, but about understanding the
                  cosmic play of karma, the soul's journey, and the individual's
                  role in the greater scheme of the universe.
                </p>
                <p>
                  Vedic astrology offers guidance, self-awareness, and a deeper
                  understanding of life’s purpose and challenges. Rooted in
                  ancient wisdom, it provides insights into the karmic forces at
                  play and helps us live more fulfilling and purposeful lives,
                  making informed choices leading to material and spiritual
                  success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Testimonial />
      </section>
    </>
  );
};

export default About;
