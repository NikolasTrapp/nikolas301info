nome_antigo = ""
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
        lin = '<tr class="linhas_tabela" id="tr-linha-'+cont+'">' +
        '<td id="td-nome-'+cont+'">' + equip[i].nome + '</td>' +
        '<td id="td-local-'+cont+'">' + equip[i].local + '</td>' +
        '<td id="td-qntd-'+cont+'">' + equip[i].quantidade + '</td>' +
        '<td id="td-obs-'+cont+'">' + equip[i].observacao + '</td>' +
        '<td><button class="botao-tabela" type="submit" id="'+cont+'" onclick="botao_editar(this.id)">Editar</button></td>'+
        '<td id="td-rem-'+cont+'"><button class="botao-tabela" type="submit" id="'+cont+'" onclick="botao_remover(this.id)">Remover</button></td>'+
        '</tr>';
        $('#tb-equipamentos').append(lin);
        cont += 1;
    }
    lin2 = '<td class="linhas_tabela>"' +
        '<td id="tr-input-nome"><input class="input-enviar" type="text" id="input-nome"></td>'+
        '<td id="tr-input-local"><input class="input-enviar" type="text" id="input-local"></td>'+
        '<td id="tr-input-quantidade"><input class="input-enviar" type="text" id="input-quantidade"></td>'+
        '<td id="tr-input-observacao"><input class="input-enviar" type="text" id="input-observacao"></td>'+
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
            alert('Equipamento "'+nome+'" inserido!');
            location.reload();
        } else {
            alert("erro na inclusão: "+retorno.resultado + ":" + retorno.detalhes);
        }            
    }

    function retornar_erro (retorno) {
        alert("erro no back: "+retorno.resultado + ":" + retorno.detalhes);
    }
});

function botao_editar(bt_id){
    nome_antigo = document.querySelector("#td-nome-"+bt_id).innerHTML;
    local_antigo = document.querySelector("#td-local-"+bt_id).innerHTML;
    quantidade_antiga = document.querySelector("#td-qntd-"+bt_id).innerHTML;
    observacao_antiga = document.querySelector("#td-obs-"+bt_id).innerHTML;

    console.log(local_antigo)

    document.getElementById("td-nome-"+bt_id).innerHTML = '<td><input class="input-enviar" type="text" id="input-editar-nome" value="'+nome_antigo+'"></td>';
    document.getElementById("td-local-"+bt_id).innerHTML = '<td><input class="input-enviar" type="text" id="input-editar-local" value="'+local_antigo+'"></td>';
    document.getElementById("td-qntd-"+bt_id).innerHTML = '<td><input class="input-enviar" type="text" id="input-editar-qntd" value="'+quantidade_antiga+'"></td>';
    document.getElementById("td-obs-"+bt_id).innerHTML = '<td><input class="input-enviar" type="text" id="input-editar-obs" value="'+observacao_antiga+'"></td>';
    document.getElementById("td-rem-"+bt_id).innerHTML = '<td><button class="botao-tabela" type="submit" id="bt-update-enviar">Enviar</button></td>'
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
            alert("Equipamento removido!");
            location.reload();
        } 
        else {
            alert("erro na inclusão: "+retorno.resultado + ":" + retorno.detalhes);
        }            
    }

    function retornar_erro (retorno) {
        alert("erro no back: "+retorno.resultado + ":" + retorno.detalhes);
    }

}

$(document).on("click", "#botao_enviar", function() {

    nome = $("#campo_pesquisa").val();

    $.ajax(
        {
            url: "http://localhost:5000/buscar_equipamento",
            type: "GET",
            success: buscar,
            error: function(erro){
                console.log(erro);
            }
        }
    );

    function buscar(dados){
        var cont = 0;
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
                lin2 = '<td class="linhas_tabela>"' +
                    '<td id="tr-input-nome"><input class="input-enviar" type="text" id="input-nome">'+
                    '<td id="tr-input-local"><input class="input-enviar" type="text" id="input-local">'+
                    '<td id="tr-input-quantidade"><input class="input-enviar" type="text" id="input-quantidade">'+
                    '<td id="tr-input-observacao"><input class="input-enviar" type="text" id="input-observacao">'+
                    '<td><button class="botao-tabela" type="submit" id="bt-enviar">Enviar</button></td>'+
                    '<td></td>'+
                    '</tr>';
                $('#tb-equipamentos').append(lin);
                $('#tb-equipamentos').append(lin2);
                cont += 1;
                break
            }
        }
        if (cont == 0){
            alert('O equipamento: "'+nome+'" não foi encontrado!')
        }
    }
});

$(document).on("click", "#bt-update-enviar", function() {
    nome = $("#input-editar-nome").val();
    local = $("#input-editar-local").val();
    quantidade = $("#input-editar-qntd").val();
    observacao = $("#input-editar-obs").val();

    console.log(nome, local, quantidade, observacao);

    var dados = JSON.stringify({
        nome:nome,
        local:local,
        quantidade:quantidade,
        observacao:observacao,
        nome_antigo:nome_antigo
    });
        
    $.ajax(
        {
            url: "http://localhost:5000/atualizar_equipamento",
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
            alert('Equipamento "'+nome+'" atualizado!');
            location.reload();
        } else {
            alert("erro na inclusão: "+retorno.resultado + ":" + retorno.detalhes);
        }            
    }

    function retornar_erro (retorno) {
        alert("erro no back: "+retorno.resultado + ":" + retorno.detalhes);
    }
});