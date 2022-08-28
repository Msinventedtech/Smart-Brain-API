const { response } = require("express");
const fetch = require("node-fetch");

const PAT = 'a786107d38db45a4a680920151fa400b';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '5e026c5fae004ed4a83263ebaabec49e';
const handleApiCall = (req, res) => { 
const raw = JSON.stringify({
    "user_app_id": {
        "user_id": "4ihudhqhf8oy",
        "app_id": "Facerecognition"
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": req.body.input
                }
            }
        }
    ]
  });


const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
.then(response => response.text())
.then(data => {
    res.json(data);
})
   .catch(err => res.status(400).json('unable to work with API'))
}
const handleImage = ( req, res, db) =>{
    const {id} = req.body;
  db('users').where('id', '=', id)
   .increment('enteries', 1)
   .returning('enteries')
   .then(enteries => {
    res.json(enteries[0].enteries);
   })
.catch(err => res.status(400).json('unable to get enteries'))
}

module.exports ={
    handleImage,
    handleApiCall
};