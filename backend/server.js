const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const storyRoutes = require('./routes/storyRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/stories', storyRoutes);

app.listen(PORT, () => {
  console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});
