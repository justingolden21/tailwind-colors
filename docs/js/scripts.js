let d = document, get = d.getElementById.bind(d);
window.onload = ()=> {
	let html = '';
	for(let color in colors) {
		html += `<h2>${color} &mdash; <small>colors.${colors[color].name}</small></h2>`;
		for(let key in colors[color]) {
			if(key=='name') continue;
			let hex = colors[color][key];
			html += `<div class="color"><p class="number">${key}</p><div class="color-preview" style="background-color:${hex};" onclick="copyText('${hex}',${key},this)"></div><p class="hex">${hex}</p></div>`;
		}
	}
	get('colors').innerHTML = html;

	get('print-btn').onclick = ()=> window.print();
	get('download-btn').onclick = ()=> get('download-link').click();

	let dark = false;
	get('dark-btn').onclick = ()=> {
		dark = !dark;
		d.body.style.backgroundColor = dark ? '#000' : '#FFF';
		d.body.style.color = dark ? '#FFF' : '#111827';
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