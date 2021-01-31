window.onload = ()=> {
	let html = '';
	for(let color in colors) {
		html += `<h2>${color} <small>${colors[color].name}</small></h2><div class="shade">`;
		for(let key in colors[color]) {
			if(key=='name') continue;
			let hex = colors[color][key];
			html += `<div class="color"><p class="number">${key}</p><div class="color-preview" style="background-color:${hex};" onclick="copyText('${hex}',this)"></div><p class="hex">${hex}</p></div>`;
		}
		html += '</div>';
	}
	document.getElementById('colors').innerHTML = html;
};
function copyText(text,elm) {
	let input = document.createElement('input');
	input.setAttribute('value', text);
	document.body.appendChild(input);
	input.select();
	document.execCommand('copy');
	document.body.removeChild(input);

	const check = `<svg style="position:relative;top:8px;left:8px;width:16px;height:16px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<circle r="12" cx="12" cy="12" fill="#F9FAFB"></circle>
	<path stroke="#374151" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
	</svg>`;
	elm.innerHTML = check;
	setTimeout(()=> elm.innerHTML = '', 750);
 }