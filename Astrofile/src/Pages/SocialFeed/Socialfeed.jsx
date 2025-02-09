import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import Designstar from "../../Assets/DesignStar.png";
import axios from "axios";


const Socialfeed = () => {
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


  const [posts, setPosts] = useState([]);
  const getPostData = async () => {
    try {
      const res = await axios.get(
        "https://www.api.vedicjyotishe.com/api/get-all-vedio"
      );
      console.log(res);
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


  return (
    <>

      <section>
        <div className="container">
          <div className="row">
            <div className="pagetop py-2">
              <div className="pagetitle">
                <h1>Social Media Feed</h1>
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
                    <FaAngleRight />Feed
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

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="designstar">
              <img src={Designstar} alt="Design star" />
            </div>
            <div className="blogpage">
              <h1>Social Media & Feed</h1>
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
                    {posts.map((post, index) => (
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
                  </div>
                </div>
              </div>
            </div>
          </section>
          <hr />

    </>
  )
}

export default Socialfeed