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

        $.ajax(
            {
                url: "http://localhost:5000/add",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: dados,
                success: incluir_dados,
                error: retornar_erro
            }
        );

        function incluir_dados (retorno) {
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

    $(document).on("click", "#botaologin", function() {
        
        usuario = $("#user").val();
        senha = $("#senha").val();

        var dados_do_login = JSON.stringify(
            {
                usuario:usuario,
                senha:senha
            }
        )

        $.ajax(
            {
                url: "http://localhost:5000/logar",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: dados_do_login,
                success: incluir_login,
                error: retornar_erro
            }
        );

        function incluir_login (retorno) {
            if (retorno.resultado == "ok") {
                alert("Login realizado com sucesso!");
                return '<a href="localhost:/" target="_blank">abrir</a>'
            } else {
                alert("erro no login: "+retorno.resultado + ":" + retorno.detalhes);
            }            
        }

        function retornar_erro (retorno) {
            alert("erro no back: "+retorno.resultado + ":" + retorno.detalhes);
        }
    
    });

    $(document).on("click", "#botaocadastro", function() {
        
        usuario = $("#user_cadastro").val();
        senha = $("#senha_cadastro").val();

        var dados_do_login = JSON.stringify(
            {
                usuario:usuario,
                senha:senha
            }
        )

        $.ajax(
            {
                url: "http://localhost:5000/cadastrar",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: dados_do_login,
                success: incluir_login,
                error: retornar_erro
            }
        );

        function incluir_login (retorno) {
            if (retorno.resultado == "ok") {
                alert("Cadastro realizado com sucesso!");
            } else {
                alert("erro no cadastro: "+retorno.resultado + ":" + retorno.detalhes);
            }            
        }

        function retornar_erro (retorno) {
            alert("erro no back: "+retorno.resultado + ":" + retorno.detalhes);
        }
    
    });
});