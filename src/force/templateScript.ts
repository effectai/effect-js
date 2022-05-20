export default `<script>
window.addEventListener('message', function(event) {
    const data = event.data;
    switch ( data.task ) { // postMessage tasks
      case 'print' :
        console.log("received message from frontend:");
        console.log(data.message);
        break;
      case 'key' :
        const event = new KeyboardEvent('keydown', {key: data.key});
        document.dispatchEvent(event);
        break;
      case 'submit' :
        let button = document.createElement('input');
        button.setAttribute('type', 'submit');
        button.setAttribute('id', 'FORCE_FORM-submit');
        button.setAttribute('name', 'FORCE_FORM-submit');
        let form =  document.getElementById('FORCE_FORM');
        form.appendChild(button);
        button.click();
        form.removeChild(button);
        break;
      case 'results' :
        if (typeof forceResults === "function") {
          forceResults(data.value);
        } else {
          forceDefaultResults(data.value);
        }
        break;
    } 
});

function forceDefaultResults(results) {
  if (typeof results === 'string') results = JSON.parse(results);
  for(let key of Object.keys(results)) {
    let input = document.getElementsByName(key)[0];
    if(!input) {
      input = document.getElementById(key);
      if(!input) {
        continue;
      }
    }
    input.disabled = true;
    if(input.type === 'file') {
      // Skip files for now..
      continue;
    } else if(input.type === 'select-multiple') {
      Array.from(input.options).forEach(function(opt){
        if(results[key].includes(opt.value)) {
          opt.selected = true;
        }
      });
      input.dispatchEvent(new Event('change'))
    } else {
      input.value = results[key];
      if (input.type === 'select-one') {
        input.dispatchEvent(new Event('change'))
      } else {
        input.dispatchEvent(new Event('input'))
      }
    }
  }
}

function forceSubmit() {
  let button = document.createElement('input');
  button.setAttribute('type', 'submit');
  let form =  document.getElementById('FORCE_FORM');
  form.appendChild(button);
  button.click();
  form.removeChild(button);
}

var rtime;
var resizeCount = 0;
var delta = 100;

function forceResize() {
  // wait for cooloff period
  if (!rtime || new Date() - rtime > delta) {
    resizeCount++;
    let body = document.body,
      html = document.documentElement;

    let height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    parent.postMessage({'task': 'setHeight', 'height': height}, '*');
    // start cooloff period when we resized more than 5 times
    if (resizeCount > 5) {
      resizeCount = 0;
      rtime = new Date();
    }
  }
}

function forceOnload() {
  forceResize();

  document.getElementById('FORCE_FORM').addEventListener("submit", async function(event) {
    event.preventDefault();
    let values = {};
    if (typeof forceInput === "function") {
      values = await forceInput(event);
    } else {
      const inputs = event.target.elements;
      for (let index = 0; index < inputs.length; ++index) {
        if (!inputs[index].name.startsWith('FORCE_')) {
          let value;
          const field = inputs[index];
          const key = field.name || field.id;
          if (!key) continue;
          switch (field.type) {
            case 'checkbox':
              if (!field.checked) continue;
              value = field.value;
              break;
            case 'submit':
              // submit not yet supported
              continue;
            case 'file':
              delete(inputs[index])
              break;
            case 'radio':
              if (!field.checked) continue;
              value = field.value;
              break;
            case 'select-multiple':
              value = Array.from(inputs[index].options).filter(opt => opt.selected).map(opt => opt.value);
              break;
            default:
              value = inputs[index].value;
          }
          if (key in values) {
            if (Array.isArray(values[key])) {
              // We already have an array with values, push new value to array
              values[key].push(value);
            } else {
              // multiple values same key, create array
              values[key] = [values[key], value];
            }
          } else {
            values[key] = value;
          }
        }
      }
    }
    parent.postMessage({'task': 'submit', 'values': values}, '*');
    return false;
  });
}
window.addEventListener("load", forceOnload, false);
window.addEventListener("resize", forceResize, false);
</script>`