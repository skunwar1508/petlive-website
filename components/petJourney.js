import React from "react";


export default function PetJourney() {
    return (
        <section className="blog-section">
            <div className="container">
                <h2 className="heading-secondary">Why <span className="text-theme">FurrBaby?</span></h2>
                <div className="pet-journey-container">
                    <div className="timeline mb-3">
                        <img src="/images/journey.png" alt="journey" />
                    </div>


                    {/* <h2 className="journey-title">A Journey of Love, Care, and Cherished Memories</h2> */}


                    <div className="info-grid">
                        <div className="info-card">
                            <h3>Built by Pet Parents</h3>
                            <p>
                                We understand first-hand what pets mean to families. Every feature is
                                designed with empathy, safety, and comfort at its core.
                            </p>
                        </div>


                        <div className="info-card">
                            <h3>Expertise You Can Trust</h3>
                            <p>
                                Our platform brings together veterinarians, trainers, and experienced pet lovers
                                so you receive reliable guidance backed by real experience.
                            </p>
                        </div>


                        <div className="info-card">
                            <h3>A Community That Stays with You</h3>
                            <p>
                                From puppyhood to senior years, our pet community evolves as your pet grows.
                                You're never parenting alone; we're by your side in every stage.
                                <br />
                                <strong>FurrBaby: Where Pets Find Love, Care & Community</strong>
                            </p>
                        </div>
                    </div>


                    <div className="info-card text-start">
                        <h3>Discover a platform where:</h3>
                        <ul>
                            <li>1. Care is accessible</li>
                            <li>2. Friendships are meaningful</li>
                            <li>3. Knowledge is trustworthy</li>
                            <li>4. Pets are family</li>
                        </ul>
                        <p className="footer-text">
                            Whether you're seeking advice, finding playmates, or connecting with experts,
                            FurrBaby is your digital home as a pet parent.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}