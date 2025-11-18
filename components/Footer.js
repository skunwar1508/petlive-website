import Link from "next/link";

const Footer = ({blogCategory}) => {
  const blogCategories = [
    "Health",
    "Training",
    "Nutrition",
    "Grooming",
    "Adoption",
    "Behavior",
  ];

  return (
    <footer className="footer-section pb-0">
      <div className="container">
        {/* 4-column footer */}
        <div className="row footer-columns">
          {/* 1st column - Logo + short description */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-logo">
              <img
                src="/images/furr-baby-footer-logo.svg"
                className="footer-logo-img"
                alt="Furr Baby"
                width="72"
                height="72"
              />
              <div className="brand-title">
                <h3 className="footer-title">furr <span>baby</span></h3>
              </div>
              <p className="footer-desc">
                Caring for your furry friends — tips, products and services to
                keep them happy and healthy.
              </p>
            </div>
          </div>

          {/* 2nd column - Quick links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-group">
              <h5 className="footer-heading">Blog Categories</h5>
              <ul className="footer-links list-unstyled">
                {blogCategory?.map((cat) => {
                  return (
                    <li key={cat}>
                      <Link href={`/blogs?category=${cat?.slug}`}>
                        <span className="category-pill" aria-label={`Category ${cat?.name}`}>
                          {cat?.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* 3rd column - Resources / Help */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-group">
              <h5 className="footer-heading">Quick Links</h5>
              <ul className="footer-links list-unstyled">
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
              </ul>
            </div>
            <div className="footer-group">
              <h5 className="footer-heading">Resources</h5>
              <ul className="footer-links list-unstyled">
                <li><Link href="/blogs">Blog</Link></li>
                <li><Link href="/faqs">FAQ</Link></li>
                <li><Link href="/care-guides">Care Guides</Link></li>
                <li><Link href="/testimonials">Testimonials</Link></li>
              </ul>
            </div>
          </div>

          {/* 4th column - Socials / App buttons separated */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-group mb-5">
              <h5 className="footer-heading">Follow Us</h5>
              <div className="social-icons d-flex gap-2">
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
            </div>

            <div className="footer-group">
              <h5 className="footer-heading">Get the App</h5>
              <div className="social-icons d-flex gap-2">
                <a href="#" className="store-link" aria-label="Download on the App Store" title="App Store">
                  <img src="/images/f-apple.svg" alt="App Store" />
                </a>
                <a href="#" className="store-link" aria-label="Get it on Google Play" title="Google Play">
                  <img src="/images/f-android.svg" alt="Google Play" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row - copyright */}
        <div className="footer-bottom mt-4">
          <div className="text-center w-100">
            <div className="copyright">
              &copy; {new Date().getFullYear()} Furr Baby. All rights reserved.
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
