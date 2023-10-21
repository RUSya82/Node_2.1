//************** Базовые типы ***********************//
// Массивы
// 1. Массив строк
let strArr: string[] = ['Anton', 'Sergey', 'Ruslan'];
// 2. Массив чисел
let numberArr: number[] = [1, 564, 8478, 656];
// 3. Tuples(кортежи)
let tuple: [number, string] = [32, 'asjdh']

//Функции
function greet(name: string, surname: string): string {
    return `${name} ${surname}`
}

numberArr.map((x: number) => x + 1)

//объекты в параметрах и необязательные типы
function coord(coord: { x: number, y?: number }): number {
    const {x, y} = coord;
    if (y != undefined) {
        return x + y
    }
    return x;
}

//************** Union types**************//
let a: number | string = 5;
a = 'dfsdf';

// in functions
function printId(id: number | string) {
    if (typeof id === "string") {
        id = id.toUpperCase();
    }
    console.log(id)
}

//**** Types & Interfaces  ****************//
type coord = { lat: number, lnt: number };

function operate(crd: coord) {
    return crd.lat / crd.lnt
}

//типы могут описывать union
type ID = number | string;

//наследование
type Animal = { name: string };
type Dog = Animal & {
    tail?: boolean
}
//************* литеральные типы **************************//
type direction = 'left' | 'right' | 'up' | 'down';

function move(dir: direction) {
    return 'animal move to' + dir;
}

move('right');//принимает только left, right, up, down
//или другие литералы
type interfaces = 232 | 422 | 485;

//**************** Enum ********************************
enum Direction {
    Left,
    Right,
    Up,
    Down
}

// обращение, например Direction.Left

//********************* Generics **********************//
function log<T>(a: T): T {
    console.log(a);
    return a;
}

log<string>('sdfsdf');
log<number>(1235456);

function log2<T, K>(obj: T, arr: K[]): K[]{
    console.log(obj);
    return arr;
}
log2<number[], string>([1 ,54, 6589], ['dfkjgn'])