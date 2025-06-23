import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";
import { Link } from "react-router-dom";

const heroImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <div className="align-items">
      <div className="grid lg:grid-cols-2 gap-24 items-center ">
        <div>
          <h1 className="mx-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            We are changing how people shop
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            laborum beatae est ipsam numquam animi, voluptatibus impedit
            consequuntur saepe eligendi nihil molestias recusandae hic, soluta
            fugiat temporibus porro veritatis unde.
          </p>
          <div className="mt-8">
            <Link to="/products" className="btn btn-primary">
              Our products
            </Link>
          </div>
        </div>
        <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
          {heroImages.map((img) => {
            return (
              <div className="carousel-item" key={img}>
                <img
                  src={img}
                  alt={img}
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Hero;
