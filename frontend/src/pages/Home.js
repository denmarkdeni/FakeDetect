import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/homePage/style.css";
import "../styles/homePage/bootstrap.css";
import "../styles/homePage/responsive.css";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/home/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    axios
      .get('http://127.0.0.1:8000/api/home/reviews/')
      .then((response) => {
        setReviews(response.data);
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });

  }, []);

  return (
    <>
      <Helmet>
        <title>CrediScan</title>
      </Helmet>

      <div className="hero_area bg-center" style={{ backgroundImage: "url('/assets/images/trust-bg.jpg')" }}>
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
                <Link to="#">
                  <img
                    src="/assets/images/instagram.png"
                    alt=""
                    className="s-3"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
              <a className="navbar-brand" href="/">
                <img src="/assets/images/crediscan.png" alt="" />
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
                      <a className="nav-link" href="/">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#review-id">
                        Review
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">
                        Credits
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">
                        Redeem
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#contact-info">
                        Contact us
                      </a>
                    </li>
                  </ul>

                  {/* <form className="form-inline">
                    <input type="search" placeholder="Search" />
                    <button
                      className="btn my-2 my-sm-0 nav_search-btn"
                      type="submit"
                    ></button>
                  </form> */}

                  <div className="login_btn-contanier ml-0 ml-lg-5">
                    <Link to="/auth">
                      <img src="/assets/images/user.png" alt="" />
                      <span>Login</span>
                    </Link>
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
                <img width="64" height="64" src="https://img.icons8.com/dusk/64/popular-topic.png" alt="popular-topic"/>
              </div>
              <div className="detail-box">
                <h5>HOW REVIEW HELPS?</h5>
                <p>We alert others from your valuable reviews and vice-versa</p>
              </div>
            </div>

            <div className="box">
              <div className="img-box">
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
            {products.slice(0, 4).map((product, index) => (
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
                  <div className="detail-box flex">
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
        <div className="item more-btn">
          <div className="box">
            <a href="/all-products" className="btn more-btn">
              More
            </a>
          </div>
        </div>
      </section>

      

      {/* Reviews Section */}
      <section className="health_section layout_padding">
        <div className="health_carousel-container">
          <h2 className="text-uppercase">REVIEWS & FEEDBACKS</h2>
          <div className="product-grid">
            {products.slice(0, 4).map((product, index) => (
              <div className="item" key={index}>
                <div className="box">
                  <div className="img-box">
                    <img
                      src={`http://127.0.0.1:8000${product.image}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="detail-box">
                    <div className="flag-status">
                      {product.is_fake ? (
                        <span className="text-red-500">Flagged as Fake</span>
                      ) : product.fake_flags > 0 ? (
                        <span className="text-yellow-500">Suspected Fake ({product.fake_flags} flags)</span>
                      ) : (
                        <span className="text-green-500">Verified Authentic</span>
                      )}
                    </div>
                    <div className="review-text">
                      <p><strong>{product.name} ({product.brand})</strong></p>
                      {product.flag_comments.length > 0 ? (
                        <p><strong>Feedback:</strong> {product.flag_comments[0].reason}</p>
                      ) : (
                        <p>No feedback yet</p>
                      )}
                    </div>
                    <div className="star_container">
                      {[...Array(Math.min(Math.floor(product.trust_score / 20), 5))].map((_, i) => (
                        <i className="fa fa-star" key={i}></i>
                      ))}
                      {product.trust_score % 20 !== 0 && product.trust_score < 100 && <i className="fa fa-star-half-o"></i>}
                      {[...Array(5 - Math.ceil(product.trust_score / 20))].map((_, i) => (
                        <i className="fa fa-star-o" key={i + Math.floor(product.trust_score / 20) + (product.trust_score % 20 !== 0 ? 1 : 0)}></i>
                      ))}
                      <span className="ml-2">({product.trust_score}/100)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="item more-btn">
          <div className="box">
            <a href="/all-reviews" className="btn more-link">
              More
            </a>
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
            <img src="/assets/images/b1.png" alt="" />
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
          <div id="carouselExample2Indicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              {reviews.map((_, index) => (
                <li
                  key={index}
                  data-target="#carouselExample2Indicators"
                  data-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                ></li>
              ))}
            </ol>
            <div className="carousel-inner">
              {reviews.map((review, index) => (
                <div key={review.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="client_container layout_padding2">
                    <div className="client_detail">
                      <p>"{review.comment}"</p>
                    </div>
                    <div className="client_box">
                      <div className="img-box">
                        <img src="/assets/images/ph1.png" alt="Client" />
                      </div>
                      <div className="name">
                        <h5>
                          - {review.customer ? review.username || 'Anonymous' : 'Anonymous'}<br />
                          {/* {review.customer && review.customer.city ? review.customer.city : 'Unknown'} */}
                        </h5>
                        <h6>
                          <span>Client</span>
                          <img src="/assets/images/quote.png" alt="Quote" />
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact_section" id="review-id">
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
              <div className="detail-box" style={{ color: "black" }}>
                <h4 style={{marginTop:"1opx"}}>How our star rating system works</h4>
                <p>
                  <span style={{ color: "red" }}>★★</span>
                  <br />
                  <strong>Likely fake</strong>
                  <br />
                  <span style={{ color: "green" }}>★★★</span>
                  <br />
                  <strong>Mixed feedback</strong>
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
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
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
