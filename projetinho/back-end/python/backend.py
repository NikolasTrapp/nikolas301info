from config import *
from modelo import *


@app.route("/listar")
def listar():
    dados = db.session.query(Estoque).all()
    dados_em_json = [x.json() for x in dados]
    resposta = jsonify(dados_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/incluir_dados", methods=['post'])
def incluir_dados():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    print(**dados)
    try:
        nova = Estoque(**dados)
        db.session.add(nova)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)