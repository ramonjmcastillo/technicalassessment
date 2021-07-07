const PropertyCard = (props) => {
  return (
    <>
      <div className="property-container">
        <img alt="Property" src={props.imageurl} />
        <h1> {props.title} </h1>
        <p className="property-description"> {props.description}</p>
        <p className="property-price"> ${props.price}</p>
      </div>
    </>
  );
};

export default PropertyCard;
