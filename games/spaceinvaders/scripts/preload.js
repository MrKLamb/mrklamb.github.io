var imageArray = [
	"mystery0.png",			"mystery1.png",			"mystery2.png",			"mystery3.png",
	"si_bunker.png",		"si_bunker_hit.png",		"si_cannon1.png",		"si_cannon2.png",
	"si_cannon_explosion1.png",	"si_cannon_explosion2.png",	"si_cannon_explosion3.png",	"si_cannon_explosion4.png",
	"si_cannon_explosion5.png",	"si_cannon_explosion6.png",	"si_cannon_explosion7.png",	"si_cannon_explosion8.png",
	"si_corp1_orange.png",		"si_corp1_yellow.png",		"si_corp2_orange.png",		"si_corp2_yellow.png",
	"si_explosion1_blue.png",	"si_explosion1_green.png",	"si_explosion1_orange.png",	"si_explosion1_purple.png",
	"si_explosion1_red.png",	"si_explosion1_yellow.png",	"si_explosion2_blue.png",	"si_explosion2_green.png",
	"si_explosion2_orange.png",	"si_explosion2_purple.png",	"si_explosion2_red.png",	"si_explosion2_yellow.png",
	"si_explosion3_blue.png",	"si_explosion3_green.png",	"si_explosion3_orange.png",	"si_explosion3_purple.png",
	"si_explosion3_red.png",	"si_explosion3_yellow.png",	"si_gen1.png",			"si_gen2.png",
	"si_missile.png",		"si_orb1.png",			"si_orb1_blue.png",		"si_orb2.png",
	"si_orb2_blue.png",		"si_ship1.png",			"si_ship2.png",			"si_ship3.png"
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
};

function loadImages()
{
	var i;
	for (i=0; i < imageArray.length; i++)
	{
		imageObjects[i].src = "images/" + imageArray[i];
	}
	return false;
};

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
};
