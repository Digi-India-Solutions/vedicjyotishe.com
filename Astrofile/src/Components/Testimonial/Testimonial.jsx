import React from "react";
import Slider from "react-slick";
import testimonial1 from "../../Assets/Testimonial1.jpeg"; 
import testimonial2 from "../../Assets/Testimonial2.jpeg"; 
import testimonial3 from "../../Assets/Testimonial3.jpeg"; 
import Arrow from "../../Assets/Arrow.png"; // Arrow image
import DesignStar from "../../Assets/DesignStar.png"; // Star design image
import "./Testimonial.css"; // Custom styles

const Testimonial = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  const testimonials = [
    {
      id: 1,
      img: testimonial1,
      desc: `I am incredibly grateful for the educational guidance we received from Ms. Divya Parihar for my daughter. The insights and strategies made a significant difference in my child's learning journey and the attitude. Ms. Divya took the time to understand my child's unique strengths and challenges, providing tailored advice that truly resonated. As a result, my child has become more engaged and confident in their studies. I wholeheartedly recommend to any parent seeking expert support in navigating their child's educational path!`,
      rating: 4.5,
      name: "Triveni Ranjith Battulla",
      position: "TA Leader",
      zodiac: " Libra",
    },
    {
      id: 2,
      img: testimonial2,
      desc: `I had always been curious about the impact of auspicious timing, but after consulting with MS Divya , I experienced firsthand how choosing the right muhurata can truly make a difference. Following the suggested muhurata, everything unfolded smoothly, with positive energy and success in every aspect. I felt grounded and confident knowing that the timing aligned with favorable planetary positions. I highly recommend astrology for anyone seeking that extra layer of support in planning life’s significant moments.`,
      rating: 5,
      name: "Vanya Raghuvanshi",
      position: "Consultant",
      zodiac: "Sagittarius",
    },
    {
      id: 3,
      img: testimonial3,
      desc: `I was feeling a bit lost in my career path as a software engineer working abroad. After consulting with Ms Divya Parihar, I found clarity and direction I never expected. Considering both my birth chart and the opportunities and challenges of working internationally. The guidance not only gave me confidence in my next steps but also helped me understand the best timing for career moves and ways to maximize my potential in a foreign environment. I highly recommend Divya's expertise for anyone navigating career decisions abroad!`,
      rating: 4,
      name: "Praveen Piyush",
      position: " Engineer",
      zodiac: "Gemini",
    },
  ];

  return (
    <section className="mainbg1">
      <div className="container">
        <div className="row">
          <div className="designstar py-3">
            <img src={DesignStar} alt="Star" />
          </div>
          <div className="customertitle pb-1">
            <h1>Our Customer Thoughts</h1>
          </div>
        </div>
      </div>

      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id}>
            <div className="container cardbg">
              <div className="row">
                <div className="mainflex">
                  {/* Testimonial Image */}
                  <div className="testimonialImg">
                    <img src={testimonial.img} alt="testimonial" />
                  </div>
                  {/* Testimonial Description */}
                  <div className="testimonialDesc">
                    <p>{testimonial.desc}</p>

                    {/* Rating Section */}
                    <div className="testimonialRating">
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.round(testimonial.rating)
                                ? "star-filled"
                                : "star-empty"
                            }
                          >
                            <h1>★</h1>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Name and Position */}
                    <div className="testimonialName">
                      <h2>
                        {testimonial.name} - {testimonial.position}
                      </h2>
                      <p>Zodiac - {testimonial.zodiac}</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="sidearrow">
                    <img src={Arrow} alt="Arrow" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonial;
