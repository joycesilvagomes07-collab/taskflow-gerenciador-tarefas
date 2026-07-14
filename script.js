let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];



function adicionarTarefa() {

    const campoTarefa = document.getElementById("tarefa");
    const campoPrioridade = document.getElementById("prioridade");


    const texto = campoTarefa.value.trim();
    const prioridade = campoPrioridade.value;


    if (texto === "") {

        alert("Digite uma tarefa!");

        return;

    }



    const novaTarefa = {

        id: Date.now(),

        nome: texto,

        prioridade: prioridade,

        concluida: false,

        data: new Date().toLocaleDateString("pt-BR")

    };



    tarefas.push(novaTarefa);



    salvarTarefas();

    mostrarTarefas();



    campoTarefa.value = "";

}





function mostrarTarefas() {


    const lista = document.getElementById("listaTarefas");


    lista.innerHTML = "";



    tarefas.forEach((tarefa) => {



        const item = document.createElement("li");



        if (tarefa.concluida) {

            item.classList.add("concluida");

        }



        let classePrioridade = "";



        if (tarefa.prioridade === "Alta") {

            classePrioridade = "alta";

        } 
        
        else if (tarefa.prioridade === "Média") {

            classePrioridade = "media";

        } 
        
        else {

            classePrioridade = "baixa";

        }




        item.innerHTML = `


        <div class="informacoes">


            <span class="nome-tarefa">

                ${tarefa.nome}

            </span>


            <span class="prioridade ${classePrioridade}">

                ${tarefa.prioridade}

            </span>


            <span class="data">

                Criada em: ${tarefa.data}

            </span>


        </div>



        <div class="acoes">


            <button 
            class="concluir"
            onclick="concluirTarefa(${tarefa.id})">

                ✓

            </button>



            <button 
            class="excluir"
            onclick="excluirTarefa(${tarefa.id})">

                🗑

            </button>


        </div>


        `;



        lista.appendChild(item);



    });



    atualizarContador();


}





function concluirTarefa(id) {


    tarefas = tarefas.map((tarefa)=>{


        if(tarefa.id === id){

            tarefa.concluida = !tarefa.concluida;

        }


        return tarefa;


    });



    salvarTarefas();

    mostrarTarefas();


}





function excluirTarefa(id){


    tarefas = tarefas.filter((tarefa)=>{


        return tarefa.id !== id;


    });



    salvarTarefas();

    mostrarTarefas();


}





function atualizarContador(){


    const contador = document.getElementById("contador");


    const total = tarefas.length;


    if(total === 1){

        contador.innerText = "1 tarefa";

    } 
    
    else {

        contador.innerText = `${total} tarefas`;

    }


}





function salvarTarefas(){


    localStorage.setItem(

        "tarefas",

        JSON.stringify(tarefas)

    );


}





mostrarTarefas();