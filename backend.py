from config import *
from modelo import *
lista = []

@app.route("/")
def rota_padrao():
    return render_template("html/index.html")


@app.route("/login")
def login():
    return render_template("html/login.html")


@app.route("/logar", methods = ["POST"])
def realizar_login():
    resposta = jsonify({"resultado": "ok", "detalhes": "login aprovado"})
    dados = request.get_json()
    for i in db.session.execute("select * from cadastro"):
        if dados["usuario"] != i[1] or dados["senha"] != i[2]:
            resposta = jsonify({"resultado": "erro", "detalhes": "senha ou usuário inválidos!"})
            return resposta
    return resposta


@app.route("/cadastrar", methods=["POST"])
def cadastrar():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        for i in db.session.execute("select usuario from cadastro"):
        
            if dados["usuario"] == i[0]:
                resposta = jsonify({"resultado": "erro", "detalhes": "Usuario já consta no bd"})
                return resposta
        cad = Cadastro(usuario = dados["usuario"], senha = dados["senha"])
        db.session.add(cad)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
        print(e)
    return resposta


@app.route("/listar")
def listar():
    dados = db.session.query(Estoque).all()
    dados_em_json = [x.json() for x in dados]
    resposta = jsonify(dados_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/add", methods=["POST"])
def incluir_dados():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        nova = Estoque(
                nome=dados["nome"],
                status=dados["situacao"],
                estado=dados["estado"],
                local=dados["local"],
                quantidade=dados["quantidade"],
                reserva=dados["reserva"],
            )
        db.session.add(nova)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/teste", methods=["GET", "POST"])
def teste():
    if request.method == "POST":
        try:
            request.get_json()
        except Exception as e:
            print(e)
        return "você deu post e funcionou"
    else:
        return "Você deu get e funcionou"


# host = 0.0.0.0
app.run(debug=True)