import express from 'express';
import cors from 'cors';

import suppliers from './routes/suppliers';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/suppliers', suppliers);
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
