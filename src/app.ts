import { app } from "./server";

/**
 * In-memory store to simulate session-like behavior.
 * Each user will have an `id` and corresponding data stored.
 */
const sessionData = new Map();

/**
 * GET route to fetch data for a specific user by query parameter.
 */
app.get("/", (req) => {
  const { id } = req.query; // Get the user ID from query parameters

  if (!id) {
    return { error: "User ID is required" };
  }

  // Fetch session data for the given user ID from in-memory store
  const userData = sessionData.get(id);

  if (userData) {
    return { message: `Hello, ${userData.name}`, data: userData };
  } else {
    return { error: "User not found or no data available" };
  }
});

/**
 * POST route to store data for a specific user.
 * This mimics saving data to a session without using a database.
 */
app.post("/:id", async (req) => {
  const { id } = req.params; // Get the user ID from route parameters
  const body = await req.body; // Get the request body (assuming JSON data)

  if (!id || !body.name) {
    return { error: "ID and Name are required" };
  }

  // Save user data into the in-memory session store
  sessionData.set(id, { name: body.name, additionalInfo: body });

  return { message: `Data saved for user ${id}`, data: body };
});

/**
 * GET route to return all stored user session data.
 * This will fetch all the data stored in the in-memory sessionData map.
 */
app.get("/all-users", () => {
  const allUsers = Array.from(sessionData.entries()).map(([id, data]) => ({
    id,
    data,
  }));

  return { users: allUsers };
});
