const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // A statikus fájlok szolgáltatása

app.listen(port, () => {
  console.log(`Az alkalmazás fut a ${port} porton.`);
});
