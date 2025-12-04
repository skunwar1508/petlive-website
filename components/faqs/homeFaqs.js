import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";

const FaqSection = ({ isHome, totalCounts }) => {

  // use react-bootstrap Accordion (require here so we don't need to modify top imports)

  const faqs = [
    {
      q: "What is Furr Baby?",
      a: "Furr Baby is an all-in-one platform built for pet parents. Discover services, connect with a thriving pet community, explore resources, and enjoy easy service bookings - all in one place."
    },
    {
      q: "How can I join a dog community on the platform?",
      a: "Yes, you can join dedicated groups for different pets, including a vibrant dog community where you can share stories, learn from other pet parents, and meet like-minded enthusiasts."
    },
    {
      q: "How does Furr Baby support pet care?",
      a: "We provide guides, expert articles, and community discussions covering nutrition, grooming, training, and overall pet care to make sure your pet's needs are understood and supported."
    },
    {
      q: "Where can I get advice concerning pets?",
      a: "You can ask questions within the community, or read our expert blogs for reliable pet advice from veterinarians and experienced owners themselves."
    },
    {
      q: "Do you provide online vet consultation in India?",
      a: "Yes, Furr Baby provides online vet consultation India that allows you to have a discussion with certified veterinarians in the comfort of your home for regular advice, urgent matters, or second opinions."
    },
    // ...rest of the original faqs
  ];

  const visibleFaqs = typeof totalCounts === "number" ? faqs.slice(0, totalCounts) : faqs;

  return (
    <section className="blog-section famous-section bg-paw-img">
      <span className="third-bg"></span>
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
