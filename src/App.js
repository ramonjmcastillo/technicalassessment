import { useState, useEffect } from "react";
import useProperty from "./hooks/useProperty";
import PropertyCard from "./components/PropertyCard";
import CustomModal from "./components/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";

const App = () => {
  const { getInitialProperties, loading } = useProperty();
  const [query, setQuery] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [properties, setProperties] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFirstPropertyData = async () => {
    const data = await getInitialProperties(
      query + 4,
      Object.keys(filters).length === 0 ? {} : filters
    );
    setProperties(data);
    setQuery((prevQuery) => prevQuery + 4);
  };

  const handleFilter = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const data = await getInitialProperties(4, filters);
    setProperties(data);
    setQuery(4);
    setIsOpen(false);
    document.body.style.overflow = "visible";
    setIsSubmitting(false);
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
    return <PropertyCard total={properties.totalProperties} {...item} />;
  });

  return (
    <>
      <div className="app content-padding">
        <p style={{ fontWeight: "500" }}> Properties </p>
        <hr className="hr" />
        <p onClick={() => setIsOpen(true)} className="filter trigger">
          <img className="icon" src="/assets/images/filter.png" />
          <span className="trigger"> Filter </span>
        </p>
        <hr className="hr" />
        <h1> Search Properties </h1>

        {loading ? (
          <>
            <span style={{ width: "100%", height: "75px" }}>
              <Skeleton />
            </span>
            <div style={{ width: "100%" }}>
              <Skeleton height={250} />
            </div>
            <div style={{ width: "100%" }}>
              <Skeleton height={25} />
            </div>
            <div style={{ width: "100%" }}>
              <Skeleton height={25} />
            </div>
            <div style={{ width: "100%" }}>
              <Skeleton height={25} />
            </div>
          </>
        ) : (
          <p style={{ alignSelf: "flex-start" }}>
            {properties.totalProperties} properties found
          </p>
        )}

        <div className="card-container">
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
      </div>
      <CustomModal
        {...{
          filters,
          setFilters,
          handleFilter,
          isOpen,
          setIsOpen,
          isSubmitting,
        }}
      />
    </>
  );
};

export default App;
