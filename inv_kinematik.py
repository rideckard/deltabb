from sympy import *
import math
import re

a,b,r1,r2,d,w,t1,t2,t3,px,py,pz,kx,ky,kz,e1,e2,e3,cg,sg = symbols('a b r1 r2 d w t1 t2 t3 px py pz kx ky kz e1 e2 e3 cg sg')

p = Matrix([px,py,pz])
C = Matrix([[cos(w), sin(w), 0], [-sin(w), cos(w), 0], [0,0,1]])
kreis1 = C*p + Matrix([cg*r2 + d, 0, -sg*r2]) - Matrix([kx,0,kz])
kreis_gl1 = expand(kreis1[0]**2 + kreis1[1]**2 + kreis1[2]**2 - b**2)

ersetzung_kz = [(kz,-(e3 + e1*kx)/e2)]

kreis2 = Matrix([r1,0,0]) - Matrix([kx,0,kz]) 
kreis_gl2 = expand(kreis2[0]**2 + kreis2[1]**2 + kreis2[2]**2 - a**2)

ebene = expand(kreis_gl2 - kreis_gl1)
ebene_coeff = collect(ebene,[kx,kz],evaluate=False)
co1 = ebene_coeff[kx]
co2 = ebene_coeff[kz]
co3 = ebene_coeff[kx**0]

mitco = collect(expand(kreis_gl2.subs(ersetzung_kz)),kx,evaluate=False)
#print(mitco)

#print(ebene_coeff[kx])
#print(ebene_coeff[kz])
#print(re.sub(r"([a-z,1-9]+)\*\*([1-9])",r"Math.pow(\1,\2)",str(ebene_coeff[kx**0])))

co1s = co1.subs([(a,3),(b,5),(r1,2),(r2,0.5)])
co2s = co2.subs([(a,3),(b,5),(r1,2),(r2,0.5)])
co3s = co3.subs([(a,3),(b,5),(r1,2),(r2,0.5)])


mco1s = mitco[kx**2].subs([(a,3),(b,5),(r1,2),(r2,0.5)])
mco2s = mitco[kx**1].subs([(a,3),(b,5),(r1,2),(r2,0.5)])
mco3s = mitco[kx**0].subs([(a,3),(b,5),(r1,2),(r2,0.5)])


#print(mitco[kx**2])
print(re.sub(r"([a-z,1-9]+)\*\*([1-9])",r"Math.pow(\1,\2)",str([mco1s,mco2s,mco3s])))
#print(mitco[kx**0])
print(re.sub(r"([a-z,1-9]+)\*\*([1-9])",r"Math.pow(\1,\2)",str([co1s,co2s,co3s])))
#print(mitco[kz**0])



#pprint(ebene_coeff)
#pprint(ebene_coeff[1])
#pprint(ebene_coeff[2])
