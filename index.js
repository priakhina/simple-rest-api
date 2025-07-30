require('dotenv').config();
const app = require('./app'); // Actual Express application

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
