import app from "./app";
import "dotenv/config";


app.listen(process.env.PORT || 5000, () => {
    console.log(`⚡ backend started at http://localhost:5000`)
});