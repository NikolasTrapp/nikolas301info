$.ajax(
    {
        url: "http://localhost:5000/listar_equipamentos",
        type: "GET",
        success: listar,
        
        error: function(erro){
            console.log(erro)
        }
    }
);
function listar(equip){
    $('#tb-equipamentos').html('')
    for (var i in equip){
        lin = '<tr class="linhas_tabela">' +
        '<td>' + equip[i].nome + '</td>' +
        '<td>' + equip[i].local + '</td>' +
        '<td>' + equip[i].quantidade + '</td>' +
        '<td>' + equip[i].observacao + '</td>' +
        '</tr>'
        $('#tb-equipamentos').append(lin);
    }            
};
