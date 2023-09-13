var selectedRow = null;

function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(()=> document.querySelector(".alert").remove(), 3000);
}

function clearFields(){
  document.querySelector("#primeiroNome").value = "";
  document.querySelector("#Sobrenome").value = "";
  document.querySelector("#Cpf").value = "";
  document.querySelector("#Telefone").value = "";
}

//Adicionar Cliente
document.querySelector("#client-form").addEventListener("submit",(e) =>{
  e.preventDefault();

  const primeiroNome = document.querySelector("#primeiroNome").value;
  const sobrenome = document.querySelector("#Sobrenome").value;
  const cpf = document.querySelector("#Cpf").value;
  const telefone = document.querySelector("#Telefone").value;

  if(primeiroNome == "" || sobrenome == "" || cpf == "" || telefone == ""){
    showAlert("Por-favor, complete todos os campos", "danger");
  }else{
    if(selectedRow == null){
      const list = document.querySelector("#client-list");
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${primeiroNome}</td>
        <td>${sobrenome}</td>
        <td>${cpf}</td>
        <td>${telefone}</td>
        <td>
        <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
        <a href="#" class="btn btn-danger btn-sm delete">Deletar</a>
    `;
    list.appendChild(row);
    selectedRow = null;
    showAlert("Cliente Adicionado", "success")

    }
    else{
      selectedRow.appendChildren[0].textContent = primeiroNome
      selectedRow.appendChildren[1].textContent = sobrenome
      selectedRow.appendChildren[2].textContent = cpf
      selectedRow.appendChildren[3].textContent = telefone
      selectedRow = null;
      showAlert("Infomações do Cliente Editadas", "info");
    }

    clearFields();

  }
});

//Editar informações
document.querySelector("#client-list").addEventListener("click", (e) =>{
  target = e.target;
  if(target.classList.contains("edit")){
      linhaSelecionada = target.parentElement.parentElement;
      document.querySelector("#primeiroNome").value = linhaSelecionada.children[0].textContent;
      document.querySelector("#Sobrenome").value = linhaSelecionada.children[1].textContent;
      document.querySelector("#Cpf").value = linhaSelecionada.children[2].textContent;
      document.querySelector("#Telefone").value = linhaSelecionada.children[3].textContent;
  }
});



//Deletar Cliente
document.querySelector("#client-list").addEventListener("click", (e) =>{target = e.target;
  if(target.classList.contains("delete")){
      target.parentElement.parentElement.remove();
      showAlert("Client Deletado", "danger" );
  }
  
});