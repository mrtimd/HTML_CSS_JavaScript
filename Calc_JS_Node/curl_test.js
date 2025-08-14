const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve a barebones HTML form
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <form action="/echo" method="POST">
          <input type="text" name="message" placeholder="Type something">
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
  `);
});

// Echo endpoint
app.post("/echo", (req, res) => {
  const msg = req.body.message || "No message received";
  res.json({ from: "server", youSent: msg });
});

// Optional GET version for curl
app.get("/echo", (req, res) => {
  const msg = req.query.message || "No message received";
  res.json({ from: "server", youSent: msg });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
