def checker():
    list_of_crimes = ('homicide','robbery','Armed Robbery','Rape','Kidnapping','Assault and Battery','Child abuse',
                      'Domestic abuse','larceny','auto theft','shoplifting','aiding and abetting','attempting',
                      'conspiracy','drinking and driving','possession of illegal substance','fraud')

    for index, crime in enumerate(list_of_crimes, 1):
        print(f"{index}. {crime}")

    choice = int(input("ENTER: "))
    choice = choice-1
    if choice >= 18:
        print("=" * 80)
        print('ENTER VALID INPUT')
        return checker()
    else:
        return list_of_crimes[choice]


