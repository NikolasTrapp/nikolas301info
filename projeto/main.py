import pygame as pg
from configs import *

class Jogo:

    def __init__(self):
        pg.init()
        self.background = pg.display.set_mode(resolucao)
        self.sair = True
        self.jogando = True

    def sprites(self):
        pass

    def main(self): 
        while self.jogando:
            self.events()
            self.updates()
            self.personagem()
        self.sair = False

    def events(self):
        for evento in pg.event.get():
            if evento.type == pg.QUIT:
                self.sair = False
                self.jogando = False

    def updates(self):
        pass

    def personagem(self):
        self.background.fill((255, 255, 255))
        pg.draw.rect(self.background, (255, 0, 0), (x, y, width, height))

    def moviment(self):
        keys = pg.key.get_pressed() 
        
        if keys[pg.K_LEFT] and x>0:           
            x -= vel           
        
        if keys[pg.K_RIGHT] and x<1000-width:            
            x += vel           
        
        if keys[pg.K_UP] and y>0: 
            y -= vel 
                   
        if keys[pg.K_DOWN] and y<1000-height: 
            y += vel

jogo = Jogo()

while jogo.sair == True:
    jogo.main()