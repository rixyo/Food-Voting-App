export default function handler(req, res) {
  if (req.method === "POST") {
    const { restaurantId } = req.body;

    // Save the vote to a database or in-memory storage
    // For simplicity, we'll just log the vote
    console.log(`Vote received for restaurant ID: ${restaurantId}`);

    res.status(200).json({ message: "Vote recorded" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
