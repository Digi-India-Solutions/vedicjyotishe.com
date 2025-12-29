import React, { useEffect, useState } from "react";
import "./Home.css";
import SunUp from "../../Assets/SunUp.png";
import SunDown from "../../Assets/SunDown.png";
import MoonUp from "../../Assets/MoonUp.png";
import MoonDown from "../../Assets/MoonDown.png";
import pray from "../../Assets/pray.png";
import Servicetop from "../../Assets/Bithchart.jpg";
import Websitebanner from "../../Assets/new_banner.png";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FaStar, FaChartPie, FaHome, FaHeartbeat, FaMoon, FaDice, FaGem, FaQuestion, FaCalendar, FaVial } from "react-icons/fa";
import AOS from "aos"; // Ensure you import AOS if you're using it
import axios from "axios";
import EnquiryModal from "../../Components/EnquiryModal/EnquiryModal";

const Home = () => {
  const [arrowData, setArrowData] = useState([])
  const [courses, setCourses] = useState([])
  const [showEnquiryModal, setShowEnquiryModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [day, setDay] = useState([]);
  const getDayData = async () => {
    try {
      const res = await axios.get(
        "https://api.vedicjyotishe.com/api/get-day"
      );
      setDay(res.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const [month, setMonth] = useState([]);
  const getMonthData = async () => {
    try {
      const res = await axios.get(
        "https://api.vedicjyotishe.com/api/get-month"
      );
      // console.log(res)
      setMonth(res.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const [samvat, setSamvat] = useState([]);
  const getSamvatData = async () => {
    try {
      const res = await axios.get(
        "https://api.vedicjyotishe.com/api/get-samvat"
      );
      // console.log(res)
      setSamvat(res.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const createdAt = day.createdAt;
  const date = new Date(createdAt);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  // const tithiTill = month.tithiTill
  // const mymonth = new Date(tithiTill);
  // const formattedmonths = mymonth.toISOString().replace('T', ' ').slice(0, 19);

  useEffect(() => {
    getDayData();
    getMonthData();
    getSamvatData();
  }, [day.length]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  const [active, setActive] = useState(false);

  const handleActiveChange = () => {
    setActive(!active);
  };

  const [services, setServices] = useState([]);

  const getServiceData = async () => {
    try {
      const res = await axios.get(
        "https://api.vedicjyotishe.com/api/get-service"
      );
      const reverseData = res.data.data;
      setServices(reverseData.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServiceData();
  }, []);

  const [blog, setBlog] = useState([]);
  const getBlogData = async () => {
    try {
      const res = await axios.get(
        "https://api.vedicjyotishe.com/api/get-blog"
      );
      setBlog(res.data.data);
      // console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  const [posts, setPosts] = useState([]);
  const getPostData = async () => {
    try {
      const res = await axios.get(
        "https://api.vedicjyotishe.com/api/get-all-vedio"
      );
      // console.log(res);
      setPosts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);

  // Function to transform YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getArrowData = async () => {
    try {
      const res = await axios.get("https://api.vedicjyotishe.com/api/get-kundali-service")
      setArrowData(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getArrowData()
  }, [])


  const [tagline, setTagline] = useState([])

  const getTagLine = async () => {
    try {
      const res = await axios.get("https://api.vedicjyotishe.com/api/get-tagline")
      setTagline(res.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTagLine()
  }, [])

  const getCourseData = async () => {
    try {
      const res = await axios.get(
        "https://api.vedicjyotishe.com/api/get-course"
      );
      const courseData = res.data.data;
      setCourses(courseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const handleEnquiryClick = (courseName) => {
    setSelectedCourse(courseName);
    setShowEnquiryModal(true);
  };

  const getCourseIcon = (courseName) => {
    // Map course names to icon file names
    const iconMap = {
      "Vedic Astrology": "icon1.png",
      "Prashna Horary": "icon2.png",
      "Nakshatra Course": "icon3.png",
      "Ashtakavarga": "icon4.png",
      "Muhurata-Advance": "icon5.png",
      "Tajika Varshaphal": "icon6.png",
      "Medical Astrology": "icon7.png",
      "Numerology": "icon8.png",
      "Vastu Basic": "icon9.png",
      "Tithi Pravesha Chart": "icon1.png"
    };
    return iconMap[courseName] || "icon1.png";
  };

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="Bgimage">
              <img src={Websitebanner} alt="Banner" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="marquee-container">
              <marquee
                behavior="scroll"
                direction="left"
                scrollamount="5"
                loop="infinite"
              >
                Learn Astrology — Decode Destiny, Discover Direction ! Check courses list and Enquire NOW . New Batches starting soon!
              </marquee>
            </div>
          </div>
        </div>
      </section>

      <section className="mainbg pt-4">
        <div className="container-fluid pt-4">
          <div className="row reverceColumn">
            <div className="col-md-5 pb-2 courses-section">
              <div className="content_title text-center">
                <h2>Learn Astrology</h2>
              </div>
              <div className="Panchangdetail">
                <div className="py-3 TopPanchang">
                  <div className="panchangdate">
                    <h2>Our Courses</h2>
                    <h4>Expand Your Knowledge</h4>
                  </div>
                </div>

                <div className="row">
                  <div className="currentdate">
                    <hr />
                    <span>
                      <b>Master Vedic Astrology</b>
                    </span>
                    <hr />
                  </div>
                </div>

                {/* Courses Section */}
                <div className="courses-list py-3">
                  <div className="row">
                    {[...courses].map((course, index) => {
                      const iconExtensions = ['jpg', 'jpg', 'webp', 'jpg', 'jpg', 'jpg', 'jpg', 'webp', 'jpg'];
                      const iconIndex = index % 9;
                      const iconExt = iconExtensions[iconIndex];
                      return (
                      <div key={index} className="col-md-4 col-12 mb-3">
                        <div className="course-item">
                          <div className="course-icon-wrapper">
                            <img 
                              src={`/icon${iconIndex + 1}.${iconExt}`} 
                              alt={course.courseName}
                              className="course-icon-img"
                            />
                          </div>
                          <div className="course-name-row">
                            <h5>{course.courseName}</h5>
                          </div>
                          <div className="course-description-row">
                            <p>{course.courseDetails}</p>
                          </div>
                          <div className="course-button-row">
                            <button
                              className="enquiry-btn"
                              onClick={() => handleEnquiryClick(course.courseName)}
                            >
                              Enquire Now
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                    })}
                  </div>
                </div>

              </div>
            </div>

            <div className="col-md-7 services-section">
              <div className="service_title">
                <h2>Our Services</h2>
              </div>

              <div className="container">
                <div className="row">
                  <div className="serviceContainer pt-4">
                    <div className="hinditext">
                      <div className="closehand">
                        <img src={pray} alt="Pray Hand" />
                        <p>लोकाः समस्ताः सुखिनो भवन्तु</p>
                      </div>
                    </div>
                    <div className="topbanner mt-3">
                      <div className="bannerimg">
                        <img src={Servicetop} alt="Panchang img" />
                      </div>
                      <div className="topbannerText">
                        <p>
                          Order Hard Copy of Kundali (Birth Chart) for
                          convenient reference, personal keepsake, detailed
                          layout and easy annotations ₹1100
                        </p>
                      </div>

                      <div className="arrowrender">
                        <Link
                          onClick={handleActiveChange}
                          to={`/Service-Details/${arrowData.serviceName}`}
                          className="render"
                        >
                          <IoMdArrowForward className="Arrow" />
                        </Link>
                      </div>
                    </div>
                    <div className="services-grid pt-5">
                      <div className="row">
                        {services.slice(0, 12).map((service, index) => (
                          <div key={index} className="col-md-4 col-12 mt-3 mb-4">
                            <div className="text-center">
                              <img
                                data-aos="fade-up"
                                data-aos-duration="2000"
                                src={`https://api.vedicjyotishe.com/${service.serviceLogo}`}
                                alt={service.title}
                                className="img-fluid mb-2"
                                style={{ height: "80px" }}
                              />
                              <div className="service-name">
                              <h5>{service.serviceName}</h5>
                              </div>
                              <p>
                                <span className="text-muted">
                                  <s>₹{service.sericePrice}</s>
                                </span>{" "}
                                &nbsp;
                                <span className="text-danger">
                                  ₹{service.sericeFinalPrice}
                                </span>
                              </p>
                              <Link
                                to={`Service-Details/${service.serviceName}`}
                              >
                                <button className="servicedetails">
                                  Get Details
                                </button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ViewServicebtn pb-3">
                  <Link to="/OurServices">
                    <button className="ViewAllbtn">View All</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* News & Articles Section */}
          <section>
            <div className="container mt-3">
              <div className="row">
                <div className="content-title-news">
                  <h2>News & Articles</h2>
                </div>
                <div className="row p-0 m-0">
                  {blog.map((item, index) => {
                    const newsIcons = ['icon1', 'icon2', 'icon3', 'icon4'];
                    const iconIndex = index % 4;
                    const iconExt = ['jpg', 'jpg', 'webp', 'jpg'][iconIndex];
                    return (
                    <div className="col-md-3 col-6 mb-4" key={index}>
                      <div className="news">
                        <h5 className="card-title py-2">What's the news?</h5>
                        <img
                          src={`/${newsIcons[iconIndex]}.${iconExt}`}
                          className="card-img-top"
                          alt="news icon"
                          style={{ height: "150px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <p className="card-text">{item.blogHeading}</p>

                          <p className="card-description">
                            {item.blogDetails}
                            {item.blogDetails.split(" ").slice(0, 20).join(" ")}
                            {item.blogDetails.split(" ").length > 20 && "..."}
                          </p>
                          <Link
                            onClick={handleActiveChange}
                            to={"/"}
                            className="servicedetails"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                  })}

                  <div className="detail-blog">
                    <Link
                      onClick={handleActiveChange}
                      to={"/blog"}
                      className="detail-blog-btn"
                    >
                      View all News and Events
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container mt-5">
              <div className="row">
                <div className="content-title-media">
                  <h2>Social Media Feed</h2>
                </div>

                <div className="videodetail">
                  <div className="row p-0 m-0">
                    {posts.slice(0, 4).map((post, index) => (
                      <div className="col-md-3 col-6 mb-2" key={index}>
                        <div className="Videocard">
                          <div className="video-container">
                            <iframe
                              src={getEmbedUrl(post.link)}
                              title={post.contentHeading}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="responsive-iframe"
                            ></iframe>
                          </div>
                          <div className="card-body">
                            <h5>{post.contentHeading}</h5>
                            <p>
                              {post.contentDetails
                                .split(" ")
                                .slice(0, 20)
                                .join(" ")}
                              {post.contentDetails.split(" ").length > 20 &&
                                "..."}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Show "View All" button if there are more than 4 videos */}
                    {posts.length > 4 && (
                      <div className="view-all-feed">
                        <Link
                          onClick={handleActiveChange}
                          to={"/Socialfeed"}
                          className="All-Feed"
                        >
                          View all Social Feed
                        </Link>
                      </div>

                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <EnquiryModal
        isOpen={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        selectedCourse={selectedCourse}
      />
    </>
  );
};

export default Home;
