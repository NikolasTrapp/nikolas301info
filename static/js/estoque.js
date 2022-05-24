$.ajax(
    {
        url: "http://localhost:5000/listar_equipamentos",
        type: "GET",
        success: listar,
        error: function(erro){
            console.log(erro);
        }
    }
);
function listar(equip){
    var cont = 1;
    $('#tb-equipamentos').html('');
    for (var i in equip){
        lin = '<tr class="linhas_tabela">' +
        '<td id="td-nome-'+cont+'">' + equip[i].nome + '</td>' +
        '<td id="td-local-'+cont+'">' + equip[i].local + '</td>' +
        '<td id="td-qntd-'+cont+'">' + equip[i].quantidade + '</td>' +
        '<td id="td-obs-'+cont+'">' + equip[i].observacao + '</td>' +
        '<td><button class="botao-tabela" type="submit" id="'+cont+'" onclick="botao_editar(this.id)">Editar</button></td>'+
        '<td><button class="botao-tabela" type="submit" id="'+cont+'" onclick="botao_remover(this.id)">Remover</button></td>'+
        '</tr>';
        $('#tb-equipamentos').append(lin);
        cont += 1;
    }
    lin2 = '<td class="linhas_tabela>"' +
        '<td id="tr-input-nome"><input class="input-enviar" type="text" id="input-nome">'+
        '<td id="tr-input-local"><input class="input-enviar" type="text" id="input-local">'+
        '<td id="tr-input-quantidade"><input class="input-enviar" type="text" id="input-quantidade">'+
        '<td id="tr-input-observacao"><input class="input-enviar" type="text" id="input-observacao">'+
        '<td><button class="botao-tabela" type="submit" id="bt-enviar">Enviar</button></td>'+
        '<td></td>'+
        '</tr>';
    $('#tb-equipamentos').append(lin2);
}

$(document).on("click", "#bt-enviar", function() {

    nome = $("#input-nome").val();
    local = $("#input-local").val();
    quantidade = $("#input-quantidade").val();
    observacao = $("#input-observacao").val();

    console.log(nome, local, quantidade, observacao);

    var dados = JSON.stringify({
        nome:nome,
        local:local,
        quantidade:quantidade,
        observacao:observacao
    });
        
    $.ajax(
        {
            url: "http://localhost:5000/adicionar_equipamento",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: dados,
            success: incluir,
            error: retornar_erro
        }
    );

    function incluir (retorno) {
        if (retorno.resultado == "ok") {
            alert("Agendamento realizado com sucesso!");
        } else {
            alert("erro na inclusão: "+retorno.resultado + ":" + retorno.detalhes);
        }            
    }

    function retornar_erro (retorno) {
        alert("erro no back: "+retorno.resultado + ":" + retorno.detalhes);
    }
});

function botao_editar(){
    alert("oi");
}

function botao_remover(bt_id){
    console.log(bt_id);
    nome = document.querySelector("#td-nome-"+bt_id).innerHTML;

    var dado = JSON.stringify({
        nome:nome
    });

    $.ajax(
        {
            url: "http://localhost:5000/remover_equipamento",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: dado,
            success: incluir,
            error: retornar_erro
        }
    );
    
    function incluir (retorno) {
        if (retorno.resultado == "ok") {
            alert("Agendamento realizado com sucesso!");
        } else {
            alert("erro na inclusão: "+retorno.resultado + ":" + retorno.detalhes);
        }            
    }

    function retornar_erro (retorno) {
        alert("erro no back: "+retorno.resultado + ":" + retorno.detalhes);
    }

}

$(document).on("click", "#botao_enviar", function() {

    nome = $("#campo_pesquisa").val();
    //console.log(nome)

    $.ajax(
        {
            url: "http://localhost:5000/buscar_equipamentos",
            type: "GET",
            success: buscar,
            error: function(erro){
                console.log(erro);
            }
        }
    );

    function buscar(dados){
        for (var i in dados){
            if (nome == dados[i].nome){
                $('#tb-equipamentos').html('');
                lin = '<tr class="linhas_tabela">' +
                    '<td id="td-nome-1">' + dados[i].nome + '</td>' +
                    '<td id="td-local-1">' + dados[i].local + '</td>' +
                    '<td id="td-qntd-1">' + dados[i].quantidade + '</td>' +
                    '<td id="td-obs-1">' + dados[i].observacao + '</td>' +
                    '<td><button class="botao-tabela" type="submit" id="1" onclick="botao_editar(this.id)">Editar</button></td>'+
                    '<td><button class="botao-tabela" type="submit" id="1" onclick="botao_remover(this.id)">Remover</button></td>'+
                    '</tr>';
                $('#tb-equipamentos').append(lin);
                break
            }
        }
    }
});