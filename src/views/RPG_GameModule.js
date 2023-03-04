
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function distanceCalculation(array1 = [0, 0], array2 = [0, 0]) {
  var _dis = Math.sqrt(Math.pow((array1[0] - array2[0]), 2) + Math.pow((array1[1] - array2[1]), 2));
  //console.log('%c _dis:', 'color: blue', _dis);

  return _dis;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  healthPoints = 100;
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
    this.coordinatePosition = [getRandomInt(0, mapSize[0]), getRandomInt(0, mapSize[1])]; 
    //console.log('%c this.mapSize:', 'color: red', mapSize);
    //console.log('%c this.coordinatePosition:', 'color: red', this.coordinatePosition);
    this.timerlist.push(setInterval(this.attackSpeedInterval.bind(this), this.attackSpeed * 1000));
    this.timerlist.push(setInterval(this.speedOfActionInterval.bind(this), this.speedOfAction * 100));
  }
  
  attackSpeedInterval() {
    if (this.state == "in combat") {
      CentralManager.instance._GamePlayer.injuried(this.name,5);
    }
    //console.log('%c attackSpeedInterval:', 'color: red');
  }
  speedOfActionInterval() {
    //console.log('%c this.speedOfActionInterval:', 'color: red', this.coordinatePosition);
    var central =CentralManager.instance;
    //console.log('%c central:', 'color: red', central);
    //console.log('%c determineWhetherItIsInTheCombatRange:', 'color: red', _dis);
    if (this.state=="on standby"){
      this.destinationAngle = getRandomInt(0, 360); 
      var _RandomMovement = getRandomInt(1, this.maximumRangeOfMovement);
      this.destinationCoordinates = movePoint(this.coordinatePosition[0], this.coordinatePosition[1], this.destinationAngle,
        _RandomMovement);
       
      var pass = false;
      while (!pass) {
        //console.log('%c _temp', 'color: blue', _temp);
        this.destinationAngle = getRandomInt(0, 360);
        this.destinationCoordinates = movePoint(this.coordinatePosition[0], this.coordinatePosition[1], this.destinationAngle,
          getRandomInt(1, this.maximumRangeOfMovement))
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
    else if (this.state == "on the move")
    {
      if (distanceCalculation(this.coordinatePosition, this.destinationCoordinates) > 1){
        this.coordinatePosition = movePoint(this.coordinatePosition[0], this.coordinatePosition[1], this.destinationAngle, 0.1); 
        var _dis = central._GamePlayer.determineWhetherItIsInTheCombatRange(this.coordinatePosition);
        if (_dis < 6) {
          this.state = "in combat"
        }
      }
      else{
        this.state = "on standby"
        //console.log('%c this.state:on standby', 'color: blue');
      }

    }
    //console.log('%c speedOfActionInterval:', 'color: red');

  }
  beforeDestroy() {
    console.log('%c beforeDestroy:', 'color: red', `beforeDestroy: ${this.name}`);
    this.timerlist.forEach((element) => {
      clearInterval(element);
    });
    // this.timerlist.forEach(function (value) {
    //   console.log(value);
    // });
  }
  injuried(_attacker="空",_damageValue=0){
    if (this.healthPoints > 0) {
      this.healthPoints -= _damageValue;
      console.log('%c this.healthPoints:', 'color: red', this.healthPoints);

      //CentralManager.instance.addLogMessage(`The ${this.name} takes ${_damageValue} points of damage `);
      CentralManager.instance.addLogMessage(`The ${_attacker} attacks the ${this.name}, causing ${_damageValue} points of damage. `);

      
      if (this.healthPoints <= 0) {
        CentralManager.instance.addLogMessage(`The ${this.name} is dead `);
        this.healthPoints = 0;
        this.beforeDestroy();
        console.log('%c CentralManager.instance:', 'color: red', CentralManager.instance);

      }
    }

  }
  determineWhetherItIsInTheCombatRange(inputCoordinate){
    return distanceCalculation(this.coordinatePosition, inputCoordinate);
  }
  refreshMapSize(){
    this.coordinatePosition = [mapSize[0] / 2, mapSize[1] / 2]; 
  }
}
export class GamePlayer extends GeneraAbilityValue {
  constructor() {
    super();
    //console.log('%c SlimeMonster:', 'color: red');

    this.name = "Player";
    console.log('%c this.coordinatePosition:', 'color: red', this.coordinatePosition);
  }
  speedOfActionInterval() {
    //console.log('%c GamePlayer.speedOfActionInterval:', 'color: #34a7ce8f');

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
export class CentralManager{

  _monsterManager = new MonsterManager();
  _BackpackBool=false;
  _AbilityTableBool = false;
  _CoordinatesPanal = false;
  _GamePlayer = new GamePlayer();
  _LogMessage=[];
  timerlist = [
  ];
  constructor() {
    if (!CentralManager.instance) {
      CentralManager.instance = this;
    }
    //return CentralManager.instance;
    console.log('%c CentralManager:', 'color: #afcdf3;');
    this.timerlist.push(setInterval(this.setAllCoordinatesPoint.bind(this), this.speedOfAction * 500));
  }
  setAllCoordinatesPoint() {

    var canvas = document.getElementById("MiniMap");
    //console.log(canvas)
    if (canvas == null)
       return false;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var _list = this._monsterManager.getJSON_MonsterMaplist(); 
    _list.push(this._GamePlayer);

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
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#c82124'];

    for (let index = 0; index < _list.length; index++) {

      if (_list[index].name=='Player'){
        ctx.fillStyle = '#000000';
      }
      else{
        ctx.fillStyle = '#ff0000';
      }
      //var zzz = colors[getRandomInt(0, colors.length)];

      //console.log('%c zzz:', 'color: yellow', getRandomInt(0, colors.length));
      ctx.beginPath();
      const element = _list[index].coordinatePosition;
      ctx.arc(element[0], element[1], 1, 0, 2 * Math.PI);      
      ctx.fill();
      //ctx.stroke();
    } 
    //console.log("This is a static function.");
  }
  enterMap(mapData){
    //var mapData = eval(`${mapData.}`);
    this.addLogMessage(`EnterMap ${mapData.mapName}`);

    console.log('%c mapData:', 'color: green', mapData);
    mapSize = mapData.mapSize;
    this._GamePlayer.refreshMapSize();
    var canvas = document.getElementById("MiniMap");
    //console.log(canvas)
    if (canvas == null)
      return false;
    var ctx = canvas.getContext('2d');
    canvas.width = mapSize[0];
    canvas.height = mapSize[1];
    this.addLogMessage("mapInitializationMonster");

    this._monsterManager.mapInitializationMonster(mapData.mapMonster);
  }
  viewAllCoordinates(){
    this._CoordinatesPanal = !this._CoordinatesPanal;
    //return _list.filter(word => word.length > 6);
    // for (let index = 0; index < _list.length; index++) {
    //   const element = _list[index].coordinatePosition;
    //   //console.log('%c viewAllCoordinates:', 'color: blue', element);
    // } 
  }
  obtainBiologicalInformationOnTheMap(){
    var _list = this._monsterManager.getJSON_MonsterMaplist();
    _list.push(this._GamePlayer);
    return _list;
  }
  centralBeforeDestroy(){
    var _list = this._monsterManager.getMonsterMaplist();
    _list.push(this._GamePlayer);
    //this._GamePlayer.beforeDestroy();
    for (let index = 0; index < _list.length; index++) {
      const element = _list[index];
      _list[index].beforeDestroy();
    }
  }
  addLogMessage(logMessage=""){
    this._LogMessage.push(logMessage);
    if (this._LogMessage.length>50) {
      //this._LogMessage.pop(); 
      this._LogMessage.shift();
    }

  }
  static showThis() {
    console.log('%c showThis:', 'color: blue', CentralManager.instance);
    
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
    this.getJSON_MonsterMaplist = function () {
      //this.monsterMaplist = JSON.parse(JSON.stringify(monsterMaplist));
      return JSON.parse(JSON.stringify(monsterMaplist));
    }
    this.getMonsterMaplist = function () {
      //this.monsterMaplist = JSON.parse(JSON.stringify(monsterMaplist));
      return monsterMaplist;
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



//export default zzz=new MonsterManager();



//declare module 'MapAreaMonsterTable'
