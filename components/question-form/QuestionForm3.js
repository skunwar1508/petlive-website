import React from "react";

const QuestionForm3 = () => {
  return (
    <div className=" bg-paw-img bg-paw-img-dark discover-section">
      <span className="third-bg"></span>
      <h3>3: Paw-sonality Profile</h3>
      <p>"What’s their superhero trait?"</p>
      <div className="btn-row">
        <button className="btn">🍗 Food Mercenary</button>
        <button className="btn"> 🌳 Park Warrior </button>
        <button className="btn"> 😈 Chaos Goblin </button>
        <button className="btn"> 📖 Bookworm </button>
      </div>
      <p>"Describe their strangest habit ? (e.g., Snores like a chainsaw)" </p>
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
      <p>
        "What’s their hidden talent? (e.g., ‘Opens fridge doors for science’)"
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

export default QuestionForm3;
