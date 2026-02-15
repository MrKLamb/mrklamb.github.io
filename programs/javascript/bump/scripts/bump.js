/*****************************************
 Author:  Kelly Lamb
 Date:    2026-02-01
          Rewrite of a screensaver written in 2001 Delphi 4.
 Updated: 2026-02-11 Add Sliding Control Panel
          2026-02-14 Completed Show PacMan option
 File(s): bump.js
          bump.css
          bump.html
 Version: 1.0.0
 It does require a 256x256 jpg, grayscale smoothed blurred
 image for heightmap preferably gaussian blur.
 Whites = high(255), Blacks = low(0).
 Use the files by permission of the author
 only. Contact Kelly through email at
 klamb_online@hotmail.com

*****************************************/
BUMP = function()
{
	var self = this;
	
	// Control Panel 
	var ambientColor = new Uint8ClampedArray([0, 0, 0]);
	var diffuseColor = new Uint8ClampedArray([0, 0, 255]);
	var specularColor = new Uint8ClampedArray([255, 255, 255]);
	var sphericalSize = 32;
	var showPacMan = true;

	var palette = new Uint8ClampedArray(1024);  // 4 x 256
	var environmentMap = new Int16Array(65536); // 256 x 256
	var buffer = new Uint8ClampedArray(65536);  // 256 x 256
	var bumpMap = new Int16Array(65536 * 2);    // 256 x 256 x 2
	var saveMap = new Int16Array(65536 * 2);    // 256 x 256 x 2
	var currentX = 128;
	var currentY = 128;
	var dirX = 2;
	var dirY = 2;
	var stage;
	var sctx;
	var isDrawing = false;
	var pixelData;
	var image;



	this.init = function(imgURL) 
	{
		this.getTextureImage(imgURL);
		this.createStageUI();
		this.createControlsUI();
		this.makePalette();
		this.makeEnvironmentMap();
	};

	this.init2 = function()
	{
		sctx.putImageData(pixelData, 0, 0);
		this.makeBuffer(pixelData);
		this.makeBumpMap();
		PM.init(bumpMap, saveMap);
		//setInterval(this.animateLight, 10);
		window.requestAnimationFrame(self.animateLight);
	};

	this.createStageUI = function()
	{
		var container = document.createElement('div');
		container.className = "container";
		stage = document.createElement('canvas');
		stage.className = "responsive-canvas";
		stage.id = "stage";
		stage.width = 256;
		stage.height = 256;
		container.appendChild(stage);
		document.body.appendChild(container);
		sctx = stage.getContext("2d");
	};
	
	this.createControlsUI = function()
	{
		var toggle = document.createElement('span');
		toggle.id = "toggle";
		toggle.innerHTML = "&#x25B6;";
		toggle.addEventListener('click', self.toggleForm); 
		document.body.appendChild(toggle);
		var slider = document.createElement('div');
		slider.className = "form-slider";
		slider.id = "form-slider";
		document.body.appendChild(slider);
		//slider.appendChild(document.createElement('br'));
		var form = document.createElement('div');
		form.className = "form";
		slider.appendChild(form);
		fset1 = document.createElement('fieldset');
		fset2 = document.createElement('fieldset');
		fset3 = document.createElement('fieldset');
		fset4 = document.createElement('fieldset');
		fset5 = document.createElement('fieldset');

		legend1 = document.createElement('legend');
		legend1.innerHTML = '&nbsp;Color Palette:&nbsp;';
		fset1.appendChild(legend1);

		legend2 = document.createElement('legend');
		legend2.innerHTML = '&nbsp;Ambient:&nbsp;';
		fset2.appendChild(legend2);

		this.addColorSelectUI(fset2, 'ared', 'R:', '0');
		this.addColorSelectUI(fset2, 'agreen', 'G:', '0');
		this.addColorSelectUI(fset2, 'ablue', 'B:', '0');
		fset1.appendChild(fset2);	
		fset1.appendChild(document.createElement('br'));

		legend3 = document.createElement('legend');
		legend3.innerHTML = '&nbsp;Diffuse:&nbsp;';
		fset3.appendChild(legend3);

		this.addColorSelectUI(fset3, 'dred', 'R:', '0');
		this.addColorSelectUI(fset3, 'dgreen', 'G:', '0');
		this.addColorSelectUI(fset3, 'dblue', 'B:', '255');
		fset1.appendChild(fset3);
		fset1.appendChild(document.createElement('br'));

		legend4 = document.createElement('legend');
		legend4.innerHTML = '&nbsp;Specular:&nbsp;';
		fset4.appendChild(legend4);

		this.addColorSelectUI(fset4, 'sred', 'R:', '255');
		this.addColorSelectUI(fset4, 'sgreen', 'G:', '255');
		this.addColorSelectUI(fset4, 'sblue', 'B:', '255');
		fset1.appendChild(fset4);
		fset1.appendChild(document.createElement('br'));

		legend5 = document.createElement('legend');
		legend5.innerHTML = '&nbsp;Specular Size:&nbsp;';
		fset5.appendChild(legend5);
		this.addSizeSelectUI(fset5, 'ssize', 'Size:', '32');
		fset1.appendChild(fset5);
		fset1.appendChild(document.createElement('br'));

		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = 'showpacman';
		checkbox.name = 'showpacman';
		checkbox.value = '1';
		checkbox.checked = true;

		// Create the label element
		var label = document.createElement('label');
		label.setAttribute('for','showpacman');
		label.textContent = 'Show PacMan';
		fset1.appendChild(checkbox);
		fset1.appendChild(label);
		fset1.appendChild(document.createElement('br'));
		fset1.appendChild(document.createElement('br'));

		btn = document.createElement('button');
		btn.textContent = ' Update ';
		btn.addEventListener('click', self.updatePalette); 
		fset1.appendChild(btn);

		form.appendChild(fset1);
	};

	this.addColorSelectUI = function(parent, id, lbl, sel)
	{
		var array = ["0","16","32","48","64","80","96","112","128","144","160","176","192","208","224","240","255"];
		label = document.createElement('label');
		label.setAttribute('for',id);
		label.textContent = ' ' + lbl + ' ';
		parent.appendChild(label);
		
		//Create and append select list
		var selectList = document.createElement('select');
		selectList.setAttribute("id", id);

		//Create and append the options
		for (var i = 0; i < array.length; i++)
		{
			var option = document.createElement("option");
			option.setAttribute("value", array[i]);
			option.text = array[i];
			if (option.value === sel)
			{
				option.selected = true;
				option.defaultSelected = true;
			}
			selectList.appendChild(option);
		}
		parent.appendChild(selectList);		
	};

	this.addSizeSelectUI = function(parent, id, lbl, sel)
	{
		var val = ["4","8","16","32","48"];
		var txt = ["Large","Medium Large","Medium","Medium Small","Small"];
		label = document.createElement('label');
		label.setAttribute('for',id);
		label.textContent = ' ' + lbl + ' ';
		parent.appendChild(label);

		//Create and append select list
		var selectList = document.createElement('select');
		selectList.setAttribute("id", id);

		//Create and append the options
		for (var i = 0; i < val.length; i++)
		{
			var option = document.createElement("option");
			option.setAttribute("value", val[i]);
			option.text = txt[i];
			if (option.value === sel)
			{
				option.selected = true;
				option.defaultSelected = true;
			}
			selectList.appendChild(option);
		}
		parent.appendChild(selectList);				
	};

	this.getTextureImage = function(imgURL)
	{
		image = document.createElement('img');
		image.crossOrigin = "anonymous";
		image.onload = this.getTextureData;
		image.src = imgURL;
	};

	this.getTextureData = function()
	{
		var canvas = document.createElement('canvas');
		canvas.width = 256;
		canvas.height = 256;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0);
		pixelData = ctx.getImageData(0, 0, 256, 256);
		self.init2();
	};

	this.makePalette = function()
	{
		// calculate palette on the first quadrant arc
		// scale to 256 entries
		var quadrant1 = (Math.PI / 2.0);
		var radian = (quadrant1 / 256.0);
		var tempColor = 0;
		for (let y = 0; y <= 255; y++) 
		{
			var cosQ1 = Math.cos(quadrant1);
			var cosQ1P = Math.pow(cosQ1,sphericalSize);
			var quadrant1 = quadrant1 - radian;
			var y4 = y * 4;
			tempColor = Math.trunc(ambientColor[0] +
								  (diffuseColor[0] * cosQ1) +
								  (specularColor[0] * cosQ1P));
			palette[y4] = (tempColor > 255) ? 255 : tempColor; 

			tempColor = Math.trunc(ambientColor[1] +
								  (diffuseColor[1] * cosQ1) +
								  (specularColor[1] * cosQ1P));
			palette[y4 + 1] = (tempColor > 255) ? 255 : tempColor; 

			tempColor = Math.trunc(ambientColor[2] +
								  (diffuseColor[2] * cosQ1) +
								  (specularColor[2] * cosQ1P));
			palette[y4 + 2] = (tempColor > 255) ? 255 : tempColor; 

			palette[y4 + 3] = 255;
		}
	};

	this.makeEnvironmentMap = function()
	{
		// precompute LUT reflection map for one quadrant
		// and mirror to other other three
		// scale to 256 to complement palette
		for (let y = 0; y <= 127; y++)
		{
			// center y normal and scale and square
			var ny2 = (y-128) * 0.0078125; //(1/128);
			var ny2 = ny2 * ny2;
			for (let x = 0; x <= 127; x++)
			{
				// center x normal
				var nx = (x-128) * 0.0078125; //(1/128);
				// normalize z, scale and clamp to byte
				var nz = 1.0 - Math.sqrt(nx * nx + ny2);
				var c = Math.trunc(nz * 255);
				c = (c <= 0) ? 0 : c;
				environmentMap[(256 * y) + x] = c;
				environmentMap[(256 * (255-y)) + x] = c;
				environmentMap[(256 * y) + (255-x)] = c;
				environmentMap[(256 * (255-y)) + (255-x)] = c;
			}
		}
	};

	this.makeBuffer = function(pixelData)
	{
		// average colors to grayscale
		var dat = pixelData.data;
		var i = 0;
		for (let y = 0; y <= 255; y++)
		{
			var row = y * 256;
			for (let x = 0; x <= 255; x++)
			{
				buffer[row + x] = Math.trunc((dat[i] + dat[i + 1] + dat[i + 2]) / 3);
				i += 4;
			}
		}
	};

	this.makeBumpMap = function()
	{
		// calculate surface normal bump map LUT
		// zero top line
		// zero bottom line
		var ybottom = 256 * 255;
		for (var x = 0; x <= 255; x++)
		{
			bumpMap[(x*2)] = 0;
			bumpMap[(x*2)+1] = 0;
			bumpMap[ybottom+(x*2)] = 0;
			bumpMap[ybottom+(x*2)+1] = 0;		
		}

		// assume surface normal with neighboring pixel heights
		// add 128 to center into environment map
		for (var y = 1; y <= 254; y++)
		{
			var row = y * 512;
			for (var x = 1; x <= 254; x++)
			{
				var bxm1 = (y * 256) + (x-1);
				var bxp1 = (y * 256) + (x+1);

				var bym1 = ((y-1) * 256) + x;
				var byp1 = ((y+1) * 256) + x;

				var pos = row + (x * 2);
				bumpMap[pos] = 128 + 2*(buffer[bxm1] - buffer[bxp1]);
				bumpMap[pos + 1] = 128 + 2*(buffer[bym1] - buffer[byp1]);
			}
		}
		saveMap = structuredClone(bumpMap);
	};

	this.updatePalette = function()
	{
		var aRed = document.getElementById("ared").value;
		var aGreen = document.getElementById("agreen").value;
		var aBlue = document.getElementById("ablue").value;

		var dRed = document.getElementById("dred").value;
		var dGreen = document.getElementById("dgreen").value;
		var dBlue = document.getElementById("dblue").value;

		var sRed = document.getElementById("sred").value;
		var sGreen = document.getElementById("sgreen").value;
		var sBlue = document.getElementById("sblue").value;

		var sSize = document.getElementById("ssize").value;

		ambientColor = new Uint8ClampedArray([Number(aRed), Number(aGreen), Number(aBlue)]);
		diffuseColor = new Uint8ClampedArray([Number(dRed), Number(dGreen), Number(dBlue)]);
		specularColor = new Uint8ClampedArray([Number(sRed), Number(sGreen), Number(sBlue)]);

		sphericalSize = Number(sSize);
		
		// Adding showPacMan check here for simplicity
		showPacMan = document.getElementById("showpacman").checked;
		PM.reset();
		bumpMap = structuredClone(saveMap);

		self.makePalette();
	};

	this.animateLight = function()
	{
		if (isDrawing) return;
		else isDrawing = true;

		currentX = currentX + dirX;
		if (currentX >= 255)
		{
			dirX = -1 * (Math.floor(Math.random() * 6)+1);
			currentX = 254;
		}
		else if (currentX <= 0)
		{
			dirX = Math.floor(Math.random() * 6)+1;
			currentX = 1;
		}

		currentY = currentY + dirY;
		if (currentY >= 255)
		{
			dirY = -1 * (Math.floor(Math.random() * 6)+1);
			currentY = 254;
		}
		else if (currentY <= 0)
		{
			dirY = Math.floor(Math.random() * 6)+1;
			currentY = 1;
		}

		sctx.putImageData(self.applyBumpMap(pixelData), 0, 0);
		isDrawing = false;
		window.requestAnimationFrame(self.animateLight);
	};

	this.applyBumpMap = function(pixelData)
	{
		var bumpImage = pixelData.data;

		if (showPacMan) bumpMap = PM.draw();
		for (let y2 = 0; y2 <= 254; y2++)
		{
			var y = (y2 * 1024);
			var y3 = y2 - currentY;
			for (let x2 = 0; x2 <= 254; x2++)
			{
				var bx = bumpMap[(y2 * 512) + x2*2] + x2 - currentX;
				var by = bumpMap[(y2 * 512) + x2*2+1] + y3;
				if ((bx < 255) && (bx > 0) && (by < 255) && (by > 0))
				{
					var c = environmentMap[(by * 256) + bx];
					c = c * 4;
					bumpImage[y + (x2*4)] = palette[c];
					bumpImage[y + (x2*4) + 1] = palette[c + 1];
					bumpImage[y + (x2*4) + 2] = palette[c + 2];
					bumpImage[y + (x2*4) + 3] = palette[c + 3];
				}
				else
				{
					bumpImage[y + (x2*4)] = palette[0];
					bumpImage[y + (x2*4) + 1] = palette[1];
					bumpImage[y + (x2*4) + 2] = palette[2];
					bumpImage[y + (x2*4) + 3] = palette[3];
				}
			}
		}
		return pixelData;
	};

	this.toggleForm = function()
	{
		var width1 = document.getElementById("form-slider").style.width.replace(/%/g, '');
		document.getElementById("form-slider").style.width = (50 - width1) + "%";
		var arrow = document.getElementById("toggle");
		arrow.innerHTML = (width1 >= 10) ? "&#x25B6;" : "&#x25C0;";
	};
};

PACMAN = function()
{
	var self = this;
	this.active = false;
	this.pacman;
	this.bumpMap;
	this.saveMap;

	this.ppat = 0;
	this.px = 0;
	this.py = (254-32);
	this.pnum = 0;
	this.ppos = 0;
	this.cdir = 1;
	this.cface = 0;
	this.clen = 109;
	this.cmask = 0;
	this.cstep = 0;
	this.ctemp = 0;

	this.patterns =
		[
			[0,223,23,0,111,1,111,2,111,3,99,0,99,1,89,2,89,3,79,0,79,1,69,2,69,3,59,0,59,1,49,2,49,3,39,0,39,1,29,2,29,3,19,0,19,1,9,2,10],
			[0,223,23,0,111,1,111,2,111,3,99,0,99,1,10,2,89,1,10,0,89,1,10,2,89,1,10,0,89,1,10,2,89,1,10,0,89,1,10,2,89,1,10,0,89,0,1,0,2],
			[0,223,23,0,111,1,111,2,111,3,99,0,10,1,89,0,10,3,89,0,10,1,89,0,10,3,89,0,10,1,89,0,10,3,89,0,10,1,89,0,10,3,89,0,10,1,89,1,1]
		];

	this.isActive = function()
	{
		return this.active;
	};

	this.setActive = function(active)
	{
		this.active = active;
	};

	this.init = function(bumpMap, saveMap)
	{
		this.bumpMap = bumpMap;
		this.saveMap = saveMap;
		this.fetchJsonData('pacman.json', self.init2);	
	};

	this.init2 = function(data)
	{
		self.pacman = data;
		self.active = true;
		self.reset();
	};

	this.reset = function()
	{
		this.ppat = Math.floor(Math.random() * 3);
		this.px = this.patterns[this.ppat][0];
		this.py = this.patterns[this.ppat][1];
		this.pnum = this.patterns[this.ppat][2];
		this.cface = this.patterns[this.ppat][3];
		this.clen = this.patterns[this.ppat][4];
		this.ppos = 3;
		this.bumpMap = structuredClone(this.saveMap);
		this.cdir = 1;
		this.cmask = 0;
		this.cstep = 0;
		this.ctemp = 0;
	};

	this.fetchJsonData = async function(url, callback)
	{
		try
		{
			const response = await fetch(url);
			if (!response.ok)
			{
				throw new Error('Response status: ${response.status}');
			}
			// The .json() method also returns a promise, which we await
			const data = await response.json();
			callback(data);
		}
		catch (error)
		{
			console.error('Error fetching data:', error);
		}
	};

	this.draw = function(bumpMap1)
	{
		if (!this.active) return this.bumpMap;

		for(let yy = 0; yy <= 32; yy++)
		{
			var row = (this.py + yy) * 512;
			for(let xx = 0; xx <= 32; xx++)
			{
				if (this.pacman.circle_mask[this.cface][this.cmask][yy][xx] != 0)
				{
					var pos = row + ((this.px + xx) * 2);
					this.bumpMap[pos] = 128;
					this.bumpMap[pos + 1] = 128;
				}
			}
		}

		this.cmask += this.cdir;
		if ((this.cmask == 0) || (this.cmask == 5)) this.cdir = -(this.cdir);
		this.px += this.pacman.circle_dir.x[this.cface];
		this.py += this.pacman.circle_dir.y[this.cface];
		if (this.px > 255) this.px = 255; else if (this.px < 0) this.px = 0;
		if (this.py > 255) this.py = 255; else if (this.py < 0) this.py = 0;
		(this.cstep)++;
		if (this.cstep > this.clen)
		{
			this.cstep = 0;
			this.ppos += 2;
			if (this.ppos >= (this.pnum * 2 + 3))
			{
				this.reset();
				return this.bumpMap;
			}
			this.cface = this.patterns[this.ppat][this.ppos];
			this.clen  = this.patterns[this.ppat][this.ppos+1];
		}

		for(var yy = 0; yy <= 32; yy++)
		{
			var row = (this.py + yy) * 512;
			for(var xx = 0; xx <= 32; xx++)
			{
				if (this.pacman.circle_mask[this.cface][this.cmask][yy][xx] != 0)
				{
					var pos = row + ((this.px + xx) * 2);
					this.bumpMap[pos] = this.pacman.circle.x[this.cface][yy][xx];
					this.bumpMap[pos + 1] = this.pacman.circle.y[this.cface][yy][xx];
				}
			}
		}
		return this.bumpMap;
	};
};

var PM = new PACMAN();
var bump = new BUMP();
