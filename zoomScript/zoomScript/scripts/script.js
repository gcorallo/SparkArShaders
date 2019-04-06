//imports
const Materials = require('Materials');
const Textures = require('Textures');
const Reactive = require('Reactive');
const Shaders = require('Shaders');
const Animation = require('Animation');


//set up the animation:
const timeDriver = Animation.timeDriver({durationMilliseconds: 5000, loopCount: Infinity});
const linearSampler = Animation.samplers.linear(1, 0);
timeDriver.start();

const t = Animation.animate(timeDriver, linearSampler);

//Get the zoom coords
function zoomCoords(uv_, ammount_){

    const center = Reactive.pack2(0.5, 0.5);
    uv_ = Reactive.sub(uv_, center);
    uv_ = Reactive.pack2(Reactive.mul(uv_.x, ammount_),Reactive.mul(uv_.y, ammount_) ) ;
    uv_ = Reactive.add(uv_, center);   

    return uv_;
}


const camsignal = Textures.get('CameraTexture').signal;
const  uv = Shaders.functionVec2();


//texture sample 
var camSampled = Shaders.composition(camsignal, zoomCoords(uv, t));


//set the texture to the material
const material = Materials.get('defaultMaterial0');
material.setTexture(camSampled, {textureSlotName: "diffuseTexture"});