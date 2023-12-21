async function loadScript() {
    let url = "https://raw.githubusercontent.com/joly54/helper/main/inject.js";
    let js_code = await fetch(url).then(r => r.text());

    let script = document.createElement('script');
    script.textContent = js_code;
    document.documentElement.appendChild(script);
}

loadScript();
