import React, { useState, useEffect } from "react";
import "./Blog.css";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Designstar from "../../Assets/DesignStar.png";
import { Helmet } from "react-helmet";
import axios from "axios";

const Blog = () => {
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

  const [blog, setBlog] = useState([])
  const getBlogData = async () => {
    try {
      const res = await axios.get("https://www.api.vedicjyotishe.com/api/get-blog")
      setBlog(res.data.data)
      // console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBlogData()
  }, [])
 

  return (
    <>
      <Helmet>
        <title>Blog & Articles - Vedic Jyotishe</title>
        <meta
          name="description"
          content="Explore our blogs and articles about Vedic astrology, spiritual insights, and events at Vedic Jyotishe. Learn about the cosmic order and karmic patterns."
        />
        <meta
          name="keywords"
          content="Vedic astrology blogs, Jyotish articles, Vedic insights, karma, spiritual blogs"
        />
        <meta property="og:title" content="Blog & Articles - Vedic Jyotishe" />
        <meta
          property="og:description"
          content="Browse articles and blogs about Vedic astrology and spiritual events at Vedic Jyotishe."
        />
        <meta property="og:image" content="/images/blog-banner.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vedicjyotise.com/blog" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section>
        <div className="container">
          <div className="row">
            <div className="pagetop py-2">
              <div className="pagetitle">
                <h1>Blog & Articles</h1>
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
                    <FaAngleRight /> Blog
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
          <div className="container-fluid">
            <div className="row">
              <div className="designstar">
                <img src={Designstar} alt="Design star" />
              </div>
              <div className="blogpage">
                <h1>Blogs & Articles</h1>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container my-5">
            <div className="row">
              {blog.map((item, index) => (
                <div className="col-md-4 col-6 mb-4" key={index}>
                  <div className="news-card px-3 py-2">
                    <h5 className="card-title py-2">{item.title}</h5>
                    <img  src={`https://www.api.vedicjyotishe.com/${item.blogImage}`} className="card-img-top" alt="news" />
                    <div className="card-body">
                      <p className="card-text">{item.blogHeading}</p>
                      <p className="card-description">{item.blogDetails}</p>
                      <Link
                        onClick={handleActiveChange}
                        to={`/blog-details/${item._id}`}
                        className="card-link"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Blog;
