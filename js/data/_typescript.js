const TypeScript = [
  [
    `Типизация параметров ф-ции`,
    `<b>function some (obj: {width: number, name: string}) { }</b><br>Типизация параметра в качестве объекта<hr><b>function some (callback: (n: number) => void) {}</b><br>Типизация параметра в качестве переданной callback<hr><b>function some (n: number): string {}</b>Типизация возвращаемого значения ф-ции. Если ф-ции ничего не возвращает то будет void<hr><pre>
function some (): never {
throw new Error('error'); 
}</pre>Для ф-ций тип never используется если они выбрасывают ошибку или выполняются бесконечно(если отметить типом never переменную или свойство объекта то в дальнейшем указать какое либо значение в нее будет невозможно)<hr><b>function some (...args: number[]): void {}</b>Типизация rest параметров ф-ции<hr><b>function some (a: string, b?: number): void {}</b>Типизация опционального параметра. В этом случае необходимо проверять этот параметр в теле ф-ции перед его использованием`
  ],
  [
    `Типизация массива`,
    `<b>const ar: string[] = ['a', 'b'];</b> - типизация массива со строками`
  ],
  [
    `Тип never`,
    `<pre>
function someF(): never {
throw new Error('ERROR'); 
}</pre>Тип используется в функциях если она выбрасывает ошибку<pre>
type Obj = {
id?: never;
[key: string]: boolean; 
}</pre>В объектах тип never используется для исключения какого то свойста. Т.е. объект не может иметь свойство id`
  ],
  [
    `Типизация после преобразования формата`,
    `<pre>
const somethingJson = '{ "title": "Hello TypeScript" }';
cons obj = JSON.parse(somethingJson);</pre>Тут объект obj получит тип any потому что TS не может определить что за тип вернет ф-ция<pre>
const a = '{ "value": "text" }';
type A = { value: string }
const b: A = JSON.parse(a);</pre>Теперь все работает как надо и объект получил нужный тип`
  ],
  [
    `Автоматическая типизация`,
    `<b>const a = 'text';</b> Тут TS автоматически присвоил тип string потому что переменная была инициализированна при объявлении<br>
    <pre>
let b;
b = 'text';</pre> А тут TS присвоит тип any потому что инициализация была позже чем объявление и при объявлении ей был присвоен тип any`
  ],
  [
    `Типизация объекта с динамическими полями`,
    `<pre>
let permission: {
[propertyName: string]: boolean | number,
};</pre>Тут с помощью специальной сигнатуры указали что ключ объекта строка а его значение может быть либо булево либо число`
  ],
  [
    `Указание переменной свойста только для чтения`,
    `<pre>
let guitarPlayer: {
readonly firstname: string,
readonly lastname: string,
guitarCount: number,
};</pre>Здесь двум полям объектауказали что они только для чтения и дальнейшие попытки изменить их приведут к ошибке TS<br>
<b>const arr: readonly string[] = ['text', 'text2'];</b> а тут указали целый массив который нельзя изменить`
  ],
  [
    `Объединение типов`,
    `<b>const a: string | number = 'text';</b>Позволяет указывать несколько возможных типов для переменных, но в таком случае следует производить некоторые проверки перед использованием таких переменных`
  ],
  [
    `Дженерики`,
    `Дженерик - это обобщенный тип который нужен для более гибкого создания типов. По сути это абстрактный каркас позволяющий указывать типы данных на этапе использования<pre>
type SomeType&lt;T&gt; {
id: number;
any: T; 
}
const variable: SomeType&lt;string&gt; = {
id: 4,
any: 'hello' 
}</pre>Позволяет передать тип на этапе использования подобно аргументу ф-ции<pre>
type SomeType = {
id: number;
name: string; 
}
type ObjKeys&lt;T&gt; = keyof T;
type SomeTypeKeys = ObjKeys&lt;SomeType&gt;\;
const key: SomeTypeKeys = 'name';</pre>Создает обобщенный тип на основе ключей объекта. По сути берет ключи объекта и превращает их в строковый или числовой литерал и обобщает через |<hr>
<b>type SomeType&lt;T = string&gt; = { ... };</b> - Создание дженерика с значением по умолчанию<pre>
function someFunc&lt;T&gt; (arg: T): T {
return arg; 
}
someFunc&lt;number&gt;(4);</pre>Дженерик в ф-ции позволяет более гибко использовать ф-цию указывая тип на этапе использования<hr>
<b>const someFunc = &lt;T&gt;(arg: T): T => { ... }</b> - дженерик в стрелочной ф-ции<pre>
type SomeType&lt;T, U&gt; = {
id: T;
name: U; 
}
const x: SomeType&lt;number, string&gt; = {
id: 4,
name: 'Bob' 
}</pre>В дженериках можно использовать несколько условных типов<pre>
type SomeType = {
length: number;
}
function someFunc&lt;T extends SomeType&gt;(arg: T): number {
return arg.length;
}</pre>Ограничения дженерика позволяют указывать некие условия. В данном случае мы указываем что тип аргумента должен содержать свойство length с числовым значением`
  ],
  [
    `Создание типа на основе другого`,
    `<pre>
type a = {
id: number;
name: string;
trigger: boolean;
}
type b = Omit&lt;a, 'id'&gt;\;</pre>Создает новый тип на основе другого при этом позволяет удалять одно или нескольких свойств<br>
<b>type c = Omit&lt;a, 'id' | 'name'&gt;\;</b> - удаляет сразу несколько свойств<hr>
<b>type d = Omit&lt;a, keyof b&gt;\;</b> - новый тип на основе типа a но при этом исключает всей свойства что есть в типе b<hr>
<b>type e = Pick&lt;a, 'id' | 'trigger'&gt;\;</b> - новый тип на основе a при этом будут записаны только указанные свойства`
  ],
  [
    `Типизация смешанного массива`,
    `<b>const ar: (string | number)[] = [123, 'text, 'another', 44];</b> - описание типа для смешанного массива`
  ],
  [
    `Интерфейсы`,
    `<pre>
interface IDev {
num: number;
funct: () => void; 
}</pre>Создание простого интерфейса. Интерфейс во многом похож на type но имеет ряд отличий. Хорошо применяется в ООП разработке классов и библиотек<hr><b>class SomeClass implements IDev { }</b> Создание класса наследуемого интерфейс<pre>
interface A {
age: number; 
}
interface B {
eat: () => void; 
}
interface C extends A, B {
name: string;
}
const x: C = {
age: 15,
name: 'Bob',
eat () {} 
}</pre>Использование интерфейса унаследованного от других. Наследование нескольких интерфейсов возможно если указать их через ,.<pre>
interface A {
age: number; 
}
interface A {
name: string; 
}
const x: A = {
age: 3,
name: 'Bob' 
}</pre>Если в 1 блоке кода создать 2 интерфейса с одинаковым именем они сольются в 1. В целом интерфейсы похожи на перечисления но их можно сливать вместе и наследовать<br>При пересечении(&) или объединении(|) интерфейсов на выходе получим enum<pre>
class A {
jump () {} 
}
interface B extends A {
walk: () => void; 
}
class D extends B {
jump () {}
walk () {}
some() {} 
}</pre>Интерфейс также может наследовать из класса<pre>
interface Ix = [string, number]; // - так сделать не получится
interface Imy {
name: string;
someAr: [string, number]; 
}</pre>Интерфейс не может определять кортеж но можно определять кортеж внутри него`
  ],
  [
    `Кортеж`,
    `<b>const a: [string, number] = [4, 'text'];</b>Объявление кортежа. Кортеж по сути это массив с ограничениями по длине и содержимому где нельзя удалять/добавлять/изменять тип содержимого а также менять порядок элементов. Также можно запретить изменять значения кортежа указав readonly.<hr>
    <b>const tuple = ['name', 15] as const;</b> - это упрощенная форма записи неизменяемого кортежа<hr> По сути это замороженный массив - <b>const tuples = (...args) => Object.freeze(args);</b>. При последующей работе с ним можно изменять его данные на данные того же типа. Также можно добавлять новые элементы через push и они будут видны при полном переборе массива, но взаимодействовать с новыми элементами будет нельзя. Для избежания такого поведения следует добавить свойство readonly - <b>const a = [4, 'text'] as const;</b><br><b>const a: [number, string, [...boolean[]] = [4, 'text', true, false];</b> - Спред оператор позволяет делать кортеж любой длины и добавлять ему сколько угодно булевых значений. Но на самом деле в таком случае мы можем добавлять любые типы и не получим ошибки!`
  ],
  [
    `Перечисления`,
    `<pre>
enum Dir {
LEFT: 'left',
RIGHT: 'right' 
}</pre>Перечисление это паттерн который по сути является объектом для указания каких то жестко фиксированных параметров чтобы избежать ошибок при подставлении их напрямую(в виде строки например). Свойста enum именуются большими буквами а также желательно чтобы их содержимое было 1 типом.<pre>
const Dir = {
LEFT: 'left',
RIGHT: 0 
}</pre>Для перечислений с разными типами лучше использовать обычный объект<pre>
var dir;
(function (dir) {
dir["LEFT"] = 'left';
...
})(dir || (dir = {}));</pre>При компиляции enum превращается в ф-цию в теле которой собирается объект. Поэтому в значение свойств перечислений можно также задавать ф-цию но тогда они должны что то возвращать НО только если enum не является const. В случае если const enum то компилятор будет просто возвращать значения свойств поэтому в них нельзя использовать результат вычисления ф-ций. Но если константа вообще ни где не используется то в компиляторе ее не будет. Главным преимуществом константных перечислений является то что они менее ресурсо затратные потому что при компиляции не создается и не вызывается ф-ция<pre>
const Direction = {
Left: 1,
Right: 2,
Up: 3,
Down: 4
} as const;</pre>В актуальных версиях TS можно создавать перечисления с помощью обычных объектов при этом в конце указав их как const<pre>
const Direction = {
Left: 1,
Right: 2,
Up: 3,
Down: 4
} as const;

type DirectionEnum = typeof Direction[keyof typeof Direction];</pre>Типизация ключей перечисления если перечисление создано как объект<pre>
type Direction = {
LEFT: 'left',
RIGHT: 'right' 
}
type X = keyof Direction;</pre>Типизация ключей перечисления если enum<hr>Если перечислениям не задано значение то оно автоматически становится числом. Компилятор устанавливает их по порядку начиная с 0<hr>
В значение перечислений можно передавать результат выполнения ф-ций, но тогда результатом ф-ции должно быть только число`
  ],
  [
    `Пересечение типов`,
    `<pre>
type First = {
a: number;
}
type Second = {
b: string; 
}
type All = First & Second;
const some: All = {
a: 4,
b: 'hello' 
}</pre>Пересечение типов позволяет объединять типы в 1. Т.е. результат пересечения должен содержать все поля переданных типов (как объединение объектов)`
  ],
  [
    `Создание псевдонимов типа`,
    `<pre>
type MyRect = {
width: number;
height: number; 
name: string;
trigger: true;
}</pre>Создание псевдонима для объекта<hr><pre>
type Callback = (message: string) => void;</pre>Создание псевдонима для ф-ции`
  ]
];