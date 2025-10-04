import React from "react";

const QuestionForm1 = () => {
  return (
    <div className=" bg-paw-img bg-paw-img-dark discover-section">
      <span className="third-bg"></span>
      <h3>1: The Hero’s Introduction</h3>
      <p>
        "What’s your pet’s full title? (e.g., Sir Barks-a-Lot, Empress of
        Cuddles)"
      </p>
      <div className="form-input">
        <input
          type="text"
          className="form-control modal-input"
          placeholder="Pet’s Name"
          name="name"
          // {...formik.getFieldProps("name")}
        />
        {/* <ErrorMessage name="name" formik={formik} /> */}
      </div>
      <p>"What species rules your home?"</p>
      <div className="btn-row">
        <button className="btn">🐶 Dog</button>
        <button className="btn">🐱 Cat</button>
      </div>
    </div>
  );
};

export default QuestionForm1;
