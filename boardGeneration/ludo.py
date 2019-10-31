import math

width = 6000
height = 6000
x = width/2
y = height/2

size = 425
players =8
depth = 7
blockSize = 0.7
offsetFactor = 1 #0.926
offset = -0.16
outFactor = 4.8875

colors = [[255,0,0],[255,255,0],[0,255,0],[0,0,255],[255,0,170],[250,130,0],[150,0,200],[0,200,200]]
strokeWidth = str(4)

print('<body>\n\t<svg viewBox="0 0 ' + str(width) + ' ' + str(height) + '">')
print("\t\t//center")
points = ""
for i in range(players):
    points += str(x+math.sin((2*math.pi)*((float(0.5 + i)/players)))*size)
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(0.5 + i)/players))*size)
    points += " "
print('\t\t<polygon points="' + points +'"stroke="black" stroke-width="' + strokeWidth +'" fill="rgb(20,20,20)"></polygon>')

print("\t\t//endgame")

for i in range(players):
    points = ""
    points += str(x+math.sin((2*math.pi)*((float(-0.5 + i)/players)))*size)
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(-0.5 + i)/players))*size)
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(-0.5 + i)/players)))*size*2)
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(-0.5 + i)/players))*size*2)
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i+0.5)/players)))*size*2)
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i+0.5)/players))*size*2)
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i+0.5)/players)))*size)
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i+0.5)/players))*size)
    points += " "
    print('\t\t<polygon id="pos-' + str(players*(4 + (depth*2+1)) + depth + i - 1) + '"  points="' + points +'"stroke="black" stroke-width="' + strokeWidth +'" fill="rgb(' +
          str(colors[i][0]) + ',' + str(colors[i][1]) + ',' + str(colors[i][2]) + ')"></polygon>')

    for i in range(players):
        points = ""
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(4)) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*1.5))
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(4)) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*1.5))
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(4)) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*4.5))
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(4)) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*4.5))
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(7)) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*4.5))
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(7)) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*4.5))
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(7)) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*1.5))
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(7)) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*1.5))
        print('\t\t<polygon points="' + points +'"stroke="black" stroke-width="' + strokeWidth +'" fill="rgb(' + str(colors[i][0]) + ',' + str(colors[i][1]) + ',' + str(colors[i][2]) + ')"></polygon>')
        
        points = ""
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(4.2)) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*1.7))
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(4.2)) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*1.7))
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(4.2)) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*4.3))
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(4.2)) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*4.3))
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(6.8)) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*4.3))
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(6.8)) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*4.3))
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(6.8)) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*1.7))
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(6.8)) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*1.7))
        print('\t\t<polygon points="' + points +'"stroke="black" stroke-width="' + strokeWidth +'" fill="rgb(255,255,255)"></polygon>')

for i in range(players):
    points = ""
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*1.9))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*1.9))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*2.9))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*2.9))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*2.9))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*2.9))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*1.9))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*1.9))
    print('\t\t<polygon id="pos-' + str(i*4) + '" points="' + points +'"stroke="black" stroke-width="' + strokeWidth +'" fill="rgb(' + str(colors[i][0]) + ',' + str(colors[i][1]) + ',' + str(colors[i][2]) + ')"></polygon>')
    
    points = ""
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*3.1))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*3.1))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*4.1))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*4.1))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*4.1))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*4.1))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*3.1))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*3.1))
    print('\t\t<polygon id="pos-' + str(i*4+1) + '" points="' + points +'"stroke="black" stroke-width="' + strokeWidth +'" fill="rgb(' + str(colors[i][0]) + ',' + str(colors[i][1]) + ',' + str(colors[i][2]) + ')"></polygon>')
    
    points = ""
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1.2) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*1.9))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1.2) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*1.9))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1.2) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*2.9))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1.2) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*2.9))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 2.2) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*2.9))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 2.2) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*2.9))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 2.2) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*1.9))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 2.2) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*1.9))
    print('\t\t<polygon id="pos-' + str(i*4+2) + '" points="' + points +'"stroke="black" stroke-width="' + strokeWidth +'" fill="rgb(' + str(colors[i][0]) + ',' + str(colors[i][1]) + ',' + str(colors[i][2]) + ')"></polygon>')
    
    points = ""
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1.2) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*3.1))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1.2) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*3.1))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1.2) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*4.1))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1.2) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*4.1))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 2.2) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*4.1))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 2.2) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*4.1))
    points += " "
    points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 2.2) - blockSize/2) + math.sin(math.pi*1.5 + (2*math.pi)*(float(i)/players))*size*(blockSize*3.1))
    points += ","
    points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 2.2) - blockSize/2) + math.cos(math.pi*1.5 + (2*math.pi)*((float(i)/players)))*size*(blockSize*3.1))
    print('\t\t<polygon id="pos-' + str(i*4+3) + '" points="' + points +'"stroke="black" stroke-width="' + strokeWidth +'" fill="rgb(' + str(colors[i][0]) + ',' + str(colors[i][1]) + ',' + str(colors[i][2]) + ')"></polygon>')
    
outFactor = 0.0
for j in range(depth):

    innerMult = 1.09 if outFactor == 0 else 1.5
    
    for i in range(players):
        points = ""
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.sin(-math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize/2)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.cos(-math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize/2)
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.sin(math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize/2)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.cos(math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize/2)
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.sin(math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize/2)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.cos(math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize/2)
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.sin(-math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize/2)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.cos(-math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize/2)
        print('\t\t<polygon id="pos-' + str(players*4 + i * (depth*2+1) + (2 if (j == depth - 1) else players*(depth*2+1) + depth - j - 2)) + '" points="' + points + '"stroke="black" stroke-width="' + strokeWidth + '" fill="rgb(' + ('255,255,255' if j == depth - 1 else
              str(colors[i][0]) + ',' + str(colors[i][1]) + ',' + str(colors[i][2])) + ')"></polygon>')

    for i in range(players):
        points = ""
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.sin(math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize*innerMult)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.cos(math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize*innerMult)
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.sin(math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize/2)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.cos(math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize/2)
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.sin(math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize/2)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.cos(math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize/2)
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.sin(math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize*1.5)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.cos(math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize*1.5)
        print('\t\t<polygon id="pos-' + str(players*4 + i * (depth*2+1) + depth - j + 2) + '" points="' + points +'"stroke="black" stroke-width="' + strokeWidth +'" fill="rgb(255,255,255)"></polygon>')

    for i in range(players):
        points = ""
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.sin(-math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize*innerMult)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.cos(-math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize*innerMult)
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.sin(-math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize/2)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*outFactor) + math.cos(-math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize/2)
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.sin(-math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize/2)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.cos(-math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize/2)
        points += " "
        points += str(x+math.sin((2*math.pi)*((float(i)/players)))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.sin(-math.pi/2 + (2*math.pi)*(float(i)/players))*size*blockSize*1.5)
        points += ","
        points += str(y+math.cos((2*math.pi)*(float(i)/players))*size*offsetFactor*(2 + offset + blockSize*(outFactor + 1)) + math.cos(-math.pi/2 + (2*math.pi)*((float(i)/players)))*size*blockSize*1.5)
        print('\t\t<polygon id="pos-' + str(players*4 + i * (depth*2+1) + j + (players*(depth*2+1) - depth + 2 if (j < depth - 2 and i == 0) else - depth + 2)) + '" points="' + points +'"stroke="black" stroke-width="' + strokeWidth +'" fill="rgb(' + ('255,255,255' if j != depth -2 else
              str(colors[i][0]) + ',' + str(colors[i][1]) + ',' + str(colors[i][2])) + ')"></polygon>')
      
    outFactor += 1
print('\t</svg>\n</body>')
