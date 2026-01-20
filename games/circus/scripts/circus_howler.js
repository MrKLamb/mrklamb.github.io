/*****************************************
 Author:  Kelly Lamb
 Date:    8/8/2013
 Updated: 3/29/2025
          Replace audio library with howler.js
          TODO: Allow touch events for mobile swipe gestures (maybe joystick,button)
 File(s): circus.js
          preload.js
          main.css
          index.html
 Version: 1.0.0
 Use the files by permission of the author
 only. Contact Kelly through email at
 klamb_online@hotmail.com

*****************************************/
var bgrounds = document.getElementById("backgrounds");
var gameover = document.getElementById("gameover");
var instruct = document.getElementById("instructions");
var levelNum = document.getElementById("levelNumber");
var newlevel = document.getElementById("newlevel");
var splash   = document.getElementById("splash");
var stage    = document.getElementById("stage");

stage.onmousedown = function(event)
{
	trackMouseDown(event);
};

stage.onmouseup = function(event)
{
	return false;
};

stage.onmousemove = function(event)
{
	trackMouse(event);
};

stage.onclick = function(event)
{
	return false;
};

stage.onselectstart = function(event)
{
	return false;
};

stage.oncontextmenu = function(event)
{
	return false;
};

stage.ondragstart = function(event)
{
	return false;
};

if (document.addEventListener)
{
	document.addEventListener("keydown", trackKeyDown,false);
	document.addEventListener("keypress",trackKeyPress,false);
}
else if (document.attachEvent)
{
	document.attachEvent("onkeydown",  trackKeyDown);
	document.attachEvent("onkeypress", trackKeyPress);
}
else
{
	stage.onkeydown  = trackKeyDown;
	stage.onkeypress = trackKeyPress;
};

//Track Mouse
function trackMouse(event)
{
	if (GAME_STATUS == 1)
	{
		if (event == null)
		{
			event = window.event;
		}
		var mouseX = (event.clientX - 113) - SS.left;
		SS.move(mouseX);
	}
};

function trackMouseDown(event)
{
	if (GAME_STATUS == 1)
	{
		SS.toggle();
	}
	return false;
};

function trackKeyDown(e)
{
	if (GAME_STATUS == 1)
	{
		if (!e) e = event;
		var key = (e.which) ? e.which : e.keyCode;
		//alert(e.which + "," + e.keyCode + "," + e.charCode);

		switch(key)
		{
			case 32: SS.toggle(); break;
			case 37: SS.move(-5); break;
			case 39: SS.move( 5); break;
			default: break;
		}
	}
};

function trackKeyPress(e)
{
	if (GAME_STATUS == 1)
	{
		//trackKeyDown(e);
	}
};

function sign(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };

// GAME SOUND EFFECTS
var SFX_CIRCUS_THEME  = 0;
var SFX_CIRCUS_THEME2 = 1;
var SFX_BALLOON_POP   = 2;
var SFX_CLOWN_SPRING  = 3;
var SFX_SEESAW_SWOOSH = 4;
var SFX_CLOWN_HONK    = 5;
var SFX_CLOWN_SPLAT   = 6;
var SFX_LADDER_SLIDE  = 7;
var SFX_FOOTSTEP      = 8;
var SFX_FANFARE       = 9;
var SFX_BONUS         = 10;

// GAME STATUSES
var GAME_STATUS = 0;
var clownLives    = 5;
var timerBalloons = null;
var timerExtras   = null;
var continueLevel = false;
var newGame       = false;

var BalloonImages = 'balloon_blue.png,balloon_green.png,balloon_yellow.png,balloon_orange.png,balloon_red.png,balloon_purple.png'.split(',');
var PopImages0    = 'pop_blue0.png,pop_green0.png,pop_yellow0.png,pop_orange0.png,pop_red0.png,pop_purple0.png'.split(',');
var PopImages1    = 'pop_blue1.png,pop_green1.png,pop_yellow1.png,pop_orange1.png,pop_red1.png,pop_purple1.png'.split(',');
var PopImages2    = 'pop_blue2.png,pop_green2.png,pop_yellow2.png,pop_orange2.png,pop_red2.png,pop_purple2.png'.split(',');
var BalloonPopImages = [PopImages0,PopImages1,PopImages2];

var Clown1Images  = 'clown1_0.png,clown1_1.png,clown1_2.png,clown1_3.png,clown1_4.png,clown1_5.png,clown1_6.png,clown1_7.png,clown1_8.png'.split(',');
var Clown2Images  = 'clown2_0.png,clown2_1.png,clown2_2.png,clown2_3.png,clown2_4.png,clown2_5.png,clown2_6.png,clown2_7.png,clown2_8.png'.split(',');
var ClownImages   = [null,Clown1Images,Clown2Images];

var SeeSawImages  = 'SeeSawDU.png,SeeSawUD.png'.split(',');

Scoreboard = function()
{
	this.score = [4000,0,0]; //highscore,player1,player2
	this.advance = 1000;

	this.init = function()
	{
		this.score[1] = 0;
		this.score[2] = 0;
		this.addClown = 1000;
		this.display();
	};

	this.updateScore = function(player,points)
	{
		var s = this.score[player];
		s = s + points;
		this.score[player] = s;

		var h = this.score[0];
		if (s > h)
		{
			this.score[0] = s;
		}
		if (s > this.addClown)
		{
			updateStatus(1);
			this.addClown = this.addClown + 1000;
		}
		this.display();
	};

	this.display = function()
	{
		highScore.innerText = this.score[0];
		score1.innerText = this.score[1];
		score2.innerText = this.score[2];
	};

	this.init();
};

Level = function()
{
	this.level	= 0;
	this.callback	= null;
	this.cb_dX	= 0;
	this.cb_dY	= 0;

	this.balloonCount = 
	[
		39, 
		84,
		60,
		48,
		54,
		30,
		27,
		54,
		75,
		50,
		31,
		59,
		50,
		54,
		38,
		53,
		54,
		57,
		62,
		72,
		76,
		95,
		114
	];

	this.config =
	[
		[
			[0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
			[0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
			[1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0],
			[0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
			[0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		],
		[
			[1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1,1,1,1],
			[1,1,1,1,1,0,0,1,1,0,1,1,0,0,1,1,1,1,1],
			[1,1,1,1,0,0,1,1,1,0,1,1,1,0,0,1,1,1,1],
			[1,1,1,0,0,1,1,1,1,0,1,1,1,1,0,0,1,1,1],
			[1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,1,1],
			[1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1]
		],
		[
			[1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0],
			[0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
			[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
			[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
			[0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1],
			[1,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1]
		],
		[
			[0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0],
			[0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0],
			[1,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,1,0],
			[1,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,1,0],
			[0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0],
			[0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0]
		],
		[
			[1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
			[1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
			[1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
			[0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0],
			[0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0],
			[0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0]
		],
		[
			[0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0],
			[0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0],
			[0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0],
			[0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,1,1,0,1,1,0,0,0,0,0,1,1,0,1,1,0,0],
			[0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0],
			[0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0],
			[0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0],
			[0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0],
			[0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0]
		],
		[
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
			[1,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,1],
			[1,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,1,1],
			[1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		],
		[
			[1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0],
			[1,0,0,0,1,0,1,1,1,1,1,1,0,1,0,0,0,1,0],
			[1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,1,0],
			[1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,1,0],
			[1,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,1,0],
			[0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0],
			[0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
			[0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0],
			[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
			[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0]
		],
		[
			[0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
			[1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
			[1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
			[1,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1],
			[0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
			[1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0]
		],
		[
			[0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1],
			[1,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1],
			[1,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0],
			[1,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0],
			[1,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1],
			[0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1]
		],
		[
			[0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
			[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
			[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
			[0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0]
		],
		[
			[1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
			[1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1],
			[0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1],
			[0,0,0,1,1,0,1,1,0,0,0,0,0,1,1,0,1,1,0],
			[0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0],
			[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0]
		],
		[
			[1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1],
			[0,0,0,1,1,0,1,1,0,0,0,1,1,0,1,1,0,0,0],
			[1,1,1,0,0,1,0,0,1,1,1,0,0,1,0,0,1,1,1],
			[0,0,0,1,1,0,1,1,0,0,0,1,1,0,1,1,0,0,0],
			[1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1],
			[0,0,0,1,1,0,1,1,0,0,0,1,1,0,1,1,0,0,0]
		],
		[
			[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0],
			[1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
			[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0],
			[1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
			[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0],
			[1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0]
		],
		[
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		],
		[
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
			[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
			[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
			[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		],
		[
			[1,1,1,1,0,1,0,0,1,0,1,1,1,1,0,1,0,0,1],
			[1,0,0,1,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1],
			[1,1,1,1,0,1,0,0,1,0,1,1,1,1,0,1,0,0,1],
			[1,0,0,1,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1],
			[1,1,1,1,0,1,0,0,1,0,1,1,1,1,0,1,0,0,1],
			[1,0,0,1,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1]
		],
		[
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		],
		[
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		],
		[
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		] 
	];

	this.reset = function()
	{
		this.level = 0;
		this.callback	= null;
		this.cb_dX	= 0;
		this.cb_dY	= 0;
		clearTimeout(newlevel.timer);
	};

	this.getLevelNumber = function()
	{
		return this.level;
	};

	this.getNextLevel = function()
	{
		this.level++;
		return this.getLevelConfig();
	};

	this.getLevelConfig = function()
	{
		var result =
		[
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		];
		for (var x = 0; x <= 5; x++)
		{
			result[x] = this.config[(this.level % 23)][x].slice(0);
		}

		return result;
	};

	this.displayLevelStart = function(dX,dY,callback)
	{
		if (callback && typeof callback == 'function')
		{
			this.callback = callback;
		}
		else
		{
			this.callback = null;
		}
		this.cb_dX = dX;
		this.cb_dY = dY;
		this.displayLevel(1.0);
	};

	this.displayLevel = function(amount)
	{
		levelNum.innerText = (this.level + 1);
		var self = this;
		if (newlevel.timer == "undefined" || newlevel.timer == null || newlevel.style.display == "none")
		{
			bgrounds.className = "bgi" + (LL.getLevelNumber() % 5);
			newlevel.style.opacity=amount;
			newlevel.style.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity="+(amount*100)+")";
			newlevel.style.display="block";
			newlevel.timer = setTimeout(function(){self.displayLevel(amount)}, 2000);
		}
		else if (amount >= 0.1)
		{
			newlevel.style.opacity=amount;
			newlevel.style.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity="+(amount*100)+")";
			newlevel.style.display="block";
			newlevel.timer = setTimeout(function(){self.displayLevel((amount-0.02))}, 30);
		}
		else
		{
			newlevel.style.opacity=0.0;
			newlevel.style.filer="progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
			newlevel.style.display="none";
			clearTimeout(newlevel.timer);
			if (this.callback != null)
			{
				this.callback(self.cb_dX,self.cb_dY);
				this.callback = null;
			}
		}
		return true;
	};

	this.getBalloonCount = function()
	{
		return this.balloonCount[(this.level % 23)];
	};

	this.reset();
};

Balloons = function()
{
	this.alive =
	[
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];

	this.balloons =
	[
		[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
	];

	this.balloonCount = 114;

	this.init = function()
	{
		this.alive = LL.getLevelConfig();
		this.balloonCount = LL.getBalloonCount();

		for (r = 0; r < this.alive.length; r++)
		{
			for(c = 0; c < 19; c++)
			{
				x = new Balloon(r,c);
				this.balloons[r][c] = x;
				if (this.alive[r][c] == 0)
				{
					this.balloons[r][c].hide();
				}
			}
		}
	};

	this.reset = function()
	{
		this.alive = LL.getLevelConfig();
		this.balloonCount = LL.getBalloonCount();

		for (r = 0; r < this.alive.length; r++)
		{
			for(c = 0; c < 19; c++)
			{
				this.balloons[r][c].reset();
				if (this.alive[r][c] == 0)
				{
					this.balloons[r][c].hide();
				}
				else
				{
					this.balloons[r][c].setPosition((5 + (c*50)), (25 + (r*60)));
				}
			}
		}
	};

	this.displayNextLevel = function()
	{
		this.alive = LL.getNextLevel();
		this.balloonCount = LL.getBalloonCount();

		for (rr = 0; rr < this.alive.length; rr++)
		{
			for(cc = 0; cc < 19; cc++)
			{
				if (this.alive[rr][cc] == 0)
				{
					this.balloons[rr][cc].hide();
				}
				else
				{
					this.balloons[rr][cc].setPosition((5 + (cc*50)), (25 + (rr*60)));
				}
			}
		}
	};

	this.move = function()
	{
		for (r = 0; r < this.alive.length; r++)
		{
			for(c = 0; c < 19; c++)
			{
				if (this.alive[r][c] == 1)
				{
					this.balloons[r][c].move();
				}
			}
		}
	};

	this.pop = function(row, col, clown)
	{
		if (this.alive[row][col] == 1)
		{
			this.alive[row][col] = 0;
			SB.updateScore(1,5);
			FX.play(SFX_BALLOON_POP);
			this.balloons[row][col].pop(0);
			this.balloonCount--;
		}
	};

	this.checkCollision = function(clown)
	{
		for (r = 0; r < this.alive.length; r++)
		{
			for(c = 0; c < 19; c++)
			{
				if (this.alive[r][c] == 1)
				{
					if (this.balloons[r][c].intersect(clown))
					{
						this.pop(r,c,clown);
						var x1 = this.balloons[r][c].getCenter() - clown.getCenter();
						var x2 = sign(x1);
						var xx = -x2 * 7;

						var y1 = this.balloons[r][c].getCenterY() - clown.getCenterY();
						var y2 = sign(y1);
						var yy = y2 * 7;

						clown.popForce(xx,yy);
						break;
					}
				}
			}
		}

		if (this.balloonCount <=0)
		{
			clown.hide();
			clown.launchEnd();
			setTimeout(function() { startLevelA(true);}, 1000);
		}
	};

	this.init();
};

Balloon = function(row, col)
{
	this.object = null;
	this.color  = 0;
	this.width  = 38;
	this.height = 49;
	this.top    = 25;
	this.left   = 0;
	this.dirX   = -1;
	this.row    = 0;
	this.col    = 0;

//25, 85, 145, 205, 265, 325

	this.init = function(row, col)
	{
		this.row  = row;
		this.col  = col;
		this.top  = 25 + (row * 60);
		this.left = 5 + (col * 50);
		this.dirX = ((row % 2) == 0) ? -1 : 1;
		this.color = row; //(((row + col) + (col % 2)) % 6);

		this.object = document.createElement('img');
		this.object.id = 'BALLOON_' + row + '_' + col;
		this.object.style.zIndex = '50';
		this.object.style.position = 'absolute';
		this.object.style.left = this.left + 'px';
		this.object.style.top  = this.top + 'px';
		this.object.style.align = 'baseline';
		this.object.style.border = '0';
		this.object.src = 'images/' + BalloonImages[this.color];
		this.object.setAttribute('hspace','0');
		this.object.setAttribute('vspace','0');
		this.object.alt="balloon";
		stage.appendChild(this.object);
	};

	this.reset = function()
	{
		this.top  = 25 + (row * 60);
		this.left = 5 + (col * 50);
		this.dirX = ((row % 2) == 0) ? -1 : 1;
		this.setPosition(this.left, this.top);		
	};

	this.move = function()
	{
		this.left = this.left + this.dirX;
		if (this.dirX > 0)
		{
			if (this.left > 900)
			{
				this.left = (this.left - 950);
			}
		}
		else
		{
			if (this.left < -50)
			{
				this.left = (this.left + 950);
			}
		}

		this.object.style.left = this.left + 'px';
	};

	this.pop = function(popIndex)
	{
		if (popIndex == 0)
		{
			AB.activate(this.left,this.top);
		}
		
		if (popIndex < 3)
		{
			this.object.src = 'images/' + BalloonPopImages[popIndex][this.color];
			var self = this;
			++popIndex;
			setTimeout(function() { self.pop(popIndex); }, 200);
		}
		else
		{
			this.hide();
		}
	};

	this.hide = function()
	{
		this.left = -200;
		this.object.style.left = this.left + 'px';
		this.object.src = 'images/' + BalloonImages[this.color];
	};

	this.intersect = function(a)
	{
		return (this.left <= (a.left + a.width) &&
				a.left    <= (this.left + this.width) &&
				this.top  <= (a.top + a.height) &&
				a.top     <= (this.top + this.height))
	};

	this.getCenter = function()
	{
		return this.left + Math.floor(this.width / 2);
	};

	this.getCenterY = function()
	{
		return (this.top + Math.floor(this.height / 2));
	};

	this.setPosition = function(x,y)
	{
		this.left = x;
		this.top  = y;
		this.object.src = 'images/' + BalloonImages[this.color];
		this.object.style.top  = this.top  + 'px';
		this.object.style.left = this.left + 'px';
	};

	this.init(row, col);
};

Clown = function(number)
{
	this.callback		= null;
	this.climbCounter	= 0;
	this.climbHeight	= 0;
	this.delayAnimate	= 0;
	this.dirX		= Math.floor(Math.random()*10)-1;
	this.gravity		= 1;
	this.height		= 58;
	this.index		= 0;
	this.initVelocity	= 34;
	this.leapCount		= 0;
	this.leapDirection	= 0;
	this.leapMax		= 0;
	this.leapIndex		= 0;
	this.leapMotionX	= [[0,0,10,25,20,10,8,0],[0,0,-10,-25,-20,-10,-8,0]];
	this.leapMotionY	= [[0,-10,-17,-30,30,17,10,0],[0,-10,-17,-30,30,17,10,0]];
	this.leapSequence	= [[0,5,4,7,2,8,3,6],[0,6,3,8,2,7,4,5]];
	this.left		= 300;
	this.number		= number;
	this.object		= null;
	this.seesaw		= null;
	this.timerClimb		= null;
	this.timerLaunch	= null;
	this.timerLeap		= null;
	this.timerWalk		= null;
	this.top		= 588;
	this.velocity		= 34;
	this.walkCounter	= 0;
	this.walkImages		= [0,3,0,4];
	this.walkMax		= 0;
	this.width		= 44;

	// 0,5,4,7,2,8,3,6 leap left to right 0
	// 0,6,3,8,2,7,4,5 leap right to left 1

	this.init = function()
	{
		this.left = -50;
		this.object = document.createElement('img');
		this.object.id = 'CLOWN_' + this.number;
		this.object.style.zIndex = '60';
		this.object.style.position = 'absolute';
		this.object.style.left = this.left + 'px';
		this.object.style.top  = this.top + 'px';
		this.object.style.align = 'baseline';
		this.object.style.border = '0';
		this.object.src = 'images/' + ClownImages[this.number][this.index];
		this.object.setAttribute('hspace','0');
		this.object.setAttribute('vspace','0');
		this.object.alt="clown";
		stage.appendChild(this.object);
	};

	this.reset = function()
	{
		var self = this;
		clearInterval(self.timerClimb);
		clearInterval(self.timerLaunch);
		clearInterval(self.timerLeap);
		clearInterval(self.timerWalk);
		this.callback		= null;
		this.climbCounter	= 0;
		this.climbHeight	= 0;
		this.delayAnimate	= 0;
		this.dirX		= Math.floor(Math.random()*10)-1;
		this.gravity		= 1;
		this.index		= 0;
		this.initVelocity	= 34;
		this.leapCount		= 0;
		this.leapDirection	= 0;
		this.leapIndex		= 0;
		this.leapMax		= 0;
		this.left		= -50;
		this.seesaw		= null;
		this.top		= 588;
		this.velocity		= 34;
		this.walkCounter	= 0;
		this.walkMax		= 20;
		this.object.src = 'images/' + ClownImages[this.number][this.index];
		this.object.style.left = this.left + 'px';
		this.object.style.top  = this.top  + 'px';
		
	};

	this.addSeeSaw = function(ss)
	{
		this.seesaw = ss;
	};

	this.animate = function()
	{
		if (this.top >= 350)
		{
			this.index = 0;
		}
		else
		{
			(this.index)++;
			if (this.index > 8)
			{
				this.index = 0;
			}
		}
		this.object.src = 'images/' + ClownImages[this.number][this.index];
	};


	this.leap = function(dirLeap)
	{
		this.leapDirection = dirLeap;
		this.index = this.leapSequence[this.leapDirection][this.leapIndex];
		this.left = this.left + this.leapMotionX[this.leapDirection][this.leapIndex];
		this.top  = this.top  + this.leapMotionY[this.leapDirection][this.leapIndex];

		if (this.left > 900)
		{
			this.left = 900 - this.left;
		}
		else if (this.left < -50)
		{
			this.left = this.left + 900;
		}

		this.object.src = 'images/' + ClownImages[this.number][this.index];
		this.object.style.top  = this.top  + 'px';
		this.object.style.left = this.left + 'px';

		this.leapIndex++;
		if (this.leapIndex > 7)
		{
			this.leapIndex = 0;
			this.leapCount++;
			if (this.leapCount > this.leapMax)
			{
				this.leapEnd();
			}
		}
	};

	this.leapStart = function(dirLeap, leapMax, callback)
	{
		if (callback && typeof callback == 'function')
		{
			this.callback = callback;
		}
		else
		{
			this.callback = null;
		}
		this.leapMax = leapMax;
		this.leapCount = 0;
		var self = this;
		this.timerLeap = window.setInterval(function() {self.leap(dirLeap);}, 100);
	};

	this.leapEnd = function()
	{
		var self = this;
		clearInterval(self.timerLeap);	
		this.index = 0;
		this.object.src = 'images/' + ClownImages[this.number][this.index];
		
		if (this.callback != null)
		{
			this.callback();
		}
	};

	this.climb = function()
	{
		this.climbCounter++;
		this.index = 3 + ((this.climbCounter + this.number) % 2);

		this.object.src = 'images/' + ClownImages[this.number][this.index];

		FX.play(SFX_FOOTSTEP);		

		this.setPosition(this.left, this.top - 16);
		if (this.climbCounter >= this.climbHeight)
		{
			this.climbEnd();
		}
	};

	this.climbStart = function(callback)
	{
		if (callback && typeof callback == 'function')
		{
			this.callback = callback;
		}
		else
		{
			this.callback = null;
		}

		var self = this;
		this.climbCounter = 0;
		this.climbHeight = Math.floor(Math.random()*2+1) * 8 - ((this.number-1) * 4);
		var xx = ((this.number-1) * 862 - 3);
		this.setPosition(xx,588);
		this.timerClimb = window.setInterval(function() {self.climb();}, 400);
	};

	this.climbEnd = function()
	{
		var self = this;
		clearInterval(self.timerClimb);	
		this.walkStart();
	};

	this.walk = function()
	{
		this.index = this.walkImages[this.walkCounter % 4];
		this.walkCounter++;
		this.object.src = 'images/' + ClownImages[this.number][this.index];
		this.setPosition(this.left + this.dirX, this.top);
		if (this.index != 0)
		{
			FX.play(SFX_FOOTSTEP);		
		}
		if (this.walkCounter >= this.walkMax)
		{
			this.walkEnd();
		}
	};

	this.walkStart = function()
	{
		var self = this;
		this.walkCounter = 0;
		this.walkMax = 20;
		this.dirX = (this.number == 1) ? 4 : -4;
		this.timerWalk = window.setInterval(function() {self.walk();}, 100);
	};

	this.walkEnd = function()
	{
		var self = this;
		clearInterval(self.timerWalk);
		this.index = 0;
		this.object.src = 'images/' + ClownImages[this.number][this.index];

		if (this.callback != null)
		{
			this.callback(self.dirX, (24-self.climbHeight));
		}
	};

	this.popForce = function(xx, yy)
	{
		this.dirX = (this.dirX + xx);
		if (this.dirX > 10)
		{
			this.dirX = 10;
		}
		else if (this.dirX < -10)
		{
			this.dirX = -10;
		}

		this.velocity = yy; //this.velocity + yy;
	};

	this.move = function()
	{
		this.left = this.left + this.dirX;
		if (this.dirX > 0)
		{
			if (this.left > 860)
			{
				this.left = 860;
				this.dirX = -this.dirX;
				FX.play(SFX_CLOWN_HONK);
			}
		}
		else
		{
			if (this.left < 0)
			{
				this.left = 0;
				this.dirX = -this.dirX;
				FX.play(SFX_CLOWN_HONK);
			}
		}

		this.top = this.top - this.velocity; //this.dirY;
		this.velocity = this.velocity - this.gravity;
		
		if ((this.velocity < 0) && (this.top >= 500))
		{
			if (this.seesaw.safeToLand(this))
			{
				this.launchEnd();
				this.seesaw.attachClown(this);
			}
		}

		if (this.top >= 587)
		{
			this.top = 603;
			this.velocity = this.initVelocity;
			this.launchEnd();
			this.setPosition(this.left, this.top);
			FX.play(SFX_CLOWN_SPLAT);
			this.object.src = 'images/' + ClownImages[this.number][2];
			continueLevelA();
		}
		else
		{
			this.object.style.top  = this.top  + 'px';
			this.object.style.left = this.left + 'px';
			if (++this.delayAnimate > 3)
			{
				this.delayAnimate = 0;
				this.animate();
			}

			if (BB.balloonCount > 0 && this.top <= 340)
			{
				BB.checkCollision(this);
			}
		}
	};

	this.setPosition = function(x,y)
	{
		this.left = x;
		this.top  = y;
		this.object.style.top  = this.top  + 'px';
		this.object.style.left = this.left + 'px';
	};

	this.hide = function()
	{
		this.left = -200;
		this.object.style.left = this.left + 'px';
	};

	this.getCenter = function()
	{
		return (this.left + 22);
	};

	this.getCenterY = function()
	{
		return (this.top + Math.floor(this.height / 2));
	};

	this.launchStart = function(dX, v)
	{
		var self = this;
		this.dirX = dX;
		this.velocity = v;
		
		FX.play(SFX_CLOWN_SPRING);

		this.timerLaunch = window.setInterval(function() {self.move();}, 50);
	};
	
	this.launchEnd = function()
	{
		var self = this;
		clearInterval(self.timerLaunch);
	};

	this.init();
};

SeeSaw = function()
{
	this.self   = this;
	this.object = null;
	this.number = 0;
	this.width  = 225;
	this.height = 56;
	this.top    = 590;
	this.left   = 337;
	this.clown  = null;
	this.attachedClown = false;
	this.safeLanding = [[-20,30],[150,200]];

	this.init = function()
	{
		this.object = document.createElement('img');
		this.object.id = 'SEESAW';
		this.object.style.zIndex = '55';
		this.object.style.position = 'absolute';
		this.object.style.left = this.left + 'px';
		this.object.style.top  = this.top + 'px';
		this.object.style.align = 'baseline';
		this.object.style.border = '0';
		this.object.src = 'images/' + SeeSawImages[this.number];
		this.object.setAttribute('hspace','0');
		this.object.setAttribute('vspace','0');
		this.object.alt="seesaw";
		stage.appendChild(this.object);
	};

	this.reset = function()
	{
		this.number = 0;
		this.top    = 590;
		this.left   = 337;
		this.clown  = null;
		this.attachedClown = false;
		this.object.style.left = this.left + 'px';
		this.object.src = 'images/' + SeeSawImages[this.number];
	};

	this.toggle = function()
	{
		this.number = (1 - this.number);
		FX.play(SFX_SEESAW_SWOOSH);
		this.object.src = 'images/' + SeeSawImages[this.number];
		if (this.attachedClown)
		{
			var offset = 2 * (this.getCenter() - this.clown.getCenter()-1);
			this.clown.setPosition((this.clown.left + offset), this.clown.top);
		}
	};

	this.move = function(amount)
	{
		var oleft = this.left;
		this.left = this.left + amount;
		if (this.left > (900-this.width))
		{
			this.left = (900-this.width);
		}
		else if (this.left < 0)
		{
			this.left = 0;
		}

		this.object.style.left = this.left + 'px';

		if (this.attachedClown)
		{
			var offset = this.left - oleft;
			this.clown.setPosition((this.clown.left + offset), this.clown.top);
		}
	};

	this.hide = function()
	{
		this.left = -200;
		this.object.style.left = this.left + 'px';
	};

	this.attachClown = function(clown)
	{
		if (this.attachedClown)
		{
			SB.updateScore(1,10);
			AB.deactivate();
			var x1 = this.left + this.safeLanding[this.number][0];
			var x2 = Math.abs(x1 - this.clown.left);
			var x3 = Math.floor(x2 / 10) + 1;
			var x4 = (x3 - 3) * 4;
			if (x4 == 0) x4 = 1;
			this.clown.launchStart(x4,34);
			this.attachedClown = false;
			this.toggle();
		}
		this.clown = clown;
		this.attachedClown = true;
		var offset = Math.floor(Math.abs(this.getCenter() - this.clown.getCenter())/4);
		this.clown.setPosition(this.clown.left, (558 + offset));
	};
	
	this.safeToLand = function(clown)
	{
		var result = true;
		var cl = clown.left;
		var n  = 1 - this.number;
		var sl = this.left;
		
		if ((cl < (sl + this.safeLanding[n][0])) || (cl > (sl + this.safeLanding[n][1])))
		{
			result = false;
		}
				
		return result;
	};

	this.getCenter = function()
	{
		return (this.left + 113);
	};

	this.getAttachedClownID = function()
	{
		if (this.attachedClown)
		{
			return this.clown.number;
		}
		else
		{
			return -1;
		}
	};

	this.init();
};

Ladder = function(number)
{
	this.object = null;
	this.number = number;
	this.width  = 190;
	this.height = 313;
	this.top    = 333;
	this.left   = 0;
	this.dirX   = 1;
	this.timerAnimate = null;
	this.moveCounter = 0;
	this.callback = null;
	this.animating = false;

	this.init = function()
	{
		this.left = (this.number == 0) ? -266 : 976;
		this.dirX = (this.number == 0) ? 1 : -1;

		this.object = document.createElement('img');
		this.object.id = 'LADDER' + this.number;
		this.object.style.zIndex = '50';
		this.object.style.position = 'absolute';
		this.object.style.left = this.left + 'px';
		this.object.style.top  = this.top + 'px';
		this.object.style.align = 'baseline';
		this.object.style.border = '0';
		this.object.src = 'images/ladder.png';
		this.object.setAttribute('hspace','0');
		this.object.setAttribute('vspace','0');
		this.object.alt="ladder";
		stage.appendChild(this.object);
	};

	this.move = function()
	{
		this.left = this.left + this.dirX;
		this.object.style.left = this.left + 'px';
		this.moveCounter = this.moveCounter + 1;
		if (this.moveCounter >= this.width)
		{
			this.animateEnd();
		}
	};

	this.animateStart = function(callback)
	{
		this.animating = true;
		if (callback && typeof callback == 'function')
		{
			this.callback = callback;
		}
		else
		{
			this.callback = null;
		}
		var self = this;
		this.moveCounter = 0;

		FX.play(SFX_LADDER_SLIDE);
		this.timerAnimate = window.setInterval(function() {self.move();}, 20);
	};
	
	this.animateEnd = function()
	{
		var self = this;
		clearInterval(self.timerAnimate);
		this.dirX = -this.dirX;
		this.animating = false;
		if (this.callback != null)
		{
			this.callback();
		}
	};

	this.isAnimating = function()
	{
		return this.animating;
	};
	
	this.reset = function()
	{
		var self = this;
		clearInterval(self.timerAnimate);
		this.animating = false;
		this.callback = null;
		this.moveCounter = 0;

		this.left = (this.number == 0) ? -266 : 976;
		this.dirX = (this.number == 0) ? 1 : -1;
		this.object.style.left = this.left + 'px';
	};

	this.init();
};

Bonus = function(number)
{
	this.counter	= 0;
	this.height	= 58;
	this.left	= 300;
	this.number	= number;
	this.object	= null;
	this.timerBonus	= null;
	this.top	= 588;
	this.width	= 44;

	this.init = function()
	{
		this.left = -200;
		this.object = document.createElement('span');
		this.object.id = 'BONUS_' + this.number;
		this.object.style.zIndex = '51';
		this.object.style.position = 'absolute';
		this.object.style.left = this.left + 'px';
		this.object.style.top  = this.top + 'px';
		this.object.style.align = 'baseline';
		this.object.style.border = '0';
		this.object.setAttribute('hspace','0');
		this.object.setAttribute('vspace','0');
		this.object.style.color='white';
		this.object.style.font = 'normal bold 25px monospace';
		this.object.appendChild( document.createTextNode(this.number * 10) );
		stage.appendChild(this.object);
	};

	this.reset = function()
	{
		this.bonusEnd();
		this.counter = 0;		
	};

	this.setPosition = function(x,y)
	{
		this.left = x;
		this.top  = y;
		this.object.style.top  = this.top  + 'px';
		this.object.style.left = this.left + 'px';
	};

	this.move = function()
	{
		this.setPosition(this.left, (this.top - 1));
		this.counter++;
		if (this.counter > 40)
		{
			this.bonusEnd();
		}
	};

	this.bonusStart = function(x,y,amt)
	{
		var self = this;
		this.left = x;
		this.top  = y;
		this.counter = 0;
		this.object.innerHTML = '';
		this.object.appendChild( document.createTextNode(amt * 10) );
		this.timerBonus = window.setInterval(function() {self.move();}, 10);
	};
	
	this.bonusEnd = function()
	{
		var self = this;
		clearInterval(self.timerBonus);
		this.hide();
	};

	this.hide = function()
	{
		this.left = -200;
		this.object.style.left = this.left + 'px';
	};

	this.init();
};

AllBonuses = function(scoreBoard)
{
	this.alive	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.amount	= 0;
	this.bonuses	= [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
	this.index	= 0;
	this.scoreBoard	= scoreBoard;

	this.init = function()
	{
		for (r = 0; r < this.alive.length; r++)
		{
			x = new Bonus(r);
			this.bonuses[r] = x;
			if (this.alive[r] == 0)
			{
				this.bonuses[r].hide();
			}
		}
	};

	this.reset = function()
	{
		this.alive = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for (r = 0; r < this.alive.length; r++)
		{
			this.bonuses[r].hide();
		}
	};

	this.activate = function(x,y)
	{
		this.amount++;
		if (this.amount >= 3)
		{
			FX.play(SFX_BONUS);
			this.index++;
			this.index = this.index % 20;
			this.bonuses[this.index].bonusStart(x,y,(this.amount-2));
			this.scoreBoard.updateScore(1,((this.amount-2) * 10));
		}
	};

	this.deactivate = function()
	{
		this.amount = 0;
	};

	this.init();
};

PlayFX = function()
{
	var self = this;

	this.soundFX  = [];
	this.pausedFX = [];

	this.init = function()
	{
		this.soundFX[SFX_CIRCUS_THEME]	= new Howl({ src: ['audio/theme.mp3'], loop:false, volume: 0.5, onend: function(){playThemeMusic(2);} });
		this.soundFX[SFX_CIRCUS_THEME2]	= new Howl({ src: ['audio/theme2.mp3'], loop:false, volume: 0.5, onend: function(){playThemeMusic(1);} });
		this.soundFX[SFX_BALLOON_POP]	= new Howl({ src: ['audio/pop.mp3'] });
		this.soundFX[SFX_CLOWN_SPRING]	= new Howl({ src: ['audio/spring.mp3'] });
		this.soundFX[SFX_SEESAW_SWOOSH]	= new Howl({ src: ['audio/swoosh.mp3'] });
		this.soundFX[SFX_CLOWN_HONK]	= new Howl({ src: ['audio/honk.mp3'] });
		this.soundFX[SFX_CLOWN_SPLAT]	= new Howl({ src: ['audio/splat.mp3'], loop:false, volume: 0.3 });
		this.soundFX[SFX_LADDER_SLIDE]	= new Howl({ src: ['audio/ladder_slide.mp3'] });
		this.soundFX[SFX_FOOTSTEP]	= new Howl({ src: ['audio/footstep.mp3'] });
		this.soundFX[SFX_FANFARE]	= new Howl({ src: ['audio/fanfare.mp3'] });
		this.soundFX[SFX_BONUS]		= new Howl({ src: ['audio/bonus.mp3'], loop:false, volume: 0.3 });
	};

	this.play = function(what)
	{
		this.soundFX[what].play();
	};

	this.pauseAll = function()
	{
		for (let i = 0; i < this.soundFX.length; i++)
		{
			if (this.soundFX[i].playing())
			{
				this.soundFX[i].pause();
				this.pausedFX[i] = true;
			}
		}
	};
	
	this.resumeAll = function()
	{
		for (let i = 0; i < this.soundFX.length; i++)
		{
			if (this.pausedFX[i])
			{
				this.play(i);
				this.pausedFX[i] = false;
			}
		}
	};

	this.stopAll = function()
	{
		for (let i = 0; i < this.soundFX.length; i++)
		{
			if (this.soundFX[i].playing())
			{
				this.soundFX[i].stop();
				this.pausedFX[i] = false;
			}
		}
	};
	
	this.init();
};

FX = new PlayFX();
LL = new Level();
SB = new Scoreboard();
BB = new Balloons();
L1 = new Ladder(0);
L2 = new Ladder(1);
SS = new SeeSaw();
C1 = new Clown(1);
C2 = new Clown(2);
C1.addSeeSaw(SS);
C2.addSeeSaw(SS);
AB = new AllBonuses(SB);

function playThemeMusic(which)
{
	if (which == 1)
	{
		FX.play(SFX_CIRCUS_THEME);
	}
	else
	{
		FX.play(SFX_CIRCUS_THEME2);
	}
};

function animateLadders(callback)
{
	if (L1.isAnimating() || L2.isAnimating())
	{
		window.setTimeout(function(){animateLadders(callback);},100);
	}
	else
	{
		L1.animateStart();
		L2.animateStart(callback);
	}
};

function continueLevelA()
{
	AB.deactivate();
	continueLevel = true;
	C1.launchEnd();
	C2.launchEnd();
	if (timerBalloons != null)
	{
		window.clearInterval(timerBalloons);
	}
	if (clownLives > 0)
	{
		animateLadders(startLevelB);
	}
	else
	{
		startLevelB();
	}
};

function startLevelA(newLevel)
{
	AB.deactivate();
	if (newLevel)
	{
		BB.displayNextLevel();
	}
	C1.launchEnd();
	C2.launchEnd();
	if (timerBalloons != null)
	{
		window.clearInterval(timerBalloons);
	}
	animateLadders(startLevelB);
};

function startLevelB()
{
	if (continueLevel || newGame)
	{
		updateStatus(-1);
	}

	newGame = false;
	if (GAME_STATUS == 1)
	{
		if (SS.getAttachedClownID() == 1)
		{
			C2.climbStart(startLevelC);
		}
		else
		{
			C1.climbStart(startLevelC);
		}
	}
};

function startLevelC(dX,dY)
{
	if (continueLevel)
	{
		continueLevel = false;
		startLevelD(dX,dY);
	}
	else
	{
		LL.displayLevelStart(dX,dY,startLevelD);
	}
};

function startLevelD(dX,dY)
{
	timerBalloons = window.setInterval("BB.move()", 25);
	if (SS.getAttachedClownID() == 1)
	{
		C2.launchStart(dX,dY);
	}
	else
	{
		C1.launchStart(dX,dY);
	}
	animateLadders(null);
};

function startGame()
{
	newGame = true;
	bgrounds.className = "bgi0";
	playThemeMusic(1);
	C1.setPosition(-20, C1.top);
	C1.leapStart(0,4,startGameA);
};

function startGameA()
{
	C1.setPosition(SS.left, C1.top);
	SS.attachClown(C1);
	GAME_STATUS = 1;
	updateStatus(0);
	timerExtras = window.setInterval("animateExtras()",500);
	startLevelA(false);
};

function ready()
{
	hideLoadingMessage();
	stage.className  = "ready";
	splash.className = "ready";
	startGame();

	return false;
};

function showInstructions()
{
	splash.className = "ready";
	instruct.style.display="block";
	return false;
};

function hideInstructions()
{
	instruct.style.display="none";
	splash.className = "";
	hideLoadingMessage();
	return false;
};

function hideLoadingMessage()
{
	var loadingMessage = document.getElementById("loadingMessage");
	loadingMessage.style.display="none";
};

function updateStatus(amount)
{
	if (amount >= 1)
	{
		FX.play(SFX_FANFARE);
	}

	clownLives = clownLives + amount;

	if (clownLives < 1)
	{
		clownCount.innerText="";
		cd1.style.visibility="hidden";
	}
	else
	{
		clownCount.innerText=clownLives;

		for (let x=1; x <= 5; x++)
		{
			let obj = document.getElementById("cd"+x);
			obj.style.visibility="hidden";
		}

		for (let x=1; x <= Math.min(5,clownLives); x++)
		{
			let obj = document.getElementById("cd"+x);
			obj.style.visibility="visible";
		}
	}

	if (clownLives < 0)
	{
		GAME_STATUS = 0;
		window.setTimeout("gameOver();",1000);
		return;
	}

	GAME_STATUS = 1;
};

function animateExtras()
{
	for (var x=1; x <= Math.min(5,clownLives); x++)
	{
		var obj = document.getElementById("cd"+x);
		obj.src='images/'+Clown1Images[Math.floor(Math.random()*8)+1];
	}
};

function reset()
{
	gameover.style.display="none";
	stage.className  = "";
	splash.className = "";
	bgrounds.className="";
	SB.init();
	C1.addSeeSaw(SS);
	C2.addSeeSaw(SS);
	return false;
};

function gameOver()
{
	GAME_STATUS = 0;
	gameover.style.display="block";
	FX.stopAll();
	window.clearInterval(timerBalloons);
	window.clearInterval(timerExtras);
	timerBalloons = null;
	continueLevel = false;
	LL.reset();
	L1.reset();
	L2.reset();
	SS.reset();
	BB.reset();
	C1.reset();
	C2.reset();

	clownLives = 5;
	window.setTimeout("reset();", 7000);
};
