const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch((err) => console.error('Database connection error:', err));

const companyRoutes = require('./routes/companyRoutes');
app.use('/api/companies', companyRoutes);

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events',  eventRoutes);

const formRoutes = require('./routes/formRoutes');
app.use('/api/forms', formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
