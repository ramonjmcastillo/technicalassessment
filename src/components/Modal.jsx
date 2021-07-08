import { useState } from "react";
import Modal from "react-modal";
import { blockInvalidChar } from "../helpers/index";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "100%",
    width: "100%",
    padding: "2rem 7%",
  },
};

const afterOpenModal = () => {
  document.body.style.overflow = "hidden";
};

const CustomModal = (props) => {
  const { filters, setFilters, isOpen, setIsOpen, handleFilter, isSubmitting } =
    props;
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "visible";
  };

  const bedroom = [
    { name: "Any", type: undefined },
    { name: "Studio", type: "0" },
    { name: "1", type: "1" },
    { name: "2", type: "2" },
    { name: "3", type: "3" },
    { name: "4+", type: "4" },
  ];

  const mappedBedroom = bedroom.map((bed) => {
    return (
      <div
        onClick={() => setFilters({ ...filters, type: bed.type })}
        className={`${
          filters.type === bed.type && filters.hasOwnProperty("type")
            ? "active"
            : ""
        } bedroom`}
      >
        {bed.name}
      </div>
    );
  });

  const errorHandler = () => {
    switch (true) {
      case parseInt(filters.max) <= parseInt(filters.min):
        setErrorMessage(
          "Your maximum value cannot be smaller or equal than your minimum value"
        );
        break;
      case parseInt(filters.max) < 0 || parseInt(filters.min) < 0:
        setErrorMessage("Your minimum or maximum cannot be less than 0");
        break;
      default:
        setErrorMessage("");
        break;
    }
  };

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Filter Properties"
      onAfterOpen={afterOpenModal}
    >
      <div className="filter-header">
        <span className="trigger" onClick={closeModal}>
          X
        </span>
        <div>Filters</div>
        <span className="trigger" onClick={() => setFilters({})}>
          Clear
        </span>
      </div>

      <hr className="hr" />

      <form className="filter-form">
        <div className="filter-price">
          <input
            onChange={(e) => {
              setFilters({ ...filters, min: parseInt(e.target.value) });
              // () => errorHandler();
            }}
            onBlur={() => errorHandler()}
            value={filters.min || ""}
            className="input"
            placeholder="Minimum"
            type="number"
            onKeyDown={blockInvalidChar}
          />
          <p style={{ margin: "0 auto" }}> — </p>
          <input
            onChange={(e) => {
              setFilters({ ...filters, max: parseInt(e.target.value) });
              // () => errorHandler();
            }}
            onBlur={() => errorHandler()}
            value={filters.max || ""}
            className="input"
            placeholder="Maximum"
            type="number"
            onKeyDown={blockInvalidChar}
          />
        </div>
        <small className="error-message"> {errorMessage} </small>

        <div className="filter-bedroom">
          <h3> Bed Rooms </h3>
          <div className="bedroom-inputs">{mappedBedroom}</div>
        </div>

        <button
          disabled={errorMessage !== "" || isSubmitting}
          className={`filter-button button ${
            (errorMessage !== "" || isSubmitting) && "disabled"
          }`}
          onClick={(e) => handleFilter(e)}
        >
          Apply Filter
        </button>
      </form>
    </Modal>
  );
};

export default CustomModal;
