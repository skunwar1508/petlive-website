import { useEffect, useRef, useState } from "react";

const ServicesSection = () => {
  const sectionsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const middleY = window.innerHeight / 2;
      let newActiveIndex = activeIndex;

      sectionsRef.current.forEach((section, i) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= middleY && rect.bottom >= middleY) {
            newActiveIndex = i;
          }
        }
      });

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const items = [
    {
      title: "Community",
      desc: "Connect with thousands of pet parents, share experiences, get advice, and build lasting friendships in our caring community.",
    },
    {
      title: "Expert Blog",
      desc: "Access expert advice, tips, and stories from veterinarians and experienced pet owners to give your pets the best care.",
    },
    {
      title: "Veterinary Service",
      desc: "Round-the-clock access to professional veterinary consultations and emergency care for your beloved pets.",
    },
  ];

  return (
    <section className="services-section">
      <h2 className="heading-secondary">Our Services</h2>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 d-flex justify-content-center">
            <div className="famous-img">
              <img src="/images/services-paw.png" alt="Famous Book" />
            </div>
          </div>
          <div className="col-12 col-sm-6 d-flex justify-content-center">
            <div className="services-text">
              {items.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (sectionsRef.current[i] = el)}
                  className={`block ${
                    activeIndex === i ? "text-active" : "text-inactive"
                  }`}
                >
                  <h3 className="heading-secondary">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
