import { useState } from "react";

export default function Home({ restaurants }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [votingStatus, setVotingStatus] = useState("");

  const handleVote = async () => {
    if (!selectedRestaurant) {
      setVotingStatus("Please select a restaurant to vote.");
      return;
    }

    const employeeId = 1; // Replace with the actual employee ID (e.g., from authentication)
    const restaurantId = selectedRestaurant;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/votes/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, restaurantId }),
      });

      if (response.ok) {
        setVotingStatus("Vote submitted successfully!");
      } else {
        setVotingStatus("Failed to submit vote.");
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      setVotingStatus("Failed to submit vote.");
    }
  };

  return (
    <div>
      <h1>Vote for Your Favorite Restaurant</h1>
      <div>
        {restaurants?.map((restaurant) => (
          <div key={restaurant.id}>
            <input
              type="radio"
              id={restaurant.id}
              name="restaurant"
              value={restaurant.id}
              onChange={() => setSelectedRestaurant(restaurant.id)}
            />
            <label htmlFor={restaurant.id}>
              <strong>{restaurant.name}</strong> - {restaurant.foodPack}
              <h2>Dishes:</h2>
              <ul>
                {restaurant?.foodPacks?.map((dish, index) => (
                  <li key={index}>{dish.name}</li>
                ))}
              </ul>
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleVote}>Vote</button>
      <p>{votingStatus}</p>
      <a href="/results">View Daily Winner</a>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch restaurants and their dishes from your NestJS backend
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`
    );
    const restaurants = await response.json();

    return {
      props: {
        restaurants,
      },
    };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return {
      props: {
        restaurants: [],
      },
    };
  }
}
