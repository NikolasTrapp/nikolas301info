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
        '<td class="'+cont+'">' + equip[i].nome + '</td>' +
        '<td class="'+cont+'">' + equip[i].local + '</td>' +
        '<td class="'+cont+'">' + equip[i].quantidade + '</td>' +
        '<td class="'+cont+'">' + equip[i].observacao + '</td>' +
        '</tr>';
        btn_editar = '<button type="submit" id="bt-editar'+cont+'">Editar</button>';
        btn_remover = '<button type="submit" id="bt-remover'+cont+'">Remover</button>';
        $('#tb-equipamentos').append(lin);
        cont += 1;
    }
}
