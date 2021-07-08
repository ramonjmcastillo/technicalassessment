import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <>
      <span style={{ height: "75px" }} className="skeleton">
        <Skeleton height={25} />
      </span>
      <div className="skeleton">
        <Skeleton height={250} />
      </div>
      <div className="skeleton">
        <Skeleton height={25} />
      </div>
      <div className="skeleton">
        <Skeleton height={25} />
      </div>
      <div className="skeleton">
        <Skeleton height={25} />
      </div>
    </>
  );
};

export default CardSkeleton;
