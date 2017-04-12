from tkinter import*
import random
root = Tk()
root.attributes('-fullscreen', True)
canvas = Canvas(root, width='1214', height='718', bg='white')

class Tile():
    def __init__(self):
        self.floor = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\week5\day2\images\floor.png")
        self.wall = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\week5\day2\images\wall.png")
        self.hero_left = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\week5\day2\images\hero-left.png")
        self.hero_right = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\week5\day2\images\hero-right.png")
        self.hero_up = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\week5\day2\images\hero-up.png")
        self.hero_down = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\week5\day2\images\hero-down.png")
        self.skeleton = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\week5\day2\images\skeleton.png")
        self.boss = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\week5\day2\images\boss.png")
        self.sidepic = PhotoImage(file=r"C:\Greenfox\Ferenc-Hartmann\week5\day2\images\rpg.png")
        canvas.bind("<KeyPress>", self.main_logic)
        self.char_x = 0
        self.char_y = 0
        self.move_counter = 0
        self.monster_x = 0
        self.monster_y = 0

        self.hero_max_hp = 20 + 3 * random.randrange(1,6)
        self.hero_cur_hp = self.hero_max_hp
        self.hero_dp = 2 * random.randrange(1,6)
        self.hero_sp = 5 + random.randrange(1,6)
        self.hero_level = 1
        self.map_level = 1
        self.hud()
    def map_draw(self):
        for x in range(10):
            for y in range(10):
                self.floors = canvas.create_image(36 + 72 * x, 36 + 72 * y, image=self.floor)

        self.wall_tile = [
                        [3, 0], [5, 0],
                        [3, 1], [5, 1], [7, 1], [8, 1],
                        [1, 2], [2, 2], [3, 2], [5, 2], [7, 2], [8, 2],
                        [5, 3],
                        [0, 4], [1, 4], [2, 4], [3, 4], [5, 4], [6, 4], [7, 4], [8, 4],
                        [1, 5], [3, 5], [8, 5],
                        [1, 6], [3, 6], [5, 6], [6, 6], [8, 6],
                        [5, 7], [6, 7], [8, 7],
                        [1, 8], [2, 8], [3, 8], [8, 8],
                        [3, 9], [5, 9], [6, 9],
                        ]

        for i in range(len(self.wall_tile)):
            self.walls = canvas.create_image(36 + 72 * self.wall_tile[i][0], 36 + 72 * self.wall_tile[i][1], image=self.wall)

        self.hero = canvas.create_image(36, 36, image=self.hero_down)
        self.skeleton1 = canvas.create_image(36 + 72 * 4, 36, image=self.skeleton)
        self.skeleton2 = canvas.create_image(36 + 72 * 9, 36 + 72 * 4, image=self.skeleton)
        self.skeleton3 = canvas.create_image(36 + 72 * 0, 36 + 72 * 5, image=self.skeleton)
        self.skeleton4 = canvas.create_image(36 + 72 * 7, 36 + 72 * 8, image=self.skeleton)
        self.boss1 = canvas.create_image(36 + 72 * 9, 36 + 72 * 0, image=self.boss)
        self.picture = canvas.create_image(720, 500, image=self.sidepic, anchor=W)

    def main_logic(self, e):
        self.e = e
        self.case = 0
        canvas.delete(self.hero)
        for i in range(len(self.wall_tile)):
            if self.e.keycode == 38 and ((self.char_x) // 72) == self.wall_tile[i][0] and ((self.char_y - 72) // 72) == self.wall_tile[i][1] or ((self.char_y - 72) // 72) == -1 and self.e.keycode == 38:
                self.case = 1
            if self.e.keycode == 40 and ((self.char_x) // 72) == self.wall_tile[i][0] and ((self.char_y + 72) // 72) == self.wall_tile[i][1] or ((self.char_y + 72) // 72) == 10 and self.e.keycode == 40:
                self.case = 2
            if self.e.keycode == 37 and ((self.char_x - 72) // 72) == self.wall_tile[i][0] and ((self.char_y) // 72) == self.wall_tile[i][1] or ((self.char_x - 72) // 72) == -1 and self.e.keycode == 37:
                self.case = 3
            if self.e.keycode == 39 and ((self.char_x + 72) // 72) == self.wall_tile[i][0] and ((self.char_y) // 72) == self.wall_tile[i][1] or ((self.char_x + 72) // 72) == 10 and self.e.keycode == 39:
                self.case = 4

        if self.e.keycode == 38:
            if self.case == 0:
                self.char_y -= 72
                self.move_counter += 1
                self.npc_move()
            self.hero = canvas.create_image(36 + self.char_x, 36 + self.char_y, image=self.hero_up)
        elif self.e.keycode == 40:
            if self.case == 0:
                self.char_y += 72
                self.move_counter += 1
                self.npc_move()
            self.hero = canvas.create_image(36 + self.char_x, 36 + self.char_y, image=self.hero_down)
        elif self.e.keycode == 37:
            if self.case == 0:
                self.char_x -= 72
                self.move_counter += 1
                self.npc_move()
            self.hero = canvas.create_image(36 + self.char_x, 36 + self.char_y, image=self.hero_left)
        elif self.e.keycode == 39:
            if self.case == 0:
                self.char_x += 72
                self.move_counter += 1
                self.npc_move()
            self.hero = canvas.create_image(36 + self.char_x, 36 + self.char_y, image=self.hero_right)

        if self.e.keycode == 38

        self.battle_coordinator()

    def npc_move(self):
        if self.move_counter % 2 == 0 and self.move_counter != 0:
            canvas.delete(self.skeleton1, self.skeleton2, self.skeleton3, self.skeleton4, self.boss1)
            if self.move_counter % 12 == 2 or self.move_counter % 12 == 4 or self.move_counter % 12 == 6:
                self.monster_x += 1
                self.monster_y += 1
            if self.move_counter % 12 == 8 or self.move_counter % 12 == 10 or self.move_counter % 12 == 0:
                self.monster_x -= 1
                self.monster_y -= 1

            self.skeleton1 = canvas.create_image(324, 36 + 72 * (0 + self.monster_y), image=self.skeleton)
            self.skeleton2 = canvas.create_image(684, 36 + 72 * (4 + self.monster_y), image=self.skeleton)
            self.skeleton3 = canvas.create_image(36, 36 + 72 * (5 + self.monster_y), image=self.skeleton)
            self.skeleton4 = canvas.create_image(36 + 72 * (7 - self.monster_x), 612, image=self.skeleton)
            self.boss1 = canvas.create_image(36 + 72 * (9 - self.monster_x), 36, image=self.boss)

    def battle_coordinator(self):
        if (36 + self.char_x) == 324 and (36 + self.char_y) == (36 + 72 * (0 + self.monster_y)):
            self.monster_id = 0
            self.battle_calculation()
        if (36 + self.char_x) == 684 and (36 + self.char_y) == (36 + 72 * (4 + self.monster_y)):
            self.monster_id = 0
            self.battle_calculation()
        if (36 + self.char_x) == 36 and (36 + self.char_y) == (36 + 72 * (5 + self.monster_y)):
            self.monster_id = 0
            self.battle_calculation()
        if (36 + self.char_x) == (36 + 72 * (7 - self.monster_x)) and (36 + self.char_y) == 612:
            self.monster_id = 0
            self.battle_calculation()
        if (36 + self.char_x) == (36 + 72 * (9 - self.monster_x)) and (36 + self.char_y) == 36:
            self.monster_id = 1
            self.battle_calculation()

    def battle_calculation(self):

        self.monster_level_calculator = random.random()

        if self.monster_level_calculator < 0.5:
            self.monster_level = self.map_level
        if 0.9 > self.monster_level_calculator > 0.5:
            self.monster_level = self.map_level + 1
        if self.monster_level_calculator > 0.9:
            self.monster_level = self.map_level + 2

        if self.monster_id == 0:
            self.monster_max_hp = 2 * self.monster_level * random.randrange(1,6)
            self.monster_cur_hp = self.monster_max_hp
            self.monster_dp = self.monster_level / 2 * random.randrange(1,6)
            self.monster_sp = self.monster_level * random.randrange(1,6)

        if self.monster_id == 1:
            self.monster_max_hp = 2 * self.monster_level * random.randrange(1,6) + random.randrange(1,6)
            self.monster_cur_hp = self.monster_max_hp
            self.monster_dp = self.monster_level / 2 * random.randrange(1,6) + 1 / 2 * random.randrange(1,6)
            self.monster_sp = self.monster_level * random.randrange(1,6) + self.monster_level



    def hud(self):
        text_hero = ("Hero (level " + str(self.hero_level) + ")    HP: " + str(self.hero_cur_hp) + r"/" + str(self.hero_max_hp) + r"    |    DP: " + str(self.hero_dp) + r"    |    SP: " + str(self.hero_sp))
        header = Label(canvas, font="Harrington 16 bold", text="Your Hero's stat", fg='black', bg='white')
        hero_text = Label(canvas, font="Harrington 12 bold", text=text_hero, fg='black', bg='white')

        header.pack()
        hero_text.pack()
        canvas.create_window(960, 20, window=header)
        canvas.create_window(960, 70, window=hero_text)


canvas.pack()
canvas.focus_set()

alma = Tile()
alma.map_draw()


root.mainloop()