dict_data = {}
space_count = 3


def addString(key):
    dict_data[key] = " "


def addObject(key):
    dict_data[key] = "  "


with open("temp.txt", "r") as f:
    lines = f.readlines()
    for i in lines:
        if i[space_count + 1] == " ":
            addObject(i.split()[0])
        else:
            addString(i.split()[0])

print(dict_data)