import { useState, useEffect } from "react";
import { CardGroup } from "react-bootstrap";
import PreviewProducts from "./PreviewProducts";

export default function FeaturedProducts() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch("https://capstone2-guu1.onrender.com/b4/products/active")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const numbers = [];
        const featured = [];

        const generateRandomNums = () => {
          let randomNum = Math.floor(Math.random() * data.length);

          if (numbers.indexOf(randomNum) === -1) {
            numbers.push(randomNum);
          } else {
            generateRandomNums();
          }
        };

        for (let i = 0; i < 2; i++) {
          generateRandomNums();

          featured.push(
            <PreviewProducts
              data={data[numbers[i]]}
              key={data[numbers[i]]._id}
              breakPoint={6}
            />
          );
        }

        setPreviews(featured);
      });
  }, []);

  return (
    <>
      <h2 className="text-center pb-4">Featured Products</h2>
      <CardGroup>{previews}</CardGroup>
    </>
  );
}
