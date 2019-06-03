//based on voronoi shaders from: https://thebookofshaders.com/

const Materials = require('Materials');
const R = require('Reactive');
const S = require('Shaders');
const Random = require('Random');



let points =[];
let nPoints = 20;

const uv = S.fragmentStage(S.vertexAttribute({'variableName': S.VertexAttribute.TEX_COORDS}));


for(let i=0;i<nPoints; i++){
      
    let x = Random.random();
    let y = Random.random();
    points[i] = R.pack2(x, y);
   
}


let m_dist = 1.;
let m_point = R.pack2(0,0);  


for (let i = 0; i < nPoints; i++) {

    let newPoint = R.pack2( points[i].x, points[i].y);    
    let dist = R.distance(uv, newPoint);
    
    let cond = R.step(m_dist,dist) ;
    
    m_dist = R.add(R.mul(dist,cond), R.mul(m_dist,R.sub(1,cond)));

    m_point = R.add(R.mul(points[i],cond), R.mul(m_point,R.sub(1,cond)));

}


let v = R.mul(m_dist, 3.);

let color = R.pack4(v,m_point.x,m_point.y,1.);

Materials.get('defaultMaterial0').setTexture(color, {textureSlotName: "diffuseTexture"});

