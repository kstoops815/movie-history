"use strict";

let tmdbKey;
let imgConfig;

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

const tmdbConfiguration = () => {
	return new Promise((resolve, reject) => {
		$.ajax(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`).done((data) => {
			resolve(data.images);
		}).fail((error) => {
			reject(error);
		});
	});
};

const getConfig = () => {
	tmdbConfiguration().then((results) => {
		imgConfig = results;
		console.log("imgConfig", imgConfig);
	}).catch((error) => {
		console.log("error in getConfig", error);
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
	getConfig();
};

const showResults = (movieArray) => {
	dom.clearDom("movies");
	dom.domString(movieArray, imgConfig, "movies");
};

const getImgConfig = () => {
	return imgConfig;
};


module.exports = {setKey, searchMovies, getImgConfig};