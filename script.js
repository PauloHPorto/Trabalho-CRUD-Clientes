const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sTelefone = document.querySelector("#m-telefone");
const sEmail = document.querySelector("#m-email");
const sCpf = document.querySelector("#m-cpf");
const btnSalvar = document.querySelector("#btnSalvar");

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    sNome.value = itens[index].nome;
    sTelefone.value = itens[index].telefone;
    sEmail.value = itens[index].email; // Correção aqui
    sCpf.value = itens[index].cpf;
    id = index;
  } else {
    sNome.value = "";
    sTelefone.value = "";
    sEmail.value = "";
    sCpf.value = "";
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.telefone}</td>
    <td>R$ ${item.cpf}</td>
    <td>${item.email}</td>

    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = (e) => {
  if (
    sNome.value === "" ||
    sTelefone.value === "" ||
    sEmail.value === "" ||
    sCpf.value === ""
  ) {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value;
    itens[id].telefone = sTelefone.value;
    itens[id].email = sEmail.value;
    itens[id].cpf = sCpf.value;
  } else {
    itens.push({
      nome: sNome.value,
      telefone: sTelefone.value, // Correção aqui
      email: sEmail.value, // Correção aqui
      cpf: sCpf.value,
    });
  }

  setItensBD();

  modal.classList.remove("active");
  loadItens();
  id = undefined;
};

function getItensBD() {
  return JSON.parse(localStorage.getItem("dbfunc")) || [];
}

function setItensBD() {
  localStorage.setItem("dbfunc", JSON.stringify(itens));
}

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

loadItens();
