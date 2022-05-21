class Opa:
    def __init__(self, hd_livre):
        self.hd_livre = hd_livre
    def __str__(self) -> str:
        return f"{self.hd_livre}"

cachorrinho = Opa(1000)
print(cachorrinho)