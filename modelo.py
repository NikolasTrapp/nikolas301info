from config import *
'''{"estado": "Funcionando","local": "Armario A01","nome": "Ferro de solda","quantidade": 15,"reserva": "12/03/2022","status": "Disponivel"}'''
'''{"nome":"a","status":"b", "estado":"c", "local":"d", "quantidade":10, "reserva":"e"}'''
class Estoque(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    status = db.Column(db.String(254))
    estado = db.Column(db.String(254))
    local = db.Column(db.String(254))
    quantidade = db.Column(db.Integer)
    reserva = db.Column(db.String(254))

    def __str__(self) -> str:
        return f"Nome: {self.nome} | Status: {self.status} | Estado: {self.estado} | Local: {self.local} | Quantidade: {self.quantidade} | Reserva: {self.reserva}"

    def json(self):
        return {
            "nome":self.nome,
            "status":self.status,
            "estado":self.estado,
            "local":self.local,
            "quantidade":self.quantidade,
            "reserva":self.reserva
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

    #remover dados cadastro
    db.session.execute("delete from cadastro")
    db.session.commit()

    #remover dados estoque
    #db.session.execute("delete from estoque")
    #db.session.commit()
