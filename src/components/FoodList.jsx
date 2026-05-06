import FoodCard from "./FoodCard";

function FoodList({ products }) {
  return (
    <div className="food-list">
      {products.map((product) => (
        <FoodCard key={product.code || product._id} product={product} />
      ))}
    </div>
  );
}

export default FoodList;