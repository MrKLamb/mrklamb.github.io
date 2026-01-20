var imageArray = [
	"images/bridge.png",		"images/CandyHouse.png",	"images/castle2l.png",		"images/castle2r.png",
	"images/flower5.png",		"images/haunted.png",		"images/LoveHouse.png",		"images/MushroomHouse.png",
	"images/PirateShipr.png",	"images/plant1a.png",		"images/plant1b.png",		"images/plant2.png",
	"images/plant3l.png",		"images/plant3r.png",		"images/plant5l.png",		"images/plant5r.png",
	"images/ptree1l.png",		"images/ptree1r.png",		"images/PumpinHouse.png",	"images/rocks1.png",
	"images/rocks2.png",		"images/SchoolHouse.png",	"images/ShoeHouse.png",		"images/Treasure.png",
	"images/walk1.png",			"images/walk10.png",		"images/walk11.png",		"images/walk12.png",
	"images/walk13.png",		"images/walk14.png",		"images/walk15.png",		"images/walk16.png",
	"images/walk17.png",		"images/walk18.png",		"images/walk19.png",		"images/walk2.png",
	"images/walk20.png",		"images/walk21.png",		"images/walk22.png",		"images/walk23.png",
	"images/walk24.png",		"images/walk25.png",		"images/walk26.png",		"images/walk27.png",
	"images/walk28.png",		"images/walk29.png",		"images/walk3.png",			"images/walk30.png",
	"images/walk31.png",		"images/walk32.png",		"images/walk33.png",		"images/walk34.png",
	"images/walk35.png",		"images/walk36.png",		"images/walk37.png",		"images/walk38.png",
	"images/walk39.png",		"images/walk4.png",			"images/walk5.png",			"images/walk6.png",
	"images/walk7.png",			"images/walk8.png",			"images/walk9.png",			"images/WaterFountain.gif",
	"images/WishingWell.png"

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
		imageObjects[i].src = imageArray[i];
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
