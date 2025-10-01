const FamousSection = () => {
  return (
    <section className="famous-section bg-paw-img">
      <span className="third-bg"></span>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 d-flex justify-content-center">
            <div className="famous-img">
              <img src="/images/famous-book.svg" alt="Famous Book" />
            </div>
          </div>
          <div className="col-12 col-sm-6 d-flex justify-content-center">
            <div className="famous-text">
              <h3>
                Let’s Make Your Pet Famous! <br />
                (At Least in Our Eyes)
              </h3>
              <p>
                Create a free digital scrapbook to celebrate your pet’s quirks,
                adventures, and secret talents. No red carpet needed!
              </p>
              <button className="btn arw-btn">
                Start Creating <span class="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamousSection;
