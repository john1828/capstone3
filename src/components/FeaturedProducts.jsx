import { useState, useEffect } from "react";
import { CardGroup } from "react-bootstrap";
import PreviewProducts from "./PreviewProducts";

export default function FeaturedProducts() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(
      "http://ec2-13-59-17-101.us-east-2.compute.amazonaws.com/b4/products/active"
    )
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

        for (let i = 0; i < 5; i++) {
          generateRandomNums();

          featured.push(
            // the breakPoint here is for columns
            <PreviewProducts
              data={data[numbers[i]]}
              key={data[numbers[i]]._id}
              breakPoint={2}
            />
          );
        }

        setPreviews(featured);
      });
  }, []);

  return (
    <>
      <h2 className="text-center">Featured Products</h2>
      <CardGroup className="justify-content-center">{previews}</CardGroup>
    </>
  );
}
