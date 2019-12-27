//$(document).ready(function() {
var projectTitles = [];
var projectDescriptions = [];
var projectLinks = [];
var projectTags = [];

var projectsJson = 
	{
		"project" : [
			{
				"code" : "priceoptimisationelasticity",
				"author" : "Akash Vartak",
				"title" : "Price Optimisation and Elasticity",
				"briefDescription" : "Price prediction for optimising sales.",
				"longDescription" : ''
					+ '<p class="lead" style="">'
						+ 'The forecasting of retail sales with multiple store item combinations using past data to provide analytics and insights and prediction of optimal price to maximize sales using different regression models.'
						+ '<br>'
						+ '<strong>The predictive and optimisation model had achieved an accuracy gain of 2% - 4% than the existing algorithm that was being employed.</strong>'
					+ '</p>'
					+ '<p class="lead" style="">'
						+ 'This was a graduate project made from base and was scheduled to be used in Orchetro\'s existing price optimastion product.'
					+ '</p>'
				,
				"url" : "",
				"tags" : [
					"Python", "Machine Learning", "Data Science", "Data Visualisation", "Regression"
				]
			},
			{
				"code" : "bigmartsales3",
				"author" : "Akash Vartak",
				"title" : "Big Mart Sales 3",
				"briefDescription" : "Sales prediction algorithm for the Big Mart Sales 3 Problem.",
				"longDescription" : ''
					+ '<p class="lead" style="">'
						+ 'This was a practice open competition problem. The problem stated the sales data of 2013 of a store, BigMart, for 1559 products across 10 stores in different cities. Also, certain attributes of each product and store have been defined.'
						+ '<br>'
						+ 'The aim was to build a predictive model and find out the sales of each product at a particular store. Using this model, BigMart would try to understand the properties of products and stores which played a key role in increasing sales. And predict the actual sales that occur for each store-product combination.'
						+ '<br>'
						+ 'The train and test data was provided to fine tune the algorithm, submissions would be tested on unseen data.'
					+ '</p>'
					+ '<p class="lead" style="">'
						+ 'My submission was ranked 44/5129 with RMSE = 1146.900301.'
						+ '<br>'
						+ 'RMSE of rank #1 model = 1135.203200. '
						+ '<br>'
						+ '<i>All RMSE were calculated upon submission.</i>'
					+ '</p>'
				,
				"url" : "https://github.com/akash-vartak/BigMartSales3",
				"tags" : [
					"Python", "Machine Learning", "Data Science", "Data Visualisation", "Regression"
				]
			},
			{
				"code" : "wordy",
				"author" : "Akash Vartak",
				"title" : "Wordy",
				"briefDescription" : "Wordy is your personal vocabulary trainer",
				"longDescription" : ''
					+ '<p class="lead" style="">'
						+ 'Meet Wordy, your new vocabulary trainer. All you need to do is run the python script and Wordy will look up a random word and display the word and it\'s meaning as a pop notification.'
						+ '<br>'
						+ 'Another feature, is the pronunciation tool. After scraping for a word, and displaying it, Wordy will also pronounce the word and the meaning.'
						+ '<br>'
						+ 'The aim was to help me inprove my vocabulary.'
						+ '<br>'
						+ 'Installer file also available.'
					+ '</p>'
					+ '<p class="lead" style="">'
						+ '<i>This was implemented for Ubuntu14.04. For Windows and Mac I was running into problems on how to handle system notifications; Thus this repo is no longer being actively maintained.</i>'
						+ '<br>'
						+ '<i>Since it is open sourced, you are welcome to work on it as you please or send in pull requests.</i>'
					+ '</p>'
				,
				"url" : "https://github.com/akash-vartak/Wordy",
				"tags" : [
					"Python", "Web Scraping"
				]
			},
			{
				"code" : "rainbowish",
				"author" : "Akash Vartak",
				"title" : "Rainbow-ish",
				"briefDescription" : "A dark theme with bright text colors for the Adobe Brackets Editor.",
				"longDescription" : ''
					+ '<p class="lead" style="">'
						+ 'A dark theme for the Adobe Brackets Editor. It\'s speciality lies in the crystal clear view it provides with the vibrant VIBGYOR inspired syntax highlighting set against the dark background. Helps provide excellent viewing in light and dark working conditions.'
						+ '<br>'
						+ '<strong>It garnered ~1000 views on GitHub within the first 24hrs post the 1st release: v1.0.1 and additinoal ~500 views in 24hrs for the next release: v1.0.2. thus a total of ~1500 odd views in 2 days.</strong>'
						+ '<br>'
						+ 'Motivation for this was the then lack of good plugins/themes for syntax highlighting in Brackets editor as the available ones provided either extreme bright or faded syntax highlighting, for night and day time working condition, resulting in the user having to change themes when working in the dark vs during day time.'
					+ '</p>'
				,
				"url" : "https://github.com/akash-vartak/Rainbow-ish",
				"tags" : [
					"CSS", "SCSS"
				]
			},
			{
				"code" : "simplyunique",
				"author" : "Akash Vartak",
				"title" : "Simply Unique",
				"briefDescription" : "A dark theme made for bracket-matching for the Adobe Brackets Editor.",
				"longDescription" : ''
					+ '<p class="lead" style="">'
						+ 'This is a dark theme for the Adobe Brackets Editor. It specialises in hightened bracket matching and highlighting for better viewing in dark mode.'
						+ '<br>'
						+ '<strong>It garnered ~1500 views within the first 24hrs post the 1st release: v1.0.1. It had a total of ~2500 views in 2 days.</strong>'
						+ '<br>'
						+ 'Motivation for this was the then lack of good plugins/themes for highlighting matching brackets in Brackets editor and the available ones provided syntax highlighting with poor color-combination thus reducing readability.'
					+ '</p>'
				,
				"url" : "https://github.com/akash-vartak/Simply-Unique",
				"tags" : [
					"CSS", "SCSS"
				]
			},
			{
				"code" : "webnotes",
				"author" : "Akash Vartak",
				"title" : "Web Notes",
				"briefDescription" : "Personal post-it notes for use via the browser. <i>Local storage implementaion pending.</i>",
				"longDescription" : ''
					+ '<p class="lead" style="">'
						+ 'Your usual sticky notes but as a web page rather than a desktop or login based app.'
						+ '<br>'
						+ '<i>Local storage implementaion pending. For client side storage of webnotes\' data the localStorage or sessionStorage can be used.<i>'
					+ '</p>'
				,
				"url" : "https://github.com/akash-vartak/web-notes",
				"tags" : [
					"HTML5", "CSS3", "JS"
				]
			},
			{
				"code" : "simplay",
				"author" : "Akash Vartak",
				"title" : "SimPlay",
				"briefDescription" : "A simplistic browser based video player.",
				"longDescription" : ''
					+ '<p class="lead" style="">'
						+ 'A simplistic video player written in HTML5, CSS3 and JS. SimPlay has functionalities like volume control and seek control.'
					+ '</p>'
				,
				"url" : "https://github.com/akash-vartak/SimPlay",
				"tags" : [
					"HTML5", "CSS3", "JS"
				]
			}
		]
	};

//var project = JSON.parse( projectsJson ).project;

//no need to parse as javascript interpretter has already parsed it and projectJson is already in Object state.
var project = projectsJson.project;

function showModal(projectCode)
{
	var i = 0;
	var found = false;
	for(i=0 ; i<project.length ; i++)
	{
		if(project[i].code == projectCode)
		{
			found = true;
//			alert("Author: " + project[i].author + " URL: " + project[i].url);

			/*var t = 0;
			for(t=0 ; t<project[i].tags.length ; t++)
			{
				alert(project[i].tags[t]);
			}*/
			return project[i]; 
		}
	}
	if(!found)
		return null;
}



function allProjects()
{
	var i = 0;
	var projects = [];
	//construct array of json objects and send
	for(i=0 ; i<project.length ; i++)
	{
	    projects[i] = project[i];  
	}
	return projects;
}

window.showModal = showModal;
window.allProjects = allProjects;

//});