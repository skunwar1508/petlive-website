import Head from "next/head";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Read the Furr Baby Privacy Policy to understand how we protect your information, ensure data safety, and maintain transparency across our platform." />
      </Head>
      <section class="page-section text-page-ui py-5">
        <div class="container">
          <div class="text-center mb-4">
            <h1 className="heading-secondary">Privacy Policy</h1>
            <p class="text-muted">
              Effective Date: <strong>[Insert Date]</strong>
            </p>
          </div>

          <div class="content">
            <div className="content-box">
              <h2>Company Overview</h2>
              <p>
                This Privacy Policy describes how <strong>Furr Baby</strong>{" "}
                (“we”, “our”, or “us”) collects, uses, discloses, and protects
                the personal information of users (“you”, “your”) on our app and
                website.
              </p>
            </div>
            <div className="content-box">
              <h2>1. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Personal Information:</strong> name, phone number,
                  email address, location, pet details
                </li>
                <li>
                  <strong>Account Credentials:</strong> login details, password
                  (encrypted)
                </li>
                <li>
                  <strong>Device Information:</strong> IP address, device type,
                  OS, and usage logs
                </li>
                <li>
                  <strong>Financial Information:</strong> wallet balance,
                  transaction history (note: we do not store card/bank details)
                </li>
                <li>
                  <strong>Uploaded Content:</strong> scrapbook entries,
                  community posts, photos
                </li>
                <li>
                  <strong>Communication Data:</strong> messages with vets,
                  feedback, and customer support interactions
                </li>
              </ul>
            </div>
            <div className="content-box">
              <h2>2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Create and manage your account</li>
                <li>Enable vet consultations and service bookings</li>
                <li>Improve our services, UX, and app functionality</li>
                <li>Process payments, refunds, and wallet top-ups</li>
                <li>Prevent fraud, abuse, and security threats</li>
                <li>
                  Send important updates, reminders, and service-related
                  notifications
                </li>
              </ul>
            </div>
            <div className="content-box">
              <h2>3. Sharing of Information</h2>
              <ul>
                <li>We do not sell your personal data.</li>
                <li>
                  We may share data with verified third-party service providers
                  (e.g., vets, payment gateways, analytics tools) only as
                  necessary to provide our services.
                </li>
                <li>
                  All third-party partners are bound by strict confidentiality
                  agreements.
                </li>
                <li>
                  We may share information when required by law or regulatory
                  authorities.
                </li>
              </ul>
            </div>
            <div className="content-box">
              <h2>4. Data Retention</h2>
              <p>
                We retain your personal data only as long as necessary to
                fulfill the purposes outlined in this policy, or as required by
                law. You may request deletion of your data by emailing
                <a href="mailto:support@furrbaby.in">support@furrbaby.in</a>.
              </p>
            </div>
            <div className="content-box">
              <h2>5. Data Security</h2>
              <ul>
                <li>
                  We implement industry-standard security practices including
                  SSL encryption, secure servers, and access control to protect
                  your data.
                </li>
                <li>
                  Despite our best efforts, no system is 100% secure. Users are
                  encouraged to protect their credentials.
                </li>
              </ul>
            </div>
            <div className="content-box">
              <h2>6. User Rights</h2>
              <p>As a user, you have the right to:</p>
              <ul>
                <li>Access and review your personal data</li>
                <li>Request correction of inaccurate or outdated data</li>
                <li>Request deletion of your account and associated data</li>
                <li>Withdraw consent where processing is based on consent</li>
                <li>Raise complaints regarding misuse or breach of privacy</li>
              </ul>
              <p>
                To exercise these rights, email us at
                <a href="mailto:support@furrbaby.in"> support@furrbaby.in</a>.
              </p>
            </div>
            <div className="content-box">
              <h2>7. Children's Privacy</h2>
              <p>
                Our services are intended for users aged 18 and above. We do not
                knowingly collect personal data from minors. If you believe a
                minor has shared personal information, please contact us for
                immediate removal.
              </p>
            </div>
            <div className="content-box">
              <h2>8. Cookies and Tracking</h2>
              <p>We may use cookies and similar technologies to:</p>
              <ul>
                <li>Analyze usage trends and improve user experience</li>
                <li>Store preferences and login sessions</li>
              </ul>
              <p>
                You may disable cookies in your browser/app settings, but some
                features may not function properly.
              </p>
            </div>
            <div className="content-box">
              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Users will be
                notified of any significant changes through the app or via
                registered email. Continued use of the service implies
                acceptance of the revised policy.
              </p>
            </div>
            <div className="content-box">
              <h2>10. Governing Law and Jurisdiction</h2>
              <p>
                This Privacy Policy is governed by the laws of India. Any
                disputes shall be subject to the exclusive jurisdiction of
                courts located in <strong>[Your City]</strong>, India.
              </p>
            </div>
            <div className="content-box">
              <h2>11. Contact Information</h2>
              <p>
                For questions, complaints, or data-related requests, please
                contact:
              </p>
              <ul>
                <li>
                  📧 <strong>Email:</strong>{" "}
                  <a href="mailto:support@furrbaby.in">support@furrbaby.in</a>
                </li>
                <li>
                  🏢 <strong>Address:</strong> [Insert registered office
                  address]
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
