from pkg_resources import require
from config import *
from modelo import *

@app.route("/")
def rota_padrao():
    return '/listar'

@app.route("/listar")
def listar():
    dados = db.session.query(Estoque).all()
    dados_em_json = [x.json() for x in dados]
    resposta = jsonify(dados_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/add", methods=['post'])
def incluir_dados():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()    
    try:
        print('1')
        print(dados)
        nova = Estoque(**dados)
        print('2')
        db.session.add(nova)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/teste", methods = ['GET', 'POST'])
def teste():
    if request.method == 'POST':
        try:
            dado = request.get_json()
            print(dado)
        except Exception as e:
            print(e)
        return 'você deu post e funcionou'
    else:
        return 'Você deu get e funcionou'


app.run(host = '0.0.0.0',debug=True)