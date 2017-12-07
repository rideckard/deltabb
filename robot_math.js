function polynomialSystem(c_1,s_1,c_2,s_2,c_3,s_3,l,p_x,p_y,p_z,d,cg,sg) {
   this.eq = [3*c_1*cg + 6*c_1*d + 6*c_1*p_x - 12*c_1 - 3*c_2*cg - 6*c_2*d + 3*c_2*p_x - 3*Math.sqrt(3)*c_2*p_y + 12*c_2 - 3*cg*p_x/2 + Math.sqrt(3)*cg*p_y/2 - 3*d*p_x + Math.sqrt(3)*d*p_y + 6*p_x - 2*Math.sqrt(3)*p_y + 6*p_z*s_1 - 6*p_z*s_2 - 3*s_1*sg + 3*s_2*sg, 3*c_1*cg + 6*c_1*d + 6*c_1*p_x - 12*c_1 - 3*c_3*cg - 6*c_3*d + 3*c_3*p_x + 3*Math.sqrt(3)*c_3*p_y + 12*c_3 - 3*cg*p_x/2 - Math.sqrt(3)*cg*p_y/2 - 3*d*p_x - Math.sqrt(3)*d*p_y + 6*p_x + 2*Math.sqrt(3)*p_y + 6*p_z*s_1 - 6*p_z*s_3 - 3*s_1*sg + 3*s_3*sg,3*c_1*cg + 6*c_1*d + 6*c_1*p_x - 12*c_1 + 2*cg + 4*d - Math.pow(l,2) + 4*p_x + 6*p_z*s_1 - 3*s_1*sg + 12,Math.pow(cg,2)/4 + cg*d + cg*p_x + Math.pow(d,2) + 2*d*p_x - Math.pow(l,2) + Math.pow(p_x,2) + Math.pow(p_y,2) + Math.pow(p_z,2) - p_z*sg + Math.pow(sg,2)/4, Math.pow(cg,2) - Math.pow(d,2) + 1/3, Math.pow(d,2) + Math.pow(sg,2) - 4/3];

   this.update = function(c_1,s_1,c_2,s_2,c_3,s_3,l,p_x,p_y,p_z,d,cg,sg) {
      this.eq = [3*c_1*cg + 6*c_1*d + 6*c_1*p_x - 12*c_1 - 3*c_2*cg - 6*c_2*d + 3*c_2*p_x - 3*Math.sqrt(3)*c_2*p_y + 12*c_2 - 3*cg*p_x/2 + Math.sqrt(3)*cg*p_y/2 - 3*d*p_x + Math.sqrt(3)*d*p_y + 6*p_x - 2*Math.sqrt(3)*p_y + 6*p_z*s_1 - 6*p_z*s_2 - 3*s_1*sg + 3*s_2*sg, 3*c_1*cg + 6*c_1*d + 6*c_1*p_x - 12*c_1 - 3*c_3*cg - 6*c_3*d + 3*c_3*p_x + 3*Math.sqrt(3)*c_3*p_y + 12*c_3 - 3*cg*p_x/2 - Math.sqrt(3)*cg*p_y/2 - 3*d*p_x - Math.sqrt(3)*d*p_y + 6*p_x + 2*Math.sqrt(3)*p_y + 6*p_z*s_1 - 6*p_z*s_3 - 3*s_1*sg + 3*s_3*sg,3*c_1*cg + 6*c_1*d + 6*c_1*p_x - 12*c_1 + 2*cg + 4*d - Math.pow(l,2) + 4*p_x + 6*p_z*s_1 - 3*s_1*sg + 12,Math.pow(cg,2)/4 + cg*d + cg*p_x + Math.pow(d,2) + 2*d*p_x - Math.pow(l,2) + Math.pow(p_x,2) + Math.pow(p_y,2) + Math.pow(p_z,2) - p_z*sg + Math.pow(sg,2)/4, Math.pow(cg,2) - Math.pow(d,2) + 1/3, Math.pow(d,2) + Math.pow(sg,2) - 4/3];
   };
}


function jacobiMatrix(c_1,s_1,c_2,s_2,c_3,s_3,l,p_x,p_y,p_z,d,cg,sg) {
   this.eq = [[6*c_1 + 3*c_2 - 3*cg/2 - 3*d + 6, -3*Math.sqrt(3)*c_2 + Math.sqrt(3)*cg/2 + Math.sqrt(3)*d - 2*Math.sqrt(3), 6*s_1 - 6*s_2, 6*c_1 - 6*c_2 - 3*p_x + Math.sqrt(3)*p_y, 3*c_1 - 3*c_2 - 3*p_x/2 + Math.sqrt(3)*p_y/2, -3*s_1 + 3*s_2], [6*c_1 + 3*c_3 - 3*cg/2 - 3*d + 6, 3*Math.sqrt(3)*c_3 - Math.sqrt(3)*cg/2 - Math.sqrt(3)*d + 2*Math.sqrt(3), 6*s_1 - 6*s_3, 6*c_1 - 6*c_3 - 3*p_x - Math.sqrt(3)*p_y, 3*c_1 - 3*c_3 - 3*p_x/2 - Math.sqrt(3)*p_y/2, -3*s_1 + 3*s_3], [6*c_1 + 4, 0, 6*s_1, 6*c_1 + 4, 3*c_1 + 2, -3*s_1], [cg + 2*d + 2*p_x, 2*p_y, 2*p_z - sg, cg + 2*d + 2*p_x, cg/2 + d + p_x, -p_z + sg/2], [0, 0, 0, -2*d, 2*cg, 0], [0, 0, 0, 2*d, 0, 2*sg]];
   this.update = function(c_1,s_1,c_2,s_2,c_3,s_3,l,p_x,p_y,p_z,d,cg,sg) {
      this.eq = [[6*c_1 + 3*c_2 - 3*cg/2 - 3*d + 6, -3*Math.sqrt(3)*c_2 + Math.sqrt(3)*cg/2 + Math.sqrt(3)*d - 2*Math.sqrt(3), 6*s_1 - 6*s_2, 6*c_1 - 6*c_2 - 3*p_x + Math.sqrt(3)*p_y, 3*c_1 - 3*c_2 - 3*p_x/2 + Math.sqrt(3)*p_y/2, -3*s_1 + 3*s_2], [6*c_1 + 3*c_3 - 3*cg/2 - 3*d + 6, 3*Math.sqrt(3)*c_3 - Math.sqrt(3)*cg/2 - Math.sqrt(3)*d + 2*Math.sqrt(3), 6*s_1 - 6*s_3, 6*c_1 - 6*c_3 - 3*p_x - Math.sqrt(3)*p_y, 3*c_1 - 3*c_3 - 3*p_x/2 - Math.sqrt(3)*p_y/2, -3*s_1 + 3*s_3], [6*c_1 + 4, 0, 6*s_1, 6*c_1 + 4, 3*c_1 + 2, -3*s_1], [cg + 2*d + 2*p_x, 2*p_y, 2*p_z - sg, cg + 2*d + 2*p_x, cg/2 + d + p_x, -p_z + sg/2], [0, 0, 0, -2*d, 2*cg, 0], [0, 0, 0, 2*d, 0, 2*sg]];
   };   
}


var inputCoordinates = [0.5816830894638836, 0.8134155047893737, 0.7648421872844885, 0.644217687237691, 0.7648421872844885, 0.644217687237691, 6.315340201323738];
var outputCoordinates = [-0.954583474766192,1.4602521614107248e-17,6.5156868836898285,1.0635495177130636,0.8931988822733472,0.449661824825772];
var uc_inputCoordinates = [0.5816830894638836, 0.8134155047893737, 0.7648421872844885, 0.644217687237691, 0.7648421872844885, 0.644217687237691, 6.315340201323738];

var xnew = [-9.830995699140462e-01,0,6.482804506834616,1.117684345901038,9.570187896477776e-01,2.900259234294451e-01];
var xold = [-9.830995699140462e-01,0,6.482804506834616,1.117684345901038,9.570187896477776e-01,2.900259234294451e-01];


var pS = new polynomialSystem(Math.cos(0.95),Math.sin(0.95),Math.cos(0.7),Math.sin(0.7),Math.cos(0.7),Math.sin(0.7),6.288251341,-9.830995699140462e-01,0,6.482804506834616,1.117684345901038,9.570187896477776e-01,2.900259234294451e-01);
var jM = new jacobiMatrix(Math.cos(0.95),Math.sin(0.95),Math.cos(0.7),Math.sin(0.7),Math.cos(0.7),Math.sin(0.7),6.288251341,-9.830995699140462e-01,0,6.482804506834616,1.117684345901038,9.570187896477776e-01,2.900259234294451e-01);
//var jMcond = getcond(jM);
var jMcond = 2;


function newton_loop(k) {
   //jM.update(...inputCoordinates,...outputCoordinates);
   //jMcond = getcond(jM);
   xnew = outputCoordinates;
   
   for (i=0; i<k; i++) {    
      xold = xnew;
      pS.update(...uc_inputCoordinates,...xold);
      jM.update(...uc_inputCoordinates,...xold);
      
      xnew = numeric.solve(jM.eq,pS.eq);
      xnew = numeric.sub(xold,xnew);
	
   }
   if (!test_gamma(xnew[5])) return false;
   outputCoordinates = xnew;
   return true;
}


function getcond(mat_par) {
   console.log('hallo');
   var sing = numeric.svd(mat_par.eq).S;
   console.log([sing[0],sing[sing.length-1]]);
   return sing[0]/sing[sing.length-1]      
}

function test_gamma(sg) {
   if (Math.abs(sg) < 0.43 || Math.abs(sg) > 0.9) {return false;}
   else {return true;}
}



function invers_kinematic(px,py,pz,sg) {
   
   if (!test_gamma(sg)) {return false;}
   var cg = Math.sqrt(1 - Math.pow(sg,2));
   var d = bl*Math.sqrt(4/3 - Math.pow(sg,2));
   
   var Coordinates_in = inverse_kinematic_leg(px,py,pz,d,cg,sg,0).concat(inverse_kinematic_leg(px,py,pz,d,cg,sg,2*pi/3),inverse_kinematic_leg(px,py,pz,d,cg,sg,4*pi/3));
   var cg = Math.sqrt(1 - Math.pow(sg,2));
      
   var l = prisma_length(px,py,pz,cg,sg,d,0);
   
   outputCoordinates = [px,py,pz,d,cg,sg];
   Coordinates_in.push(l);
   uc_inputCoordinates = Coordinates_in;
   outputCoordinates = outputCoordinates;
   return true;
}

function prisma_length(px,py,pz,cg,sg,d,psi) {
return Math.sqrt(Math.pow(pz - r2*sg,2) + Math.pow(-px*sin(psi) + py*cos(psi),2) + Math.pow(cg*r2 + d + px*cos(psi) + py*sin(psi),2));
}


function inverse_kinematic_leg(px,py,pz,d,cg,sg,w) {
      
var e1 = 1.0*cg + 2*d + 2*px*cos(w) + 2*py*sin(w) - 4;
var e2 = 2*pz - 1.0*sg;
var e3 =  -0.25*Math.pow(cg,2) - 1.0*cg*d - 1.0*cg*px*cos(w) - 1.0*cg*py*sin(w) - Math.pow(d,2) - 2*d*px*cos(w) - 2*d*py*sin(w) - Math.pow(px,2)*Math.pow(sin(w),2) - Math.pow(px,2)*Math.pow(cos(w),2) - Math.pow(py,2)*Math.pow(sin(w),2) - Math.pow(py,2)*Math.pow(cos(w),2) - Math.pow(pz,2) + 1.0*pz*sg - 0.25*Math.pow(sg,2) + 20;  

var mco1 = Math.pow(e1,2)/Math.pow(e2,2) + 1;
var mco2 = 2*e1*e3/Math.pow(e2,2) - 4;
var mco3 = -5 + Math.pow(e3,2)/Math.pow(e2,2);

var kx = (-mco2 + Math.sqrt(Math.pow(mco2,2) - 4*mco1*mco3))/(2*mco1);
var kz = -(e3 + e1*kx)/e2;
kx -= r1;

var hypotenuse = Math.sqrt(Math.pow(kz,2) + Math.pow(kx,2));
kz = kz/hypotenuse;
kx = kx/hypotenuse;

   
return [kx,kz];
}



//function approxCondition(){
//   jMdet = Math.det(jM.eq);
   
   
//}

//inputCoordinates = [Math.cos(0.93),Math.sin(0.93),Math.cos(0.7),Math.sin(0.7),Math.cos(0.7),Math.sin(0.7),6.288251341];
//newton_loop(4);

//print(inputCoordinates);
//print(outputCoordinates);
//pS.update(inputCoordinates.get([0]),inputCoordinates.get([1]),inputCoordinates.get([2]),inputCoordinates.get([3]),inputCoordinates.get([4]),inputCoordinates.get([5]),inputCoordinates.get([6]),outputCoordinates.get([0]),outputCoordinates.get([1]),outputCoordinates.get([2]),outputCoordinates.get([3]),outputCoordinates.get([4]),outputCoordinates.get([5]));
//print(pS.eq);  


   // // helper function to output formatted results.
   // function print(value) {
   //   var precision = 14;
   //   document.write(Math.format(value, precision) + '<br>');
   // }
   //
   //function print_string(value) {
   //   document.write(value + '<br>');
   // }
