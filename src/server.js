import app from "./app";


app.listen(process.env.PORT || 5000, () => {
    console.log(`⚡ backend started at http://localhost:${port}`)
});