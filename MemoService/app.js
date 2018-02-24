const express = require('express');

const app = express();
const port = 3000;

//Index Route
app.get("/*", (req, res)=> {
    res.writeHead("Content-Type", "application/json");
    res.end("works ! ")
})

app.listen(3000, () => {
    console.log(`port listening on port ${port}`);
});
