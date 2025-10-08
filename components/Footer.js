"client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">
          {/* Logo + Description */}
          <div className="col-lg-12 mb-4 mb-lg-0">
            <div className="footer-logo w-100 mb-3 d-flex align-items-center justify-content-center gap-2">
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
          </div>
          {/* <div className="col-lg-12 mb-4 mb-lg-0">
            <div className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2">
              <div></div>
              <div></div>
            </div>
          </div> */}
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom ">
          {/* Social Icons */}
          <div className="social-icons">
            <Link href="#">
              <img src="/images/f-facebook.svg" alt="Facebook Logo" />
            </Link>
            <Link href="#">
              <img src="/images/f-insta.svg" alt="Instagram Logo" />
            </Link>
            <Link href="#">
              <img src="/images/f-linkedin.svg" alt="LinkedIn Logo" />
            </Link>
            <Link href="#">
              <img src="/images/f-twitter.svg" alt="Twitter Logo" />
            </Link>
          </div>

          {/* App Store Buttons */}
          <div className="store-btns">
            <Link href="#">
              <img src="/images/f-apple.svg" alt="App Store" />
            </Link>
            <Link href="#">
              <img src="/images/f-android.svg" alt="Google Play" />
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom-2 ">
          {/* Social Icons */}
          <div className="bottom-links">
            <Link href="/about-us">About Us</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <Link href="/contact-us">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
