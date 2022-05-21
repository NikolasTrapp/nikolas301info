from statistics import quantiles
from flask_sqlalchemy import Model
from config import *


class Estoque(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254), unique = True, nullable = False)
    local = db.Column(db.String(254), nullable = False)
    quantidade = db.Column(db.Integer, nullable = False)
    observacao = db.Column(db.String(254))

    def __str__(self) -> str:
        return f"Nome: {self.nome} | Local: {self.local} | Quantidade: {self.quantidade} | Obs: {self.observacao}"

    def json(self):
        return {
            "nome":self.nome,
            "local":self.local,
            "quantidade":self.quantidade,
            "observacao":self.observacao
        }


class Cadastro(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    usuario = db.Column(db.String(30))
    senha = db.Column(db.String(30))

    def __str__(self) -> str:
        return f"User: {self.usuario}, Password: {self.senha}"

    def json(self):
        return {
            "usuario":self.usuario,
            "senha":self.senha
        }


if __name__ == "__main__":

    db.create_all()

    #a = Estoque(nome = "Martelo", local = "b10", quantidade = "13", observacao="Observacao")
    #db.session.add(a)

    s = Cadastro(usuario = "Maria", senha = "12323")
    db.session.add(s)

    #apagar tabelas
    #db.session.execute("drop table cadastro")
    #db.session.execute("drop table estoque")
    db.session.commit()

    #remover dados cadastro
    #db.session.execute("delete from cadastro")
    #db.session.commit()

    #remover dados estoque
    #db.session.execute("delete from estoque")
    #db.session.commit()
