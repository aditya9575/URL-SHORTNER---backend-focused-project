const express = require ('express');

const{connectToMongoDB} = require("./connect");


const urlRoute = require("./routes/url");

// we require url for redirection purposes 
const URL = require("./models/url");
 
const app = express();

const PORT = 8001;

// connectToMongoDB("mongodb://localhost:27017/short-url")
connectToMongoDB("mongodb+srv://adityamehto19:123@cluster0.jxeufdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to mongoDB database");
})

// we use middleware that will enable to parse the body 
app.use(express.json());

app.use("/url", urlRoute);

// now we will create a dynamic route for redirecting the user via shortned url or using the id we get by shortid 
app.use("/:shortId", async(req, res)=>{
    // we here do 2 things fetch from database increment and redirect the user

    // we destructure the short id 1st that the user gave us 
    const shortId = req.params.shortId;
    
   const entry = await URL.findOneAndUpdate({
        shortId
    } , {$push:{
        visitHistory: {
            timestamp: Date.now(),
        },
    },
},
{ new: true }
);
// Check if entry exists and has redirectURL property
if (entry && entry.redirectURL) {
    res.redirect(entry.redirectURL);
} else {
    // Handle case where entry is null or redirectURL is missing
    res.status(404).send("URL not found");
}
    // res.redirect(entry.redirectURL);
})

app.listen(PORT, ()=>{
    console.log(`Server started at port :${PORT}`);
})