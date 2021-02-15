let d = document, get = d.getElementById.bind(d);

let dark = false, more = false;

function renderColors() {
	let html = '';
	for(let color in colors) {
		if(!more && !basicColors.includes(color)) continue;
		html += `<h2>${color} &mdash; <small>colors.${colors[color].name}</small></h2>`;
		for(let key in colors[color]) {
			if(key=='name') continue;
			let hex = '#' + colors[color][key];
			html += `<div class="color"><p class="number">${key}</p>
			<div class="color-preview" style="background-color:${hex};" onclick="copyText('${hex}',${key},this)" oncontextmenu="setBackground(event,'${hex}',${key})"></div>
			<p class="hex">${hex}</p></div>`;
		}
	}
	get('colors').innerHTML = html;
}
window.onload = ()=> {
	renderColors();

	get('print-btn').onclick = ()=> window.print();

	get('download-btn').onclick = ()=> get('download-link').click();

	get('dark-btn').onclick = ()=> {
		dark = !dark;
		d.body.style.backgroundColor = dark ? '#000' : '#FFF';
		d.body.style.color = dark ? '#FFF' : '#111827';
	};

	get('more-btn').onclick = ()=> {
		more = !more;
		renderColors();
		get('more-btn').classList.toggle('active');
	};

	get('css-btn').onclick = ()=> {
		let txt = ':root {\n';
		for(let color in colors) {
			if(!more && !basicColors.includes(color)) continue;
			let name = color.replace(' ','').toLowerCase();
			for(let key in colors[color]) {
				if(key=='name') continue;
				txt += `\t--${name}-${key}: #${colors[color][key]};\n`;
			}
		}
		downloadFile(txt + '}', 'tailwind-colors.css');
	};
};

function copyText(text, num, elm) {
	let input = d.createElement('input');
	input.setAttribute('value', text);
	d.body.appendChild(input);
	input.select();
	let success = d.execCommand('copy');
	d.body.removeChild(input);

	if(success) {
		const check = `<svg style="position:relative;top:8px;left:8px;width:16px;height:16px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path stroke="#${num>300?'F9FAFB':'374151'}" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
		</svg>`;
		elm.innerHTML = check;
		setTimeout(()=>elm.innerHTML='', 750);
	}
}

function downloadFile(str, fileName) {
	const properties = {type: 'plain/text'};
	try {
		file = new File([str], fileName, properties);
	} catch(e) {
		file = new Blob([str], properties);
	}

	let link = d.createElement('a');
	link.download = fileName;
	link.href = URL.createObjectURL(file);
	d.body.appendChild(link);
	link.click();
	d.body.removeChild(link);
}

function setBackground(e, hex, num) {
	e.preventDefault();
	d.body.style.backgroundColor = hex;
	d.body.style.color = num > 300 ? '#FFF' : '#111827';
	dark = false;
}