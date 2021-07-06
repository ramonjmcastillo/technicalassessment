import { useState } from "react";
import Modal from "react-modal";

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
  const { filters, setFilters, isOpen, setIsOpen, handleFilter } = props;

  const [hasErrors, setHasErrors] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "visible";
  };

  console.log(filters.type, "filters");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Filter Properties"
      onAfterOpen={afterOpenModal}
    >
      <div className="filter-header">
        <span onClick={closeModal}> X </span>
        <div>Filters</div>
        <span onClick={() => setFilters({})}>Clear</span>
      </div>

      <hr className="hr" />

      <form className="filter-form">
        <div className="filter-price">
          <input
            onChange={(e) => setFilters({ ...filters, min: e.target.value })}
            value={filters.min || ""}
            className="input"
            placeholder="Minimum"
            type="number"
          />
          <p> — </p>
          <input
            onChange={(e) => setFilters({ ...filters, max: e.target.value })}
            value={filters.max || ""}
            className="input"
            placeholder="Maximum"
            type="number"
          />
        </div>

        <div className="filter-bedroom">
          <h3> Bed Rooms </h3>
          <div className="bedroom-inputs">
            <div
              onClick={() => setFilters({ ...filters, type: undefined })}
              className={`${
                filters.type === undefined ? "active" : ""
              } bedroom`}
            >
              Any
            </div>
            <div
              onClick={() => setFilters({ ...filters, type: 0 })}
              className={`${filters.type === 0 ? "active" : ""} bedroom`}
            >
              Studio
            </div>
            <div
              onClick={() => setFilters({ ...filters, type: 1 })}
              className={`${filters.type === 1 ? "active" : ""} bedroom`}
            >
              1
            </div>
            <div
              onClick={() => setFilters({ ...filters, type: 2 })}
              className={`${filters.type === 2 ? "active" : ""} bedroom`}
            >
              2
            </div>
            <div
              onClick={() => setFilters({ ...filters, type: 3 })}
              className={`${filters.type === 3 ? "active" : ""} bedroom`}
            >
              3
            </div>
            <div
              onClick={() => setFilters({ ...filters, type: 4 })}
              className={`${filters.type === 4 ? "active" : ""} bedroom`}
            >
              4+
            </div>
          </div>
        </div>

        <button
          disabled={hasErrors || hasChanges}
          className="filter-button"
          onClick={(e) => handleFilter(e)}
        >
          Apply Filter
        </button>
      </form>
    </Modal>
  );
};

export default CustomModal;
