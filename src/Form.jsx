import { useState } from "react";

const Form = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [featured, setFeautured] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(title, image, featured);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          //   name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="checkbox"
          name="image"
          onChange={(e) => setFeautured(e.target.checked)}
          checked={featured}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{/* <img src={image.name} alt="" /> */}</div>
    </div>
  );
};

export default Form;
