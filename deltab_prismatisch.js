window.__context = { glowscript_container:    $("#glowscript").removeAttr("id") };
var scene = canvas({width:800, height:600});

var a=3;
var b=5;
var r1=2;
var r2=0.5;

var bl = 1;
var pl = 0.25;


var link_color = color.red;
var gripper_color = color.red;
var joint_color = color.yellow;
var actuated_color = color.cyan;
var link_radius = 0.08;
var joint_radius = 0.07;
var joint_length = 0.3;
var joint_length_h = joint_length/2;
var parallelogram_joint_length = 0.5;
var parallelogram_delta = 0.5;
var prism_thickness = 0.15;
var inc = 0.01;
var inc_gr = 0.03;
var gripper_length = 0.6;
var gripper_cone_length = 0.1;
var gripper_radius = 0.15
var cstep = 0.05;


//// setup screen
//scene.title="Delta B";
scene.forward=vec(-0.8, 1.5, -1.5);
scene.up=vec(0, 0, 1);
scene.range=8;
scene.center=vec(0,0,6);
//scene.caption = "Die aktuierten Gelenke sind tuerkis gezeichnet.";
//<b>(a,s)</b>: Plattform Aktuator.\n\
//<b>(t,z),(g,h),(b,n)</b>: Bein Aktuatoren.\n\
//<b>(o,p)</b>: alle Bein Aktuatoren.\n\
//<b>(k,l)</b>: alle Aktuatoren.\n\
//<b>(r)</b>: Animation.\n\
//<b>Ansicht drehen</b>: rechte Maustaste.\n\
//<b>Zoom</b>: rechte + linke Maustaste oder Mausrad.""";



//Keyboard Control
scene.bind("click keydown", function(event) {
   
   //Zentralsäule
   if (event.key == 'a') {
   zentralsaeule(0.013);
   }
   if (event.key == 's') {
   zentralsaeule(-0.013);
   }
   
    //Bein1
   if (event.key == 'e') {
   beinaktuator(0,0.01);
   }
   if (event.key == 'r') {
   beinaktuator(0,-0.01);
   }
   
   //Bein2
   if (event.key == 'd') {
   beinaktuator(1,0.01);
   }
   if (event.key == 'f') {
   beinaktuator(1,-0.01);
   }
   
   //Bein3
   if (event.key == 'c') {
   beinaktuator(2,0.01);
   }
   if (event.key == 'v') {
   beinaktuator(2,-0.01);
   }
      
   if (event.key == 'r') {
   DeltaReset();      
   }
      
   if (event.key == 'x') {
   press_paint();
   }
   
   
   if (event.key == 'y') {
      setCN();
      console.log([inputCoordinates,outputCoordinates]);
   }
   
   if (event.key == 'l') {
      goHome();
   }
   
   if (event.key == 'o') {
      widecircleAnimation();
   }
   
   if (event.key == 't') {
      cartesian_step(0,0.1);
   }
   
      if (event.key == 'z') {
      cartesian_step(0,-0.1);
   }
   
      if (event.key == 'g') {
      cartesian_step(1,0.1);
   }
   
      if (event.key == 'h') {
      cartesian_step(1,-0.1);
   }
   
      if (event.key == 'b') {
      cartesian_step(2,0.1);
   }
   
      if (event.key == 'n') {
      cartesian_step(2,-0.1);
   }
   
      if (event.key == 'j') {
      gripper_step(0.05);
   }
   
      if (event.key == 'k') {
      gripper_step(-0.05);
   }
   
   if (event.key == 'u') {

   }
   
   if (event.key == 'm') {
      console.log([mag(Bein1.p_end), inputCoordinates[6], uc_inputCoordinates[6]]);
      var px = outputCoordinates[0];
      var py = outputCoordinates[1];
      var pz = outputCoordinates[2];
      var d = outputCoordinates[3];
      var cg = outputCoordinates[4];
      var sg = outputCoordinates[5];
      console.log(Math.sqrt(Math.pow(px + d + 0.5*cg,2) + Math.pow(py,2) + Math.pow(pz - sg*0.5,2)));
      console.log('Hallo');
   }
   
});



//# Boden
var ground = box({pos: vec(0, 0, -0.1), size: vec(10, 10, 0.1), color:color.blue});
//# origin
var Iorigin = sphere({pos: vec(0, 0, 0), size: vec(0.02,0.02,0.02), color: color.yellow});
//# p
var Ip = sphere({pos: vec(0, 0, 0), size: vec(0.2,0.2,0.2), color: color.yellow});



function DeltaLeg(psi,t1,t2,t3,cg,sg,special,specialval) {
   
   this.ex = vec(1, 0, 0);
   this.ey = vec(0, 1, 0);
   this.ez = vec(0, 0, 1);
   //Extra Buegel
   this.special = special;
   
   //base und Hilfsvektoren
   this.ex = rotate(this.ex, {axis: vec(0,0,1), angle: psi});
   this.ey = rotate(this.ey, {axis: vec(0,0,1), angle: psi});
   this.joint_versatz = this.ey.multiply(-joint_length/2);
   this.parallelogramm_versatz = this.ey.multiply(-parallelogram_delta/2);
   this.p = this.ex.multiply(r1);
   
   //Koordinaten Berechnen
   this.CalculateVectors = function(t1,t2,t3,cg,sg) {
      
      //Middle
      this.p_middle = this.p.add(this.ex.multiply(a*cos(t1))).add(this.ez.multiply(a*sin(t1)));
      this.p_middle_a1 = this.p_middle.add(this.parallelogramm_versatz);
      this.p_middle_a2 = this.p_middle.add(this.parallelogramm_versatz.multiply(-1));
      
      //End
      this.p_end = this.p_middle.add(this.ex.multiply(sin(t3)*b*cos(t1+t2))).add(this.ey.multiply(cos(t3)*b)).add(this.ez.multiply(b*sin(t3)*sin(t1+t2)));
      this.p_end_a1 = this.p_end.add(this.parallelogramm_versatz);
      this.p_end_a2 = this.p_end.add(this.parallelogramm_versatz.multiply(-1));
      
      //Aufhaengung
      this.p_auf = this.p_end.add(this.ex.multiply(cg*r2*(-1))).add(this.ez.multiply(sg*r2));   
      
      //Falls Special Extra Bein
      if(this.special) {
      this.p_special_actuator = norm(this.p_end).multiply(specialval);
      }
      
      
      
      
   };

   this.DrawJointsAndLinks = function() {
      //Joints
      //Base Joint
      this.base_joint = cylinder({pos: this.p.add(this.joint_versatz), axis:this.ey, size: vec(joint_length, 2*joint_radius,2*joint_radius), color: actuated_color});
      //Middle Joint
      this.middle_joint = cylinder({pos: this.p_middle_a1, axis: this.ey, size: vec(parallelogram_joint_length,2*joint_radius,2*joint_radius), color: joint_color});
      //End Jooint
      this.end_joint = cylinder({pos: this.p_end_a1, axis: this.ey, size: vec(parallelogram_joint_length,2*joint_radius,2*joint_radius), color: joint_color});

      //Links
      //Base Link
      this.base_link = curve({pos: [this.p, this.p_middle], radius:link_radius, color: link_color}); 
      //Middle Links
      this.middle_link1 = curve({pos:[this.p_middle_a1, this.p_end_a1], radius:link_radius, color:link_color});
      this.middle_link2 = curve({pos:[this.p_middle_a2, this.p_end_a2], radius:link_radius, color:link_color});
      //Aufhaengun LInk
      this.auf_link = curve({pos:[this.p_end, this.p_auf], radius:link_radius,color:link_color});
      
      //Falls Special Extra Bein
      if(this.special) {
         this.special_joint_a = curve({pos: [vec(0,0,0), this.p_special_actuator], radius:prism_thickness, color:actuated_color});
         this.special_joint = curve({pos: [this.p_special_actuator, this.p_end], radius:joint_radius, color:joint_color});
      }
   };
   
   this.ChangeCoordinates = function(t1,t2,t3,cg,sg) {
      this.CalculateVectors(t1,t2,t3,cg,sg);
      
      //Neu Zeichnen
      this.auf_link.modify(0,this.p_end);
      this.auf_link.modify(1,this.p_auf);

      this.end_joint.pos = this.p_end_a1;
      
      this.middle_link1.modify(0,this.p_middle_a1);
      this.middle_link1.modify(1,this.p_end_a1);
      this.middle_link2.modify(0,this.p_middle_a2);
      this.middle_link2.modify(1,this.p_end_a2);
        
      this.middle_joint.pos = this.p_middle_a1;
      this.base_link.modify(1,this.p_middle);
      
      //Falls Special Extra Bein
      if(this.special) {
         this.special_joint_a.modify(1,this.p_special_actuator);
         this.special_joint.modify(0,this.p_special_actuator);
         this.special_joint.modify(1,this.p_end);
      }
   };
   
   //Zum ersten Mal zeichnen
   this.CalculateVectors(t1,t2,t3,cg,sg);
   this.DrawJointsAndLinks();
}

function BricardChain(p,ex,ey,ez,v1,v2,v3,v4,v5,v6) {
   
   
   //Base Joint
   this.CalculateVectors = function(p,ex,ey,ez,v1,v2,v3,v4,v5,v6) {
      this.v1 = v1;
      this.v2 = v2;
      this.v3 = v3;
      this.v4 = v4;
      this.v5 = v5;
      this.v6 = v6;

      this.p = p;
      this.ex = ex;
      this.ey = ey;
      this.ez = ez;
   
      //Base Joint
      this.j1 = this.p.add(this.ez.multiply(joint_length_h*(-1)));
      
      //2. Joint
      this.ex2 = rotate(this.ex, {angle:v1, axis:this.ez});
      this.ez2 = rotate(this.ez, {angle:pi/2,axis:this.ex2});
      this.p2 = this.p.add(this.ex2.multiply(bl));
      this.j2 = this.p2.add(this.ez2.multiply(joint_length_h));
      this.grj2 = this.j2.add(this.ez2.multiply((-1)*gripper_length));

      //3. Joint
      this.ex3 = rotate(this.ex2, {angle:v2, axis:this.ez2});
      this.ez3 = rotate(this.ez2, {angle:pi/2,axis:this.ex3});
      this.p3 = this.p2.add(this.ex3.multiply(bl));
      this.j3 = this.p3.add(this.ez3.multiply(joint_length_h*(-1)));

      //4. Joint
      this.ex4 = rotate(this.ex3, {angle:v3, axis:this.ez3});
      this.ez4 = rotate(this.ez3, {angle:pi/2,axis:this.ex4});
      this.p4 = this.p3.add(this.ex4.multiply(bl));
      this.j4 = this.p4.add(this.ez4.multiply(joint_length_h*(-1)));
      this.grj4 = this.j4.add(this.ez4.multiply(gripper_length));

      //5. Joint
      this.ex5 = rotate(this.ex4, {angle:v4, axis:this.ez4});
      this.ez5 = rotate(this.ez4, {angle:pi/2,axis:this.ex5});
      this.p5 = this.p4.add(this.ex5.multiply(bl));
      this.j5 = this.p5.add(this.ez5.multiply(joint_length_h*(-1)));

      //6. Joint
      this.ex6 = rotate(this.ex5, {angle:v5, axis:this.ez5});
      this.ez6 = rotate(this.ez5, {angle:pi/2,axis:this.ex6});
      this.p6 = this.p5.add(this.ex6.multiply(bl));
      this.j6 = this.p6.add(this.ez6.multiply(joint_length_h));
      this.grj6 = this.j6.add(this.ez6.multiply((-1)*gripper_length));
      
      //EE
      this.ex7 = rotate(this.ex6, {angle:v6, axis:this.ez6});
   };
      
   
   this.DrawJointsAndLinks = function() {    
      this.base_joint = cylinder({pos: this.j1, axis: this.ez, size:vec(joint_length, 2 * joint_radius, 2 * joint_radius), color: actuated_color});
      this.joint2 = cylinder({pos: this.j2, axis: this.ez2, size:vec(gripper_length*(-1), 2 * joint_radius, 2 * joint_radius), color:joint_color});
      this.joint3 = cylinder({pos: this.j3, axis: this.ez3, size:vec(joint_length, 2 * joint_radius, 2 * joint_radius), color:joint_color});
      this.joint4 = cylinder({pos: this.j4, axis: this.ez4, size:vec(gripper_length, 2 * joint_radius, 2 * joint_radius), color:joint_color});
      this.joint5 = cylinder({pos: this.j5, axis: this.ez5, size:vec(joint_length, 2 * joint_radius, 2 * joint_radius), color:joint_color});
      this.joint6 = cylinder({pos: this.j6, axis: this.ez6, size:vec(gripper_length*(-1), 2 * joint_radius, 2 * joint_radius), color:joint_color});
 
      //Links
      this.link1 = cylinder({pos:this.p, axis:this.ex2, size:vec(bl, 2 * link_radius, 2 * link_radius), color:link_color});
      this.link2 = cylinder({pos:this.p2, axis:this.ex3, size:vec(bl, 2 * link_radius, 2 * link_radius), color:link_color});
      this.link3 = cylinder({pos:this.p3, axis:this.ex4, size:vec(bl, 2 * link_radius, 2 * link_radius), color:link_color});
      this.link4 = cylinder({pos:this.p4, axis:this.ex5, size:vec(bl, 2 * link_radius, 2 * link_radius), color:link_color});
      this.link5 = cylinder({pos:this.p5, axis:this.ex6, size:vec(bl, 2 * link_radius, 2 * link_radius), color:link_color});
      this.ee = cylinder({pos:this.p6, axis:this.ex7, size:vec(bl, 2 * link_radius, 2 * link_radius), color:link_color});
      
      //gripper
      this.gr1 = cylinder({pos: this.grj2, axis:this.ez2, size:vec(gripper_cone_length*(-1), 2*gripper_radius, 2*gripper_radius), color: gripper_color});
      this.gr2 = cylinder({pos: this.grj4, axis:this.ez4, size:vec(gripper_cone_length, 2*gripper_radius, 2*gripper_radius), color: gripper_color});
      this.gr3 = cylinder({pos: this.grj6, axis:this.ez6, size:vec(gripper_cone_length*(-1), 2*gripper_radius, 2*gripper_radius), color: gripper_color});
     

   };
      
      
   
   this.ChangeCoordinates = function(p,ex,ey,ez,v1,v2,v3,v4,v5,v6) {
      //Recalculate
      this.CalculateVectors(p,ex,ey,ez,v1,v2,v3,v4,v5,v6);
      
      //Redraw
      //Joints
      this.base_joint.pos = this.j1;
      this.base_joint.axis = this.ez.multiply(joint_length);
      this.joint2.pos = this.j2;
      this.joint2.axis = this.ez2;
      this.joint3.pos = this.j3;
      this.joint3.axis = this.ez3;
      this.joint4.pos = this.j4;
      this.joint4.axis = this.ez4;
      this.joint5.pos = this.j5;
      this.joint5.axis = this.ez5;
      this.joint6.pos = this.j6;
      this.joint6.axis = this.ez6;
      
      //Gripper
      this.gr1.pos = this.grj2;
      this.gr1.axis = this.ez2;
      this.gr2.pos = this.grj4;
      this.gr2.axis = this.ez4;
      this.gr3.pos = this.grj6;
      this.gr3.axis = this.ez6;
      
      
      
    

      //Links
      this.link1.pos = this.p;
      this.link1.axis = this.ex2;
      this.link2.pos = this.p2;
      this.link2.axis = this.ex3;
      this.link3.pos = this.p3;
      this.link3.axis = this.ex4;
      this.link4.pos = this.p4;
      this.link4.axis = this.ex5;
      this.link5.pos = this.p5;
      this.link5.axis = this.ex6;
      this.ee.pos = this.p6;
      this.ee.axis = this.ex7;
      
   };

  
   this.CalculateVectors(p,ex,ey,ez,v1,v2,v3,v4,v5,v6);
   this.DrawJointsAndLinks();
}
  
function c_inv_bricard(cg) {
   var v1 = sqrt(3)*cg;
   var v2 = sqrt( (3 - Math.pow(v1,2)) / (1 + Math.pow(v1,2)) );
   var v3 = -v1;
   var v4 = -v2;
   var v5 = v1;
   var v6 = v2;
    
   var w1 = 2 * atan(v1);
   var w2 = 2 * atan(v2);
   var w3 = 2 * atan(v3);
   var w4 = 2 * atan(v4);
   var w5 = 2 * atan(v5);
   var w6 = 2 * atan(v6);

   return [w1,w2,w3,w4,w5,w6];
}

function c_inv_leg(c1, s1, px, py, pz, d, cg, sg, psi) {
   
    var cx = cos(psi)*px + sin(psi)*py - r1 + d + r2*cg;
    var cy = -sin(psi)*px + cos(psi)*py;
    var cz = pz - r2 *sg;
   
    var t3 = acos(cy/b);
    var x = (cx - a*c1)/(b*sin(t3));
   var y = (cz - a*s1)/(b*sin(t3));
   var t2 = atan2(y,x) - atan2(s1,c1);

   return [atan2(s1,c1), t2, t3];
}

function c_loc_bricard(px, py, pz, d, cg, sg) {
   
   var p = vec(px+d,py,pz);
   var vd = (pi - atan(cg*sqrt(3))*2);
   var ez = vec(-sg,0,-cg);
   var ey = vec(-cg * sin(vd/2), -cos(vd/2), sg*sin(vd/2));
   var ex = vec(cg * cos(vd/2), -sin(vd/2), -sg*cos(vd/2));

   return [p,ex,ey,ez];
}

function DeltaUpdate(Coordinates_in, Coordinates_out) {
   var winkel_bein1 = [Coordinates_in[0], Coordinates_in[1]];
   var winkel_bein2 = [Coordinates_in[2], Coordinates_in[3]];
   var winkel_bein3 = [Coordinates_in[4], Coordinates_in[5]];
   
   var BricardCoordinates = c_inv_bricard(Coordinates_out[4]);
   var BricardOrientationCoordinates = c_loc_bricard(...Coordinates_out);

   var Bein1Coordinates = c_inv_leg(...winkel_bein1,...Coordinates_out, 0);
   var Bein2Coordinates = c_inv_leg(...winkel_bein2,...Coordinates_out, 2*pi/3);
   var Bein3Coordinates = c_inv_leg(...winkel_bein3,...Coordinates_out, 4*pi/3);
   
   //Neu zeichnen
   Bein1.ChangeCoordinates(...Bein1Coordinates, Coordinates_out[4], Coordinates_out[5]);
   Bein2.ChangeCoordinates(...Bein2Coordinates, Coordinates_out[4], Coordinates_out[5]);
   Bein3.ChangeCoordinates(...Bein3Coordinates, Coordinates_out[4], Coordinates_out[5]);

   BricardChain.ChangeCoordinates(...BricardOrientationCoordinates,...BricardCoordinates);
}

function DeltaReset() {
   inputCoordinates = [Math.cos(0.95),Math.sin(0.95),Math.cos(0.7),Math.sin(0.7),Math.cos(0.7),Math.sin(0.7),6.288251341];
   outputCoordinates = [-9.830995699140462e-01,0,6.482804506834616,1.117684345901038,9.570187896477776e-01,2.900259234294451e-01];
   DirectKinematic();
}

function DirectKinematic() {
   if(newton_loop(4))
   {
   inputCoordinates = uc_inputCoordinates.slice();
   DeltaUpdate(inputCoordinates,outputCoordinates);
   }
   else {
   uc_inputCoordinates = inputCoordinates.slice();
   }
}

function InverseKinematic(px,py,pz,sg) {
   if(invers_kinematic(px,py,pz,sg))
   {
   inputCoordinates = uc_inputCoordinates.slice();
   DeltaUpdate(inputCoordinates,outputCoordinates);
   }
   else {
   uc_inputCoordinates = inputCoordinates.slice();   
   }
}

function setCN() {
   jMcond = getcond(jM);
 $("#determinante").text(jMcond.toString());  
}

function cartesian_step(i, step) {
   var pcoord;
   pcoord = [outputCoordinates[0],outputCoordinates[1],outputCoordinates[2], outputCoordinates[5]];
   pcoord[i] += step;
   InverseKinematic(...pcoord);
}

function gripper_step(step) {
   var winkel = Math.atan2(outputCoordinates[5], outputCoordinates[4]) + step;
   var pcoord = [outputCoordinates[0],outputCoordinates[1],outputCoordinates[2], sin(winkel)];
   InverseKinematic(...pcoord);
}

function zentralsaeule(step) {
   uc_inputCoordinates[6] += step;
   DirectKinematic();
//console.log([inputCoordinates,outputCoordinates]);
}

function beinaktuator(i,step) {
   var neuer_winkel = atan2(uc_inputCoordinates[i*2+1],uc_inputCoordinates[i*2]) + step;
   uc_inputCoordinates[i*2] = cos(neuer_winkel);
   uc_inputCoordinates[i*2+1] = sin(neuer_winkel);
   DirectKinematic();
}

function paint_vector(ppos, pvec) {
   
   return arrow({pos: ppos, shaftwidt: 0.6, color:color.green, axis_and_length: pvec});
   
}

function press_paint() {
   var ppos = Bein2.p_middle;
   var pvec = vec(0.0904862404326663,-0.46803781564341,0.879063617390748);
   //var spielzeug = paint_vector(ppos,pvec);
}

function animation_rate() {
   meineAnimation.next_step();
   if(meineAnimation.on) rate(70,animation_rate);
}   

function Animation() {
   
   this.animation_coordinates = [];
   this.animation_part_index = 0;
   this.animation_parts = 0;
   this.animation_index = [];
   this.animation_stop = [];
   this.on = true;
   this.setter = [];
   
   this.next_step = function() {
      this.setter[this.animation_part_index](...this.animation_coordinates[this.animation_part_index][this.animation_index[this.animation_part_index]]);
      this.animation_index[this.animation_part_index] += 1;
      if(this.animation_index[this.animation_part_index] >= this.animation_stop[this.animation_part_index]) {
         this.animation_part_index += 1;
         if (this.animation_part_index >= this.animation_parts) this.on=false;
      }
   };
            
   this.SetAnimation = function(arr) {
      this.animation_coordinates = [];
      this.animation_part_index = 0;
      this.animation_parts = 0;
      this.animation_index = [];
      this.animation_stop = [];
      this.on = true;
      this.setter = [];
      
      for (i=0; i<arr.length; i++){
         if(arr[i].length != 0) {
            this.animation_coordinates.push(arr[i]);
            this.animation_parts += 1;
            this.animation_index.push(0);
            this.animation_stop.push(arr[i].length);
            this.setter.push(InverseKinematic);
         }
      }
      
      if (this.animation_coordinates.length == 0) this.on = false;
   };
    
}

function goHome() {
   console.log(linearCartesianArray([outputCoordinates[0],outputCoordinates[1], outputCoordinates[2], outputCoordinates[5]], Home));
   meineAnimation.SetAnimation([linearCartesianArray([outputCoordinates[0],outputCoordinates[1], outputCoordinates[2], outputCoordinates[5]], Home)]);
   if(meineAnimation.on) animation_rate();
}

function widecircleAnimation() {
   console.log(arcArray(3.0, [outputCoordinates[0],outputCoordinates[1], outputCoordinates[2], outputCoordinates[5]]));
   meineAnimation.SetAnimation([arcArray(3.0, [outputCoordinates[0],outputCoordinates[1], outputCoordinates[2], outputCoordinates[5]])]);
   if(meineAnimation.on) animation_rate();
}

function linearCartesianArray(startCoordinates,targetCoordinates) {
   
   var px,py,pz,sg;
   [px,py,pz,sg] = startCoordinates;
   var Way = [-px + targetCoordinates[0],-py + targetCoordinates[1],-pz + targetCoordinates[2], -sg + targetCoordinates[3]];

   var coord_collection = [];
   
   var size = Math.max(...Way.map(Math.abs))/cstep;
   
   for (i = 0; i < size; i++) {
      coord_collection.push([px + (i+1)*Way[0]/size, py + (i+1)*Way[1]/size, pz + (i+1)*Way[2]/size, sg + (i+1)*Way[3]/size]);
   }
   
   return coord_collection;   
}

function arcArray(r, startCoordinates) {
   var winkel = Math.atan2(startCoordinates[1],startCoordinates[0]);
   var sg0 = startCoordinates[3];
   var var_winkel = 0;
   var var_radius = 0;
   var coord_collection = [];
   var pz_origin = startCoordinates[2]; 
   var radius = Math.sqrt(Math.pow(startCoordinates[0],2) + Math.pow(startCoordinates[1],2));
   

   
   var Way = 12*pi - winkel;
   var steps = Way/0.05;
   var time = 0;
   
   for (i=0; i<steps; i++) {
      time = (i+1)/steps;
      var_winkel = winkel + time*Way;
      var_radius = r*1/(1+Math.exp(-time*r)*(r/radius-1));
      
      px = cos(var_winkel)*(var_radius);
      py = sin(var_winkel)*(var_radius);
      pz = 5*time*(time - 1) + pz_origin;
      
      coord_collection.push([px,py,pz,sg0]);
   }
   
   return coord_collection;
   
}


var ex = vec(1,0,0);
var ey = vec(0,1,0);
var ez = vec(0,0,1);
var p = vec(0,0,2);

var Bein1 = new DeltaLeg(0,pi/3,pi/4,pi/2,1,0,true,3.5);
var Bein2 = new DeltaLeg(2*pi/3,pi/3,pi/4,pi/2,1,0,false);
var Bein3 = new DeltaLeg(4*pi/3,pi/3,pi/4,pi/2,1,0,false);
var BricardChain = new BricardChain(p,ex,ey,ez,0,atan(sqrt(3))*2,0,atan(-sqrt(3))*2,0,atan(sqrt(3))*2);
DeltaUpdate(inputCoordinates, outputCoordinates);
var meineAnimation = new Animation(100);


var Home = [0,0,5,0.6];







      //document.write("<br>");
      //document.write([this.p_end_a1]);
      //document.write("<br>");
      //
