const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
const { base64encode, base64decode } = require('nodejs-base64');

//submit a post
const redditPoster = async (accesstoken, subreddit, url, title) => {
	const response_1 = await fetch(`https://oauth.reddit.com/api/submit?sr=${subreddit}&url=${url}&title=${title}&kind=link`, {
		headers: {
			Authorization: 'bearer ' + `${accesstoken}`,
			'Content-Type': 'application/json'
		},
		method: 'POST',
	})
	const data_1 = await response_1.json()
	console.log(data_1.jquery)
} 


//get access token
const getAccessToken = async (client_id, client_secret, login_name, login_password, subreddit, url, title) => {
	const response = await fetch("https://www.reddit.com/api/v1/access_token", {
		headers: {
    		Authorization: 'Basic '+ base64encode(`${client_id}:${client_secret}`),
			'Content-Type': 'application/x-www-form-urlencoded'
  		},
		method: 'POST',
		body: `grant_type=password&username=${login_name}&password=${login_password}`
	})
	const data = await response.json()
	console.log(data)
	redditPoster(data.access_token, subreddit, url, title)
}

//express part
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use('/', express.static('styles'))

app.get('/', (req, res)=> {
	res.sendFile(__dirname + '/index.html')
})

app.post('/', urlencodedParser, (req, res) => {
	console.log(req.body)
	getAccessToken(
		req.body['client_id'], 
		req.body['client_secret'], 
		req.body['login_name'], 
		req.body['login_password'], 
		req.body['subreddit'], 
		req.body['url'], 
		req.body['title'])
	res.sendFile(__dirname + '/index.html')
	
})

app.listen(3000)

//CiSfI_9gg1gcoQ:LItpMFd68h9aSB80Gq57VEL5SpY, DesireeAcord, qmovilem2200
	