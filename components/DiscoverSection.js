import { useRouter } from "next/router";

const DiscoverSection = ({discoverData}) => {
  const router = useRouter();





  return (
    <section className="page-section bg-paw-img bg-paw-img-dark community-page discover-section">
      <span className="third-bg"></span>
      <div className="container">
        <div className="section-heading text-center mb-5">
          <h2 className="heading-secondary">
            Discover Pet Communities That Match Your Interests
          </h2>
          <h6>
            Join a creative pet community built around what truly matters to you and your furry friends.
Explore specialized groups based on your pet type, hobbies, routines, and even your location - so you can connect with pet parents who understand your lifestyle.
          </h6>
        </div>
        <div className="row justify-content-center g-4">
          {/* Right side - small blogs */}
          {discoverData?.map((d, index) => (
            <div key={index} className="col-lg-4 d-flex flex-column">
              <a className="d-block" onClick={() => router.push(`/community/info/${d?._id}`)}>
                <div className="blog-card  ">
                  <img
                    src={d?.image?.path || "/assets/images/default.png"}
                    alt={d?.name}
                    className="blog-card-img img-fluid"
                  />
                  <div className="blog-text">
                    <h5>{d?.name}</h5>
                    <button className="btn cta-btn mb-0">
                      Explore Community
                      <span className="arrow"> →</span>
                    </button>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
