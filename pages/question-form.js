import Head from "next/head";

export default function QuestionForm() {
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
            <button className="cta-btn">Save & Continue</button>
          </div>
        </section>
      </main>
    </>
  );
}
