import React, { useState, useEffect } from "react";
import { useInput } from "./hooks-input";

const PageInput = props => {
  const {
    value: sectionHeader,
    bind: bindSectionHeaderInput,
    reset: resetSectionHeaderInput
  } = useInput("");
  const {
    value: sectionBody1,
    bind: bindSectionBody1Input,
    reset: resetSectionBody1Input
  } = useInput("");
  const {
    value: sectionBody2,
    bind: bindSectionBody2Input,
    reset: resetSectionBody2Input
  } = useInput("");
  const {
    value: sectionBody3,
    bind: bindSectionBody3Input,
    reset: resetSectionBody3Input
  } = useInput("");
  const [sectionId, setSectionId] = useState();
  const isAdmin = props.isAdmin;

  // Removes the spaces from sectionHeader and sets the href link in BulletPoints
  const createSectionId = () => {
    setSectionId(sectionHeader.replace(/\s+/g, ""));
  };

  // Work on increasin id on submit
  const handleSubmit = async event => {
    event.preventDefault();
    await createSectionId();
    const sectionState = {
      sectionHeader,
      sectionBody1,
      sectionBody2,
      sectionBody3,
      sectionId
    };
    await fetch(`/api/sections`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(sectionState)
    })
      .then(() => alert("success"))
      .then(() => resetSectionHeaderInput())
      .then(() => resetSectionBody1Input())
      .then(() => resetSectionBody2Input())
      .then(() => resetSectionBody3Input())
      .catch(err => console.log(err));
  };

  useEffect(() => {
    createSectionId();
  });

  const inputComponent = () => {
    return (
      <form id="pageInputForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sectionName">Section Title</label>
          <input
            type="text"
            className="form-control"
            id="section-Header-input"
            placeholder="Insert Section Title"
            {...bindSectionHeaderInput}
            aria-describedby="sectionHeaderDesc"
            required
          />
          <small id="sectionHeaderDesc" className="form-text text-muted">
            Please insert the title for this section, this will also create a
            bullet point at the top of the page
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="sectionBodyArea" aria-describedby="paragraphs-desc">
            Section Paragraphs
          </label>
          <p id="paragraphs-desc" className="form-text">
            Please enter 1-3 paragraphs
          </p>
          <textarea
            type="text"
            id="sectionBody1Area"
            value={sectionBody1}
            className="form-control"
            placeholder="Insert Paragraph One"
            {...bindSectionBody1Input}
            aria-describedby="sectionBody1Desc"
            required
          ></textarea>
          <small id="sectionBody1Desc" className="form-text text-muted">
            Please insert the first pargraph for this section
          </small>
          <br />
          <textarea
            type="text"
            value={sectionBody2}
            className="form-control"
            placeholder="Insert Paragraph Two"
            {...bindSectionBody2Input}
            aria-describedby="sectionBody2Desc"
          ></textarea>
          <small id="sectionBody2Desc" className="form-text text-muted">
            Please insert your second paragraph
          </small>
          <br />
          <textarea
            type="text"
            value={sectionBody3}
            className="form-control"
            placeholder="Insert Paragraph Three"
            {...bindSectionBody3Input}
            aria-describedby="sectionBody3Desc"
          ></textarea>
          <small id="sectionBody3Desc" className="form-text text-muted">
            Please add a new section after this paragraph
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  return <>{isAdmin ? inputComponent() : null}</>;
};

export default PageInput;
