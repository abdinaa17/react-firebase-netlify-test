import { useEffect } from "react";
import { useAuth } from "./context";
// placeholder image for when the user doesn't provide any
import placeHolder from "../src/placeholder.png";
const Listngs = () => {
  const { listings } = useAuth();
  return (
    <div>
      {currentUser ? (
        <h1 style={{ margin: "auto" }}>
          Welcome to Listers, {currentUser.email}
        </h1>
      ) : (
        <h1 style={{ margin: "auto" }}>Welcome to Listers</h1>
      )}
      {listings &&
        listings.map((listing) => {
          const { imgUrls } = listing;
          return (
            <div key={listing.id}>
              <div className="card">
                <img src={imgUrls ? imgUrls : placeHolder} alt="" />
                <h2>{listing.title}</h2>
                <h3>{listing.tagline}</h3>
                <p>{listing.desc}</p>
                {listing.featured === true && <p>This is a featured listing</p>}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Listngs;
