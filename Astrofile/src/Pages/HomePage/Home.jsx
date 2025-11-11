import React, { useEffect, useState } from "react";
import "./Home.css";
import SunUp from "../../Assets/SunUp.png";
import SunDown from "../../Assets/SunDown.png";
import MoonUp from "../../Assets/MoonUp.png";
import MoonDown from "../../Assets/MoonDown.png";
import pray from "../../Assets/pray.png";
import Servicetop from "../../Assets/Bithchart.jpg";
import Websitebanner from "../../Assets/Websitebanner.jpg";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import AOS from "aos"; // Ensure you import AOS if you're using it
import axios from "axios";

const Home = () => {
  const [arrowData, setArrowData] = useState([])
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
                {tagline.tagLine}
              </marquee>
            </div>
          </div>
        </div>
      </section>

      <section className="mainbg pt-4">
        <div className="container-fluid pt-4">
          <div className="row reverceColumn">
            <div className="col-md-4 py-2">
              <div className="content_title pb-2">
                <h2>Panchang</h2>
              </div>
              <div className="Panchangdetail">
                <div className="py-3 TopPanchang">
                  <div className="panchangdate">
                    <h2>Aaj Ka Panchang</h2>
                    <h4>Ujjain,India</h4>
                  </div>
                  <div className="detailpanchangbtn">
                    <Link onClick={handleActiveChange} to="#">
                      Today's Panchang
                    </Link>
                  </div>
                </div>

                <div className="row">
                  <div className="currentdate">
                    <hr />
                    <span>
                      <b>{formattedDate}</b>
                    </span>
                    <hr />
                  </div>
                </div>

                {/* Time Cards Section */}
                <div className="row text-center my-3">
                  <div className="col-6 col-md-6 mb-3">
                    <div className="sunrise p-3">
                      <img
                        src={SunUp}
                        alt="Sunrise"
                        className="img-fluid mb-2"
                      />
                      <h1>{day.sunRiseTime}</h1>
                    </div>
                  </div>
                  <div className="col-6 col-md-6 mb-3">
                    <div className="sunrise p-3">
                      <img
                        src={SunDown}
                        alt="Sunset"
                        className="img-fluid mb-2"
                      />
                      <h1>{day.sunsetTime}</h1>
                    </div>
                  </div>
                  <div className="col-6 col-md-6 mb-3">
                    <div className="Moonrise p-3">
                      <img
                        src={MoonUp}
                        alt="Moonrise"
                        className="img-fluid mb-2"
                      />
                      <h1>{day.moonRiseTime}</h1>
                    </div>
                  </div>
                  <div className="col-6 col-md-6 mb-3">
                    <div className="Moonrise p-3">
                      <img
                        src={MoonDown}
                        alt="Moonset"
                        className="img-fluid mb-2"
                      />
                      <h1>{day.moonsetTime}</h1>
                    </div>
                  </div>
                </div>

                <hr className="bighr" />

                {/* Panchang Details Section */}
                <div className="row py-4 px-4 outsideborder">
                  <div className="col-md-6 p-2">
                    <div className="month">
                      <p>
                        <h4>
                          <b>Month</b>
                        </h4>
                      </p>
                      <p>
                        Amanta: <b>{month.Amanta}</b>
                      </p>
                      <p>
                        Purnimanta: <b>{month.Purnimanta}</b>
                      </p>
                      <hr />
                      <p>
                        Tithi: <b>{month.Tithi}</b>
                      </p>
                      <p>
                        Till: <b>{month.TithiTill}</b>
                      </p>
                      <hr />
                      <p>
                        Yog: <b>{month.Yog}</b>
                      </p>
                      <p>
                        Till: <b>{month.YogTill}</b>
                      </p>
                      <hr />
                      <p>
                        Var: <b>Shanivar</b>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 p-2">
                    <div className="month">
                      <p>
                        <h4>
                          {" "}
                          <b>Samvat</b>{" "}
                        </h4>
                      </p>

                      <p>
                        Vikram: <b>{samvat.Vikram}</b>
                      </p>
                      <p>
                        Shaka: <b>{samvat.Shaka}</b>
                      </p>
                      <hr />
                      <p>
                        Nakshatra: <b>{samvat.Nakshatra}</b>
                      </p>
                      <p>
                        Till: <b>{samvat.NakshatraTill}</b>
                      </p>
                      <hr />
                      <p>
                        Karan: <b>{samvat.Karan}</b>
                      </p>
                      <p>
                        Till: <b>{samvat.KaranTill}</b>
                      </p>
                      <hr />
                      <p>
                        Rahu Kalam: <b>12:50 am to 12:13 pm</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
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
                    <div className="container pt-5">
                      <div className="row">
                        {services.slice(0, 9).map((service, index) => (
                          <div key={index} className="col-md-4 col-6 mt-3 mb-4">
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
                  {blog.map((item, index) => (
                    <div className="col-md-3 col-6 mb-4">
                      <div className="news">
                        <h5 className="card-title py-2">What's the news?</h5>
                        <img
                          src={`https://api.vedicjyotishe.com/${item.blogImage}`}
                          className="card-img-top"
                          alt="news"
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
                  ))}

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
    </>
  );
};

export default Home;
