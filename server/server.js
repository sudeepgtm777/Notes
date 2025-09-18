import express from 'express';
import noteRoutes from './routes/noteRoutes.js';

const app = express();

app.use('/api/notes', noteRoutes);

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
