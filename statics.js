

function leg_directions(){
    var v1 = norm(Bein1.p_end.add(Bein1.p_middle.multiply(-1)));
    var v2 = norm(Bein2.p_end.add(Bein2.p_middle.multiply(-1)));
    var v3 = norm(Bein3.p_end.add(Bein3.p_middle.multiply(-1)));

    return [v1,v2,v3];
}

function leg_vert_directions() {
    var l1 = vec(0,1,0);
    var l2 = vec(-sqrt(3)/2,-0.5,0);
    var l3 = vec(sqrt(3)/2, -0.5,0);
    
    return [l1,l2,l3];
}


function bricard_directions() {

    var r1 = BricardChain.ex2;
    var r2 = BricardChain.ex3;
    var r3 = BricardChain.ex4;
    var r4 = BricardChain.ex5;
    var r5 = BricardChain.ex6;
    var r6 = BricardChain.ex7;
    
    return [r1,r2,r3,r4,r5,r6];
}


function prism_direction() {
    
    var prism = norm(Bein1.p_end);
    return prism;
    
}

function dreieck_directions() {
    
    var od = Bein2.p_end.add(Bein1.p_end.multiply(-1));
    var ud = Bein3.p_end.add(Bein1.p_end.multiply(-1));
    
    return [od,ud]
    
}



function vec_to_array(input_vec) {
    return [input_vec.x, input_vec.y, input_vec.z];
}



function set_outer_les(fp) {
    var v = leg_directions();
    var l_quer = leg_vert_directions();
    
    var od = dreieck_directions()[0];
    var ud = dreieck_directions()[1];
    
    
    var odc = od.cross(v[1]);
    var udc = ud.cross(v[2]); 
    
    
    var cross1_p = (l_quer[0].cross(v[0]));
    var cross2_p = (l_quer[1].cross(v[1]));
    var cross3_p = (l_quer[2].cross(v[2]));

    cross1_p = cross1_p.multiply(pl);
    cross2_p = cross2_p.multiply(pl);
    cross3_p = cross3_p.multiply(pl);
    
    //console.log([[0,0,0],vec_to_array(l_quer[0]), pl,vec_to_array(cross1_p),vec_to_array(cross2_p),vec_to_array(cross3_p)]);

    var mleso = math.matrix([[0,0,0],vec_to_array(odc),vec_to_array(udc),vec_to_array(cross1_p),vec_to_array(cross2_p),vec_to_array(cross3_p)]);
    var mlesu = math.matrix([vec_to_array(v[0]),vec_to_array(v[1]), vec_to_array(v[2]), math.matrix([0,0,0]), math.matrix([0,0,0]), math.matrix([0,0,0])]);
    var mles = math.concat(math.transpose(mleso),math.transpose(mlesu),0);

    var tvec = math.matrix([0,0,0].concat(vec_to_array(fp)));
    
    return [mles,tvec];
           
}






function print (value) {
  var precision = 14;
  console.log(math.format(value, precision));
}