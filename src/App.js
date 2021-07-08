import { useState, useEffect } from "react";

//hooks
import useProperty from "./hooks/useProperty";

//components
import PropertyCard from "./components/PropertyCard";
import CustomModal from "./components/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import CardSkeleton from "./components/CardSkeleton";

const App = () => {
  //states

  //to set the number of properties being fetched
  const [query, setQuery] = useState(0);

  //to check if will still call the api
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [properties, setProperties] = useState([]);

  //modal states
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getInitialProperties, loading } = useProperty();

  //function declarations

  const getFirstPropertyData = async () => {
    //gets the data from the api, checks if there are filters
    const data = await getInitialProperties(
      query + 4,
      Object.keys(filters).length === 0 ? {} : filters
    );
    setProperties(data);
    setQuery((prevQuery) => prevQuery + 4);
  };

  //function when user clicks apply filter
  //resets the limit to 4 with the new filters
  const handleFilter = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const data = await getInitialProperties(4, filters);
    setProperties(data);
    setQuery(4);
    setHasMoreItems(true);
    setIsOpen(false);
    document.body.style.overflow = "visible";
    setIsSubmitting(false);
  };

  //function to call when reaching at the bottom of the page
  const getNextPropertyData = async () => {
    if (query >= properties.totalProperties) {
      setHasMoreItems(false);
    } else {
      await getFirstPropertyData();
    }
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
          <img alt="filter" className="icon" src="/assets/images/filter.png" />
          <span className="trigger"> Filter </span>
        </p>
        <hr className="hr" />
        <h1> Search Properties </h1>

        {loading ? (
          <>
            <CardSkeleton />
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
            scrollThreshold={0.99}
            loader={
              properties?.list?.length >= 4 && (
                <h4>LOADING MORE PROPERTIES....</h4>
              )
            }
            endMessage={
              properties?.list?.length >= 4 && (
                <button
                  style={{ width: "100%" }}
                  onClick={scrollToTop}
                  className="button"
                >
                  Return to top
                </button>
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
