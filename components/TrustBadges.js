export default function TrustBadges() {
  return (
    <section className="trust-badges-section">
      <h2 className="heading-secondary">Trust Badges</h2>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-4 d-flex justify-content-center">
            <div className="blob blob1">
              <img src="/images/trust-badge-1.svg" alt="trust bg badge" />
              <h4>100+</h4>
              <p>Certified Vets</p>
            </div>
          </div>
          <div className="col-12 col-sm-4 d-flex justify-content-center">
            <div className="blob blob2">
              <img src="/images/trust-badge-2.svg" alt="trust bg badge" />
              <h4>50,000+</h4>
              <p>Happy Pet Parents</p>
            </div>
          </div>
          <div className="col-12 col-sm-4 d-flex justify-content-center">
            <div className="blob blob3">
              <img src="/images/trust-badge-2.svg" alt="trust bg badge" />
              <h4>4.9★</h4>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
