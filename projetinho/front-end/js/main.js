$(function() {
    
    $(document).on("click", "#btnincluir", function() {

        nome = $("#camponome").val();
        situacao = $("#campostatus").val();
        estado = $("#campoestado").val();
        local = $("#campolocal").val();
        quantidade = $("#campoquantidade").val();
        reserva = $("#camporeserva").val();

        var dados = JSON.stringify(
            {   
                nome:nome,
                situacao:situacao,
                estado:estado,
                local:local,
                quantidade:quantidade,
                reserva:reserva
            });

        console.log(dados)

        $.ajax({
            url: 'http://localhost:5000/incluir_dados',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados, 
            success: incluir, 
            error: retornar_erro
        });
        function incluir (retorno) {
            if (retorno.resultado == "ok") {
                alert("Pessoa incluída com sucesso!");
            } else {
                alert("ERRO na inclusão: "+retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function retornar_erro (retorno) {
            alert("ERRO ao contactar back-end: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });
});