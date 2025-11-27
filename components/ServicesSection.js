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
      desc: "Join thousands of passionate pet parents in India’s most unique pet community. Share real experiences, ask questions, and get genuine support from like-minded animal lovers. Whether you have a dog, cat, bird, or exotic pet, you'll find meaningful friendships, trusted guidance, and a space where every pet story matters.",
    },
    {
      title: "Expert Blog",
      desc: "Unlock valuable pet care insights and learn from professionals who know pets best. Our Expert Blog brings you practical advice, wellness tips, behavior guides, nutrition insights, and real-life stories from experienced veterinarians and pet owners. Each blog helps you better understand your pet, confidently nurture them, and build a happier life together.",
    },
    {
      title: "Veterinary Service",
      desc: "Your pet’s health should never wait. Our platform provides 24/7 online vet consultation in India, connecting you with certified veterinary professionals instantly. Whether you need routine advice, medical assistance, or urgent care, our experts provide reliable guidance anytime, anywhere—so your beloved companion is always in safe hands.",
    },
    {
      title: "Discover Pet Communities",
      desc: "Explore creative pet communities built around what truly matters to you and your furry friends. Join specialized groups based on your pet type, hobbies, routines, and even your location—so you can connect with pet parents who understand your lifestyle.",
    },
    {
      title: "Make Your Pet Famous",
      desc: "Create a free digital scrapbook to celebrate your pet’s quirks, adventures, and secret talents—because every pet care moment deserves love and the spotlight.",
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
                  <h3 className="heading-third">{item.title}</h3>
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
