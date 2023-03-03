
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function distanceCalculation(array1 = [0, 0], array2 = [0, 0]) {
  var _dis = Math.sqrt(Math.pow((array1[0] - array2[0]), 2) + Math.pow((array1[1] - array2[1]), 2));
  //console.log('%c _dis:', 'color: blue', _dis);

  return _dis;
}
function movePoint(x, y, angle, distance) {
  //console.log('%c movePoint:', 'color: red', x, y, angle, distance);

  const radians = angle * Math.PI / 180; // 將角度轉換為弧度
  const dx = distance * Math.cos(radians);
  const dy = distance * Math.sin(radians);
  return [x + dx, y + dy];  
}
function removeDecimalsFromArray(array = []){
  for (let index = 0; index < array.length; index++) {
    array[index] = Math.floor(array[index]);
  }
  // array.forEach(element => {
  //      element = Math.floor(element);
  // });
  console.log('%c removeDecimalsFromArray:', 'color: red', array);
  return array;
}
function removeDecimalsCoordinates(array = []) {
    array[0] = Math.floor(array[0]);
    array[1] = Math.floor(array[1]);
  console.log('%c removeDecimalsCoordinates:', 'color: red', array);
  return array;
}
export class GeneraAbilityValue {
  speedOfAction = 0.7;
  healthPoints = 0;
  attackSpeed = 0.5;
  maximumRangeOfMovement =5;
  state = "on standby";
  timerlist= [
  ];
  coordinatePosition = [20, 20];
  destinationCoordinates= [5,5];
  destinationAngle =0;

  constructor(name= 0) {
    this.id = name;
    this.name = name;
    //this._this = this;
    this.coordinatePosition = [getRandomArbitrary(0, mapSize[0]), getRandomArbitrary(0, mapSize[1])]; 
    //console.log('%c this.mapSize:', 'color: red', mapSize);

    //console.log('%c this.coordinatePosition:', 'color: red', this.coordinatePosition);
    

    this.timerlist.push(setInterval(this.speedOfActionInterval.bind(this), this.speedOfAction * 100));
  }
  
  attackSpeedInterval() {
    //console.log('%c attackSpeedInterval:', 'color: red');
  }
  speedOfActionInterval() {
    //console.log('%c this.speedOfActionInterval:', 'color: red', this.coordinatePosition);
    var central =MiniMapManager.instance;
    //console.log('%c central:', 'color: red', central);
     
    if (this.state=="on standby"){
      this.destinationAngle = getRandomArbitrary(0, 360); 
      var _RandomMovement = getRandomArbitrary(1, this.maximumRangeOfMovement);
      this.destinationCoordinates = movePoint(this.coordinatePosition[0], this.coordinatePosition[1], this.destinationAngle,
        _RandomMovement);
       
      var pass = false;
      while (!pass) {
        //console.log('%c _temp', 'color: blue', _temp);
        this.destinationAngle = getRandomArbitrary(0, 360);
        this.destinationCoordinates = movePoint(this.coordinatePosition[0], this.coordinatePosition[1], this.destinationAngle,
          getRandomArbitrary(1, this.maximumRangeOfMovement))
        var _temp = this.destinationCoordinates;

        if (_temp[0] < mapSize[0] && _temp[1] < mapSize[1] &&
          _temp[0] > 1 && _temp[1] > 1) {
          pass = true;
        }
      }
      //console.log('%c new destinationCoordinates', 'color: blue', this.destinationCoordinates);

      this.state ="on the move";
      //console.log('%c this.state:on the move', 'color: blue');

    }
    //var _dis = distanceCalculation(this.coordinatePosition, this.destinationCoordinates);

    //console.log('%c this._dis:', 'color: red', _dis);
    else if (distanceCalculation(this.coordinatePosition, this.destinationCoordinates) >1)
    {
      this.coordinatePosition = movePoint(this.coordinatePosition[0], this.coordinatePosition[1], this.destinationAngle, 0.1); 
      //console.log('%c this.destinationCoordinates:', 'color: red', this.destinationCoordinates);
      //console.log('%c this.coordinatePosition:', 'color: red', this.coordinatePosition);

    }
    else{
      this.state = "on standby";
      //console.log('%c this.state:on standby', 'color: blue');
    }
    //console.log('%c speedOfActionInterval:', 'color: red');

  }
  beforeDestroy() {
    this.timerlist.forEach((element) => {
      clearInterval(element);
    });
    // this.timerlist.forEach(function (value) {
    //   console.log(value);
    // });
  }
}

export class GamePlayer{
  speedOfAction = 0.7;
  healthPoints = 0;
  attackSpeed = 0.5;
  maximumRangeOfMovement = 5;
  state = "on standby";
  timerlist = [
  ];
  coordinatePosition = [20, 20];
  destinationCoordinates = [5, 5];
  destinationAngle = 0;

  constructor(index= 0) {
    //super(index);
        
  }


}

export class SlimeMonster extends GeneraAbilityValue {
  constructor() {
    super();
    //console.log('%c SlimeMonster:', 'color: red');
    
    this.healthPoints = 5;
    this.name = "Slime";
    
  }
}
export class GoblinMonster extends GeneraAbilityValue {
  constructor() {
    super();
    //console.log('%c GoblinMonster:', 'color: red');

    this.healthPoints = 50;
    this.name = "Goblin";
  }
}
var mapSize = [5, 5];
export class MiniMapManager{

  _monsterManager = new MonsterManager();
  _BackpackBool=false;
  _AbilityTableBool = false;
  _CoordinatesPanal = false;
  _GamePlayer = new GamePlayer();
  timerlist = [
  ];
  constructor() {
    if (!MiniMapManager.instance) {
      MiniMapManager.instance = this;
    }
    //return MiniMapManager.instance;
    console.log('%c MiniMapManager:', 'color: #afcdf3;');
    this.timerlist.push(setInterval(this.setAllCoordinatesPoint.bind(this), this.speedOfAction * 500));
  }
  setAllCoordinatesPoint() {
    var canvas = document.getElementById("MiniMap");
    //console.log(canvas)
    if (canvas == null)
       return false;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var _list=this._monsterManager.getMonsterMaplist(); 
    //console.log('%c _list:', 'color: yellow', _list);
    //console.log('%c _list:', 'color: yellow', canvas.width, canvas.height);


    // for (let index = 0; index < _list.length; index++) {
    //   const element = _list[index].coordinatePosition;
    //   ctx.rect(element[0], element[1], 5, 5);
    // } 
    // ctx.fillStyle = "blue";//填充顏色,預設是黑色
    // ctx.fill();//填滿產生
    
    // ctx.closePath();
    
    //-----------circle-----------
    //ctx.strokeStyle = "rgb(255 255 255 / 100%)";
    //ctx.lineWidth = 1;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff'];

    for (let index = 0; index < _list.length; index++) {
      ctx.beginPath();
      const element = _list[index].coordinatePosition;
      ctx.arc(element[0], element[1], 1, 0, 2 * Math.PI);
      ctx.fillStyle = colors[getRandomArbitrary(0, colors.length)];
      ctx.fill();
      //ctx.stroke();
    } 
    //ctx.closePath();
    //console.log("This is a static function.");
  }
  enterMap(mapName){
    var mapData = eval(`${'NOVICE_MAP'}`);
    console.log('%c mapData:', 'color: green', mapData);
    mapSize = mapData.mapSize;
    var canvas = document.getElementById("MiniMap");
    //console.log(canvas)
    if (canvas == null)
      return false;
    var ctx = canvas.getContext('2d');
    canvas.width = mapSize[0];
    canvas.height = mapSize[1];
    this._monsterManager.mapInitializationMonster(mapData.mapMonster);
  }
  viewAllCoordinates(){
    this._CoordinatesPanal = !this._CoordinatesPanal;
    var _list = this._monsterManager.getMonsterMaplist(); 
 

    //return _list.filter(word => word.length > 6);
    // for (let index = 0; index < _list.length; index++) {
    //   const element = _list[index].coordinatePosition;
    //   //console.log('%c viewAllCoordinates:', 'color: blue', element);
    // } 


  }
  static showThis() {
    console.log('%c showThis:', 'color: blue', MiniMapManager.instance);
    
  }
}

export class Person {
  constructor() {
    console.log("Person");
  }
}

export class MonsterManager {
  constructor() {
    let monsterMaplist = [];

    //console.log('%c Mons terManager_constructor:', 'color: red');
    this.generateSpecifieMonster = function (monsterName) {
      monsterMaplist.push(eval(`new ${monsterName}()`));
    //console.log('%c GenerateSpecifieMonster_monsterMaplist:', 'color: red', this.monsterMaplist);
    //this.monsterMaplist.push(new GoblinMonster());
    }

    this.getMonsterMaplist = function () {

      //this.monsterMaplist = JSON.parse(JSON.stringify(monsterMaplist));

      return JSON.parse(JSON.stringify(monsterMaplist));
    }
    this.mapInitializationMonster = function (mapList) {
        mapList.forEach(element => {
        var numberOfMonsters = monsterMaplist.filter(x => x.name === element.name).length;

        while (numberOfMonsters < element.maxNumber) {
          this.generateSpecifieMonster(element.className);
          numberOfMonsters += 1;
        }
        //console.log('%c mapInitializationMonster:', 'color: red', this.monsterMaplist);
      });
    }


  }


}

export const callEval = (FuncionName) => {
  return eval(`new ${FuncionName}()`)
};

export const ABYSS_MAP =
{
  mapSize: [500, 500],
  mapMonster: [
    { className: "SlimeMonster", maxNumber: 6, name: "Slime" },
    { className: "GoblinMonster", maxNumber: 0, name: "Goblin" }
  ]
};

export const NOVICE_MAP =
  {
  mapSize: [100, 100],
  mapMonster:[
    { className: "SlimeMonster", maxNumber: 4, name: "Slime" },
    { className: "GoblinMonster", maxNumber: 0, name: "Goblin" }
  ]};

//export default zzz=new MonsterManager();



//declare module 'MapAreaMonsterTable'
