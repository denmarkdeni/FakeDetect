import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/homePage/style.css";
import "../styles/homePage/bootstrap.css";
import "../styles/homePage/responsive.css";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loadScript = (src) =>
  //     new Promise((resolve, reject) => {
  //       const script = document.createElement("script");
  //       script.src = src;
  //       script.async = true;
  //       script.onload = resolve;
  //       script.onerror = reject;
  //       document.body.appendChild(script);
  //     });

  //   // Load jQuery, then Bootstrap, then Owl Carousel
  //   Promise.resolve()
  //     .then(() => loadScript(process.env.PUBLIC_URL +"/assets/js/jquery-3.4.1.min.js"))
  //     .then(() => loadScript(process.env.PUBLIC_URL +"/assets/js/bootstrap.js"))
  //     .then(() =>
  //       loadScript(
  //         "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min.js"
  //       )
  //     )
  //     .then(() => {
  //       // Now jQuery & OwlCarousel are available
  //       window.$(".owl-carousel").owlCarousel({
  //         loop: true,
  //         margin: 10,
  //         nav: true,
  //         navText: [],
  //         autoplay: true,
  //         responsive: {
  //           0: { items: 1 },
  //           600: { items: 2 },
  //           1000: { items: 4 },
  //         },
  //       });

  //       window.$(".owl-2").owlCarousel({
  //         loop: true,
  //         margin: 10,
  //         nav: true,
  //         navText: [],
  //         autoplay: true,
  //         responsive: {
  //           0: { items: 1 },
  //           600: { items: 2 },
  //           1000: { items: 4 },
  //         },
  //       });
  //     })
  //     .catch((err) => console.error("Script load error:", err));
  // }, []);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/home/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>CrediScan</title>
      </Helmet>

      <div className="hero_area">
        {/* Header Section */}
        <header className="header_section">
          <div className="container">
            <div className="top_contact-container">
              <div className="tel_container">
                <a href="#">
                  <img
                    src="/assets/images/telephone-symbol-button.png"
                    alt=""
                  />{" "}
                  Call :+91 7994083414
                </a>
              </div>
              <div className="social-container">
                <a href="#">
                  <img src="/assets/images/fb.png" alt="" className="s-1" />
                </a>
                <a href="#">
                  <img
                    src="/assets/images/twitter.png"
                    alt=""
                    className="s-2"
                  />
                </a>
                <a href="#">
                  <img
                    src="/assets/images/instagram.png"
                    alt=""
                    className="s-3"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
              <a className="navbar-brand" href="/">
                <img src="/assets/images/logo.png" alt="" />
                <span>CrediScan</span>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div className="d-flex flex-column flex-lg-row align-items-center w-100 justify-content-between">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <a className="nav-link" href="/">
                        Home <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/about">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/review">
                        Review
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/credit">
                        Credits
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/redeem">
                        Redeem
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#contact-info">
                        Contact us
                      </a>
                    </li>
                  </ul>

                  <form className="form-inline">
                    <input type="search" placeholder="Search" />
                    <button
                      className="btn my-2 my-sm-0 nav_search-btn"
                      type="submit"
                    ></button>
                  </form>

                  <div
                    className="login_btn-contanier ml-0 ml-lg-5"
                    onClick={() => navigate("/login")}
                  >
                    <a href="#">
                      <img src="/assets/images/user.png" alt="" />
                      <span>Login</span>
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>

        {/* Slider Section */}
        <section className="slider_section position-relative bg1">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="img-box">
                        <img src="/assets/images/pm.png" alt="" />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="detail-box">
                        <h1>
                          Welcome To Our <br />
                          <span>CrediScan</span>
                        </h1>
                        <p>
                          Spot the fakes, shop with confidence!
                          <br />
                          Anything that satisfies our day-to-day needs, we make
                          it simple to know what's real.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="feature_section layout_padding">
        <div className="container">
          <div className="feature_container">
            <div className="box">
              <div className="img-box">
                {/* <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="60px"
                  y="60px"
                  viewBox="0 0 422.518 422.518"
                  xmlSpace="preserve"
                >
                   <path d="M8 0a8 8 0 1 0 8 8A8.01 8.01 0 0 0 8 0Zm1 12H7v-2h2Zm0-3H7V4h2Z" />
                </svg> */}
                <img width="64" height="64" src="https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/external-fast-delivery-online-shopping-tulpahn-outline-color-tulpahn.png" alt="external-fast-delivery-online-shopping-tulpahn-outline-color-tulpahn"/>
              </div> 
              <div className="detail-box">
                <h5>FAST DELIVERY</h5>
                <p>
                  Experience the convenience of our fast and reliable delivery
                  service, designed to get your orders to your doorstep in the
                  shortest time possible
                </p>
              </div>
            </div>

            <div className="box">
              <div className="img-box">
                {/* <svg
                  id="Capa_1"
                  height="512"
                  viewBox="0 0 512 512"
                  width="512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M159.66 360.3c-7.549-5.03-17.605 2.261-15.18 10.977... (shortened) ..." />
                </svg> */}
                <img width="64" height="64" src="https://img.icons8.com/dusk/64/popular-topic.png" alt="popular-topic"/>
              </div>
              <div className="detail-box">
                <h5>HOW REVIEW HELPS?</h5>
                <p>We alert others from your valuable reviews and vice-versa</p>
              </div>
            </div>

            <div className="box">
              <div className="img-box">
                {/* <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 315.377 315.377"
                  xmlSpace="preserve"
                >
                  <path d="M471.728 84.718H40.272C18.066 84.718 0 102.784 0 125.99v262.023... (TRUNCATED)" />
                </svg> */}
                <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/security-checked.png" alt="security-checked"/>
              </div>
              <div className="detail-box">
                <h5>SECURE PLATFORM</h5>
                <p>
                  Your privacy and safety are our priority. We ensure secure,
                  encrypted transactions and private communication between
                  customers and sellers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discount Section */}
      <section className="discount_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-5 offset-md-2">
              <div className="detail-box">
                <h2>
                  You get upto
                  <br />
                  <span>50% discount codes based on your credits.</span>
                </h2>
                <p>We don't just offer credits—we offer confidence.</p>
              </div>
            </div>
            <div className="col-lg-7 col-md-5">
              <div className="img-box">
                <img width="94" height="94" src="/assets/images/v2.png" alt="discount"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Section */}
      <section className="health_section layout_padding">
        <div className="health_carousel-container">
          <h2 className="text-uppercase">TOP PICKS</h2>
          <div className="product-grid">
            {products.map((product, index) => (
              <div className="item" key={index}>
                <div className="box">
                  <div className="btn_container">
                    <a href="#">Buy Now</a>
                  </div>
                  <div className="img-box">
                    <img
                      src={`http://127.0.0.1:8000${product.image}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="detail-box">
                    <div className="star_container">
                      {[...Array(4)].map((_, index) => (
                        <i className="fa fa-star" key={index}></i>
                      ))}
                      <i className="fa fa-star-o"></i>
                    </div>
                    <div className="text">
                      <h6>{product.name}</h6>
                      <h6 className="price">
                        <span>₹</span>
                        {product.price}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="health_section layout_padding">
        <div className="health_carousel-container">
          <h2 className="text-uppercase">REVIEWS & FEEDBACKS</h2>
          <div className="carousel-wrap layout_padding2">
            <div className="owl-carousel owl-2">
              <div className="item">
                <div className="box">
                  <div className="btn_container">
                    <a href="#">Buy Now</a>
                  </div>
                  <div className="img-box">
                    <img src="/assets/images/p-6.jpg" alt="Review" />
                  </div>
                  {/* You can add detail-box here for reviews */}
                </div>
              </div>
              {/* Add more review items as needed */}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about_section layout_padding">
        <div className="container">
          <div className="custom_heading-container">
            <h2>Let's Scan Together</h2>
          </div>
          <div className="img-box">
            <img src="/assets/images/about-medicine.png" alt="" />
          </div>
          <div className="detail-box">
            <p align="justify">
              1. Upload a product review or feedback.
              <br />
              2. We analyze trader history & metadata.
              <br />
              3. Earn credits for genuine reviews.
              <br />
              4. Get trusted rating and decision instantly.
              <br />
              5. Add to cart. Checkout in clicks. Simple shopping.
              <br />
            </p>
            <div className="d-flex justify-content-center">
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Client Section */}
      <section className="client_section layout_padding">
        <div className="container">
          <div className="custom_heading-container">
            <h2>What our clients say</h2>
          </div>
          <div
            id="carouselExample2Indicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExample2Indicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExample2Indicators"
                data-slide-to="1"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="client_container layout_padding2">
                  <div className="client_detail">
                    <p>
                      "CrediScan saved me from buying a fake product worth
                      ₹10,000!"
                    </p>
                  </div>
                  <div className="client_box">
                    <div className="img-box">
                      <img src="/assets/images/client.png" alt="" />
                    </div>
                    <div className="name">
                      <h5>
                        -Kendall,
                        <br />
                        Bengaluru
                      </h5>
                      <h6>
                        <span>Client</span>
                        <img src="/assets/images/quote.png" alt="" />
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="client_container layout_padding2">
                  <div className="client_detail">
                    <p>
                      "Super useful! Now I always check with CrediScan before
                      shopping online."
                    </p>
                  </div>
                  <div className="client_box">
                    <div className="img-box">
                      <img src="/assets/images/client.png" alt="" />
                    </div>
                    <div className="name">
                      <h5>
                        -Shilpa
                        <br />
                        Mumbai
                      </h5>
                      <h6>
                        <span>Client</span>
                        <img src="/assets/images/quote.png" alt="" />
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact_section">
        <div className="container">
          <div className="row">
            <div className="custom_heading-container">
              <h2>Leave A Review</h2>
            </div>
          </div>
        </div>
        <div className="container layout_padding2">
          <div className="row">
            <div className="col-md-5">
              <div className="form_container">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" className="form-control" id="phone" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" className="form-control">
                      <option>Beauty & Personal Care</option>
                      <option>Grocery</option>
                      <option>Fashion</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="item">Item</label>
                    <input type="text" className="form-control" id="item" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="seller">Seller</label>
                    <input type="text" className="form-control" id="seller" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ratingReview">Ratings & Reviews</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ratingReview"
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
            <div className="col-md-7">
              <div className="detail-box">
                <h4>How our star rating system works</h4>
                <p>
                  <span style={{ color: "red" }}>★★</span>
                  <br />
                  <strong>Likely fake</strong>
                  <br />
                  <br />
                  <span style={{ color: "green" }}>★★★</span>
                  <br />
                  <strong>Mixed feedback</strong>
                  <br />
                  <br />
                  <span style={{ color: "gold" }}>★★★★★</span>
                  <br />
                  <strong>Highly Trustworthy</strong>
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info_section layout_padding2" id="contact-info">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="info_contact">
                <h4>Contact</h4>
                <div className="box">
                  <div className="img-box">
                    <img
                      src="/assets/images/telephone-symbol-button.png"
                      alt=""
                    />
                  </div>
                  <div className="detail-box">
                    <h6>+91 7994083414</h6>
                  </div>
                </div>
                <div className="box">
                  <div className="img-box">
                    <img src="/assets/images/email.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h6>CSN@gmail.com</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="info_menu">
                <h4>Menu</h4>
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about.html">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="review.html">
                      Review
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="rate-us">
                <h4>Tell us what you think?</h4>
                <form>
                  <input type="text" />
                  <div className="d-flex justify-content-left mt-3">
                    <button>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="container-fluid footer_section">
        <p>&copy; 2025 All Rights Reserved. Design by CSN team.</p>
      </section>
    </>
  );
}
