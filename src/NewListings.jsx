import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
// import placeHolder from "../src/placeholder.png";
const storage = getStorage();
import { db } from "./firebase";
import spinner from "./spinner.svg";
import { useAuth } from "./context";
const NewListings = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState({
    title: "",
    tagline: "",
    desc: "",
    images: {},
    featured: false,
  });

  const navigate = useNavigate();
  const onChange = (e) => {
    if (e.target.files) {
      setListing((prev) => ({
        ...prev,
        images: e.target.files,
      }));
    }
    // Get the value from the checkbox
    if (e.target.checked) {
      setListing((prev) => ({
        ...prev,
        featured: e.target.checked,
      }));
    }
    if (!e.target.files && !e.target.checked) {
      setListing((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // Form submission starts

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!listing.title || !listing.tagline || !listing.desc) {
      setError(true);
      return;
    }
    setLoading(true);
    // if (!currentUser) {
    //   setLoading(false);
    //   navigate("/login");
    //   return;
    // }
    // We'll upload the images to firebase storage and then extract the urls and push it to our db.

    const storeImg = async (img) => {
      return new Promise((resolve, reject) => {
        const fileName = `images/${img.name}-${uuidv4()}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            return snapshot;
          },
          (err) => {
            reject(err);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    if (!listing.images) {
      return {};
    }
    const imgUrls = await Promise.all(
      [...listing.images].map((img) => storeImg(img))
    ).catch((err) => {
      setLoading(false);
      setError(err);
      return;
    });

    const newListing = {
      ...listing,
      imgUrls,
      timestamp: serverTimestamp(),
    };
    delete newListing.images;
    console.log(newListing);
    const docRef = await addDoc(collection(db, "listings"), newListing);
    setLoading(false);
    navigate("/");
    setListing({
      title: "",
      tagline: "",
      desc: "",
      images: {},
      featured: false,
    });
    setError(false);
  };

  if (loading) {
    return <img src={spinner} alt="" />;
  }
  return (
    <div className="container">
      {currentUser && currentUser.email}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={listing.title}
          onChange={onChange}
        />
        <input
          type="text"
          name="tagline"
          value={listing.tagline}
          onChange={onChange}
        />
        <input
          type="text"
          name="desc"
          value={listing.desc}
          onChange={onChange}
        />
        <input
          type="checkbox"
          name="featured"
          id=""
          onChange={onChange}
          checked={listing.featured === true}
        />
        <label htmlFor="images">Choose up to 4 images</label>
        <input
          type="file"
          name="images"
          id="img"
          multiple
          accept=".jpg, .jpeg, .png"
          onChange={onChange}
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="alert">Fill in th required fields</p>}
    </div>
  );
};

export default NewListings;
4;
