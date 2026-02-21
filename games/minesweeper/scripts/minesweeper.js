MINESWEEPER = function()
{
	self = this;
	level = 0;
	visitedCount = 0;
	flagCount = 0;
	gameState = 0;
	levels =
	[
		{rows: 10, cols: 10, mines: 10, cellCount: 100, neutralCount: 90},
		{rows: 15, cols: 15, mines: 25, cellCount: 225, neutralCount: 200},
		{rows: 20, cols: 20, mines: 50, cellCount: 400, neutralCount: 350}
	];
	boards =
	[
		[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		],
		[
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		]
	];
	board = boards[level];
	cell = 
	{
		neighbors: 15,
		visited: 16,
		flagged: 32,
		live: 128
	};
	gameStates =
	{
		Ready: 0,
		Playing: 1,
		GameOverWin: 2,
		GameOverLose: 3
	};
	this.initBoard = function()
	{
		var gp = document.getElementById('GamePanel');
		var boardGrid = document.createElement('div');
		boardGrid.className = "ButtonGrid";
		boardGrid.id = "leftButtonClick";
		boardGrid.style.width = (levels[level].rows * 31) + "px";
		gp.appendChild(boardGrid);
		for (let y = 0; y < levels[level].rows; y++)
		{
			for (let x = 0; x < levels[level].cols; x++)
			{
				btn = document.createElement('button');
				btn.className = "game-piece";
				btn.name = "cell";
				btn.addEventListener('click', self.cellLeftClicked);
				btn.addEventListener('contextmenu', self.cellRightClicked);
				img = document.createElement('img');
				img.id = y + "_" + x;
				img.value = y + "_" + x;
				img.src = "images/btn/button.jpg";
				btn.appendChild(img);
				boardGrid.appendChild(btn);
			}
			boardGrid.appendChild(document.createElement('br'));
		}
	};
	this.initGamePanel = function()
	{
		var gamePanel = document.createElement('div');
		gamePanel.className = "GamePanel";
		gamePanel.id = "GamePanel";
		gamePanel.style.width = (levels[level].rows * 31 + 20) + "px";
		document.body.appendChild(gamePanel);
		var statusPanel = document.createElement('div');
		statusPanel.className = "StatusPanel row";
		statusPanel.style.width = (levels[level].rows * 31) + "px";
		gamePanel.appendChild(statusPanel);
		var flagPanel  = document.createElement('div');
		flagPanel.className = "FlagPanel";
		statusPanel.appendChild(flagPanel);

		var flags = levels[level].mines;
		var m100 = Math.floor(flags / 100);
		var flags = flags % 100;
		var m010 = Math.floor(flags / 10);
		flags = flags % 10;
		var m001 = flags;
		f100 = document.createElement('img');
		f100.id="f100"
		f100.src = "images/num/" + m100 + ".jpg";
		f010 = document.createElement('img');
		f010.id = "f010";
		f010.src = "images/num/" + m010 + ".jpg";
		f001 = document.createElement('img');
		f001.id = "f001";
		f001.src = "images/num/" + m001 + ".jpg";
		flagPanel.appendChild(f100);
		flagPanel.appendChild(f010);
		flagPanel.appendChild(f001);

		var smileyPanel = document.createElement('div');
		smileyPanel.className = "SmileyFace";
		smileyBtn = document.createElement('button');
		smileyBtn.title = "Click Smiley Face to start new game.";
		smileyBtn.addEventListener('click', self.startNewGame);
		smileyImg = document.createElement('img');
		smileyImg.id = "smiley";
		smileyImg.src = "images/face/smilehappy.jpg";
		smileyPanel.appendChild(smileyBtn);
		smileyBtn.appendChild(smileyImg);
		statusPanel.appendChild(smileyPanel);

		var timePanel  = document.createElement('div');
		timePanel.className = "TimePanel";
		statusPanel.appendChild(timePanel);

		t100 = document.createElement('img');
		t100.id="t100"
		t100.src = "images/num/0.jpg";
		t010 = document.createElement('img');
		t010.id = "t010";
		t010.src = "images/num/0.jpg";
		t001 = document.createElement('img');
		t001.id = "t001";
		t001.src = "images/num/0.jpg";
		timePanel.appendChild(t100);
		timePanel.appendChild(t010);
		timePanel.appendChild(t001);




		this.initBoard();
		

	};
	this.drawBoard = function()
	{
		//console.log("GameState:" + gameState + ", Completed:" + this.isGameCompleted()+ ", FlagCount:" + flagCount + ", Visited:" + visitedCount + ", Neutral:" + levels[level].neutralCount);
		for (let y = 0; y < levels[level].rows; y++)
		{
			for (let x = 0; x < levels[level].cols; x++)
			{
				id = y + "_" + x;
				img = document.getElementById(id);
				if (this.isCellFlagged(board[y][x]))
				{
					img.src = "images/btn/button_flag.jpg";
				}
				else if (this.isCellVisited(board[y][x]))
				{
					if (this.isCellLive(board[y][x]))
					{
						img.src = "images/btn/mine_hit.jpg";
					}
					else
					{
						count = this.getCellNeighborsCount(board[y][x]);
						img.src = "images/btn/" + count + ".jpg";
					}
				}
				else
				{
					img.src = "images/btn/button.jpg";
				}
			}
		}

		if (gameState == gameStates.Playing || gameState == gameStates.Ready)
		{
			setTimeout(() => {
				self.drawSmileyFace("smilehappy"); // Wrap in arrow function
			}, 300);
		}
	};
	this.drawExposeMines = function(lastrow, lastcol)
	{
		for (let y = 0; y < levels[level].rows; y++)
		{
			for (let x = 0; x < levels[level].cols; x++)
			{
				if (this.isCellLive(board[y][x]))
				{
					id = y + "_" + x;
					img = document.getElementById(id);

					if (y == lastrow && x == lastcol)
					{
						img.src = "images/btn/mine_hit.jpg";
					}
					else
					{
						img.src = "images/btn/mine.jpg";
					}
				}
				else if (this.isCellFlagged(board[y][x]))
				{
					id = y + "_" + x;
					img = document.getElementById(id);
					img.src = "images/btn/mine_miss.jpg";
				}
			}
		}
	};

	this.cellRightClicked = function(event)
	{
		event.preventDefault();
		var cell = event.target.value;
		//console.log("Right Button Was Clicked:" + event.target.value + ", type:" + event.type);
		var vals = cell.split("_");

		if (!(gameState == gameStates.Playing || gameState == gameStates.Ready)) return;
		if (gameState == gameStates.Ready) gameState = gameStates.Playing;

		self.toggleCellFlagged(vals[0],vals[1]);

		// Check game completed - Board cleared
		if (gameState == gameStates.Playing && self.isGameCompleted())
		{
			gameState = gameStates.GameOverWin;
			self.drawSmileyFace("smilewin");
		}

		self.drawBoard();
		self.drawFlagCounter();
		//console.log(board);
		return false;
	};

	this.cellLeftClicked = function(event)
	{
		event.preventDefault();
		var cell = event.target.value;
		//console.log("Left Button Was Clicked:" + event.target.value + ", type:" + event.type);
		var vals = cell.split("_");
	
		if (!(gameState == gameStates.Playing || gameState == gameStates.Ready)) return;
		if (gameState == gameStates.Ready) gameState = gameStates.Playing;

		if (self.isCellFlagged(board[vals[0]][vals[1]]))
		{
			return;
		}
		else if (self.getCellNeighborsCount(board[vals[0]][vals[1]]) > 0)
		{
			self.drawSmileyFace("smilescared");
			self.setCellVisited(vals[0],vals[1]);
			if (self.isCellLive(board[vals[0]][vals[1]]))
			{
				gameState = gameStates.GameOverLose;
				self.drawSmileyFace("smilelose");
			}
		}
		else
		{
			self.drawSmileyFace("smilescared");
			self.floodFillBFS(vals[0],vals[1]);
		}

		// Check game completed - Board cleared
		if (gameState == gameStates.Playing && self.isGameCompleted())
		{
			gameState = gameStates.GameOverWin;
			self.drawSmileyFace("smilewin");
		}
		self.drawBoard();
		if (gameState == gameStates.GameOverLose)
		{
			self.drawExposeMines(vals[0],vals[1]);
		}
		//console.log(board);
		return false;
	};
	this.isCellFlagged = function(cellValue)
	{
		//console.log("isCellFlagged:" + ((cellValue & cell.flagged) == cell.flagged));
		return ((cellValue & cell.flagged) == cell.flagged);
	};
	this.isCellVisited = function(cellValue)
	{
		//console.log("isCellVisited:" + ((cellValue & cell.visited) == cell.visited));
		return ((cellValue & cell.visited) == cell.visited);
	};
	this.isCellLive = function(cellValue)
	{
		//console.log("isCellLive:" + ((cellValue & cell.live) == cell.live));
		return ((cellValue & cell.live) == cell.live);
	};
	this.getCellNeighborsCount = function(cellValue)
	{
		//console.log("getCellNeighborsCount:" + (cellValue & cell.neighbors));
		return (cellValue & cell.neighbors);
	};
	this.isGameCompleted = function()
	{
		return ((flagCount == levels[level].mines) && (visitedCount == levels[level].neutralCount));
	};
	this.setCellVisited = function(row, col)
	{
		// Cannot visit flagged cells
		if (this.isCellFlagged(board[row][col])) return;

		if (!(this.isCellVisited(board[row][col])))
		{
			board[row][col] |= cell.visited;
			visitedCount++;
			//console.log("Visited Count:" + visitedCount);
		}
		return;
	};
	this.toggleCellFlagged = function(row, col)
	{
		// Cannot modify flag on visited cells
		if (this.isCellVisited(board[row][col])) return;

		// Cannot flag more cells than number of bombs
		alreadyFlagged = this.isCellFlagged(board[row][col]);
		if (flagCount == levels[level].mines && !alreadyFlagged) return;

		// Toggle cell flag and adjust flag count
		board[row][col] ^= cell.flagged;
		flagCount = (alreadyFlagged) ? (flagCount - 1) : (flagCount + 1);
	};
	this.floodFillBFS = function(sr, sc)
	{
		row = Number(sr);
		col = Number(sc);

		// Exit if starting cell has already been visited
		if (this.isCellVisited(board[row][col])) return;

		// Direction vectors for traversing 8 directions
		const dir = [[1, 0], [-1, 0], [0, 1], [0, -1], [-1,-1], [-1, 1], [1, 1], [1, -1]];
		//const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];

		const q = [];
		q.push([col, row]);

		// Set starting cell visited
		this.setCellVisited(row, col);

		// Perform BFS
		while (q.length > 0)
		{
			const [x, y] = q.shift();

			// Traverse all 8 directions
			for (const it of dir)
			{
				const nx = x + it[0];
				const ny = y + it[1];

				// Check boundary conditions and color match
				if (nx >= 0 && nx < levels[level].cols && ny >= 0 && ny < levels[level].rows &&  
					this.getCellNeighborsCount(board[ny][nx]) == 0 &&
					!this.isCellVisited(board[ny][nx]) &&
					!this.isCellFlagged(board[ny][nx]))
				{
					this.setCellVisited(ny, nx);
					q.push([nx, ny]);
				}
				else if (nx >= 0 && nx < levels[level].cols && ny >= 0 && ny < levels[level].rows &&  
					this.getCellNeighborsCount(board[ny][nx]) < 9 &&
					!this.isCellVisited(board[ny][nx]) &&
					!this.isCellFlagged(board[ny][nx]))
					{
						this.setCellVisited(ny, nx);
					}
			}
		}
	};
	this.createLiveMines = function()
	{
		const dir = [[1, 0], [-1, 0], [0, 1], [0, -1], [-1,-1], [-1, 1], [1, 1], [1, -1]];

		for (let i = 0; i < levels[level].mines; i++)
		{
			let col = (Math.floor(Math.random() * levels[level].cols));
			let row = (Math.floor(Math.random() * levels[level].rows));
			while (this.isCellLive(board[row][col]))
			{
				col = (Math.floor(Math.random() * levels[level].cols));
				row = (Math.floor(Math.random() * levels[level].rows));
			}

			board[row][col] = cell.live + 9;
			//board[row][col] += 9;
		
			// Increment neighbors for surrounding cells inside boundaries and not live mines
			for (const it of dir)
			{
				const nx = col + it[0];
				const ny = row + it[1];
				if ((nx >= 0 && nx < levels[level].cols && ny >= 0 && ny < levels[level].rows) && (!this.isCellLive(board[ny][nx])))
				{
					board[ny][nx] += 1;
				}
			}
		}
	};
	this.drawSmileyFace = function(face)
	{
		var smileyImg1 = document.getElementById('smiley');
		smileyImg1.src = "images/face/" + face + ".jpg";
	};
	this.drawFlagCounter = function()
	{
		var flags = levels[level].mines - flagCount;
		var m100 = Math.floor(flags / 100);
		var flags = flags % 100;
		var m010 = Math.floor(flags / 10);
		flags = flags % 10;
		var m001 = flags;
		f100 = document.getElementById('f100');
		f010 = document.getElementById('f010');
		f001 = document.getElementById('f001');
		f100.src = "images/num/" + m100 + ".jpg";
		f010.src = "images/num/" + m010 + ".jpg";
		f001.src = "images/num/" + m001 + ".jpg";
	};


	this.startNewGame =function()
	{
		visitedCount = 0;
		flagCount = 0;
		gameState = 0;
		board = structuredClone(boards[level]);
		self.createLiveMines();
		//console.log(board);
		self.drawBoard();
		self.drawFlagCounter();
		self.drawSmileyFace("smilehappy");
	};

	this.init = function()
	{
		level = 0
		board = structuredClone(boards[level]);
		this.createLiveMines();
		//console.log(board);
		this.initGamePanel();
		gameState = gameStates.Ready;
	};
};
var SWEEP = new MINESWEEPER();
SWEEP.init();

