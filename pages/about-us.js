import Head from "next/head";
import React from "react";

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn about Furr Baby’s mission, vision, and commitment to creating a trusted pet community with expert advice and support for dog and cat parents." />
      </Head>
      <section class="page-section text-page-ui py-5">
        <div class="container">
          <div class="text-center mb-4">
            <h1 className="heading-secondary">About Us – Furr Baby</h1>
            <p class="lead">Because every paw deserves a voice.</p>
          </div>

          <div class="content">
            <p>
              At <strong>Furr Baby</strong>, we believe pets aren't just animals
              — they’re family. Born from the love and chaos of real-life pet
              parenting, our platform is designed to bridge the gap between pet
              owners and trusted veterinarians, while creating a warm,
              community-driven space to celebrate every tail wag, pawprint, and
              story.
            </p>
            <p>
              Whether you're browsing on the web or using our mobile app, Furr
              Baby is your digital pet partner — always by your side.
            </p>

            <hr class="my-5" />
            <div className="content-box">
              <h2>🎯 Our Mission</h2>
              <p>
                To empower pet parents across India with the tools, support, and
                professional help they need to raise healthy, happy pets — from
                the comfort of their homes.
              </p>
            </div>
            <div className="content-box">
              <h2>🛠️ What We Offer</h2>
              <ul>
                <li>
                  <strong>
                    Vet Consultation Services <em>(App Only)</em>:
                  </strong>
                  Book a consultation by selecting your pet’s concern from
                  predefined categories and get connected to a verified
                  veterinarian. Pay per service — simple, fast, stress-free.
                </li>
                <li>
                  <strong>
                    Pet Communities <em>(Available on both App & Web)</em>:
                  </strong>
                  Ask, answer, share — connect with fellow pet parents going
                  through the same joys and chaos. It’s your space to laugh,
                  learn, and love your pets more.
                </li>
                <li>
                  <strong>
                    Personalized Pet Scrapbook <em>(Website Exclusive)</em>:
                  </strong>
                  Create your pet’s digital legacy with our story-driven
                  scrapbook builder.
                </li>
                <li>
                  <strong>
                    Educational Pet Blogs <em>(Website Exclusive)</em>:
                  </strong>
                  Discover expert tips and insights on pet care in our regularly
                  updated blog section.
                </li>
                <li>
                  <strong>
                    Wallet & Secure Payments <em>(App Only)</em>:
                  </strong>
                  Use our in-app wallet to book services, add funds, and get
                  instant refunds if a vet isn’t available.
                </li>
              </ul>
            </div>
            <div className="content-box">
              <h2>👩‍⚕️ Powered by Vets. Designed for Pets.</h2>
              <p>
                Our network of licensed Indian veterinarians provides
                compassionate and experienced care through digital
                consultations. Every expert on our platform is verified,
                experienced, and aligned with our mission of stress-free care
                for every pet.
              </p>
            </div>
            <div className="content-box">
              <h2>🌍 Our Vision</h2>
              <p>
                To become India’s most trusted digital pet care companion, where
                technology meets love, and every pet feels safe, seen, and
                celebrated.
              </p>
            </div>
            <div className="content-box">
              <h2>🚀 Why Pet Parents Love Furr Baby</h2>
              <ul class="check-list">
                <li>
                  ✅ Instant, mobile-based consultations with licensed vets
                </li>
                <li>
                  ✅ Wallet-based payments for seamless service booking{" "}
                  <em>(App Only)</em>
                </li>
                <li>
                  ✅ Pet-first storytelling through scrapbooks{" "}
                  <em>(Web Only)</em>
                </li>
                <li>
                  ✅ Trusted content and pet-care blogs <em>(Web Only)</em>
                </li>
                <li>
                  ✅ A safe, social space for pet lovers everywhere{" "}
                  <em>(App + Web)</em>
                </li>
              </ul>
            </div>
            <div className="content-box">
              <h2>📌 Ready to Join the Pack?</h2>
              <ul>
                <li>
                  📱 Download the <strong>Furr Baby</strong> app to consult vets
                  and manage your pet’s health.
                </li>
                <li>
                  🌐 Visit{" "}
                  <a
                    href="https://www.furrbaby.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.furrbaby.in
                  </a>{" "}
                  to join communities, read blogs, or create your pet’s story.
                </li>
              </ul>
            </div>

            <p class="mt-4 fw-bold">
              Because every fur baby deserves a voice — and we’re here to
              amplify it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
