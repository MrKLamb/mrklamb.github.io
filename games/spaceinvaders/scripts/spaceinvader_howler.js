/*****************************************
 Author:  Kelly Lamb
 Date:    6/1/2013
 Updated: 3/29/2025
          Replace audio library with howler.js
          TODO: Allow touch events for mobile swipe gestures (maybe joystick,button)
 File(s): spaceinvaders.js
	  preload.js
	  main.css
	  index.html
 Version: 1.0.0
 Use the files by permission of the author
 only.  Contact Kelly through email at
 klamb_online@hotmail.com

*****************************************/
var stage    = document.getElementById("stage");
var splash   = document.getElementById("splash");
var gameover = document.getElementById("gameover");

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
	stage.onkeydown=  trackKeyDown;
	stage.onkeypress= trackKeyPress;
}

// Define constants
var BOMB_MOVE_DELAY    = 50;
var MISSILE_MOVE_DELAY = 15;
var NEW_SHIP_MIN       =  8;
var SHIP_MOVE_DELAY    = 10;

var SFX_INVADER1       =  0;
var SFX_INVADER2       =  1;
var SFX_INVADER3       =  2;
var SFX_INVADER4       =  3;
var SFX_INVADER_KILLED =  4;
var SFX_INVADER_SHIP   =  5;
var SFX_SHOOT_MISSILE  =  6;
var SFX_CANNON_EXPLODE =  7;

//Define globals

var alienMoveDelay = 500;
var cannonX   = 0;
var cannonY   = 600;
var canvasHeight = 675;
var canvasWidth  = 900;
var dirx      = 5;
var diry      = 30;
var imageNum  = [0,2,4,6,8];
var missileStatus = 0;
var missileX  = 0;
var missileY  = 0;
var mouseX    = 0;
var mouseY    = 0;
var moveDown  = 0;
var mystery   = [50,100,150,300];
var resetGame = false;
var shipNum   = 1;
var shipXDir  = 1;
var tankAlive = 0;
var tankHX    = 100;
var tankHY    = 100;
var tankLives = 3;

var timerAlien;
var timerAlienBomb;
var timerMissile;
var timerShip;

var pics = new Array(14);
var picsExplosion = new Array(6);
var picsCannonExplode = new Array(8);
var mysteryScore = new Array(4);
var picsWidth = new Array(5);

for (i = 0; i < picsExplosion.length; ++ i)
{
	picsExplosion[i] = new Array(3);
}

pics[0]  = 'images/si_gen1.png';
pics[1]  = 'images/si_gen2.png';
pics[2]  = 'images/si_corp1_orange.png';
pics[3]  = 'images/si_corp2_orange.png';
pics[4]  = 'images/si_corp1_yellow.png';
pics[5]  = 'images/si_corp2_yellow.png';
pics[6]  = 'images/si_orb1.png';
pics[7]  = 'images/si_orb2.png';
pics[8]  = 'images/si_orb1_blue.png';
pics[9]  = 'images/si_orb2_blue.png';
pics[10] = 'images/si_ship1.png';
pics[11] = 'images/si_ship2.png';
pics[12] = 'images/si_ship3.png';
pics[13] = 'images/si_cannon1.png';
pics[14] = 'images/si_missile.png';

for (var e=0; e <= 2; e++)
{
	picsExplosion[0][e] = 'images/si_explosion' + (e+1) + '_red.png';
	picsExplosion[1][e] = 'images/si_explosion' + (e+1) + '_orange.png';
	picsExplosion[2][e] = 'images/si_explosion' + (e+1) + '_yellow.png';
	picsExplosion[3][e] = 'images/si_explosion' + (e+1) + '_green.png';
	picsExplosion[4][e] = 'images/si_explosion' + (e+1) + '_blue.png';
	picsExplosion[5][e] = 'images/si_explosion' + (e+1) + '_purple.png';
}

for (var e=0; e <= 7; e++)
{
	picsCannonExplode[e] = 'images/si_cannon_explosion'+(e+1)+'.png';
}

for (var e=0; e < 4; e++)
{
	mysteryScore[e] = 'images/mystery' + e + '.png';
}

picsWidth[0] = 32;
picsWidth[1] = 44;
picsWidth[2] = 44;
picsWidth[3] = 48;
picsWidth[4] = 48;

function initGame()
{
	for (x = 0; x < 11; x++)
	{
		for (y = 0; y < 5; y++)
		{
			alien = document.createElement('img');
			alien.id = 'SI_ALIEN'+y+'_'+x;
			alien.style.zIndex = '88';
			alien.style.position = 'absolute';
			alien.style.left = '' + (x*57+((48-picsWidth[y])/2)) + 'px';
			alien.style.top  = '' + (100+y*40)+'px';
			alien.style.align = 'baseline';
			alien.style.border = '0';
			alien.src = pics[y*2];
			alien.setAttribute('hspace','0');
			alien.setAttribute('vspace','0');
			alien.setAttribute('alien_color',y);
			alien.alt="alien";
			stage.appendChild(alien);
		}
	}

	alien = document.createElement('img');
	alien.id = 'SI_SHIP';
	alien.style.zIndex = '88';
	alien.style.position = 'absolute';
	alien.style.left = '0px';
	alien.style.top  = '30px';
	alien.style.align = 'baseline';
	alien.style.border = '0';
	alien.src = pics[10];
	alien.setAttribute('hspace','0');
	alien.setAttribute('vspace','0');
	alien.setAttribute('alien_color',5); //purple
	alien.alt="alien";
	stage.appendChild(alien);

	alien = document.createElement('img');
	alien.id = 'SI_CANNON';
	alien.style.zIndex = '88';
	alien.style.position = 'absolute';
	alien.style.left = '300px';
	alien.style.top  = '600px';
	alien.style.align = 'baseline';
	alien.style.border = '0';
	alien.src = pics[13];
	alien.setAttribute('hspace','0');
	alien.setAttribute('vspace','0');
	alien.alt="cannon";
	stage.appendChild(alien);

	alien = document.createElement('img');
	alien.id = 'SI_MISSILE';
	alien.style.zIndex = '70';
	alien.style.position = 'absolute';
	alien.style.left = '300px';
	alien.style.top  = '-100px';
	alien.style.align = 'baseline';
	alien.style.border = '0';
	alien.src = pics[14];
	alien.setAttribute('hspace','0');
	alien.setAttribute('vspace','0');
	alien.alt="missile";
	stage.appendChild(alien);

	for (x = 0; x < 11; x++)
	{
		var bombType = Math.floor(Math.random()*5);
		bomb = document.createElement('div');
		bomb.id = 'BOMB'+x;
		bomb.style.zIndex = '15';
		bomb.style.position = 'absolute';
		bomb.style.left = (x*48) +'px';
		bomb.style.top  = '-20px';
		bomb.style.align = 'baseline';
		bomb.style.border = '0';
		bomb.className = 'ab'+ bombType +'0';
		bomb.setAttribute('hspace','0');
		bomb.setAttribute('vspace','0');
		bomb.setAttribute('bomb_type', bombType);
		stage.appendChild(bomb);
	}

	for (x = 0; x < 4; x++)
	{
		bunker = document.createElement('img');
		bunker.id = 'SI_BUNKER'+x;
		bunker.style.zIndex = '10';
		bunker.style.position = 'absolute';
		bunker.style.left = (100 + (200 * x))+'px';
		bunker.style.top  = '510px';
		bunker.style.align = 'baseline';
		bunker.style.border = '0';
		bunker.src = 'images/si_bunker.png';
		bunker.style.width = '100px';
		bunker.style.height = '60px';
		bunker.setAttribute('hspace','0');
		bunker.setAttribute('vspace','0');
		bunker.alt="bunker";
		stage.appendChild(bunker);
	}

	for (x = 0; x < 4; x++)
	{
		for (y = 0; y < 6; y++)
		{
			for (z = 0; z < 20; z++)
			{
				bhit = document.createElement('img');
				bhit.id = 'BHIT_' + x + '_' + y + '_' + z;
				bhit.style.zIndex = '11';
				bhit.style.position = 'absolute';
				bhit.style.left = (100 + (200 * x) + (5 * z))+'px';
				bhit.style.top  = (510 + (10 * y)) + 'px';
				bhit.style.align = 'baseline';
				bhit.style.border = '0';
				bhit.src = 'images/si_bunker_hit.png';
				bhit.style.width = '5px';
				bhit.style.height = '10px';
				bhit.style.visibility = 'hidden';
				bhit.setAttribute('hspace','0');
				bhit.setAttribute('vspace','0');
				bhit.alt="bunkerhit";
				stage.appendChild(bhit);
			}
		}
	}

	Bunker = function(id, top, left, width, height, layout1)
	{
		this.id = id;
		this.top = top;
		this.left = left;
		this.width = width;
		this.height = height;
		this.clear = 0;
		this.lwidth = layout1[0].length;
		this.lheight = layout1.length;
		this.swidth = this.width / this.lwidth;
		this.sheight = this.height / this.lheight;
		this.right = this.left + this.width - 1;
		this.bottom = this.top + this.height - 1;
		this.layout = layout1.slice(0);

		this.checkBoundary = function(posX, posY)
		{
			return ((posX >= this.left) && (posX <= this.right) && (posY >= this.top) && (posY <= this.bottom));
		};

		this.checkHit = function(posX, posY)
		{
			// convert to global to object space
			var x = Math.floor((posX - this.left) / this.swidth);
			var y = Math.floor((posY - this.top) / this.sheight);
			if ('#' == this.layout[y][x])
			{
				this.layout[y][x]='1';
				var line = this.layout[y];
				var line2 = line.substring(0,x) + '1' + line.substring(x+1,this.lwidth);
				this.layout[y] = line2;
				this.setVisibility("BHIT_"+this.id+'_'+y+'_'+x,"visible");
				return true;
			}
			else
			{
				return false;
			}
		};

		this.setVisibility = function(target, option)
		{
			obj = document.getElementById(target);
			obj.style.visibility = option;
			return;
		};

		this.resetBunker = function()
		{
			this.clear = 0;
			for (var y=0; y < this.lheight; y++)
			{
				var line = this.layout[y];
				line = line.replace(/1/g,"#");
				this.layout[y] = line;

				for (var x=0; x < this.lwidth; x++)
				{
					this.setVisibility("BHIT_"+this.id+'_'+y+'_'+x, "hidden");
				}
			}
		};

		this.clearLine = function()
		{
			if (this.clear > 5)
			{
				return;
			}

			var line = this.layout[this.clear];
			line = line.replace(/#/g,"1");
			this.layout[this.clear] = line;

			for (var x=0; x < this.lwidth; x++)
			{
				this.setVisibility("BHIT_"+this.id+'_'+this.clear+'_'+x, "visible");
			}

			(this.clear)++;
		};
	};

	Bunkers = function()
	{
		this.elements = [];
		this.crunches = 0;

		this.init = function()
		{
			for (var i=0; i < 4; i++)
			{
				b = new Bunker(	i, 510,(100 + (i*200)),100,60,this.bunkerDef());
				this.addBunker(b);
			}
		};

		this.addBunker = function(item)
		{
			this.elements.push(item);
		};

		this.checkCollision = function(posX, posY)
		{
			var result = false;
			for (var i=0; i < this.elements.length; i++)
			{
				var x = this.elements[i];
				if (x.checkBoundary(posX,posY))
				{
					result = x.checkHit(posX,posY);
					break;
				}
			}
			return result;
		};

		this.resetBunkers = function()
		{
			this.crunches = 0;
			for (var i=0; i < 4; i++)
			{
				var x = this.elements[i];
				x.resetBunker();
			}
		};

		this.clearLine = function()
		{
			for (var i=0; i < 4; i++)
			{
				var x = this.elements[i];
				x.clearLine();
			}
		};

		this.crunchBunker = function(crunch)
		{
			if (crunch > this.crunches)
			{
				(this.crunches)++;

				for (var x=0; x < 3; x++)
				{
					this.clearLine();
				}
			}
		};

		this.bunkerDef = function()
		{
			var a = new Array(6);
			a[0] = "  ################  ";
			a[1] = "####################";
			a[2] = "####################";
			a[3] = "####################";
			a[4] = "####################";
			a[5] = "######        ######";
			return a;
		};

		this.init();
	};

	Aliens = function()
	{
		this.alive =
		[
			[1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1],
		];

		this.bottom = [5,5,5,5,5,5,5,5,5,5,5];

		this.bombs  = [0,0,0,0,0,0,0,0,0,0,0];

		this.frequency = 150;

		this.lowestAlien = 5;

		this.countDrops = 0;

		this.aliensAlive = 55;

		this.level = 0;

		this.init = function(advance)
		{
			this.aliensAlive = 55;
			this.countDrops = 0;
			this.lowestAlien = 5;

			if (advance)
			{
				(this.level)++;
				this.level = (this.level % 8);
				if (this.frequency > 20)
					this.frequency = this.frequency - 10;
			}
			else
			{
				this.level = 0;
				this.frequency = 150;
			}

			for (var i=0; i < 11; i++)
			{
				this.bottom[i] = 5;
				this.resetBomb(i);
			}

			for (var y=0; y < 5; y++)
			{
				for (var x=0; x < 11; x++)
				{
					this.alive[y][x] = 1;
					alien = document.getElementById('SI_ALIEN'+y+'_'+x);
					alien.src = pics[y*2];
					alien.style.left = '' + (x*57+((48-picsWidth[y])/2)) + 'px';
					alien.style.top  = '' + ((100+y*40) + (this.level * 30)) + 'px';
				}
			}
		};

		this.addDrop = function()
		{
			(this.countDrops)++;
		};

		this.calcLanding = function()
		{
			var limit = (this.level + this.countDrops + this.lowestAlien) - 12;
			if (this.lowestAlien <= 2)
			{
				limit--;
			}
			if (limit <= 0)
			{
				return 0;
			}
			else
			{
				return limit;
			}
		};

		this.killAlien = function(x, y)
		{
			this.alive[y][x] = 0;
			this.bottom[x] = 0;
			(this.aliensAlive)--;

			for (var j=4; j >= 0; j--)
			{
				if (this.alive[j][x] == 1)
				{
					this.bottom[x] = (j+1);
					break;
				}
			}

			this.lowestAlien = 0;
			for (var j=0; j < this.bottom.length; j++)
			{
				this.lowestAlien = Math.max(this.lowestAlien, this.bottom[j]);
			}

			SB.updateScore(1,((5-y)*10));
		};

		this.alienAlive = function(x, y)
		{
			return (1 == this.alive[y][x]);
		};

		this.canBomb = function(x)
		{
			// Check if bomb already dropping for this column
			if (this.bombs[x] > 0)
			{
				return 1;
			}

			// Check if frequency elapsed for new bomb drop
			if (this.bombs[x] < 0)
			{
				(this.bombs[x])++;
				return -1;
			}

			// Check if column is all killed
			if (this.bottom[x] == 0)
			{
				return -1;
			}

			// If column is zero, then we can drop bomb
			this.bombs[x] = 1;
			return 0;
		};

		this.resetBomb = function(x)
		{
			var obj = document.getElementById('BOMB'+x);
			obj.style.top = '-200px';
			this.bombs[x] = -(Math.floor((Math.random()*this.frequency)+3));
		};

		this.setBombFrequency = function(time)
		{
			this.frequency = time;
		};

		this.getBombType = function(x)
		{
			return (this.bottom[x]-1);
		};

		this.waveCleared = function()
		{
			return (0 == this.aliensAlive);
		};

		this.alienCount = function()
		{
			return this.aliensAlive;
		};

		this.init(false);
	};

	Scoreboard = function()
	{
		this.score = [4000,0,0]; //highscore,player1,player2

		this.init = function()
		{
			this.score[1] = 0;
			this.score[2] = 0;
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

	FX = new PlayFX();
	BB = new Bunkers();
	AA = new Aliens();
	SB = new Scoreboard();
	tankAlive = 1;
	initLive();
};

function newWave()
{
	stage.focus();
	window.clearInterval(timerAlien);
	alienMoveDelay = 500;
	moveDown = 0;
	dirx = 5;
	AA.init(true);
	timerAlien = window.setInterval("doMotion1()", alienMoveDelay);
	timerShip = window.setInterval("rotateShip()", SHIP_MOVE_DELAY);
	updateStatus(1);
};

//Init live objects
function initLive()
{
	tankAlive = 1;
	tankLives = 3;
	alienMoveDelay = 500;
	moveDown = 0;
	dirx = 5;

	SI_CANNON.src = pics[13];
	SI_CANNON.style.left = '300px';

	window.clearInterval(timerAlien);
	timerAlien = window.setInterval("doMotion1()", alienMoveDelay);

	window.clearInterval(timerShip);
	timerShip = window.setInterval("rotateShip()", SHIP_MOVE_DELAY);

	window.clearInterval(timerAlienBomb);
	timerAlienBomb = window.setInterval("moveAlienBombs()", BOMB_MOVE_DELAY);

	stage.focus();
	updateStatus(0);
};

function doMotionDown()
{
	AA.addDrop();
	var landed = AA.calcLanding();
	if (landed > 0)
	{
		BB.crunchBunker(landed);
	}
	if (landed >= 4)
	{
		tankAlive = 0;
		gameOver();
		return;
	}

	for (y=0; y < 5; y++)
	{
		for (x=0; x < 11; x++)
		{
			obj = document.getElementById('SI_ALIEN'+y+'_'+x);
			posy = parseInt(obj.style.top);
			posy += diry;
			obj.style.top = posy +'px';
		}
	}
};

function doMotion1()
{
	var dead = 0;
	if (tankAlive == 1)
	{
		FX.rotateInvaderSFX();
		if (moveDown == 1)
		{
			doMotionDown();
			moveDown = 0;
			dirx = -dirx;
		}
		else
		{
			for (y=0; y < 5; y++)
			{
				for (x=0; x < 11; x++)
				{
					obj = document.getElementById('SI_ALIEN'+y+'_'+x);
					if (obj.src.indexOf("si_explosion") >= 0) continue;
					posx = parseInt(obj.style.left);
					if (((dirx > 0) && (posx >= canvasWidth-70)) || ((dirx < 0) && (posx <= 10)))
					{
						moveDown = 1;
					}
					posx += dirx;
					obj.style.left = posx +'px';
					obj.src = pics[imageNum[y]];
				}
				imageNum[y] = Math.floor(imageNum[y]/2)*2 + (1-(imageNum[y]%2));
			}
		}
	}
};

// Simple move function
function moveObjTo(obj,oleft,otop)
{
	obj.style.left = oleft + 'px';
	obj.style.top = otop + 'px';
};

//Track Mouse
function trackMouse(event)
{
	if (tankAlive == 1)
	{
		if (event == null) {event = window.event;}
		mouseX = event.clientX - 30;
		cannonX = mouseX;
		if (cannonX < 10)
		{
			cannonX = 10;
		}
		else if (cannonX > (canvasWidth-70))
		{
			cannonX = (canvasWidth-70);
		}
		moveObjTo(SI_CANNON, cannonX, cannonY);
	}
};

function trackMouseDown(event)
{
	if (tankAlive == 1)
	{
		startMissile();
		return false;
	}
};

function trackKeyDown(e)
{
	if (tankAlive == 1)
	{
		if (!e) {e = event;}
		var key = (e.which) ? e.which : e.keyCode;
		//alert(e.which + "," + e.keyCode + "," + e.charCode);

		switch(key)
		{
			case 37: cannonX -= 4; if (cannonX < 10) cannonX = 10; moveObjTo(SI_CANNON, cannonX, cannonY); break;
			case 39: cannonX += 4; if (cannonX > (canvasWidth-70)) cannonX = (canvasWidth-70); moveObjTo(SI_CANNON, cannonX, cannonY); break;
			case 32: startMissile(); break;
			default: break;
		}
	}
};

function trackKeyPress(e)
{
	trackKeyDown(e);
};

function rotateShip()
{
	if (tankAlive == 1)
	{
		shipX = parseInt(SI_SHIP.style.left);
		shipY = parseInt(SI_SHIP.style.top);
		shipX += shipXDir;
		if (shipXDir < 0)
		{
			if (shipX == (canvasWidth-5))
			{
				FX.play(SFX_INVADER_SHIP);
			}

			if (shipX < -100)
			{
				shipX = canvasWidth + 500;
				if (AA.alienCount() <= NEW_SHIP_MIN)
				{
					window.clearInterval(timerShip);
				}
			}
		}
		else 
		{
			if (shipX == 5)
			{
				FX.play(SFX_INVADER_SHIP);
			}

			if (shipX > (canvasWidth + 100))
			{
				shipX = -500;
				if (AA.alienCount() <= NEW_SHIP_MIN)
				{
					window.clearInterval(timerShip);
				}
			}
		}
		moveObjTo(SI_SHIP, shipX, shipY);
		shipNum++;
		shipNum %= 3;
		SI_SHIP.src = pics[(shipNum+10)];
	}
};

function startExplosion(obj, ex_index)
{
	if (ex_index == 0)
	{
		FX.play(SFX_INVADER_KILLED);
	}

	if (ex_index <= 2)
	{
		color=obj.getAttribute('alien_color');
		obj.src=picsExplosion[color][ex_index];
		window.setTimeout("startExplosion(" + obj.id + "," + (++ex_index) + ");", 200);
	}
	else
	{
		if (obj.id == 'SI_SHIP')
		{
			if (ex_index <= 3)
			{
				var rndScore=(Math.floor(Math.random()*101) % 4);
				SB.updateScore(1,mystery[rndScore]);
				obj.src=mysteryScore[rndScore];
				window.setTimeout("startExplosion(" + obj.id + "," + (++ex_index) + ");", 200);
			}
			else
			{
				var rndDirection=(Math.floor(Math.random()*101) % 2);

				shipXDir = 1 - (rndDirection * 2);
				var posX = (shipXDir < 0) ? (canvasWidth + 500) : -500;
				moveObjTo(obj, posX, obj.style.top);
				if (AA.alienCount() <= NEW_SHIP_MIN)
				{
					window.clearInterval(timerShip);
				}
				else
				{
					timerShip = window.setInterval("rotateShip()", SHIP_MOVE_DELAY);
				}
			}
		}
		else
		{
			moveObjTo(obj, -200, -200);
		}
	}
};

function startCannonExplode(ex_index)
{
	tankAlive = 0;

	if (ex_index == 0)
	{
		FX.play(SFX_CANNON_EXPLODE);
	}

	if (ex_index <= 7)
	{
		SI_CANNON.src=picsCannonExplode[ex_index];
		window.setTimeout("startCannonExplode(" + (++ex_index) + ");", 200);
	}
	else if (ex_index <= 8)
	{
		SI_CANNON.style.left = '-300px';
		window.setTimeout("startCannonExplode(" + (++ex_index) + ");", 1000);
	}
	else
	{
		updateStatus(-1);
		if (tankAlive == 1)
		{
			SI_CANNON.src = pics[13];
			SI_CANNON.style.left = '300px';
			cannonX = 300;
		}
	}
};

function startMissile()
{
	if (missileStatus == 0)
	{
		clearTimeout(timerMissile);
		FX.play(SFX_SHOOT_MISSILE);

		missileX = parseInt(SI_CANNON.style.left) + 28;

		missileY = (cannonY+4);//mouseY;
		missileStatus = 1;
		moveObjTo(SI_MISSILE, missileX, missileY);
		moveMissile();
	}
};

function moveMissile()
{
	if (missileStatus == 1)
	{
		if (missileY > -10)
		{
			missileY -= 5;
			moveObjTo(SI_MISSILE, missileX, missileY);

			//Check collision with bunkers
			if (BB.checkCollision(missileX,missileY))
			{
				destroy_missile();
			}

			//Check collision with aliens
			for (y=0; y < 5; y++)
			{
				for (x=0; x < 11; x++)
				{
					if (AA.alienAlive(x,y))
					{
						obj = document.getElementById('SI_ALIEN'+y+'_'+x);
						collide = checkCollide(SI_MISSILE, obj);
						if (collide > 0)
						{
							AA.killAlien(x,y);
							destroy_missile();
							startExplosion(obj,0);
							alienMoveDelay -= 9;
							window.clearInterval(timerAlien);
							timerAlien = window.setInterval("doMotion1()", alienMoveDelay);
							if (AA.waveCleared())
							{
								window.clearInterval(timerAlien);
								window.setTimeout("newWave();", 3000);
							}
							break;
						}
					}
				}
			}

			collide = checkCollide(SI_MISSILE, SI_SHIP);
			if (collide > 0)
			{
				destroy_missile();
				window.clearInterval(timerShip);
				startExplosion(SI_SHIP,0);
			}
			timerMissile = window.setTimeout("moveMissile();", MISSILE_MOVE_DELAY);
		}
		else
		{
			destroy_missile();
		}
	}
};

function destroy_missile()
{
	missileStatus = 0;
	moveObjTo(SI_MISSILE, missileX, -100);
	clearTimeout(timerMissile);
};

function destroy_bomb(obj,x)
{
	AA.resetBomb(x);
	obj.style.top = '-20px';
};

var t=0;
function moveAlienBombs()
{
	if (tankAlive == 1)
	{
		t++;
		t %= 3;
		var cl = parseInt(SI_CANNON.style.left);
		var cr = cl + parseInt(SI_CANNON.width);
		var ct = parseInt(SI_CANNON.style.top);

		var ml = parseInt(SI_MISSILE.style.left);
		var mr = ml + SI_MISSILE.width;
		var mt = parseInt(SI_MISSILE.style.top);
		var mh = mt + SI_MISSILE.height;

		for (var x=0; x<11; x++)
		{
			var bstat = AA.canBomb(x);
			if (bstat >= 0)
			{
				var obj = document.getElementById('BOMB'+x);
				var y1 = parseInt(obj.style.top);
				var x1 = parseInt(obj.style.left);
				var bt = 0;
				if (bstat == 0)
				{
					bt = AA.getBombType(x);
					obj.setAttribute('bomb_type',bt);
					var objA = document.getElementById('SI_ALIEN'+bt+'_'+x);
					y1 = parseInt(objA.style.top)+10;
					x1 = parseInt(objA.style.left)+20;
				}
				else
				{
					bt = obj.getAttribute('bomb_type');
				}

				if (BB.checkCollision((x1+3),(y1+12)))
				{
					destroy_bomb(obj,x);
					y1 = -20;
				}

				if (missileStatus == 1)
				{
					var bx = x1 + 3;
					var bh = y1 +12;
					if (bx >= ml && bx <= mr && bh >= mt && bh <= mh)
					{
						destroy_bomb(obj,x);
						y1 = -20;
						destroy_missile();
					}
				}

				y1 += 5;
				obj.className='ab'+bt+t;
				obj.style.top=y1 +'px';
				obj.style.left=x1 +'px';

				if (y1 >= (cannonY+6) && y1 < (cannonY+36) && cl <= (x1+3) && cr >= (x1+3) )
				{
					if (tankAlive == 1)
					{
						destroy_bomb(obj,x);
						startCannonExplode(0);
					}
				}

				if (y1 > canvasHeight)
				{
					destroy_bomb(obj,x);
				}
			}
		}
	}
};

function updateStatus(amount)
{
	tankLives = tankLives + amount;
	if (tankLives == 0)
	{
		TankAlive = 0;
		gameOver();
		return;
	}

	if (tankLives <= 1)
	{
		shipCount.innerText="";
		sd1.style.visibility="hidden";
	}
	else
	{
		shipCount.innerText=tankLives;
		for (var x=1; x < tankLives; x++)
		{
			if (x > 4) break;
			var obj = document.getElementById("sd"+x);
			obj.style.visibility="visible";
		}
		for (var x=tankLives; x < 5; x++)
		{
			var obj = document.getElementById("sd"+x);
			obj.style.visibility="hidden";
		}
	}
	tankAlive = 1;
};

function checkCollide(obj1, obj2)
{
	var l1 = 0;  var l2 = 0;  var r1 = 0;  var r2 = 0;  var t1 = 0;  var t2 = 0;  var b1 = 0;  var b2 = 0;
	l1 = parseInt(obj1.style.left);
	r1 = l1 + parseInt(obj1.width);
	l2 = parseInt(obj2.style.left);
	r2 = l2 + parseInt(obj2.width);
	t1 = parseInt(obj1.style.top);
	b1 = t1 + parseInt(obj1.height);
	t2 = parseInt(obj2.style.top);
	b2 = t2 + parseInt(obj2.height);

	if (r1 > l2 && l1 < r2 && t1 < b2 && b1 > t2)
	{
		return 1;
	}
	else
	{
		return 0;
	}
};

function ready()
{
	hideLoadingMessage();
	stage.className  = "ready";
	splash.className = "ready";

	if (resetGame)
	{
		initLive();
	}
	else
	{
		initGame();
	}
	return false;
};

function showInstructions()
{
	splash.className = "ready";

	var ins = document.getElementById("instructions");
	ins.style.display="block";
	return false;
};

function hideInstructions()
{
	var ins = document.getElementById("instructions");
	ins.style.display="none";

	splash.className = "";

	hideLoadingMessage();
	return false;
};

function hideLoadingMessage()
{
	var loadingMessage = document.getElementById("loadingMessage");
	loadingMessage.style.display="none";
};

function reset()
{
	gameover.style.display="none";
	stage.className  = "";
	splash.className = "";

	AA.init(false);
	BB.resetBunkers();
	SB.init();
	resetGame = true;

	return false;
};

function gameOver()
{
	window.clearInterval(timerAlien);
	window.clearInterval(timerShip);
	window.clearInterval(timerAlienBomb);
	gameover.style.display="block";
	window.setTimeout("reset();", 5000);
};

PlayFX = function()
{
	var self = this;

	this.soundFX  = [];
	this.pausedFX = [];
	this.sfxIndex = SFX_INVADER1;

	this.init = function()
	{
		this.soundFX[SFX_INVADER1]	= new Howl({ src: ['audio/invader1.mp3'] });
		this.soundFX[SFX_INVADER2]	= new Howl({ src: ['audio/invader2.mp3'] });
		this.soundFX[SFX_INVADER3]	= new Howl({ src: ['audio/invader3.mp3'] });
		this.soundFX[SFX_INVADER4]	= new Howl({ src: ['audio/invader4.mp3'] });
		this.soundFX[SFX_INVADER_KILLED]= new Howl({ src: ['audio/invaderkilled.mp3'] });
		this.soundFX[SFX_INVADER_SHIP]	= new Howl({ src: ['audio/ufo.mp3'] });
		this.soundFX[SFX_SHOOT_MISSILE]	= new Howl({ src: ['audio/shoot.mp3'] });
		this.soundFX[SFX_CANNON_EXPLODE]= new Howl({ src: ['audio/explosion.mp3'] });
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

	this.rotateInvaderSFX = function()
	{
		this.sfxIndex++;
		if (this.sfxIndex > SFX_INVADER4)
		{
			this.sfxIndex = SFX_INVADER1;
		}
		this.play(this.sfxIndex);
		return false;
	};

	this.init();
};
