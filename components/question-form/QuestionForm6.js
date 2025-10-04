import React from "react";

const QuestionForm6 = () => {
  return (
    <div className=" bg-paw-img bg-paw-img discover-section">
      <span className="third-bg"></span>
      <h3>6: Legacy & Finale</h3>
      <p>
        "What lesson has your pet taught you? (e.g., ‘Naps &gt; Everything’)"
      </p>
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

export default QuestionForm6;
