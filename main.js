const express = require('express');

const app = express();
const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Starting Server at ${port}`);
});
app.use(express.static('public'));