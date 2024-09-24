import { Elysia } from "elysia";

// In-memory store for session-like behavior
const sessionData = new Map();

/**
 * Define the user routes.
 */
export const userRoutes = (app: Elysia) => {
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
  app.post("/", async (req) => {
    const ids = Array.from(sessionData.keys()); // Get the list of all IDs
    let id = 1;

    // Increment ID if there are existing users
    if (ids.length > 0) {
      id = Math.max(...ids) + 1;
    }

    // Get the request body
    const body = await req.body;

    if (!body.name) {
      return { error: "Name is required" };
    }

    // Save the user data
    sessionData.set(id, { name: body.name, additionalInfo: body });

    return { message: `Data saved for user ${id}`, data: body };
  });

  /**
   * GET route to return all stored user session data.
   */
  app.get("/all-users", () => {
    const allUsers = Array.from(sessionData.entries()).map(([id, data]) => ({
      id,
      data,
    }));

    return { users: allUsers };
  });
};
