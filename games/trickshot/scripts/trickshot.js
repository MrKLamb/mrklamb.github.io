/*****************************************
 Author:  Kelly Lamb
 Date:    2/1/2013
 File(s): Trickshot.js
 		  main.css
 		  TrickShot.html
 Version: 1.0.0
 Use the files by permission of the author
 only.  Contact Kelly through email at
 klamb_online@hotmail.com

*****************************************/
var stage = document.getElementById("stage");
var scard = document.getElementById("scard");
var scorecard = document.getElementById("scorecard");

var CARPET  = 0;
var SFXPUTT = 6;
var SFXCUP  = 7;
var SFXAPP  = 8;

var holes = [
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,12, 0, 0,16, 0,16, 0, 0,12, 1],
		[ 1,15, 0, 0, 0, 0, 0, 0, 0,15, 1],
		[ 1, 0, 0,16, 0, 0, 0,16, 0, 0, 1],
		[ 1,12, 0, 0,14, 6, 8, 0, 0,12, 1],
		[ 1,15, 0, 0, 0, 0, 0, 0, 0,15, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,10, 2,38, 8, 0,14,36, 2, 4, 1],
		[ 1, 9,25, 7, 0, 0, 0,13,23, 3, 1],
		[ 1,29, 7, 0, 0,12, 0, 0,13,31, 1],
		[ 1,15, 0, 0,14,20, 8, 0, 0,15, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,34, 8, 0,14,36, 2,38, 8, 0, 1],
		[ 1,15, 0, 0, 0,13, 5, 7, 0, 0, 1],
		[ 1, 0, 0,16, 0, 0, 0, 0, 0, 0, 1],
		[ 1,12, 0, 0, 0,10, 2, 4, 0, 0, 1],
		[ 1,17, 8, 0,14,19, 5,21, 8, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1, 0, 0, 0,34, 6,35, 0, 0, 0, 1],
		[ 1,34, 8, 0,15, 0,15, 0,14,35, 1],
		[ 1,11, 0, 0, 0, 0, 0, 0, 0,11, 1],
		[ 1,17, 8, 0,12, 0,12, 0,14,18, 1],
		[ 1, 0, 0, 0,17, 6,18, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,16, 0, 0, 0, 0, 0, 0, 0,16, 1],
		[ 1, 0, 0,12, 0,12, 0,12, 0, 0, 1],
		[ 1, 0,14,22, 6,20, 6,22, 8, 0, 1],
		[ 1, 0, 0,15, 0, 0, 0,15, 0, 0, 1],
		[ 1,16, 0, 0, 0, 0, 0, 0, 0,16, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,34, 6,37, 6, 6, 6,35, 0, 0, 1],
		[ 1,11, 0,15, 0, 0, 0,15, 0,12, 1],
		[ 1,11, 0, 0, 0,16, 0, 0, 0,11, 1],
		[ 1,15, 0,12, 0, 0, 0,12, 0,11, 1],
		[ 1, 0, 0,17, 6, 6, 6,20, 6,18, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,34, 6,35, 0, 0, 0,34, 6,35, 1],
		[ 1,15, 0,15, 0,12, 0,15, 0,15, 1],
		[ 1, 0, 0, 0, 0,11, 0, 0, 0, 0, 1],
		[ 1, 0,14, 6, 6,22, 6, 6, 8, 0, 1],
		[ 1, 0, 0, 0, 0,15, 0, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1, 0, 0, 0,10, 2, 4, 0, 0, 0, 1],
		[ 1, 0,12, 0,13,24, 7, 0,12, 0, 1],
		[ 1, 0,11, 0, 0,11, 0, 0,11, 0, 1],
		[ 1,10,27, 4, 0,15, 0,10,27, 4, 1],
		[ 1,13, 5, 7, 0, 0, 0,13, 5, 7, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,34, 6, 6, 6,37, 6, 6, 6,35, 1],
		[ 1,11, 0, 0, 0,15, 0, 0, 0,11, 1],
		[ 1,11, 0,16, 0, 0, 0,16, 0,11, 1],
		[ 1,11, 0, 0, 0,12, 0, 0, 0,11, 1],
		[ 1,17, 6, 6, 6,20, 6, 6, 6,18, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,34, 8, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1,15, 0, 0,12, 0, 0,34, 8, 0, 1],
		[ 1, 0, 0,14,22, 8, 0,11, 0, 0, 1],
		[ 1,12, 0, 0,15, 0, 0,17, 8, 0, 1],
		[ 1,17, 8, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 0,16, 0, 0,12, 0, 0,16, 0, 1],
		[ 1, 0, 0, 0,14,22, 8, 0, 0, 0, 1],
		[ 1, 0,16, 0, 0,15, 0, 0,16, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,34, 8, 0,14,37, 8, 0, 0, 0, 1],
		[ 1,15, 0, 0, 0,15, 0, 0,12, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 0,14,33, 0, 1],
		[ 1,12, 0, 0, 0,12, 0, 0,15, 0, 1],
		[ 1,17, 8, 0,14,20, 8, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 0,16, 0,14, 6, 8, 0,16, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1,34, 6, 6, 8, 0,14, 6, 6,35, 1],
		[ 1,15, 0, 0, 0, 0, 0, 0, 0,15, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,12, 0, 0, 0, 0, 0, 0, 0,12, 1],
		[ 1,30, 4, 0, 0, 0, 0, 0,10,32, 1],
		[ 1, 9,28,38, 8, 0,14,36,26, 3, 1],
		[ 1,13, 5, 7, 0, 0, 0,13, 5, 7, 1],
		[ 1, 0, 0, 0, 0,16, 0, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 0,34, 8, 0,14,35, 0, 0, 0, 1],
		[ 1, 0,11, 0, 0, 0,39, 6, 6, 8, 1],
		[ 1, 0,17, 8, 0,14,18, 0, 0, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0,16, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1, 0,12, 0, 0, 0,12, 0, 0, 0, 1],
		[ 1, 0,11, 0,12, 0,11, 0, 0, 0, 1],
		[ 1, 0,11, 0,11, 0,11, 0, 0, 0, 1],
		[ 1, 0,15, 0,11, 0,17, 8, 0,12, 1],
		[ 1, 0, 0, 0,15, 0, 0, 0, 0,15, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1,10,38, 6, 6, 6, 6, 6,35, 0, 1],
		[ 1, 9, 3, 0, 0, 0, 0, 0,11, 0, 1],
		[ 1,13,21, 8, 0,14, 6, 6,18, 0, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	[	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[ 1,12, 0,10, 2, 2, 4, 0, 0, 0, 1],
		[ 1,15, 0,13,23,25, 7, 0, 0, 0, 1],
		[ 1, 0, 0, 0, 9, 3, 0, 0, 0, 0, 1],
		[ 1, 0, 0, 0,13, 7, 0,14, 6,35, 1],
		[ 1, 0, 0, 0, 0, 0, 0, 0, 0,15, 1],
		[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	]
];

var overlays = [
	[
		{s: 'flower5.png',       t: '  5px', l: '400px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '  5px', l: '655px', w: ' 96px', h: ' 96px'},
		{s: 'ptree1l.png',       t: ' 40px', l: '196px', w: '244px', h: '300px'},
		{s: 'ptree1r.png',       t: ' 40px', l: '712px', w: '244px', h: '300px'},
		{s: 'rocks2.png',        t: '364px', l: '444px', w: '284px', h: '128px'}
	],
	[
		{s: 'haunted.png',       t: '200px', l: '420px', w: '300px', h: '297px'},
		{s: 'plant5l.png',       t: ' 34px', l: '870px', w: '276px', h: '300px'},
		{s: 'plant5r.png',       t: ' 34px', l: ' 10px', w: '276px', h: '300px'}
	],
	[
		{s: 'plant3l.png',       t: '290px', l: '550px', w: '378px', h: '288px'},
		{s: 'plant5r.png',       t: '160px', l: '220px', w: '200px', h: '220px'},
		{s: 'plant1a.png',       t: '480px', l: ' 20px', w: '128px', h: '128px'},
		{s: 'plant1a.png',       t: '  0px', l: ' 20px', w: '128px', h: '128px'},
		{s: 'rocks1.png',        t: ' 20px', l: '570px', w: '284px', h: '200px'}
	],
	[
		{s: 'plant2.png',        t: '180px', l: ' 50px', w: '312px', h: '300px'},
		{s: 'plant2.png',        t: '180px', l: '850px', w: '312px', h: '300px'},
		{s: 'rocks2.png',        t: '-10px', l: '444px', w: '284px', h: '128px'},
		{s: 'rocks2.png',        t: '502px', l: '444px', w: '284px', h: '128px'}
	],
	[
		{s: 'plant1b.png',       t: '500px', l: '  0px', w: '128px', h: '128px'},
		{s: 'plant1b.png',       t: '116px', l: '510px', w: '128px', h: '128px'},
		{s: 'plant1b.png',       t: '500px', l:'1024px', w: '128px', h: '128px'},
		{s: 'MushroomHouse.png', t: '106px', l: '210px', w: '250px', h: '264px'},
		{s: 'MushroomHouse.png', t: '106px', l: '720px', w: '250px', h: '264px'}
	],
	[
		{s: 'rocks2.png',        t: '-10px', l: '444px', w: '284px', h: '128px'},
		{s: 'rocks1.png',        t: '500px', l: '444px', w: '256px', h: '128px'},
		{s: 'plant1a.png',       t: '236px', l: '532px', w: '128px', h: '128px'},
		{s: 'ptree1l.png',       t: '168px', l: '196px', w: '244px', h: '300px'},
		{s: 'ptree1r.png',       t: '168px', l: '712px', w: '244px', h: '300px'}
	],
	[	{s: 'SchoolHouse.png',   t: ' 74px', l: '420px', w: '300px', h: '428px'},
		{s: 'flower5.png',       t: '144px', l: ' 16px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '144px', l:'1040px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '400px', l: '144px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '400px', l: '912px', w: ' 96px', h: ' 96px'}
	],
	[
		{s: 'plant3r.png',       t: '340px', l: ' -6px', w: '378px', h: '288px'},
		{s: 'plant3l.png',       t: '340px', l: '778px', w: '378px', h: '288px'},
		{s: 'PumpinHouse.png',   t: '  0px', l: '448px', w: '250px', h: '250px'}
	],
	[
		{s: 'flower5.png',       t: '144px', l: '528px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '272px', l: '272px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '272px', l: '784px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '400px', l: '528px', w: ' 96px', h: ' 96px'}
	],
	[
		{s: 'CandyHouse.png',    t: ' 76px', l: '300px', w: '300px', h: '300px'},
		{s: 'plant2.png',        t: ' 74px', l: '896px', w: '128px', h: '128px'},
		{s: 'plant2.png',        t: '340px', l: '896px', w: '128px', h: '128px'},
		{s: 'plant2.png',        t: ' 74px', l: '  0px', w: '128px', h: '128px'},
		{s: 'plant2.png',        t: '340px', l: '  0px', w: '128px', h: '128px'}
	],
	[
		{s: 'LoveHouse.png',     t: ' 76px', l: '428px', w: '300px', h: '300px'},
		{s: 'flower5.png',       t: '144px', l: '912px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '400px', l: '912px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '144px', l: '144px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '400px', l: '144px', w: ' 96px', h: ' 96px'}
	],
	[
		{s: 'ShoeHouse.png',     t: '310px', l: '410px', w: '320px', h: '320px'},
		{s: 'plant2.png',        t: ' 74px', l: '896px', w: '128px', h: '128px'},
		{s: 'plant2.png',        t: '340px', l: '896px', w: '128px', h: '128px'},
		{s: 'plant2.png',        t: ' 74px', l: '  0px', w: '128px', h: '128px'},
		{s: 'plant2.png',        t: '468px', l: '128px', w: '128px', h: '128px'}
	],
	[
		{s: 'ptree1l.png',       t: '268px', l: '964px', w: '244px', h: '350px'},
		{s: 'ptree1r.png',       t: '268px', l: '-58px', w: '244px', h: '350px'},
		{s: 'rocks2.png',        t: '108px', l: '444px', w: '284px', h: '128px'},
		{s: 'plant1a.png',       t: '130px', l: '150px', w: ' 96px', h: ' 96px'},
		{s: 'plant1a.png',       t: '130px', l: '918px', w: ' 96px', h: ' 96px'}
	],
	[
		{s: 'castle2r.png',      t: '61px', l: ' 20px', w: '345px', h: '450px'},
		{s: 'castle2l.png',      t: '61px', l: '790px', w: '345px', h: '450px'}
	],
	[
		{s: 'ptree1l.png',       t: ' 40px', l: ' 68px', w: '244px', h: '300px'},
		{s: 'ptree1r.png',       t: ' 40px', l: '584px', w: '244px', h: '300px'},
		{s: 'ptree1r.png',       t: '296px', l: '840px', w: '244px', h: '300px'}
	],
	[
		{s: 'WaterFountain.gif', t: '270px', l: '632px', w: '274px', h: '222px'},
		{s: 'bridge.png',        t: '128px', l: '444px', w: '288px', h: '192px'},
		{s: 'bridge.png',        t: '344px', l: '188px', w: '288px', h: '192px'}
	],
	[
		{s: 'PirateShipr.png',   t: ' 80px', l: ' 10px', w: '400px', h: '415px'},
		{s: 'Treasure.png',      t: ' 40px', l: '824px', w: '263px', h: '279px'}
	],
	[
		{s: 'WishingWell.png',   t: '100px', l: '368px', w: '300px', h: '300px'},
		{s: 'flower5.png',       t: '144px', l: ' 16px', w: ' 96px', h: ' 96px'},
		{s: 'flower5.png',       t: '528px', l:'1040px', w: ' 96px', h: ' 96px'}
	]
];

var holePos = [
	{top:  '54px', left: '560px'},
	{top: '182px', left: '560px'},
	{top: '310px', left:  '48px'},
	{top: '566px', left:'1072px'},
	{top: '438px', left: '560px'},
	{top: '566px', left:  '48px'},
	{top: '566px', left: '688px'},
	{top: '310px', left:'1072px'},
	{top: '310px', left: '176px'},
	{top: '310px', left: '944px'},
	{top: '310px', left: '944px'},
	{top: '566px', left: '304px'},
	{top: '566px', left: '176px'},
	{top: '120px', left: '560px'},
	{top: '120px', left: '944px'},
	{top: '182px', left: '944px'},
	{top: '310px', left: '816px'},
	{top: '120px', left: '944px'}
];

var startPos = [40,40,44,0,4,8,39,18,25,18,18,26,4,36,44,0,0,1];
var sfxIndex = 0;
var canPlayMP3 = false;

var holeNum = -1;
var strokesHole = 0;
var strokesGame = 0;
var bonusHole = 0;
var bonusGame = 0;
var statusHole = 0;
var statusGame = 0;

var mouseX = 0;
var mouseY = 0;
var ballStatus = 0;
var ballX = parseInt(ball1.style.left);
var ballY = parseInt(ball1.style.top);

var mY = 0;
var mX = 0;
var dX = 0;
var dY = 0;
var distance = 1;

initSoundFX();

stage.onmousedown = function()
{
	return false;
}

stage.onclick = function()
{
	// Exit if scorecard is being displayed
	if (scard.style.display == "block")
		return false;

	/*****************************************************************************
	// ball status definitions
	// 0. Beginning State: (hand pointer, ball follows mouse)
	// 1. Aiming State: (move pointer, ball shadows show direction and swing)
	// 2. Swing State: (ball in motion, normal cursor, no ball shadows - reverts
		  to Aiming State on miss or Beginning State on finishing hole)
	*****************************************************************************/

	if (ballStatus == 0)
	{
		var bt = parseInt(ball1.style.top);
		var bl = parseInt(ball1.style.left);
		var bw = parseInt(ball1.style.width);
		var bh = parseInt(ball1.style.height);

		var st = parseInt(start.style.top);
		var sl = parseInt(start.style.left);
		var sw = parseInt(start.style.width);
		var sh = parseInt(start.style.height);

		if ((bl > 0) &&
			(bl >= sl) &&
			(bt >= st) &&
			((bt + bh) <= (st + sh)) &&
			((bl + bw) <= (sl + sw)))
		{
			ballStatus = 1;
			stage.style.cursor="move";
			strokesHole = 0;
			bonusHole = 0;
		}
	}
	else if (ballStatus == 1)
	{
		soundManager.play('sfx'+SFXPUTT);
		ballStatus = 2;
		stage.style.cursor="auto";
		ball2.style.left = '-250px';
		ball3.style.left = '-250px';
		ball4.style.left = '-250px';
		ball5.style.left = '-250px';

		strokesHole++;
		strokesGame++;

		rollBall(ball1, dX, dY, Math.min(distance,120));
	}

	return false;
};

stage.onmouseup = function()
{
	return false;
};

stage.onmousemove = function(event)
{
	if (typeof event == "undefined")
	{
		event = window.event;
	}

	if (typeof event.clientX != "undefined")
	{
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
	else
	{
		mouseX = event.offsetX;
		mouseY = event.offsetY;
	}

	if (ballStatus == 0)
	{
		// move the ball for location drop
		ball1.style.left = '' + mouseX + 'px';
		ball1.style.top  = '' + mouseY + 'px';
	}
	else if (ballStatus == 1)
	{
		// aim the ball and magnitude of swing
		ballX = parseInt(ball1.style.left);
		ballY = parseInt(ball1.style.top);

		mY = ballY-mouseY;
		mX = mouseX-ballX;
		distance = Math.abs(Math.sqrt( ((mX*mX)+(mY*mY)) ));
		dX = mX/distance;
		dY = mY/distance;

		ball1.style.top = '' + ballY + 'px';
		ball2.style.top = '' + (ballY+(mY*4.0)) + 'px';
		ball3.style.top = '' + (ballY+(mY*3.0)) + 'px';
		ball4.style.top = '' + (ballY+(mY*2.0)) + 'px';
		ball5.style.top = '' + (ballY+(mY*1.0)) + 'px';

		ball1.style.left = '' + ballX + 'px';
		ball2.style.left = '' + (ballX-(mX*4.0)) + 'px';
		ball3.style.left = '' + (ballX-(mX*3.0)) + 'px';
		ball4.style.left = '' + (ballX-(mX*2.0)) + 'px';
		ball5.style.left = '' + (ballX-(mX*1.0)) + 'px';
	}

	return false;
};

function rollBall(ball, dirX, dirY, iteration)
{
	var x1 = dirX * (iteration/5.0);
	var y1 = dirY * (iteration/5.0);
	var bx = parseFloat(ball.style.left) - x1;
	var by = parseFloat(ball.style.top)  + y1;

	// Check boundary collision horizontal
	if ((bx > (stage.clientWidth-ball.clientWidth)) ||
		(bx < 0))
	{
		playSFXBounce();
		dirX = -dirX;
		x1 = dirX * (iteration/5.0);
		bx = parseFloat(ball.style.left) - x1;
		bonusHole++;
	}

	// Check boundary collision vertical
	if ((by > (stage.clientHeight-ball.clientHeight)) ||
		(by < 0))
	{
		playSFXBounce();
		dirY = -dirY;
		y1 = dirY * (iteration/5.0);
		by = parseFloat(ball.style.top)  + y1;
		bonusHole++;
	}

	var gridX = Math.floor(bx / 128)+1;
	var gridY = Math.floor(by / 128)+1;

	if (holes[holeNum][gridY][gridX] == CARPET)
	{
		ball.style.left = '' + bx + 'px';
		ball.style.top  = '' + by + 'px';
	}
	else
	{
		var currX = Math.floor(parseFloat(ball.style.left) / 128)+1;
		var currY = Math.floor(parseFloat(ball.style.top)  / 128)+1;
		playSFXBounce();

		if ((gridY != currY) && (gridX != currX))
		{
			var flip = 0;
			var holeNewX = holes[holeNum][currY][gridX];
			var holeNewY = holes[holeNum][gridY][currX];

			// check if complete reverse is needed or
			// if horizontal or vertical only.
			if ((holeNewX != CARPET) &&
				(holeNewY != CARPET))
			{
				flip = 3; // full reverse
			}
			else if (holeNewX != CARPET)
			{
				flip = 1; // reverse X
			}
			else
			{
				flip = 2; // reverse Y
			}

			if ((flip == 1) || (flip == 3))
			{
				dirX = -dirX;
				x1 = dirX * (iteration/5.0);
				bx = parseFloat(ball.style.left) - x1;
				bonusHole++;
			}

			if ((flip == 2) || (flip == 3))
			{
				dirY = -dirY;
				y1 = dirY * (iteration/5.0);
				by = parseFloat(ball.style.top)  + y1;
				bonusHole++;
			}
		}
		else if (currY != gridY)
		{
			dirY = -dirY;
			y1 = dirY * (iteration/5.0);
			by = parseFloat(ball.style.top)  + y1;
			bonusHole++;
		}
		else if (currX != gridX)
		{
			dirX = -dirX;
			x1 = dirX * (iteration/5.0);
			bx = parseFloat(ball.style.left) - x1;
			bonusHole++;
		}

		gridX = Math.floor(bx / 128)+1;
		gridY = Math.floor(by / 128)+1;

		// Confirm that modification worked, only move if it did.
		if (holes[holeNum][gridY][gridX] == CARPET)
		{
			ball.style.left = '' + bx + 'px';
			ball.style.top  = '' + by + 'px';
		}
	}

	// Check if ball went into the hole
	var xtest = bx + ball.clientWidth/2;
	var ytest = by + ball.clientHeight/2;
	if ( (xtest >= parseInt(hole.style.left)) && (xtest <= (parseInt(hole.style.left) + hole.clientWidth)) &&
		 (ytest >= parseInt(hole.style.top))   && (ytest <= (parseInt(hole.style.top)  + hole.clientHeight)) )
	{
		clearTimeout(ball1.timer);
		soundManager.play('sfx'+SFXCUP);
		soundManager.play('sfx'+SFXAPP);
		showScoreCard();
		return false;
	}

	if (iteration > 0)
	{
		ball.timer = setTimeout(function(){rollBall(ball, dirX, dirY, (iteration-1))}, 20);
	}
	else
	{
		ballStatus = 1;
		stage.style.cursor="move";
		clearTimeout(ball1.timer);
	}
}

function nextHole()
{
	ballStatus = 0;
	stage.style.cursor = "pointer";
	ball1.style.left="-250px"; //hide ball until mouse moved
	holeNum++;

	//
	// Draw golf course carpet/cement walkway
	//
	var r,c;
	for (r=1; r < 6; r++)
	{
		for (c=1; c < 10; c++)
		{
			var gridId = 'a' + r + c;
			var grid = document.getElementById(gridId);
			var gridType = holes[holeNum][r][c];
			if (gridType == 0)
				grid.src="images/grass.png";
			else
			{
				grid.src = "images/walk" + gridType + ".png";
			}
		}
	}

	//
	// Draw overlays - move previous overlays offscreen first
	//
	for (r=1; r <= 5; r++)
	{
		var oId = 'o' + r;
		var over = document.getElementById(oId);
		over.style.left = -500 + 'px';
	}

	for (r=0; r < overlays[holeNum].length; r++)
	{
		var oId = "o" + (r+1);
		var over = document.getElementById(oId);
		over.src          = "images/" + overlays[holeNum][r].s;
		over.style.top    = overlays[holeNum][r].t;
		over.style.left   = overlays[holeNum][r].l;
		over.style.width  = overlays[holeNum][r].w;
		over.style.height = overlays[holeNum][r].h;
	}

	start.style.top  = '' + ((Math.floor(startPos[holeNum] / 9)) * 128) + 'px';
	start.style.left = '' + ((Math.floor(startPos[holeNum] % 9)) * 128) + 'px';

	hole.style.top = holePos[holeNum].top;
	hole.style.left = holePos[holeNum].left;
	holeCount.innerHTML="Hole "+(holeNum+1);
	displayHoleCount(1.0);
}

function showScoreCard()
{
	ball1.style.left="-250px"; //hide ball until mouse moved
	statusHole = strokesHole - 3;
	statusGame = statusGame + statusHole;
	scorecard.rows[3].cells[(holeNum+1)].innerText = '' + strokesHole;
	scorecard.rows[3].cells[19].innerText = '' + strokesGame;
	if (statusHole <= -2) scorecard.rows[3].cells[(holeNum+1)].className = 'eagle';
	else if (statusHole <= -1) scorecard.rows[3].cells[(holeNum+1)].className = 'birdie';
	else if (statusHole >=  2) scorecard.rows[3].cells[(holeNum+1)].className = 'dbl_bogey';
	else if (statusHole >=  1) scorecard.rows[3].cells[(holeNum+1)].className = 'bogey';

	var bonusAmount = Math.ceil(bonusHole / strokesHole);
	bonusGame = bonusGame + bonusAmount;
	scorecard.rows[4].cells[(holeNum+1)].innerText = '' + bonusAmount;
	scorecard.rows[4].cells[19].innerText = '' + bonusGame;

	scorecard.rows[5].cells[(holeNum+1)].innerText = '' + ((statusGame==0)?'E':statusGame);
	scorecard.rows[5].cells[19].innerText = '' + ((statusGame==0)?'E':statusGame);

	scard.style.display="block";
	return false;
}

function hideScoreCard()
{
	scard.style.display="none";
	if (holeNum >= 17)
	{
		reset();
	}
	else
	{
		nextHole();
	}
	return false;
}

function initScoreCard()
{
	holeNum = -1;
	strokesHole = 0;
	strokesGame = 0;
	bonusHole = 0;
	bonusGame = 0;
	statusHole = 0;
	statusGame = 0;
	mouseX = 0;
	mouseY = 0;
	ballStatus = 0;
	ballX = parseInt(ball1.style.left);
	ballY = parseInt(ball1.style.top);
	mY = 0;
	mX = 0;
	dX = 0;
	dY = 0;
	distance = 1;

	var x;
	for (x = 1; x <= 19; x++)
	{
		scorecard.rows[3].cells[x].innerText = '';
		scorecard.rows[3].cells[x].className = '';
		scorecard.rows[4].cells[x].innerText = '';
		scorecard.rows[5].cells[x].innerText = '';
	}
}

function ready()
{
	hideLoadingMessage();
	var stage = document.getElementById("stage");
	stage.className = "ready";

	var splash = document.getElementById("splash");
	splash.className = "ready";
	nextHole();
	return false;
}

function showInstructions()
{
	var splash = document.getElementById("splash");
	splash.className = "ready";

	var ins = document.getElementById("instructions");
	ins.style.display="block";
	return false;
}

function hideInstructions()
{
	var ins = document.getElementById("instructions");
	ins.style.display="none";

	var splash = document.getElementById("splash");
	splash.className = "";
	hideLoadingMessage();
	return false;
}

function hideLoadingMessage()
{
	var loadingMessage = document.getElementById("loadingMessage");
	loadingMessage.style.display="none";
}

function reset()
{
	var stage = document.getElementById("stage");
	stage.className = "";

	var splash = document.getElementById("splash");
	splash.className = "";

	initScoreCard();

	return false;
}

function displayHoleCount(amount)
{
	var hc = document.getElementById("holeCount");

	if (hc.timer == "undefined")
	{
		hc.style.opacity=amount;
		hc.style.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity="+(amount*100)+")";
		hc.style.display="block";
		hc.timer = setTimeout(function(){displayHoleCount(amount)}, 50);

	}
	else if (amount >= 0.1)
	{
		hc.style.opacity=amount;
		hc.style.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity="+(amount*100)+")";
		hc.style.display="block";
		hc.timer = setTimeout(function(){displayHoleCount((amount-0.02))}, 50);
	}
	else
	{
		hc.style.opacity=0.0;
		hc.style.filer="progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
		hc.style.display="none";
		clearTimeout(hc.timer);
	}
	return true;
}

function initSoundFX()
{
	soundManager.flashVersion = (window.location.toString().match(/#flash8/i)?8:9);
	if (soundManager.flashVersion != 8)
	{
		soundManager.useHighPerformance = true;
	}

	soundManager.setup(
	{
		url: 'swf/',
		bgColor: '#000000',
		wmode: 'transparent',
		debugMode: false,
		consoleOnly: true,
		useFlashBlock: false
	});

	soundManager.onready(function()
	{
		soundManager.setup(
		{
			defaultOptions:
			{
				autoLoad: true
			}
		});

		var soundURLs = 'bounce,bounce,bounce,bounce,bounce,bounce,putt,cup,applause'.split(',');
		for (var i=0; i<soundURLs.length; i++)
		{
			soundManager.createSound('sfx'+i, 'audio/'+soundURLs[i]+'.mp3');
		}
	});

	return false;
}

function playSFXBounce()
{
	sfxIndex++;
	if (sfxIndex > 5)
	{
		sfxIndex = 0;
	}
	soundManager.play('sfx'+sfxIndex);
	return false;
}
/*********************
Cement = definition
blank				1
single sided
top					2
right				3
bottom				5
left				9
double sided
tr					4
tl					10
br					7
bl					13
lr					11
tb					6
triple sided
tbr					8
tbl					14
tlr					12
blr					15
four sided
trbl				16

Correct missing corners
BL_trc				17
BR_tlc				18
B__tlc				19
B__tlc,trc			20
B__trc				21
Bl_all4c			22
Bl_blc				23
Bl_blc,brc			24
Bl_brc				25
Bl_tlc				26
Bl_tlc,trc			27
Bl_trc				28
L__brc				29
L__trc				30
R__blc				31
R__tlc				32
R__tlc,blc			33
TL_brc				34
TR_blc				35
T__blc				36
T__blc,brc			37
T__brc				38
L__trc,brc			39

.transparent_class {
  // IE 8  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  // IE 5-7  filter: alpha(opacity=50);
  // Netscape  -moz-opacity: 0.5;
  // Safari 1.x  -khtml-opacity: 0.5;
  // Good browsers  opacity: 0.5;
}

*********************/
