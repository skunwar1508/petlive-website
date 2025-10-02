import React from "react";

const QuestionForm4 = () => {
  return (
    <div className=" bg-paw-img discover-section">
      <span className="third-bg"></span>
      <h3>4: Milestone Memories</h3>
      <p>"Pick a legendary moment to celebrate!"</p>
      <div className="btn-row">
        <button className="btn">🎓 Obedience School</button>
        <button className="btn">🏊 First Swim </button>
        <button className="btn">🎂 Gotcha Day </button>
      </div>
      <p>"When did this happen?"</p>
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
      <p>
        "Tell us the story! (e.g., ‘Swam 0.5 meters before eating a stick’)"
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
      <p>"Add a photo of this iconic moment 📸"</p>
      <div className="form-input">
        <input
          type="text"
          className="form-control modal-input"
          placeholder="Upload Photo"
          name="name"
          // {...formik.getFieldProps("name")}
        />
        {/* <ErrorMessage name="name" formik={formik} /> */}
      </div>
    </div>
  );
};

export default QuestionForm4;
