var imageArray = [
"btn/0.jpg",
"btn/1.jpg",
"btn/2.jpg",
"btn/3.jpg",
"btn/4.jpg",
"btn/5.jpg",
"btn/6.jpg",
"btn/7.jpg",
"btn/8.jpg",
"btn/button.jpg",
"btn/button_flag.jpg",
"btn/mine.jpg",
"btn/mine_hit.jpg",
"btn/mine_miss.jpg",
"face/smilehappy.jpg",
"face/smilelose.jpg",
"face/smilescared.jpg",
"face/smilewin.jpg",
"header.png",
"num/0.jpg",
"num/1.jpg",
"num/2.jpg",
"num/3.jpg",
"num/4.jpg",
"num/5.jpg",
"num/6.jpg",
"num/7.jpg",
"num/8.jpg",
"num/9.jpg",
"toggle/flagoff.jpg",
"toggle/flagon.jpg"
];

var imageObjects = [];
var currImage = 0;
//var loadingMessage = document.getElementById("loadingMessage");
//var loadingMessageP = loadingMessage.getElementsByTagName("p")[0];
//var loadingBar = loadingMessage.getElementsByTagName("div")[1];
//var btnS = document.getElementById("btnStartGame");
//var btnI = document.getElementById("btnInstructions");
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
var SWEEP = new MINESWEEPER();
SWEEP.init();
		//loadingMessageP.innerHTML = "<strong>All Images Loaded.</strong>";
		//loadingBar.style.width = Math.ceil(currImage / imageArray.length * 100) + "%";
		//btnS.style.display = "block";
		//btnI.style.display = "block";
	}
	else
	{
		//loadingMessageP.innerHTML = "Loading image <strong>" + currImage + "</strong> of <strong>" + imageArray.length + "</strong>";
		//loadingBar.style.width = Math.ceil(currImage / imageArray.length * 100) + "%";
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
