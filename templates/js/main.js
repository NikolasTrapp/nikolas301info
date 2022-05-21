$(function() {

    $(document).on("click", "#botao_enviar", function() {

        nome = $("#nome_equipamento").val();
        local = $("#campolocal").val();
        quantidade = $("#campoquantidade").val();
        observacao = $("#campo_observacao").val();

        var dados = JSON.stringify(
            {
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

    $(document).on("click", "#botao_listar", function() {
        
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

        function listar(pessoas){
            $('#tabelaequipamentos').html('')
            console.log(typeof(pessoas))
            for (var i in pessoas){
                lin = '<tr>' +
                '<td class="lihas">' + pessoas[i].nome + '</td>' +
                '<td class="lihas">' + pessoas[i].local + '</td>' +
                '<td class="lihas">' + pessoas[i].quantidade + '</td>' +
                '<td class="lihas">' + pessoas[i].observacao + '</td>' +
                '</tr>';

                $('#tabelaequipamentos').append(lin);
            }
        };
    });
});