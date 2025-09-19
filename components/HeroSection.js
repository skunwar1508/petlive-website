export default function HeroSection() {
  return (
    <section className="hero-section">
      <div class="container">
        <div className="row">
          <div className="col-md-7 text-col">
            <div>
              <h1 className="heading-primary">
                Where Pets Find <span className="paw-highlight">Love</span>,
                <br /> Care & Community
              </h1>
              <p>
                India’s first all-in-one platform to consult vets online,
                <br /> join pet lover communities,
                <br /> and even find your pet’s perfect playdate.
              </p>
              <button className="btn cta-btn">
                Join the Pack – It’s Free!
              </button>
            </div>
          </div>

          <div className="col-md-5 image-col">
            <div className="blob-wrapper">
              <img
                src="/images/cat_dog_hero.png"
                alt="Pets"
                className="blob-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
