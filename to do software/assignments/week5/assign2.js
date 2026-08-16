const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sum', function(req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    const sum = a + b;

    res.json({ answer: sum });
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});