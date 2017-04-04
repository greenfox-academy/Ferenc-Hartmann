#DuneII Blitz created by Ferenc Hartmann
import time
import random
from tkinter import*
root = Tk()
root.attributes('-fullscreen', True)
canvas = Canvas(root, width='1366', height='768', bg='black')
canvas.pack()
root = Tk()

def loadscreen():
    load_screen = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\My_projects\DuneII_Blitz\dune1.png")
    item = canvas.create_image(683, 384, image=load_screen)
    canvas.update()

loadscreen()
time.sleep(1)
canvas.update()


picture = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\My_projects\DuneII_Blitz\map1.png")
test_tank_pic = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\My_projects\DuneII_Blitz\testtank.png")
projectile = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\My_projects\DuneII_Blitz\projectile.png")

def bgmap():
    bgpic = canvas.create_image(675, 400, image=picture)
bgmap()
canvas.update()





def move():
    x=0
    item2 = 0
    item3 = 0
    while x<1000:
        canvas.delete(item2, item3)
        item2 = canvas.create_image(x+20, 350, image=test_tank_pic)
        item3 = canvas.create_image(1326 - x, 350, image=test_tank_pic)
        x = x+3
        canvas.move(item2, 3, 0)
        if x % 10 == 0:
            time.sleep(0.3)
        time.sleep(0.03)
        if  195 < (1346 - x) - (x + 20) < 200:
            item4 = 0
            health = 10
            while health > 0:
                health-=2
                canvas.delete(item4)
                item4 = canvas.create_image((x+20), 350, image=projectile)
                canvas.move(item4, 30, 0)
                time.sleep(0.3)
                canvas.update()

        canvas.update()
move()



root.mainloop()