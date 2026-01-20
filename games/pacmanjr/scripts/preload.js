var imageArray = [
	"00.png",	"01.png",	"01a.png",	"01b.png",		
	"02.png",	"02a.png",	"02b.png",	"03.png",		
	"03a.png",	"03b.png",	"32.png",	"37.png",		
	"b04.png",	"b05.png",	"b06.png",	"b07.png",		
	"b08.png",	"b09.png",	"b10.png",	"b11.png",		
	"b12.png",	"b13.png",	"b14.png",	"b15.png",		
	"b16.png",	"b17.png",	"b18.png",	"b19.png",		
	"b20.png",	"b21.png",	"b22.png",	"b23.png",		
	"b24.png",	"b25.png",	"b26.png",	"b27.png",		
	"b28.png",	"b29.png",	"b30.png",	"b31.png",		
	"b33.png",	"b34.png",	"b35.png",	"b36.png",		
	"b38.png",	"b39.png",	"gameover.png",	"gb0.png",		
	"gb1.png",	"gc0.png",	"gc1.png",	"ged.png",		
	"gel.png",	"ger.png",	"ges0.png",	"ges1.png",		
	"geu.png",	"go0.png",	"go1.png",	"goodie00.png",		
	"goodie01.png",	"goodie02.png",	"goodie03.png",	"goodie04.png",		
	"goodie05.png",	"goodie06.png",	"goodie07.png",	"goodie08.png",		
	"goodie09.png",	"goodie10.png",	"goodie11.png",	"goodie12.png",		
	"goodie13.png",	"goodie14.png",	"gp0.png",	"gp1.png",		
	"gr0.png",	"gr1.png",	"gw0.png",	"gw1.png",		
	"o04.png",	"o05.png",	"o06.png",	"o07.png",		
	"o08.png",	"o09.png",	"o10.png",	"o11.png",		
	"o12.png",	"o13.png",	"o14.png",	"o15.png",		
	"o16.png",	"o17.png",	"o18.png",	"o19.png",		
	"o20.png",	"o21.png",	"o22.png",	"o23.png",		
	"o24.png",	"o25.png",	"o26.png",	"o27.png",		
	"o28.png",	"o29.png",	"o30.png",	"o31.png",		
	"o33.png",	"o34.png",	"o35.png",	"o36.png",		
	"o38.png",	"o39.png",	"pd0.png",	"pd1.png",		
	"pd2.png",	"pd3.png",	"pd4.png",	"pd5.png",		
	"pl0.png",	"pl1.png",	"pl2.png",	"pl3.png",		
	"pl4.png",	"pl5.png",	"pr0.png",	"pr1.png",		
	"pr2.png",	"pr3.png",	"pr4.png",	"pr5.png",		
	"ps0.png",	"ps1.png",	"ps2.png",	"ps3.png",		
	"ps4.png",	"ps5.png",	"ps6.png",	"ps7.png",
	"ps8.png",	"pu0.png",	"pu1.png",	"pu2.png",
	"pu3.png",	"pu4.png",	"pu5.png",	"ready.png",
	"su00.png",	"su01.png",	"su02.png",	"su03.png",
	"su04.png",	"su05.png",	"su06.png",	"su07.png",
	"su08.png",	"su09.png",	"su10.png",		
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
