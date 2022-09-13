const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static('build'))
app.listen(PORT, ()=>console.log('Listening on port: ',PORT))

app.get("*", (req, res) => {
    let url = path.join(__dirname, '../client/build', 'index.html');
    if (!url.startsWith('/app/')) // since we're on local windows
      url = url.substring(1);
    res.sendFile(url);
  });