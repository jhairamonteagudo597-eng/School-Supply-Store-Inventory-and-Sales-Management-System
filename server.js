const app = require("./app");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`School Supply Store API running on port ${PORT}`));
