// const shortid =  require('shortid');


// // we import our database
// const URL = require("../models/url");

// async function handleGenerateNewShortURL(req, res) {
//   // we add a validation
//   const body = req.body;
//   if (!body.url) {
//     return res.status(400).json({ error: "URL IS REQUIRED !!!" });
//   }

//   // to shorten a url we make use of a service named -> short id package by -> npm i shortid
//   // firstly we pass in the length we want the shortened version to be in
//   const shortID = shortid();

//   await URL.create({
//     shortId: shortID,
//     redirectURL: body.url,
//     visitHistory: [],
//   });

//   return res.json({ id: shortID });
// }

// async function handleGetAnalytics(req,res){
//     const shortId = req.params.shortID
//     const result = await URL.findOne({shortId});
//     return res.json({totalClicks:result.visitHistory.length , analytics:result.visitHistory})
// }

// module.exports = {
//   handleGenerateNewShortURL,
//   handleGetAnalytics
// };


///////////////////////////////////////////
const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
