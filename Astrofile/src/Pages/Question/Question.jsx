import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet"; // Import Helmet
import "./Question.css";
import { FaAngleRight } from "react-icons/fa";
import Questionimg from "../../Assets/Question.png";
import { Link } from "react-router-dom";

const Question = () => {
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

  const [gender, setGender] = useState("");
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const [direction, setDirection] = useState("");
  const handleDirectionSelect = (selectedDirection) => {
    setDirection(selectedDirection);
  };

  return (
    <>
      <Helmet>
        <title>Unique Ask | Kundali Consultation</title>
        <meta
          name="description"
          content="Submit your unique query regarding Kundali and get expert guidance tailored to your needs."
        />
        <meta property="og:title" content="Unique Ask" />
        <meta
          property="og:description"
          content="Submit your unique query regarding Kundali."
        />
      </Helmet>
      <section>
        <div className="container">
          <div className="row">
            <div className="pagetop py-2">
              <div className="pagetitle">
                <h1>Unique Ask</h1>
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
                    <FaAngleRight /> Services
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <hr className="divide m-0" />
          </div>
        </div>
      </section>

      <section className="mainbg1">
        <section>
          <div className="container-fluid pt-3">
            <div className="row">
              <div className="aboutpage">
                <h1>Every Problem Has A Solution</h1>
                <p>
                  Every problem has a solution, and we are here to help. Our
                  in-depth analysis of your birth chart uses multiple methods of
                  Vedic astrology, involving the creation and examination of
                  various charts. Each chart is carefully reviewed and discussed
                  by our team of Vedic astrologers to ensure a comprehensive
                  reading. If you have any specific requests beyond our listed
                  services, please feel free to reach out. Since this process
                  requires detailed analysis, we’ll provide a quote after
                  reviewing your inquiry. To begin, an initial token amount of
                  ₹1100 is required, which will be deducted from the final
                  charge.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container py-3 ">
            <div className="row">
              <div className="col-md-5">
                <div className="Question">
                  <img src={Questionimg} alt="QuestionImg" />
                </div>
              </div>

              <div className="col-md-1"></div>

              <div className="col-md-6 formbg py-3 px-2">
                <div className="container">
                  <div className="col">
                    <div className="formtitle py-3">
                      <h1>Fill the form to get your kundali </h1>
                    </div>
                    <form action="">
                      <div className="formsubHeading">
                        <h4>Name & Gender</h4>
                        <div className="col-md-12 namefield mb-2">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control form-input"
                            placeholder="Your Name here"
                            required
                          />
                        </div>
                        <div className="col-md-12 namefield mb-2">
                          <label className="form-label">Phone</label>
                          <input
                            type="number"
                            className="form-control form-input"
                            placeholder="Your Number here"
                            required
                          />
                        </div>
                        <div className="col-md-12 namefield mb-2">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control form-input"
                            placeholder="Your Email here"
                            required
                          />
                        </div>
                        <div className="col-md-10 genderfield mb-2">
                          <label className="form-label">Gender</label>
                          <div className="genderbtn">
                            <button
                              type="button"
                              className={` gender-btn btn ${
                                gender === "Male" ? "btn-warning" : ""
                              }`}
                              onClick={() => handleGenderSelect("Male")}
                              required
                            >
                              Male
                            </button>
                            <button
                              type="button"
                              className={` gender-btn btn ${
                                gender === "Female" ? "btn-warning" : ""
                              }`}
                              onClick={() => handleGenderSelect("Female")}
                              required
                            >
                              Female
                            </button>
                          </div>
                        </div>
                        <div className="col-md-12 namefield mb-2">
                          <label htmlFor="maritalStatus" className="form-label">
                            Marital Status
                          </label>
                          <select
                            name="maritalStatus"
                            id="maritalStatus"
                            className="form-control form-input"
                            required
                          >
                            <option value="" disabled selected>
                              Select Status
                            </option>
                            <option value="married">Married</option>
                            <option value="unmarried">Unmarried</option>
                            <option value="widow_widower">
                              Widow / Widower
                            </option>
                            <option value="divorced">Divorced</option>
                            <option value="live_in">Live-in</option>
                          </select>
                        </div>
                      </div>
                      <div className="formsubHeading">
                        <h4>Birth Details</h4>
                        <div className="col-md-12 namefield mb-2">
                          <label className="form-label">Date</label>
                          <input
                            type="date"
                            className="form-control form-input"
                            required
                          />
                        </div>
                        <div className="col-md-12 namefield mb-2">
                          <label className="form-label">Time</label>
                          <input
                            type="time"
                            className="form-control form-input"
                            required
                          />
                        </div>
                        <div className="col-md-12 namefield mb-2">
                          <label className="form-label">Place</label>
                          <input
                            type="text"
                            className="form-control form-input"
                            placeholder="Country Of Birth"
                            required
                          />
                        </div>
                        <div className="col-md-12 namefield mb-2">
                          <label className="form-label">Place</label>
                          <input
                            type="text"
                            className="form-control form-input"
                            placeholder="State & Place Of Birth "
                            required
                          />
                        </div>
                      </div>
                      <div className="formsubHeading">
                        <h4>
                          Direction <small>(if available)</small>
                        </h4>
                        <div className="Longitude">
                          <div className="col-md-8 Longitudefield mb-2">
                            <label className="form-label">Longitude</label>
                            <input
                              type="number"
                              className="form-control form-input"
                            />
                          </div>
                          <div className="directionbtn">
                            <button
                              type="button"
                              className={` direction-btn btn ${
                                direction === "East" ? "btn-warning" : ""
                              }`}
                              onClick={() => handleDirectionSelect("East")}
                            >
                              East
                            </button>
                            <button
                              type="button"
                              className={`  direction-btn btn ${
                                direction === "West" ? "btn-warning" : ""
                              }`}
                              onClick={() => handleDirectionSelect("West")}
                            >
                              West
                            </button>
                          </div>
                        </div>
                        <div className="Longitude">
                          <div className="col-md-8 Longitudefield mb-2">
                            <label className="form-label">Longitude</label>
                            <input
                              type="number"
                              className="form-control form-input"
                            />
                          </div>
                          <div className="directionbtn">
                            <button
                              type="button"
                              className={` direction-btn btn ${
                                direction === "North" ? "btn-warning" : ""
                              }`}
                              onClick={() => handleDirectionSelect("North")}
                            >
                              North
                            </button>
                            <button
                              type="button"
                              className={`  direction-btn btn ${
                                direction === "South" ? "btn-warning" : ""
                              }`}
                              onClick={() => handleDirectionSelect("South")}
                            >
                              South
                            </button>
                          </div>
                        </div>

                        <div className="col-md-12 namefield mb-2">
                          <label className="form-label">
                            Comment <br />{" "}
                            <span>
                              Facts Relevant to Your Problem (Please specify in
                              detail)
                            </span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control form-input"
                            placeholder="Type message"
                            rows="4"
                            required
                          />
                        </div>
                      </div>
                      <div className="container-fluid d-flex justify-content-between align-items-center price-container">
                        <div className="col-md-8 ">
                          <div className="price-details">
                            <p className="original-price">Rs. 1560</p>
                            <p className="discounted-price">Rs. 1100/-</p>
                          </div>
                        </div>
                        <div className="col-md-4 pleasepay">
                          <button className="btn pay-btn">Pay</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Question;
