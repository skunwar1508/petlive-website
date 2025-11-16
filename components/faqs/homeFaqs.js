import authAxios from "@/services/authAxios";
import common from "@/services/common";
import Link from "next/link";
import { useEffect, useState } from "react";
const Accordion = require("react-bootstrap/Accordion").default;

const FaqSection = ({ isHome, totalCounts }) => {

  // use react-bootstrap Accordion (require here so we don't need to modify top imports)

  const faqs = [
    { q: "What is Furr Baby?", a: "Furr Baby is a platform dedicated to providing resources and services for pet owners, including provider listings, booking, and educational content." },
    { q: "How do I create an account?", a: "Click the Sign Up button, provide your details, and verify your email to create an account." },
    { q: "How can I contact support?", a: "You can contact support via the Contact page, live chat (if available), or by emailing support@furrbaby.com." },
    { q: "Can I book services through the site?", a: "Yes, you can browse providers and book services directly from their profile pages." },
    { q: "What payment methods are accepted?", a: "We accept major credit and debit cards; additional local payment methods may be available depending on your region." },
    { q: "How do refunds work?", a: "Refunds are processed according to the provider's cancellation policy and our terms; contact support for help with disputes." },
    { q: "Can I cancel or reschedule a booking?", a: "Yes, bookings can be canceled or rescheduled within the time window allowed by the provider's policy." },
    { q: "Is my payment information secure?", a: "Yes, payment data is handled via secure, PCI-compliant processors and is not stored on our servers." },
    { q: "How do I add my pet's profile?", a: "Go to your account dashboard, choose 'Pets', and add a new profile with name, species, breed, age, and any medical notes." },
    { q: "Can I share pet records with providers?", a: "You can choose to share specific records and documents with providers during booking or from your pet's profile." },
    { q: "Is my pet's data private?", a: "We take privacy seriously: personal and pet data is stored securely and shared only with providers you authorize." },
    { q: "Do you provide veterinary advice?", a: "We provide general articles and resources, but we are not a substitute for professional veterinary care. Contact a vet for medical emergencies." },
    { q: "What if my pet has special needs?", a: "When booking, include special needs in the booking details so providers can prepare; contact providers directly for complex cases." },
    { q: "How do I leave a review for a provider?", a: "After a completed service, you'll be prompted to rate and review the provider from your bookings or the provider's profile." },
    { q: "How are providers vetted?", a: "Providers may be reviewed for credentials, background checks, and user feedback depending on local regulations and platform policies." },
    { q: "What species do you support?", a: "We primarily support common companion animals such as dogs and cats; some providers also support small mammals, birds, and reptiles." },
    { q: "Are there subscription plans?", a: "Some premium features or memberships may be available; check the Subscriptions section in your account for current plans." },
    { q: "How do promo codes work?", a: "Enter promo codes at checkout; codes may have expiration dates and restrictions that will be shown at redemption." },
    { q: "Can I gift a service to someone?", a: "Yes, you can purchase a service for another person by booking on their behalf or using a gift voucher if available." },
    { q: "Do you offer gift cards?", a: "Gift cards or credit options may be offered seasonally; check the Shop or Gifts section for availability." },
    { q: "Is there a mobile app?", a: "A mobile app may be available for iOS and Android; check the App Store or Google Play for the latest release." },
    { q: "How do notifications work?", a: "You can manage email and push notification preferences from your account settings." },
    { q: "Can I become a provider on Furr Baby?", a: "Yes. Visit the Become a Provider page to sign up, submit credentials, and set up your profile and availability." },
    { q: "How do provider payments work?", a: "Providers receive payouts according to the payment schedule and methods configured in their provider account." },
    { q: "What safety measures are in place?", a: "We encourage verified profiles, provider reviews, secure payments, and clear communication. Users should follow safety guidelines when meeting providers." },
    { q: "How do I report a problem or abuse?", a: "Use the Report or Contact support option to submit issues; include booking details and any relevant evidence." },
    { q: "Can I get an invoice for my booking?", a: "Yes, invoices are available from the booking details page and can be downloaded or emailed to you." },
    { q: "How do I delete my account?", a: "Request account deletion from Account Settings or contact support; account removal is subject to retention rules and may be reversible within a short window." },
    { q: "Does Furr Baby have an API?", a: "We may offer partner APIs or integrations; contact partnerships or developer support for access and documentation." }
  ];

  const visibleFaqs = typeof totalCounts === "number" ? faqs.slice(0, totalCounts) : faqs;

  return (
    <section className="blog-section">
      <div className="container">
        <h2 className="heading-secondary">FAQs</h2>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <Accordion defaultActiveKey={visibleFaqs.length ? "0" : undefined}>
              {visibleFaqs?.map((item, idx) => (
                <Accordion.Item eventKey={String(idx)} key={idx}>
                  <Accordion.Header>{item?.q}</Accordion.Header>
                  <Accordion.Body>{item?.a}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            {isHome && (
              <div className="mt-5 text-center">
                <Link href="/faqs">
                  <span className="btn arw-btn">View all FAQs</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
