const inputElement = document.querySelector("input");
const buttonElement = document.querySelector("button");
const listElement = document.querySelector("#list");
const delElement = document.querySelector("#del");
const diaElement = document.querySelector('#data')
const salvarElement = document.querySelector('#data1')
const zerarData = document.querySelector('#esconde')

let dataGravada 
let dataAnterior  = JSON.parse(localStorage.getItem("data_Anterior")) || []
let arrayUndoTasks = JSON.parse(localStorage.getItem("list_undoTasks")) || [];
let arrayUndoDeleted =JSON.parse(localStorage.getItem("list_undoDeleted")) || [];
let tasks = JSON.parse(localStorage.getItem("list_todos")) || [];
let deletedTasks = JSON.parse(localStorage.getItem("list_deleted")) || [];
let data = new Date
let teste = JSON.parse(localStorage.getItem("list_dias")) || []

mostraData()
renderizar()
buttonElement.onclick = adicionar;
salvarElement.onclick = salvarDia
zerarData.onclick = zerarArrayData

function zerarArrayData(){
  const arrayVazio = []
  localStorage.setItem('list_dias', JSON.stringify(arrayVazio))
  teste = JSON.parse(localStorage.getItem("list_dias"))
  localStorage.setItem('data_Anterior', JSON.stringify(arrayVazio))
  dataAnterior = []
  limpar(3)
}

function salvarDia(){
  let objeto = {
    diaReferente: [data.getDate(),(data.getMonth()) + 1,data.getFullYear()], 
    tarefasNaoCompletas: tasks, 
    tarefasCompletas: deletedTasks
  }
  let arrayNovo = JSON.parse(localStorage.getItem("list_dias")) || []
  dataGravada = arrayNovo.pop(-1)
  arrayNovo.push(dataGravada)

  if(dataGravada === dataAnterior){
    alert("Você já salvou hoje! Vou substituir o anterior!")
    arrayNovo.pop(-1)
  }
  arrayNovo.push(objeto)
  dataAnterior = arrayNovo.pop(-1)
  arrayNovo.push(dataAnterior)
  localStorage.setItem("list_dias", JSON.stringify(arrayNovo))
  //limpar(3)
  teste = JSON.parse(localStorage.getItem("list_dias"))
  zerarUndo()
  localStorage.setItem('data_Anterior', JSON.stringify(dataAnterior))
}

function mostraData(){
  let diaDaSemana = data.getDay()
  let diaMes = data.getDate()
  let mes = data.getMonth()
  let ano = data.getFullYear()
  let dataCompleta = `${diaMes}/${mes+1}/${ano}`
  diaElement.innerHTML += dataCompleta
}

function renderizar() {
  listElement.innerHTML = "";
  delElement.innerHTML = "";
  for (task of tasks) {
    let taskElement = document.createElement("li");

    //let pos = tasks.indexOf(task)
    taskElement.innerHTML = task;
    taskElement.innerHTML +=
      '  <button id = "delete" onclick = "deletar(' +
      tasks.indexOf(task) +
      ')">FEITO</button>';
    listElement.appendChild(taskElement);
  }
  for (deletedTask of deletedTasks) {
    let dell = document.createElement("li");
    dell.innerHTML = deletedTask;
    dell.innerHTML +=
      ' <button id = "rest"  onclick = "restaurar(' +
      deletedTasks.indexOf(deletedTask) +
      ')">REFAZER</button>';
    delElement.appendChild(dell);
  }
}

function adicionar() {
  tasks.push(inputElement.value);
  inputElement.value = "";
  renderizar();
  salvar();
}

function deletar(pos) {
  deletedTasks.push(tasks[pos]);
  tasks.splice(pos, 1);
  renderizar();
  salvar();
}

function restaurar(pos) {
  tasks.push(deletedTasks[pos]);
  deletedTasks.splice(pos, 1);
  renderizar();
  salvar();
}

function limpar(escolha) {
  arrayUndoTasks = tasks;
  arrayUndoDeleted = deletedTasks;
  if (escolha == 1) {
    tasks = [];
  } else if (escolha == 2) {
    deletedTasks = [];
  } else if (escolha == 3) {
    tasks = [];
    deletedTasks = [];
  }
  renderizar();
  salvar();
}

function undo() {
  if (arrayUndoDeleted.length > 0 || arrayUndoTasks.length > 0) {
    tasks = arrayUndoTasks;
    deletedTasks = arrayUndoDeleted;
    renderizar();
    arrayUndoDeleted = [];
    arrayUndoTasks = [];
  } else {
    alert(
      "Você está tentando voltar pra um momento inexistente \nOu o UNDO foi deletado"
      );
    }
}
  
  function zerarUndo() {
    arrayUndoDeleted = [];
    arrayUndoTasks = [];
  salvar();
}

function limparTudo() {
  limpar(3);
  zerarUndo();
}

function salvar(a) {
  localStorage.setItem("list_todos", JSON.stringify(tasks));
  localStorage.setItem("list_deleted", JSON.stringify(deletedTasks));
  localStorage.setItem("list_undoTasks", JSON.stringify(arrayUndoTasks));
  localStorage.setItem("list_undoDeleted", JSON.stringify(arrayUndoDeleted));
}

function alertaTeste(){
  alert('Funcionando')
}