import ViewBookModal from "@/components/modal/ViewBookModal";
import QuestionForm0 from "@/components/question-form/QuestionForm0";
import QuestionForm2 from "@/components/question-form/QuestionForm2";
import QuestionForm3 from "@/components/question-form/QuestionForm3";
import QuestionForm4 from "@/components/question-form/QuestionForm4";
import QuestionForm5 from "@/components/question-form/QuestionForm5";
import QuestionForm6 from "@/components/question-form/QuestionForm6";
import Head from "next/head";
import { useState } from "react";

export default function QuestionForm() {
  const [showViewBookModal, setShowViewBookModal] = useState(false);
  return (
    <>
      <Head>
        <title>Furr Question Form</title>
        <meta name="description" content="" />
      </Head>

      <main className="">
        <section className="question-form">
          <div className="container">
            <h1 className="heading-secondary ">
              Complete Question Flow for Scrapbook <br />
              "Let’s Build Your Pet’s Legend! 🏰"
            </h1>
            <QuestionForm0 />
            {/* <QuestionForm1 /> */}
            <QuestionForm2 />
            <QuestionForm3 />
            <QuestionForm4 />
            <QuestionForm5 />
            <QuestionForm6 />
            <button
              className="cta-btn"
              onClick={() => setShowViewBookModal(true)}
            >
              Save & Continue
            </button>
            <ViewBookModal
              show={showViewBookModal}
              onHide={() => setShowViewBookModal(false)}
            />
          </div>
        </section>
      </main>
    </>
  );
}
