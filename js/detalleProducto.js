const productos = JSON.parse(localStorage.getItem('productos'))|| [];

const url = new URLSearchParams(window.location.search);
const parametro = url.get('');

const producto = productos_json.find(p => p.id === parseInt(parametro));