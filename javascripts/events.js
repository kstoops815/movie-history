"use strict";

const tmdb = require("./tmdb");
const firebaseApi = require("./firebaseApi");
const dom = require("./dom");

const pressEnter = () => {
	$(document).keypress((e) => {
		if (e.key === "Enter"){
			console.log("inside enter");
			let searchText = $("#searchBar").val();
			let query = searchText.replace(/\s/g, "%20");
			console.log("search text", query);
			tmdb.searchMovies(query);
		}
	});
};

const getMahMovies = () => {
	firebaseApi.getMovieList().then((results) => {
				dom.clearDom("moviesMine");
				dom.domString(results, tmdb.getImgConfig(), "moviesMine", false);
			}).catch((error) => {
				console.log("error in get getMoviesList", error);
			});
		};



const myLinks = () => {
	$(document).click((e) => {
		if(e.target.id === "navSearch"){
			$("#search").removeClass("hide");
			$("#myMovies").addClass("hide");
			$("#authScreen").addClass("hide");
		}else if(e.target.id === "mine"){
			$("#search").addClass("hide");
			$("#myMovies").removeClass("hide");
			$("#authScreen").addClass("hide");
			getMahMovies();
		}else if(e.target.id === "authenticate"){
			$("#search").addClass("hide");
			$("#myMovies").addClass("hide");
			$("#authScreen").removeClass("hide");
		}
	});
};

const googleAuth = () => {
	$("#googleButton").click((e) => {
		firebaseApi.authenticateGoogle().then((result) => {
			console.log("result", result);
		}).catch((error) => {
			console.log("error in authenticateGoogle", error);
		});
	});
};

const wishListEvents = () => {
	$("body").on("click", ".wishlist", (e) =>{
		console.log("wishlist event", e);
		let mommy = e.target.closest(".movie");


		let newMovie = {
			"title":$(mommy).find(".title").html(),
			"overview":$(mommy).find(".overview").html(),
			"poster_path":$(mommy).find(".poster_path").attr("src").split("/").pop(),
			"rating": 0,
			"isWatched": false,
			"uid":""
		};
		
		firebaseApi.saveMovie(newMovie).then((results) => {
			$(mommy).remove();
		}).catch((error) => {
			console.log("error in saveMovie", error);
		});

	});
};


const reviewEvents = () => {
	$("body").on("click", ".review", (e) =>{
		let mommy = e.target.closest(".movie");
		console.log("review event", e);

		let newMovie = {
			"title":$(mommy).find(".title").html(),
			"overview":$(mommy).find(".overview").html(),
			"poster_path":$(mommy).find(".poster_path").attr("src").split("/").pop(),
			"rating": 0,
			"isWatched": true,
			"uid":""
		};
		
		firebaseApi.saveMovie(newMovie).then((results) => {
			$(mommy).remove();
		}).catch((error) => {
			console.log("error in saveMovie", error);
		});

	});
};


const deleteMovie = () => {
	$("body").on("click", ".delete", (e) => {
		let movieId = $(e.target).data("firebase-id");


		firebaseApi.deleteMovie(movieId).then((results) => {
			getMahMovies();
		}).catch((error) => {
			console.log("error in deleteMovie", error);
		});
	});
};





const init = () => {
	myLinks();
	googleAuth();
	pressEnter();
	wishListEvents();
	reviewEvents();
	deleteMovie();
};





module.exports = {init};