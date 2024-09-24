import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger';

export const app = new Elysia();
app.use(swagger());



// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
