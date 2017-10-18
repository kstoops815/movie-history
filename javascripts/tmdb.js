"use strict";

let tmdbKey;
 const dom = require("./dom");

const searchTMDB =(query) => {
	// promise search movies
	return new Promise ((resolve, reject) => {
		$.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&page=1&include_adult=false&query=${query}`).done((data) =>{
		resolve(data.results);	
		}).fail((error) => {
			reject(error);
		});
	});
};


const searchMovies = (query) => {
	// execute searchTMDB
	console.log("in line 18");
	searchTMDB(query).then((data) => {
		showResults(data);
	}).catch((error) => {
		console.log("error in search movies", error);
	});
};

const setKey = (apiKey) => {
	// sets tmdbKey
	tmdbKey = apiKey;
	console.log("tmdbkey", tmdbKey);
};

const showResults = (movieArray) => {
	dom.clearDom();
	dom.domString(movieArray);
};


module.exports = {setKey, searchMovies};