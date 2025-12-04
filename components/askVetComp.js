import { useRouter } from "next/navigation";

const AskVet = () => {
    const router = useRouter();
    return (
        <section className="famous-section bg-paw-img">
            <span className="third-bg"></span>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6 d-flex justify-content-center align-items-center">
                        <div className="famous-img">
                            <img src="/images/ask-vet.png" alt="Ask Vet" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 d-flex justify-content-center align-items-center">
                        <div className="famous-text">
                            <h3>
                                <span className="text-theme">Ask a Vet</span> <br />
                                Get Free expert advice <br />
                                on your pet health.
                            </h3>
                            <button
                                className="btn arw-btn"
                                onClick={() => router.push("/question-form")}
                            >
                                Start Creating <span className="arrow">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AskVet;
