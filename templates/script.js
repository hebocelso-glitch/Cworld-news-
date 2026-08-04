const menu = document.getElementById("menu");
const sidebar = document.getElementById("sidebar");

menu.addEventListener("click", () => {
    sidebar.classList.toggle("ativo");
});
/*opsao de curtir*/
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if(btn.innerText.includes('Curtir')){
      btn.classList.toggle('liked'); // adiciona/remove azul
      btn.querySelector('span').innerText = 
        btn.classList.contains('liked') ? 'Curtido' : 'Curtir';
    }
  });
});