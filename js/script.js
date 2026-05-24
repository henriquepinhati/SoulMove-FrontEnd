document.addEventListener('DOMContentLoaded', function(){
  const btn = document.getElementById('btn-hamburger');
  const menu = document.getElementById('menu');
  if(btn && menu){
    btn.addEventListener('click', () => {
      const isVisible = menu.getAttribute('data-visible') === 'true';
      menu.setAttribute('data-visible', String(!isVisible));
    });
    window.addEventListener('resize', ()=>{
      if(window.innerWidth>768) menu.setAttribute('data-visible','false');
    });
  }

  const acc = document.querySelectorAll('.accordion-btn');
  acc.forEach(btn => {
    btn.addEventListener('click', ()=>{
      const panel = btn.nextElementSibling;
      const open = panel.style.display === 'block';
      // close all
      document.querySelectorAll('.accordion-panel').forEach(p=>p.style.display='none');
      if(!open){
        panel.style.display='block';
      }
    });
  });

  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const feedback = document.getElementById('contact-feedback');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!name){feedback.textContent='Por favor, informe seu nome.';return}
      if(!email || !emailRegex.test(email)){feedback.textContent='Por favor, informe um e-mail válido.';return}
      if(!message){feedback.textContent='Por favor, escreva uma mensagem.';return}
      feedback.style.color='green';
      feedback.textContent='Mensagem enviada com sucesso (simulação).';
      contactForm.reset();
      setTimeout(()=>{feedback.textContent=''},4000);
    });
  }

  const simForm = document.getElementById('sim-form');
  if(simForm){
    simForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const origin = document.getElementById('origin').value.trim();
      const destination = document.getElementById('destination').value.trim();
      const distance = parseFloat(document.getElementById('distance').value);
      const transport = document.getElementById('transport').value;
      const balance = parseFloat(document.getElementById('balance').value);
      const feedback = document.getElementById('sim-feedback');
      const result = document.getElementById('sim-result');
      const elTransport = document.getElementById('result-transport');
      const elPoints = document.getElementById('result-points');
      const elCo2 = document.getElementById('result-co2');
      const elSaldo = document.getElementById('result-saldo');

      feedback.style.color='crimson';
      if(!origin || !destination){feedback.textContent='Origem e destino são obrigatórios.';return}
      if(!(distance>0)){feedback.textContent='Informe uma distância maior que 0.';return}
      if(!(balance>=0)){feedback.textContent='Saldo inválido.';return}

      const emission = {
        carro:0.19,
        metro:0.03,
        onibus:0.05,
        trem:0.04
      };

      const voucherPoints = 100;

      const co2Avoided = (emission.carro - emission[transport]) * distance;

      elTransport.textContent = `Transporte: ${transport}`;
      elPoints.textContent = `Pontos necessários: ${voucherPoints}`;
      elCo2.textContent = `CO2 evitado: ${co2Avoided.toFixed(3)} kg`;
      const enough = balance >= voucherPoints;
      elSaldo.textContent = `Saldo suficiente: ${enough ? 'Sim' : 'Não'}`;
      feedback.style.color='green';
      feedback.textContent='Simulação realizada com sucesso.';
      result.hidden = false;
    });
  }

  const btnUpdate = document.getElementById('btn-update');
  if(btnUpdate){
    btnUpdate.addEventListener('click', ()=>{
      const rand = (min,max)=>Math.floor(Math.random()*(max-min+1))+min;
      document.getElementById('dash-points').textContent = rand(50,300);
      document.getElementById('dash-vouchers').textContent = rand(0,12);
      document.getElementById('dash-co2').textContent = (Math.random()*50).toFixed(2);
      document.getElementById('dash-trips').textContent = rand(0,30);
      // adicionar evento visual simples
      btnUpdate.textContent = 'Atualizado';
      setTimeout(()=>btnUpdate.textContent='Atualizar dados',1500);
    });
  }
});
