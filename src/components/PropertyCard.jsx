const PropertyCard = (props) => {
  const { imageurl, description, price } = props;

  return (
    <>
      <div className="property-container">
        <img alt="Property" src={imageurl} />
        <h1> {props.title} </h1>
        <p className="property-description"> {description}</p>
        <p className="property-price"> ${price}</p>
      </div>
    </>
  );
};

export default PropertyCard;
