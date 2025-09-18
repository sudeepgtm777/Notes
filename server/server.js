const express = require('express');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use('/api/notes', noteRoutes);

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
