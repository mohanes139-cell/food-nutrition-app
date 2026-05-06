function FoodCard({ product }) {
  const nutriments = product?.nutriments;

  return (
    <div className="food-card">
      <img
        src={product?.image_front_url || product?.image_url}
        alt={product?.product_name || "Food product"}
      />

      <h2>{product?.product_name}</h2>

      <p>
        <strong>Brand:</strong> {product?.brands}
      </p>

      <p>
        <strong>Calories:</strong>{" "}
        {nutriments?.["energy-kcal_100g"] ?? "N/A"} kcal
      </p>

      <p>
        <strong>Fat:</strong> {nutriments?.fat_100g ?? "N/A"} g
      </p>

      <p>
        <strong>Sugar:</strong> {nutriments?.sugars_100g ?? "N/A"} g
      </p>
    </div>
  );
}

export default FoodCard;