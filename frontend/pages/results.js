export default function Results({ winner }) {
  return (
    <div>
      <h1>Daily Winner</h1>
      {winner ? (
        <div>
          <p>
            The winner is: <strong>{winner.name}</strong>
          </p>
          <h3>Dishes:</h3>
          <ul>
            {winner.dishes.map((dish, index) => (
              <li key={index}>{dish}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No winner yet. Vote now!</p>
      )}
      <a href="/">Back to Voting</a>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch the daily winner from your NestJS backend
    const response = await fetch(
      "http://localhost:3000/test/votes/winner"
    );
    const winner = await response.json();

    return {
      props: {
        winner,
      },
    };
  } catch (error) {
    console.error("Error fetching daily winner:", error);
    return {
      props: {
        winner: null,
      },
    };
  }
}
