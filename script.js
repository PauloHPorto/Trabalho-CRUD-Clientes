const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sTelefone = document.querySelector("#m-telefone");
const sEmail = document.querySelector("#m-email");
const sCpf = document.querySelector("#m-cpf");
const btnSalvar = document.querySelector("#btnSalvar");

let itens;
let id;

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? {};
function getItensBD() {
  return localStorage.setItem('dbfunc', JSON.stringify(itens)) ?? {};
}

function loadItens() {
  itens = getItensBD ()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem (item, idenx)
  })
}

loadItens();

function insertItem(item, index){
  let tr = document.createElement('tr')

  tr.innerHTML = `
  <td>${item.nome}</td>
  <td>${item.telefone}</td>
  <td>${item.email}</td>
  <td>${item.cpf}</td>

  <td class= "acao">
    
    <button onclick="editItem(${index})"><i class= 'bx bx-edit' ></i></button>
    </td>
    <td class= "acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    `
    tbody.appendChild(tr)
}

function editItem(index){

  openModal(true, index)
}

function deleteItem(idenx){
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function openModal(edit = false, index = 0){
  modal.classList.add('aactive')

  modal.onclick = e => {
    if (e.target,className.indexOf('modal-container') !== -1 ){}
      modal.classList.remove('active')
  }
}

if (edit) {
  sNome.value = itens[index].nome
  sTelefone.value = itens [index].telefone
  sEmail.value = itens [index].emal
  sCpf.value = itens [index].cpf
  id = index
} else {
  sNome.value = ''
  sTelefone.value = ''
  sEmail.value = ''
  sCpf.value.value = ''
}


