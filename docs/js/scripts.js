window.onload = ()=> {
	let html = '';
	for(let color in colors) {
		html += `<h2>${color} <small>${colors[color].name}</small></h2><div class="shade">`;
		for(let key in colors[color]) {
			if(key=='name') continue;
			let hex = colors[color][key];
			html += `<div class="color"><p class="number">${key}</p><div class="color-preview" style="background-color:${hex};" onclick="copyText('${hex}',${key},this)"></div><p class="hex">${hex}</p></div>`;
		}
		html += '</div>';
	}
	document.getElementById('colors').innerHTML = html;
};
function copyText(text,num,elm) {
	let input = document.createElement('input');
	input.setAttribute('value', text);
	document.body.appendChild(input);
	input.select();
	let success = document.execCommand('copy');
	document.body.removeChild(input);

	if(success) {
		const check = `<svg style="position:relative;top:8px;left:8px;width:16px;height:16px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path stroke="#${num>300?'F9FAFB':'374151'}" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
		</svg>`;
		elm.innerHTML = check;
		setTimeout(()=> elm.innerHTML = '', 750);
	}
 }