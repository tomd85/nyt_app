import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TimesApp from './src/TimesApp.js';
import mu2 from 'mu2';
import axios from 'axios';

//Mustache templates are located in /views
mu2.root = __dirname + '/views';

const app = express();
app.use('/build', express.static('build'));
app.use(express.static('static'));

app.get('/', function (req, res) {

    const topStoriesUri = 'https://api.nytimes.com/svc/topstories/v2/home.json?apikey=0341dbafe2d34379974c9e294ee35bc0';
    const mostPopularUri = 'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?apikey=0341dbafe2d34379974c9e294ee35bc0';

    let renderPage = (topStories) => {

        // Create a pre-rendered TimesApp using this bootstrap, and pass both pre-rendered markup and bootstrap to index template
        // Which will display the pre-rendered app and then wire up a React instance by reusing the exact same bootstrap info.
        let bootstrap = {
            topStories: topStories,
            mostPopularUri: mostPopularUri
        };
        let prerenderedApp = ReactDOMServer.renderToString(<TimesApp bootstrap={bootstrap}/>);
        let stream = mu2.compileAndRender('index.mu2', {
            prerenderedApp: prerenderedApp,
            bootstrap: JSON.stringify(bootstrap)
        });

        // Set encoding, or observe a unicode mess displayed in article abstracts
        res.set({ 'content-type': 'text/html; charset=utf-8' })
        stream.pipe(res);
    };

    // Issue blocking network call to top stories endpoint.
    // In failure case, still render page, but with empty list of top stories.
    axios.get(topStoriesUri)
        .then((response) => {
            renderPage(response.data.results);
        })
        .catch((error) => {
            console.log(error);
            renderPage([]);
        });
});


app.listen(3000, function() {
  console.log("App listening on port 3000");
});
