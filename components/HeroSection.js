import { useAppContext } from "@/context/context";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
    const { user, logout, isLoggedIn, showLogin, setShowLogin, showRegister, setShowRegister } = useAppContext();

    const handleNavigation = (path) => {
      if (isLoggedIn) {
        router.push(path);
      } else {
        setShowLogin(true);
      }
    };
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-md-7 text-col">
            <div>
              <h1 className="heading-primary">
                Where Pets Find Love,
                <br /> Care & Community
              </h1>
              <p>
                Welcome to FurrBaby - India’s first all-in-one platform created for pets and the humans who adore them. <br/>
From expert online vet consultations to amazing pet community spaces and joyful playdate discovery, we bring every pet parent closer to worry-free care, trusted guidance, and real connections.

              </p>
              <div className="btns-container">
                <button
                  className="btn cta-btn"
                  onClick={() => router.push("/community/list")}
                >
                  Explore Our Community
                </button>
                <button
                  className="btn cta-btn"
                  onClick={() => router.push("/blogs")}
                >
                  Read Our Blog
                </button>
              </div>
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
