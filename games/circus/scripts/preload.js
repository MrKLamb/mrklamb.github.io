var imageArray = [
	"logo.jpg",			"progressbar.png",		"Background_Elephant.png",	"Background_Seal.png",
	"Background_Trapeze.png",	"balloon_blue.png",		"balloon_green.png",		"balloon_orange.png",
	"balloon_purple.png",		"balloon_red.png",		"balloon_yellow.png",		"clown1_0.png",
	"clown1_1.png",			"clown1_2.png",			"clown1_3.png",			"clown1_4.png",
	"clown1_5.png",			"clown1_6.png",			"clown1_7.png",			"clown1_8.png",
	"clown2_0.png",			"clown2_1.png",			"clown2_2.png",			"clown2_3.png",
	"clown2_4.png",			"clown2_5.png",			"clown2_6.png",			"clown2_7.png",
	"clown2_8.png",			"gameover.jpg",			"instructions.jpg",		"ladder.png",
	"Background_Tiger.png",		"newlevel.jpg",			"pop_blue0.png",		"pop_blue1.png",
	"pop_blue2.png",		"pop_green0.png",		"pop_green1.png",		"pop_green2.png",
	"pop_orange0.png",		"pop_orange1.png",		"pop_orange2.png",		"pop_purple0.png",
	"pop_purple1.png",		"pop_purple2.png",		"pop_red0.png",			"pop_red1.png",
	"pop_red2.png",			"pop_yellow0.png",		"pop_yellow1.png",		"pop_yellow2.png",
	"Background_Bear.png",		"SeeSawDU.png",			"SeeSawUD.png"
];

var imageObjects = [];
var currImage = 0;
var loadingMessage = document.getElementById("loadingMessage");
var loadingMessageP = loadingMessage.getElementsByTagName("p")[0];
var loadingBar = loadingMessage.getElementsByTagName("div")[1];
var btnS = document.getElementById("btnStartGame");
var btnI = document.getElementById("btnInstructions");
var oldonload = window.onload;

if (typeof window.onload != "function")
{
	window.onload = createImages;
}
else
{
	window.onload = function()
	{
		oldonload();
		createImages();
	}
}

function countImages()
{
	currImage++;
	if (currImage >= imageArray.length)
	{
		loadingMessageP.innerHTML = "<strong>All Images Loaded.</strong>";
		loadingBar.style.width = Math.ceil(currImage / imageArray.length * 100) + "%";
		btnS.style.display = "block";
		btnI.style.display = "block";
	}
	else
	{
		loadingMessageP.innerHTML = "Loading image <strong>" + currImage + "</strong> of <strong>" + imageArray.length + "</strong>";
		loadingBar.style.width = Math.ceil(currImage / imageArray.length * 100) + "%";
	}
	return false;
}

function loadImages()
{
	var i;
	for (i=0; i < imageArray.length; i++)
	{
		imageObjects[i].src = "images/" + imageArray[i];
	}
	return false;
}

function createImages()
{
	var i;
	for (i=0; i < imageArray.length; i++)
	{
		imageObjects[i] = new Image();
		imageObjects[i].onload = countImages;
	}
	loadImages();
	return false;
}
