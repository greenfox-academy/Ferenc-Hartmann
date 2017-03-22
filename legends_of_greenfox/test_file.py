#Legends of Greenfox: Made by Ferenc Hartmann from Greenfox Academy

import random
health = 0
damage = 0
dex = 0
dragon_health = 10
dragon_damage = 1
dragon_dex = 10
a1 = 0
a2 = 0
a3 = 0
anykey = str(0)

def black_screen():
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
black_screen()
def main_screen():
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print(r"""                                    ____                                     ___               _____    ________                             _____              """)
    print(r"""                                   |    |    ____   ____   ____   ____    __| _/______   _____/ ____\  /  _____/______   ____   ____   _____/ ____\_______  ___ """)
    print(r"""                                   |    |  _/ __ \ / ___\_/ __ \ /    \  / __ |/  ___/  /  _ \   __\  /   \  __\_  __ \_/ __ \_/ __ \ /    \   __\/  _ \  \/  / """)
    print(r"""                                   |    |__\  ___// /_/  >  ___/|   |  \/ /_/ |\___ \  (  <_> )  |    \    \_\  \  | \/\  ___/\  ___/|   |  \  | (  <_> >    <  """)
    print(r"""                                   |_______ \___  >___  / \___  >___|  /\____ /____  >  \____/|__|     \______  /__|    \___  >\___  >___|  /__|  \____/__/\_ \ """)
    print(r"""                                           \/   \/_____/      \/     \/      \/    \/                         \/            \/     \/     \/                 \/ """)
    print("_______________________________________________________________________________________________________________________________________________________________________________________________")
    print("")
    print("")
    print("")
    print(r"""                                                                                            .~~  """)
    print(r"""                                                                                            |   """)
    print(r"""                                                                                            |  """)
    print(r"""                                                                                           /L\ """)
    print(r"""                                                                                     . ~~ /LLL\       """)
    print(r"""                                                                                     |   /LLLLL\           . """)
    print(r"""                                                                                     |  /LLLLLLL\          |~~ """)
    print(r"""                                                                                    /L\/LLLLLLLLL\         | """)
    print(r"""                                                                                  /LLLLL\.=.=.=.=|        /L\ """)
    print(r"""                                                                                   |.=.| .-._.-. |       /LLL\    """)
    print(r"""                                                                                   |  [| | | | | |      /LLLLL\ """)
    print(r"""                                                                                   |   | | | | | | _   _|] _=.| """)
    print(r"""                                                                                   |  [| |_|_|_| || |_| |_| | | """)
    print(r"""                                                                                   |  |~~        |=.=.=.=.=.| |       . """)
    print(r"""                                                                                   |  |          |    |~~   | |       |~~ """)
    print(r"""                                                                                   | /L\ .-._.-. |    |     | |       |  """)
    print(r"""                                                                                   |/LLL\| | | | |   /L\    |/       /L\ """)
    print(r"""                                                                                   |].=.|_ | _ | _  /LLL\   |       /LLL\ """)
    print(r"""                                                                             ,- _--|]] [| |_| |_| |/LLLLL\  |      /LLLLL\ """)
    print(r"""                                                                            (|_| |_|]---|.=.=.=.=./LLLLLLL\ _   _ /LLLLLLL\ """)
    print(r"""                                                                             \.=.=.=|\_/           |.=.=.|_| |_| |_|.=.=.| """)
    print(r"""                                                                             /|[]   |              | []  |.=.=.=.=.|  [] | """)
    print(r"""                                                                             ||     |    .-._.-.   |     | .-----. |     | """)
    print(r"""                                                                             \|     |    | | | |   |     |/|||||||\|     | """)
    print(r"""                                                                              |  [] |    | | | |   |     ]|||||||||[     | """)
    print(r"""                                                                              |  __ |    |_|_|_|   |  [] ]|||| ||||[ []  | """)
    print(r"""                                                                              | /<_\_    ____      |     ]|||| ||||[     | """)
    print(r"""                                                                              |/ |  "\__/  ) \.-.  |     ]|?=||||||[     |_ """)
    print(r"""                                                                             /"  )\_ >  ) >\__ ")`\_     ]|||||||||[ ,_./`.\ """)
    print(r"""                                                                          __/ _/ _ ,| \  __  "|_  ) |_   ]|||||||||[/("_ -">\_ """)
    print(r"""                                                                         /> )"__/ \___  "  \__  _) \_ -\_.==___===/.<  \__(\_ \ """)
    print(r"""                                                                        /  __/ )___   > \_ ) \  \_ "  ).==_____==( <."/ (_<  \)| """)
    print(r"""                                                                       lc_/>.=__.._\"__\_  >_)___\-_/.=________=/___/.__>__"(__/     """)
    print("")
    print("")
    print("")
    print("_______________________________________________________________________________________________________________________________________________________________________________________________")
    print("")
    print("")
    print("                                        Welcome to Legends of Greenfox! This is a text based role playing game. Please choose one of the following actions:")
    print("")
    print("")
    print(r"""                                                                                          START A NEW GAME [S]""")
    print(r"""                                                                                           VIEW HELP MENU [H]""")
    print(r"""                                                                                            QUIT GAME [Q]""")
main_screen()
#Interactive program starts here
while True:
    #Main Menu
    a1 = input("")
    if str(a1) == "s" or str(a1) == "S":
        print("character choosing screen")
        while True:
            a2 = input("a2")
            #Choosing archer
            if str(a2) == "a" or str(a2) == "A":
                print("archer chosen screen")
                health = 10
                damage = 2
                dex = 12
                anykey = str(input("press [Enter]"))
                print("archer prologue screen")
                while True:
                    #Archer story starts here
                    a3 = input("a3")
                    if str(a3) == "a" or str(a3) == "A":
                        print("archer pre-battle screen")
                        anykey = str(input("press [Enter]"))
                        #Battle calculation
                        while health > 0 and dragon_health > 0:
                            ua = dex + random.randrange(2, 12)
                            da = dragon_dex + random.randrange(2, 12)
                            if ua > da:
                                dragon_health = (dragon_health - damage)
                                print("dragon took " + str(damage) + " damage")
                                print("")
                                if dragon_health == 0:
                                    print("dragon_health 0 and you win!")
                            elif ua < da:
                                health =  (health - dragon_damage)
                                print("You took " + str(dragon_damage) + " damage")
                                print("")
                                if health == 0:
                                    print("health 0 and you died")
                            elif ua == da:
                                print("You attacked very hard but no damage")
                                print("")
                    elif str(a3) == "r" or str(a3) == "R":
                        print("game over")
                        raise SystemExit
                    elif str(a3) == "q" or str(a3) == "Q":
                        raise SystemExit
                        print("quit3")
                    else:
                        print("Please press [A] or [R]")
            #Choosing knight
            if str(a2) == "k" or str(a2) == "K":
                print("knight chosen screen")
                health = 20
                damage = 2
                dex = 8
                anykey = str(input("press [Enter]"))
                print("knight prologue screen")
                while True:
                    #Knight story starts here
                    a3 = input("a3")
                    if str(a3) == "a" or str(a3) == "A":
                        print("knight pre-battle screen")
                        anykey = str(input("press [Enter]"))
                        #Battle calculation
                        while health > 0 and dragon_health > 0:
                            ua = dex + random.randrange(2, 12)
                            da = dragon_dex + random.randrange(2, 12)
                            if ua > da:
                                dragon_health = (dragon_health - damage)
                                print("dragon took " + str(damage) + " damage")
                                print("")
                                if dragon_health == 0:
                                    print("dragon_health 0 and you win!")
                            elif ua < da:
                                health =  (health - dragon_damage)
                                print("You took " + str(dragon_damage) + " damage")
                                print("")
                                if health == 0:
                                    print("health 0 and you died")
                            elif ua == da:
                                print("You attacked very hard but no damage")
                                print("")
                    elif str(a3) == "r" or str(a3) == "R":
                        print("game over")
                        raise SystemExit
                    elif str(a3) == "q" or str(a3) == "Q":
                        raise SystemExit
                        print("quit3")
                    else:
                        print("Please press [A] or [R]")
            elif str(a2) == "q" or str(a2) == "Q":
                raise SystemExit
                print("quit3")
            else:
                print("Please press [A] or [K]")
    elif str(a1) == "h" or str(a1) == "H":
        def help_screen():
            if str(a1) == "h" or str(a1) == "H":
                print("")
                print("")
                print("")
                print("")
                print("_______________________________________________________________________________________________________________________________________________________________________________________________")
                print("")
                print("")
                print("")
                print("")
                print(r"""                                                                            _    _        _          __  __                     """)
                print(r"""                                                                           | |  | |      | |        |  \/  |                    """)
                print(r"""                                                                           | |__| |  ___ | | _ __   | \  / |  ___  _ __   _   _ """)
                print(r"""                                                                           |  __  | / _ \| ||  _ \  | |\/| | / _ \| '_ \ | | | | """)
                print(r"""                                                                           | |  | ||  __/| || |_) | | |  | ||  __/| | | || |_| | """)
                print(r"""                                                                           |_|  |_| \___||_||  __/  |_|  |_| \___||_| |_| \____| """)
                print(r"""                                                                                            | |                                  """)
                print(r"""                                                                                            |_|                                  """)
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("                                                            THIS IS A TEXT BASED GAME SO EVERY COMMAND GIVEN BY THE KEYBOARD. NO MOUSE IS NEEDED.")
                print("")
                print("")
                print("                                                            EVERY COMMAND BUTTON SHOWED IN BRACKETS. FOR EXAMPLE TO ENTER THE HELP MENU YOU NEEDED TO PRESS THE [H] BUTTON")
                print("")
                print("")
                print("                                                            YOU CAN ALWAYS QUIT THE GAME BY PRESSING THE [Q] BUTTON")
                print("")
                print("")
                print("                                                            BETWEEN THE TWO WHIT LINE ON YOUR MONITOR YOU CAN SEE THE GRAPHICS")
                print("")
                print("")
                print("                                                            AT THE BOTTOM OF THE SCREEN THERE IS THE DESCRIPTION AND ABOVE IT YOU CAN READ THE AVAILABLE COMMANDS")
                print("")
                print("")
                print("")
                print("")
                print("                                                            CURRENT VERSION: v.0.1.0")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("")
                print("_______________________________________________________________________________________________________________________________________________________________________________________________")
                print("")
                print("")
                print(r"""                                                                                           BACK TO MAIN MENU [M]""")
        help_screen()
    elif str(a1) == "q" or str(a1) == "Q":
        raise SystemExit
        print("quit")
    elif str(a1) == "m" or str(a1) == "M":
        main_screen()
    else:
        print("Please press [Q] or [S] or [H]")
