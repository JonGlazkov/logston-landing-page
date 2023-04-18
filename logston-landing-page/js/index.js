window.addEventListener('scroll', onScroll);

onScroll();
function onScroll() {
  activateMenuAtCurrentSection(home);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;

  // Verificar se a seção passou da linha alvo
  // Quais dados vou precisar?

  //O topo da seção
  const sectionTop = section.offsetTop;

  //A altura da seção
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;

  //console.log('O topo da seção chegou ou passou da linha?',sectionTopReachOrPassedTargetLine);

  //Verificar se a base está abaixo da linha alvo
  //Quais dados vou precisar?

  //A seção termina onde?

  const sectionEndsAt = sectionTop + sectionHeight;

  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  //console.log('O fundo da seção passou da linha?', sectionEndPassedTargetLine)

  //Limites da seção
}

document.querySelectorAll('ul#menu_content li a').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('input[type=checkbox').checked = false;
  });
});

ScrollReveal({
  origin: 'top',
  distance: '150px',
  duration: 1500
}).reveal(`
  #home img,
  #home header,
  #contact header,
  #contact form
`);

ScrollReveal({
  origin: 'left',
  distance: '100px',
  duration: 1500
}).reveal(`
  #services header,
  #services .wrapper
`);

const form = document.getElementById('form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');

const subject = 'Formulário preenchido no site da Logston';

form.addEventListener('submit', e => {
  let verify = checkInputs();

  if (!verify) {
    e.preventDefault();
  } else {
    window.open(
      `mailto:logston.app@gmail.com?subject=${subject}&body=${`
      Nome: ${username.value}\n
      Email: ${email.value} \n
      Telefone: ${phone.value}\n 
      Mensagem: ${message.value} \n
    `} `
    );
  }
});

function checkInputs() {
  let status = true;

  const nameValue = username.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();

  if (nameValue === '') {
    errorValidation(username, 'Preencha esse campo!');
    status = false;
  } else if (nameValue.length < 3) {
    errorValidation(username, 'O nome deve conter pelo menos 3 caracteres!');
    status = false;
  } else {
    successValidation(username);
  }

  if (emailValue === '') {
    errorValidation(email, 'Preencha esse campo!');
    status = false;
  } else {
    if (!validateEmail(emailValue)) {
      errorValidation(email, 'Email inválido!');
      status = false;
    } else {
      successValidation(email);
    }
  }

  if (phoneValue === '') {
    errorValidation(phone, 'Preencha esse campo!');
    status = false;
  } else if (!validatePhone(phoneValue)) {
    errorValidation(phone, 'Telefone inválido!');
    status = false;
  } else if (phoneValue.length <= 10) {
    errorValidation(phone, 'Telefone deve conter o DDD e o 9 inicial!');
    status = false;
  } else {
    successValidation(phone);
  }

  return status;
}

function errorValidation(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function successValidation(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  const small = formControl.querySelector('small');
  small.innerText = '';
}

const validatePhone = phone => {
  return String(phone).match(/(\(?\d{2}\)?\s)?(\d{4,5})?\-?(\d{4})/g);
};

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
