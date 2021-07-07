import { useState, useEffect } from "react";
import useProperty from "./hooks/useProperty";
import PropertyCard from "./components/PropertyCard";
import CustomModal from "./components/Modal";
import InfiniteScroll from "react-infinite-scroll-component";

const App = () => {
  const { getInitialProperties } = useProperty();
  const [query, setQuery] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [properties, setProperties] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState({});

  const getFirstPropertyData = async () => {
    const data = await getInitialProperties(
      query + 4,
      Object.keys(filters).length === 0 ? {} : filters
    );
    setProperties(data);
    setQuery((prevQuery) => prevQuery + 4);
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    const data = await getInitialProperties(4, filters);
    setProperties(data);
    setQuery(4);
    setIsOpen(false);
    document.body.style.overflow = "visible";
  };

  const getNextPropertyData = async () => {
    if (query >= properties.totalProperties) {
      setHasMoreItems(false);
    } else {
      await getFirstPropertyData();
    }
  };

  useEffect(() => {
    getFirstPropertyData();
  }, []);

  const mappedProperties = properties?.list?.map((item) => {
    return <PropertyCard {...item} />;
  });

  return (
    <>
      <div className="app content-padding">
        <p style={{ fontWeight: "500" }}> Properties </p>
        <hr className="hr" />
        <p onClick={() => setIsOpen(true)} className="filter">
          <img className="icon" src="/assets/images/filter.png" />
          <span> Filter </span>
        </p>
        <hr className="hr" />
        <h1> Search Properties </h1>
        <p style={{ alignSelf: "flex-start" }}>
          {properties?.totalProperties} properties found
        </p>
        <InfiniteScroll
          dataLength={properties}
          next={getNextPropertyData}
          hasMore={hasMoreItems}
          scrollThreshold={0.999999999999}
          loader={
            properties?.list?.length >= 4 && (
              <h4>LOADING MORE PROPERTIES....</h4>
            )
          }
        >
          {mappedProperties}
        </InfiniteScroll>
      </div>
      <CustomModal
        {...{
          filters,
          setFilters,
          handleFilter,
          isOpen,
          setIsOpen,
        }}
      />
    </>
  );
};

export default App;
