import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">
          {/* Logo + Description */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="footer-logo mb-3 d-flex align-items-center gap-2">
              <img
                src="/images/furr-baby-footer-logo.svg"
                className="footer-logo"
                alt="Furr Baby"
              />
              <h3 className="">
                furr <br />
                baby
              </h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus
              sollicitudin enim.
            </p>
          </div>

          {/* Contact */}
          <div className="col-lg-4 ">
            <h6 className="">Contact Us</h6>
            <Link href="#" className="contact-links">
              <img src="/images/phone-logo.svg" className="me-2" /> +91
              9876543210
            </Link>
            <Link href="#" className="contact-links">
              <img src="/images/location-logo.svg" className="me-2" /> mi road,
              jaipur
            </Link>
            <Link href="#" className="contact-links">
              <img src="/images/mail-logo.svg" className="me-2" />{" "}
              abc@furrbaby.com
            </Link>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4">
            <h6 className="">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link href="#" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom ">
          {/* Social Icons */}
          <div className="social-icons">
            <a href="#">
              <img src="/images/facebook-logo.svg" alt="Facebook Logo" />
            </a>
            <a href="#">
              <img src="/images/insta-logo.svg" alt="Instagram Logo" />
            </a>
            <a href="#">
              <img src="/images/linkedin-logo.svg" alt="LinkedIn Logo" />
            </a>
            <a href="#">
              <img src="/images/twitter-logo.svg" alt="Twitter Logo" />
            </a>
          </div>

          {/* App Store Buttons */}
          <div className="store-btns">
            <img src="/images/app-store.svg" alt="App Store" />
            <img src="/images/google-play.svg" alt="Google Play" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
