const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML form that handles its own fetch
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <h2>Echo Service</h2>
        <input type="text" id="msgInput" placeholder="Type something">
        <button onclick="sendMessage()">Send</button>

        <pre id="responseBox"></pre>

        <script>
          function sendMessage() {
            const msg = document.getElementById("msgInput").value;
            fetch("/echo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: msg })
            })
            .then(res => res.json())
            .then(data => {
              document.getElementById("responseBox").textContent = JSON.stringify(data, null, 2);
            })
            .catch(err => {
              document.getElementById("responseBox").textContent = "Error: " + err;
            });
          }
        </script>
      </body>
    </html>
  `);
});

// POST endpoint for both browser fetch and curl
app.post("/echo", (req, res) => {
  const msg = req.body.message || "No message received";
  res.json({ from: "server", youSent: msg });
});

// GET endpoint for curl
app.get("/echo", (req, res) => {
  const msg = req.query.message || "No message received";
  res.json({ from: "server", youSent: msg });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
