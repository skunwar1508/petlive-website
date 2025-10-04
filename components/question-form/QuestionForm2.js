import React from "react";

const QuestionForm2 = () => {
  return (
    <div className=" bg-paw-img discover-section">
      <span className="third-bg"></span>
      <h3>2: The Origin Story</h3>
      <p>"How did your pet claim their kingdom?"</p>
      <div className="btn-row">
        <button className="btn">🏡 Rescue</button>
        <button className="btn">🎁 Surprise Gift </button>
        <button className="btn">👑 Breeder Royalty</button>
      </div>
      <p>"When did their reign begin?"</p>
      <div className="form-input">
        <input
          type="text"
          className="form-control modal-input"
          placeholder="Date"
          name="name"
          // {...formik.getFieldProps("name")}
        />
        {/* <ErrorMessage name="name" formik={formik} /> */}
      </div>
      <p>What was their first act as ruler? (e.g., ‘Redecorated the sofa’)</p>
      <div className="form-input">
        <input
          type="text"
          className="form-control modal-input"
          placeholder="Answer"
          name="name"
          // {...formik.getFieldProps("name")}
        />
        {/* <ErrorMessage name="name" formik={formik} /> */}
      </div>
    </div>
  );
};

export default QuestionForm2;
