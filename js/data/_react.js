const React = [
  [
    'Быстрое создание проекта на React',
    `<b>npm i create-react-app x</b> - Быстрое создание макета для приложения где х необязательный параметр указывающий на имя папки с проектом<br><b>npx create-react-app x --template у</b> - Быстрое создание макета приложения по шаблону переданному в у(например redux)`
  ],
  [
    'Объект события в React',
    `При обработке события какого либо элемента также можно обращаться к объекту события (evt) как и в обычном JS. Но React использует обертку SyntheticEvent там есть все тоже что и в обычном nativeEvent. Если есть необходимость получить нативный объект можно обратиться к свойству - <b>evt.nativeEvent</b><hr>
    Чтобы поймать событие на стадии перехвата можно использовать props <eventName>Capture. Например - <b>&lt;button onClickCapture={someHandler} /&gt;</b><hr>
    При добавлении обработчика события React не добавляет его в DOM элемент а делегирует его на главный контейнер(div root) где там уже идет распределение`
  ],
  [
    'Virtual DOM',
    `Паттерн позволяющий обновлять интерфейс более оптимальным способом. По сути это объект хранящийся в памяти, являющийся посредником между DOM и кодом. Сначала все изменения происходят на нем а затем переносятся на реальный DOM`
  ],
  [
    'useParams()',
    `<pre>
const Component = () => {
const params = useParams();
...
render();
}</pre>Позволяет получить переданные параметры в адресную строку (ID и т.д.). Сам хук возвращает объект который имеет свойста названные так как было указано в маршрутизации (...url.../:id)`
  ],
  [
    'Различные фишки',
    `Если на 1 странице имеется скроллбар а на 2 нет, то при переходе контент будет прыгать в стороны. Чтобы избежать этого контейнеру можно задать свойство <b>margin-left: calc(100vw - 100%);</b>`
  ],
  [
    'useRef()',
    `<pre>
const SomeComp = () => {
const formRef = useRef(null);
return (
  &lt;Form ... ref={formRef}&gt;
    ...
  &lt;/Form&gt;
  {
    formRef.current && &lt;p&gt;Данные формы полученны&lt;/p&gt;
  }
); 
}</pre>Хук useRef позволяет получить доступ к элементу на странице но только после отрисовки компонента. Необходим для работы с неконтролируемыми элементами а также сторонними ресурсами и просто чтобы получить доступ к DOM. Сам элемент хранится в свойстве current`
  ],
  [
    'useCallback()',
    `<pre>
const SomeComp = () {
const eventHandler = useCallback(() => {
  ...
}, []); 
return (
  &lt;AnotherComp someProp={eventHandler} /&gt;
);
}</pre>По скольку чтобы изменить что то в родительском элементе из дочернего необходимо передать какойто callback, то для того чтобы избежать лишних перерисовок(мемоизация) используется хук useCallback, который мемоизирует переданную callback функцию. В качестве параметра принимает в себя необходимую ф-цию и возвращает уже обернутую ф-цию`
  ],
  [
    'Выпадающий список',
    `<pre>
const SomeComp = () => {
const [select, setSelect] = useState('a');
return (
  &lt;select value={select}&gt;
    &lt;option value='a' /&gt;
    &lt;option value='b' /&gt;
  &lt;/select&gt;
); 
}</pre>Если в обычном HTML чтобы указать какой то элемент из выпадающего списка выбранным достаточно указать ему свойство selected, то в JSX разметке необходимо задать свойству value самого select значение необходимого элемента списка`
  ],
  [
    'Контролируемые формы',
    `<pre>
const SomeComp = () => {
const [formData, setFormData] = useState({name: '', age: ''});

const changeHandler = (e) => {
  const {name, value} = e.target;
  setFormData({...formData, [name]: value}));
}

return (
  &lt;input name='name' onChange={changeHandler} value={formData.name} /&gt;
);
}</pre>Создание контролируемой формы. Сначала создаем внутренне состояние с начальными значениями формы. Затем создаем обработчик события изменения поля формы где с начала получаем данные name и value а затем записываем их в состояние. После вешаем обработчик на поля формы. И обязательно задаем в свойство value значение из созданного состояния. Если этого не сделать то состояния начнут дублироваться`
  ],
  [
    'Сброс прокрутки страницы',
    `<pre>
function ScrollTop() {
const {pathname} = useParams();
useEffect(() => {
  window.scrollTo(0,0);
}, pathname); 
return null;
}

function App() {
return (
  &lt;BrowserRouter&gt;
    &lt;ScrollTop&gt;
      &lt;Routes&gt;
        ...
      &lt;/ScrollTop&gt;
    &lt;/ScrollTop&gt;
  &lt;/BrowserRouter&gt;
); 
}</pre>Компонент позволяющий сбросить прокрутку страницы в 0 т.к. при перерисовки компонентов скролл остается на прежнем месте. Такой компонент можно поместить в главный компонент(App). Для этого просто оборачиваем Routes в наш компонент. Внутри компонента используется хук useEffect подписанный на изменение адреса страницы и возвращает он null чтобы ничего не отрисовывать`
  ],
  [
    'NavLink',
    `Тоже самое что и компонент Link только + еще умеет отслеживать открыт ли сейчас URL на который указана ссылка<pre>
&ltNavLink to="some" className={({isActive}) => {
return isActive ? 'link--active' : 'linl';
}} /&gt;</pre>
    Также вместо строки с классами в пропс className он принимает cb ф-цию которая принимает bool флаг и взависимости от него возвращает строку с тем или иным классом. Также пропс style принимает cb ф-ци`
  ],
  [
    'Создание собственного хука',
    `<pre>
const useFilm = (id) => {
const [film, setFilm] = useState({});
useEffect(() => {
  let update = true;
  fetch('some.json')
    .then(resp => resp.json())
    .then(resp => update && setFilm(resp));
}, [id]);
return film;
}
...
const SomeComp = (props) => {
const film = useFilm(props.id);
... 
}</pre>Создание и использование своего хука который делает запрос и возвращает объект с данными`
  ],
  [
    'Маршрутизация REACT компонентов',
    `<pre>
&lt;BrowserRouter&gt;
&lt;Routes&gt;
  &lt;Route path="/" element={&lt;Layout /&gt;}&gt;
    &lt;Route index element={&lt;Main /&gt;} /&gt;
    &lt;Route path="about" element={&lt;About /&gt;} /&gt;
  &lt;Route /&gt;
&lt;/Routes&gt;
&lt;/BrowserRouter&gt;</pre>Маршрутизация компонентов, где в данном примере компонент Layout остается неизменным независимо от маршрута, а меняется только часть его содержимого (в том месте где стоит компонент &lt;Outlet /&gt;). Index означает главную страницу.<pre>
&lt;Route path="*" element={&lt;NotFoundComponent /&gt;} /&gt;</pre>Маршрутизация для несуществующих страниц. Этот рут ставится в конце списка и означает что любой путь перенаправляет на компонент NotFoundComponent<pre>
&lt;Route path="/about/:id" element={&lt;SomeComp /&gt;} /&gt;

function SomeComp() {
const {id} = useParams();
... 
}</pre>Передача параметров в путь и использование его в компоненте<pre>
&lt;Route path="/about" element={&lt;Some /&gt;} &gt;
&lt;Route path=":id" element={&lt;Some /&gt;} /&gt;
&lt;/Route&gt;

function Some() {
const params = useParams();
if (params.id) {
  ...
}
...
} 
}</pre>Чтобы не потерять просто страницу about можно сделать ее вложенной тогда у нас будет отображаться и просто страница и страница с переданными параметрами<pre>
app.jsx

...
&lt;Route path="favorites" auth="no_auth" element={
&lt;PrivateRoute&gt;
  &lt;FavoriteScreen /&gt;
&lt;PrivateRoute /&gt;
} /&gt;

PrivateRoute.jsx

function PrivateRoute(props) {
return props.auth === "no_auth"
  ? &lt;Navigate to="/" /&gt;
  : props.children;
}</pre>Приватный путь. Если переданный props auth является no_auth то происходит переадесация на главную страницу. Или же возвращается дочерний элемент (children это служебное свойство props в котором хранится дочерний элемент)`
  ],
  [
    'Свой API в классовых компонентах',
    `<pre>
class MyApi {
constructor() {
  this.baseUrl = 'someUrl';
}
getData = async (url) => {
  const res = await fetch(this.baseUrl + url);
  if (!res.ok) {
    throw new Error('Something goes wrong');
  }
  const result = await res.json();
  return result;
}
}</pre>Создание своего API сервиса с помощью класса. В конструкторе указываем базовый URL. В метод getData передается часть URL где мы делаем асинхронный запрос. Если ответ приходит со статусом != 200 вернем ошибку, если же все хорошо обрабатываем ответ и возвращаем в виде JSON`
  ],
  [
    'Контекст',
    `Контекст предназначен для того чтобы передавать props на прямую от 1 компонента до другого игнорируя прописывание его во всей цепочке наследования<br><b>context.js</b><br><b>const MyContext = React.createContext();</b> - создаем экземпляр контекста<br><b>app.js</b><pre>
const App = () => {
return (
  &lt;MyContext.Provider ... value={{someValue: 'hello'}}&gt;
    &lt;SomeComp /&gt;
  &lt;/MyContext.Provide&gt;
) 
}</pre>В самом главном компоненте оборачиваем все в MyContext.Provider и через атрибут value передаем необходимые props<br><b>somecomp.js - функциональный</b><pre>
const SomeComp = () => {
return (
  &lt;MyContext.Consumer&gt;
    {
      (value) => {
        return (
          &lt;p&gt;{value.someValue}&lt;/p&gt;
        )
      }
    }
  &lt;/MyContext.Consumer&gt;
) 
}</pre>Использование контекста в функциональном компоненте, для этого сначала необходимо все обернуть в MyContext.Consumer<br><b>somecomp.js - классовый</b><pre>
class SomeComp extends Component {
...
render() {
  return (
    &lt;p&gt;{this.context.someValue}&lt;/p&gt;
  )
} 
}
SameComp.contextType = MyContext;</pre>В классовом компоненте получаем доступ к контексту через this.context. Но для того чтобы использовать контекст в классовом компоненте необходимо в свойство этого компонента contextType передать ранее созданный контекст`
  ],
  [
    'Глобальное состояние в классовом компоненте',
    `<b>reducer.js</b><pre>
const initState = {
value: [],
trigger: false  
}
const reducer = (state = initState, action) => {
switch(action.type) {
  case 'LOAD_VALUE':
    return {
      ...state, value: action.payload
    };
    break;
  default: return state;
} 
}
export default reducer;</pre>Сначала описывается сам reducer. Это ф-ция которая в зависимости от полученного action производит какие то действия с глобальным хранилищем(store). 1 аргумент это сам store и сразу же присваеваем ему начальное состояние. 2 аргумент это объект action который содержит поле type в котором находится описание действия и поле payload которое содержит данные для обновления store. Далее в конструкции switch идет перебор действий где описывается логика изменения store<br><b>actions.js</b><pre>
const loadValue = (value) => ({type: 'LOAD_VALUE', payload: value});
export {loadValue};</pre>Здесь уже описываются сами действия. По сути это функция которая возвращает объект содержащий 2 или 1 поле в зависимости от переданного в нее аргумента. Поле type содержит описание действия для reducer а не обязятельное поле payload содержит какое то значение из переданного аргумента<br><b>index.js</b><pre>
...
&lt;Provider store={store}&gt;
&lt;App /&gt;
&lt;/Provider&gt;</pre>В главном файле глобальное состояние подключается через обертку Provider для того чтобы каждый компонент внутри видел это состояние<br><b>store.js</b><br><b>const store = createStore(reducer);</b> - с помощью библиотеки redux создаем глобальное хранилище передав в качестве аргумента созданный ранее reducer<br><b>someComp.js</b><pre>
class Somecomp extends Component {
...
render() {
  const {someValue, loadValue} = this.props;
  ...
} 
}
const mapStateToProps = (state) => ({
someValue: state.value
})
const mapDispatchToProps = {
loadValue 
}
export connect(mapStateToProps, mapDispatchToProps)(Somecomp);</pre>Внизу сначала мы создаем 2 ф-ции которые возвращают объект со значениями из store и объект с нашими actions, а затем через connect библиотеки react-redux привязывам эти ф-ции к компоненту чтобы взаимодействовать с состоянием в виде props, где:<br>1 аргумент объект со значениями<br>2 аргумент объект с actions<br>3 аргумент сам компонент<br>А в самом компоненте уже получаем это все через this.props(в функциональном компоненте эти props будут переданны как обычный аргумент в ф-ции)`
  ],
  [
    'Параметры в функциональных компонентах',
    `Компонент может принимать параметры для дальнейшего использования. Если меняются передаваемые параметры то компонент перерисовывается. Сам компонент принимает параметры через объект props, который можно либо деструктуризировать в блоке с логикой(пример 1) либо сразу при объявлении ф-ции(пример 2). А сами параметры передаются уже при использовании компонента в виде обычного атрибута(пример 3)<pre>
function Some(props) {
const {someProp} = props;
... 
}
function Another({someProp}) {
... 
}
...
root.render(&lt;Some someProp="something" /&gt;);
</pre>`
  ],
  [
    'Функциональный компонент',
    `<pre>
const Some = () => {
const text = () => {
  return 'text';
}
const style = {
  width: '300px'
} 
return (
  &lt;p className="class" style={style}&gt;{text ? text : null}&lt;/p&gt;
)
}</pre>Создание функционального компонента, где сначала идет блок с какой то логикой а в конце возвращается разметка, в которой можно использовать различные переменные указав их в {} как для контента так и для атрибутов. Также можно использовать ТОЛЬКО тернарный оператор для различных условий`
  ],
  [
    'Передача props компоненту',
    `<pre>
const SomeComp = () => {
return (
  &lt;AnotherComp name="Bob" age={45} /&gt;
); 
}</pre>Обычный способ передачи props<pre>
const SomeComp = () => {
const props = { name: 'Bob', age: 45 };
return (
  &lt;AnotherComp {...props} /&gt;
); 
}</pre>Определение объекта пропсов в логике компонента и передача с помошью деструктуризации`
  ],
  [
    'Типизация props children',
    `<pre>
type AppProps = {
someProp: number;
children?: ReactNode; 
}</pre>В данном псевдониме проп children отмечен как не обязательный и имеет тип ReactNode который в свою очередь является псевдонимом типов  ReactChild | ReactFragment | ReactPortal | boolean | null | undefined<pre>
type SomeProps = PropsWithChildren&lt;{
someProp: number;
}&gt;;</pre>В React уже есть готовый шаблон если нам необходимо описать тип props в котором возможно есть children. Данный шаблон использует дженерик и выглядит следующим образом - <b>type PropsWithChildren&lt;T&gt; = T & { children?: ReactNode | undefined };</b><pre>
function SomeComp: React.FC&lt;SomeTypeProps&gt;(props) {
...
}</pre>Еще 1 подход типизации children. Здесь используется встроенный интерфейс FunctionComponent который также с помощью дженерика принимает другой псевдоним типа. Но такой подход не следует использовать т.к. он скрывает типизацию children`
  ],
  [
    'JSX разметка',
    `1) вместо class используется className<br>
    2) вместо атрибута for пишется htmlFor<br>
    3) при использовании boolean параметра можно не указывать его значение если оно равно true, а всего лишь имя переменной<br>
    4) события в разметке указываются как атрибуты элементов <b>onX</b> где x имя события(click, submit) а в качестве значения принимает ф-цию которая описана в логике<br>
    5) вместо &lt;a href="#"&gt; используется <b>&lt;link to="#"&gt;</b> потому что при использовании обычной ссылки страница будет перезагружаться<br>
    <pre>
function SomeComp() {
return (
  &lt;h1 style={{
    color: 'red',
    fontSize: '500px',
  }}&gt;Hello&lt;/h1&gt;
); 
}</pre>Описание стилей внутри элемента происходит следующим образом. Стили в JSX это объекты, поэтому сначала открываются фигурные скобки для вставки JS кода а затем вставляется сам объект где свойста стилей являются полями объекта описаные в camelCase<pre>
function Some() {
return '&lt;p&gt;Hello wolrd&lt;/p&gt; 
}</pre>При попытке отрендерить строку с разметкой JSX автоматические экранирует такую строку и просто выведет весь код в строке<pre>
function App() {
return <div dangerouslySetInnerHTML={{ __html: Some()}}></div>
};</pre>Однако такое поведение можно исправить указав соответствующий атрибут передав в него объект с компонентом. Но это опасно<pre>
const MyComp = () => {
const variable = false;
return (
  &lt;div&gt;
    Моя переменная - {String(variable)}
  &lt;/div&gt;
); 
}</pre>Чтобы отобразить ложное значение его сначала надо представить в виде строки как здесь например<hr>
JSX разметка по итогу интерпретируется в JS объект поэтому если в разметке имеются несколько элементов то у них должен быть какой то общий элемент или хотя бы обёртка иначе JS воспримет их как 2 несвязанных объекта и мы получим ошибку`
  ],
  [
    'Организация редиректа не из компонента',
    `<b>browser-history.js</b><pre>
const browserHistory = createBrowserHistory();</pre>Сначала просто создаем новый экземпляр browser history<br><b>history-route.js</b><pre>
function HistoryRouter({history, basename, children}) {
const [state, setState] = useState({
  action: history.action,
  location: history.location
});

useLayoutEffect(() => history.listen(setState), [history]);
return (
  &lt;Router
    basename={basename}
    location={state.location}
    navigationType={state.action}
    navigator={history}
  &gt;
    {children}
  &lt;/Router&gt;
);
}</pre>Описываем компонент обертку для Router<br><b>index.js</b><pre>
&lt;HistoryRouter history={browserHistory}&gt;
...
&lt;/HistoryRouter&gt;</pre>В точке входа приложения вместо BrowserRouters подставляем наш компонент<br><b>redirect.ts</b><pre>
const redirect = (store) => (next) => (action) => {
if (action.type === 'redirectToRoute') {
  browserHistory.push(action.payload);
} 
return next(action);
}</pre>Создаем свой middleware для редиректа`
  ],
  [
    'Привязка контекста в классовом компоненте',
    `1) через bind в конструкторе => <b>this.changeState = this.changeState.bind(this)</b><br>2) записать стрелочную ф-цию в конструктор где контекстом автоматически станет родитель => <b>this.changeState = () => {}</b><br>3) Благодаря новому стандарту можно использовать стрелочную ф-цию вне конструктора => <b>changeState = () => {}</b>`
  ],
  [
    'HOC для классового компонента',
    `<pre>
const withData = (SomeComponent) => {
return class extends Component {
  state ...
  componentDid...
  render() {
    ...
    return &lt;SomeComponent {...this.props} data={data} /&gt;
  }
} 
}</pre>Создание обертки для классового компонента с целью добавить какой то новый функционал. Эта обертка возвращает безымянный класс который содержит какую то логику и в конце рендерит переданный компонент. По скольку обертка также видит props то просто передаем их с помощью деструктуризации а также добавляем новый(data)<hr>HOC уместен когда:<br>1) поведение необходимо для нескольких элементов<br>2) поведение не требует большого кол-ва props`
  ],
  [
    'HOC для функционального компонента',
    `<pre>
const withFlag = (Component) => function(props) {
const [isOn, setIsOn] = useState(false);
return (
  &lt;Component {...props} isOn={isOn} onChange={() => setIsOn(!isOn)} /&gt;
); 
}

const SomeComp = (props) => {
return(
  &ltbutton isOn={props.isOn} onClick={props.onChange} /&gt;
);
}
export default withFlag(SomeComp);</pre>Создание обертки для функционального компонента с целью добавить какой то новый функционал. Эта обертка возвращает анонимную ф-цию которая содержит какую то логику и в конце рендерит переданный компонент. По скольку обертка также видит props то просто передаем их с помощью деструктуризации а также добавляем новый<hr>HOC уместен когда:<br>1) поведение необходимо для нескольких элементов<br>2) поведение не требует большого кол-ва props`
  ],
  [
    'Жизненные циклы в классовом компоненте',
    `<b>componentDidMount() {}</b> - ф-ция которая сработает при 1 рендере компонента<br><b>componentDidUpdate(prevProps, prevState) {}</b> - ф-ция которая сработает при обновлении props или state, которая также принимает 2 аргумента в виде предыдущих значений props и state для проверки на изменения<br><b>componentDidCatch() {}</b> - ф-ция обработчик ошибок для того чтобы не рушилось все приложение<br><b>componentWillUnmount() {}</b> - ф-ция которая сработает как только компонент будет уничтожен`
  ],
  [
    'useMemo()',
    `<b>const memoFunc = useMemo(someFunc, []);</b> - хук который создает мемоизированную версию переданной в него ф-ции.`
  ],
  [
    'Селекторы',
    `<b>const getData = (state) => state['DATA'].someData</b> - селектор для безопасной работы с глобальным состоянием<br>
    <b>const data = useSelector(getData);</b> - использование хука для работы с созданным селектором`
  ],
  [
    'Комбинирование/нарезка reducer',
    `<b>data-reducer.js</b><pre>
const dataReducer = createSlice({
name: 'DATA',
initialState: initState,
reducers: {},
extraReducers(builder) {
  builder
    .addcase(someAsyncAction.fullfiled, (state, action) => {
      state.prop = action.payload;
      state.isLoading = false;
    })
    .addcase(someAsyncAction.pending, (state) => {
      state.isLoading = true;
    })
    .addcase(someAsyncAction.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
}
});</pre>Создаем 1 часть общего reducer которая будет отвечать за работу с данными. Создается с помощью ф-ци createSlice которая принимает объект со следующими полями:<br>
1)Имя reducer для дальнейшего обращения<br>
2)Начальное состояние<br>
3)Объект с методами для синхронных операций, в данном примере пуст<br>
4)Метод для работы с асинхронными операциями. В нем на переданном объекте по цепочке вызывается метод addCase чтобы добавить новые операции. Этот метод принимает асинхронный action с 1 из 3 свойств означающих статус обработки(fullfiled - успешно выполненый/pending - в процессе обработки/rejected - не выполнен). Для каждого из этих свойств по надобности создаются обработчики. В качестве 2 аргумента принимается callback содержащий state в виде 1 аргумента и action в виде необязательного 2 для того чтобы была возможность получить какие то полученные данные из action<br><b>user-reducer.js</b><pre>
const userReducer = createSlice({
name: 'USER',
initialState: initState,
reducers: {
  clearData: (state) => {
    state.someData = null;
  }
}
});
export const {clearData} = userReducer.actions;</pre>Создаем 2 часть reducer. Она отвечает за какое то пользовательское взаимодействие и тут мы уже описываем обычные обработчики action в виде методов. При использовании простых обработчиков action в конце нужно экспортировать их для дальнейшего использования<br><b>root-reducer.js</b><pre>
const rootReducer = combineReducers({
['DATA']: dataReducer.Reducer,
['USER]: userReducer.Reducer
});</pre>Создание общего reducer из нарезок. После этого полученный reducer можно как обычно передать в store`
  ],
  [
    'Мемоизация компонента',
    `<pre>
const SomeComp = (props) => {
...
}
export default memo(SomeComp, (prev, curr) => {
return prev.count === curr.count;
});</pre>Мемоизация компонентов нужна чтобы избежать лишней перерисовки. В данном случае используется обертка(HOC) memo которая принимает в качестве 1 обязательного аргумента компонент и 2 необязательный - callback. Если передать один аргумент то HOC просто сравнивает props компонента поверхностно и если они изменились то перерисует компонент. Однако если в props есть callback ф-ции то перерисовка не избежна. Чтобы это избежать мы можем применить <b>КОСТЫЛЬ</b>, передать 2 аргумент ф-ции которая будет возвращать какой то результат сравнивания, например сравнивая отдельные props как в примере с count. И если ф-ция вернет false компонент перерисуется.`
  ],
  [
    'Axios',
    `Библиотека для отправки HTTP запросов в браузере. Преимущества:<br>
    1)отображение прогресса<br>
    2)автоматическая трансформация ответа в JSON<br>
    3)поддержка node.js<br>
    4)имеет интерфейс для написания сетевых запросов<br>
    5)моки для тестов из коробки<br>
    6)наличие перехватчиков ответов и запросов<pre>
const createAPI = (): AxiosInstance => {
const api = axios.create({  <sup>1</sup>
  baseURL: 'someUrl',
  timeout: 5000
});

api.interceptors.request.use((config: AxiosRequestConfig) => {  <sup>2</sup>
  const token = getToken();

  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});

api.interceptors.response.use((resp) => resp, (error: AxiosError) => {  <sup>3</sup>
  if (error.response) {
    someErrorHandler(error.response.data.error);
  }
  throw error;
});

return api; 
}</pre>Создание REST API с помощью axios.<br>
1)создаем api с помощью конструктора передав в него объект с настройками - URL и время ожидания ответа<br>
2)добавляем перехватчик запроса. В нем мы получаем токен и если токен получен добавляем к конфигу его в виде заголовка и в конце возвращаем обновленный конфиг<br>
3)добавляем перехватчик ответа. В нем мы смотрим если с ответом все в порядке просто возвращаем его. Если же получаем ошибку то вызываем какой то обработчик ошибок а затем выбрасываем ошибку<br>В дальнейшем этот api уже можно использовать где то дальше, например в качестве переданного аргумента для middleware<pre>
const api = createAPI();
const store = configureStore({
reducer,
middleware: (getDefaultMiddleware) => {
  getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }),
}
});</pre>`
  ],
  [
    'Redux Thunk',
    `Middleware который позволяет производить любые действия в том числе асинхронные запросы до выполнения reducer. Также имеет доступ к глобальному состоянию и может его обновлять<pre>
const api = async (id) => {
const resp = await fetch('url/' + id);
const data = await resp.json();
return data.title;
}</pre>Опишем для примера какой то api получения данных <pre>
const setTitleAction = async (dispatch, store, api) => {
const id = store.getState().id;
const title = await api(id);
dispatch(SOME(title));
}</pre>Создание action для thunk. Сначала получаем данные из состояния, затем асинхронный запрос через полученный api и в конце вызываем dispatch с каким то action передав туда полученные данные<pre>
const checkAuthAction = createAsyncThunk&lt;void, undefined, {
dispatch: AppDispatch, state: State, extra: AxiosInstance
}&gt;(
'checkAuth',
async (_arg, {dispatch, extra: api}) => {
  await api.get('url');
}
);
</pre>Создание action с через RTK для Thunk. Конструктор принимает в качестве 1 аргумента строковое значение action, а во 2 callback где 1 аргумент в данном примере заглушка т.к. мы не передаем никаких данных, а 2 аргумент объект где указываем dispatch и api в поле extra. В теле ф-ции делаем запрос через наш api указав метод get. По скольку конструктор ничего не возвращает то в Typescript 1 тип void. По скольку мы ничего не передаем то 2 тип undefined. Далее указываем типизацию для переданного объекта<pre>
const postComment = createAsyncThunk&lt;Comments, PostComment, {
dispatch: AppDispatch, state: State, extra: AxiosInstance 
}&gt;(
'postComment',
async ({comment, id}, {dispatch, extra: api}) => {
  const {data} = await api.post&lt;Comments&gt;('url/' + id, {comment});
  return data;
}
);</pre>Action для отправки данных на сервер. api.post возвращает нам объект поэтому мы сразу деструктуризируем его извлекая свойство из data и затем возвращаем полученный результат. В типизации сначала указываем Comments т.к. возвращаем результат в виде обновленного списка комментариев. Затем указываем PostComment это тип объекта для отправки данных.`
  ],
  [
    'MiddleWare',
    `Это ф-ция которая будет выполнена после dispatch() но до обработки reducer. Другими словами позволяет выполнить какую то логику после вызова action но до его выполнения<pre>
const some = (store) => (next) => (action) => {
console.log('action = ' + action.type);
console.log('Current state = ' + store.getState());
const result = next(action);
console.log('New state = ' + store.getState());
return result; 
}
const some2 = (store) => (next) => (action) => {
...
next(action); 
}</pre>2 вида собственных middleware. В 1 показано как можно взаимодействовать с измененным состоянием, главное в конце вернуть полученный result. Во 2 мы просто после необходимой нам логике вызываем диспатч с переданным action<pre>
const applyMiddleware = Redux.applyMiddleware;
const store = createStore(reducer, initState, applyMiddleware(some));</pre>Передача MW в store. Сначала инициализируем с помощью оболочки из Redux а затем передаем в качестве 3 параметра в конструктор где параметром оболочки будет наша созданная middleware<pre>
const store = configureStore({
reducer,
middleware: [some, some2]
});
const store2 = configureStore({
reducer,
middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    thunk: {
      extraArgument: 'some data or function'
    }
  }).concat(some),
});</pre>Передача MW в store через RTK. В 1 случае мы просто передаем все наши созданные MW в свойство middleware в виде массива. Во 2 случае мы сначала описываем callback для использования встроенных MW из Redux(в данном случае thunk) где свойство extraArguments получает какой то api или ц-цию.Сам callback вернет массив, а затем присоединяем к нему свои MW`
  ],
  [
    'Глобальное состояние (самописный для общего представления)',
    `<pre>
const createStore = (reducer, initState) => {
return {
  _state: initState,
  dispatch(action) {
    this._state = reducer(this._state, action);
  },
  getState() {
    return this._state;
  }
};
};</pre>Примерно так выглядит создание хранилища store. Вернет объект с установленным начальным значением, методом getState() который будет возвращать текущее значение и методом dispatch() который будет изменять текущее значение с помощью переданного в него action<pre>
const myReducer = (state, action) => {
switch(action.type) {
  case 'add':
    return state + 1;
  case 'dec':
    return state - 1;
  case 'some':
    return state + action.payload;
  default: return state;
}
}</pre>Так выглядит reducer. Он нужен чтобы изменять состояние. Основываясь на полученном action.type производит какие то действия. Также action может содержать свойство payload которое будет содержать переданные данные.<pre>
const add = () => {type: 'add'};
const dec = () => {type: 'dec'};
const some = (n) => {type: 'some', payload: n};</pre>Так выглядят action. По сути это ф-ции которые возвращают объект с обязательным полем type и дополнительным payload если передан какой то аргумент<pre>
const store = createStore(myReducer, 0);
btn1.addEventListener('click', () => {
store.dispatch(add);
});
btn2.addEventListener('click', () => {
store.dispatch(some(4));
});</pre>Инициализация store и использование метода dispatch()`
  ],
  [
    'Глобальное состояние (функциональный компонент)',
    `<b>index.js</b><pre>
&lt;Provider store={store}&gt;
&lt;App /&gt;
&lt;/Provider&gt;</pre>Чтобы использовать глобальное состояние во всем приложении делают обертку для главного компонента через Provider указывая ранее созданный store<br><b>action.js</b><pre>
const INC = () => {type: 'INC'};
const ADD_SOME = (value) => {type: 'ADD_SOME', payload: value};</pre>Создание action с помощью которых будем указывать reducer как изменять состояние<br><b>reducer.js</b><pre>
const reducer = (state, action) => {
switch(action.type) {
  case 'INC':
    return state + 1;
  case 'ADD_SOME':
    return state + action.payload;
  default: return state;
}
}</pre>Reducer нужен для того чтобы изменять состояние основываясь на полученных action.<br><b>store.js</b><pre>
const store = (initState, reducer) => ({
_state: initState,
getState() {
  return this._state;
},
dispatch(action) {
  this._state = reducer(this._state, action);
}
})</pre>Создание store. Принимает исходное состояние а также reducer который и будет изменять его<pre>
function SomeComp({propName, propNameForDispatch}) {
return (
  &lt;button type="button" onClick={propNameForDispatch}&gt;{propName}&lt;/button&gt;
);
}
const mapStateToProps = (state) => ({
propName: state.someValue;
});
const mapDispatchToProps = (dispatch) => ({
propNameForDispatch: () => dispatch(someAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(SomeComp);</pre>Чтобы связать redux с компонентом сначала создаем ф-цию которая вернет объект, где именем поля будет пропс а значением любое значение из store. Затем создаем ф-цию которая вернет объект где также именем будет пропс а значением ф-ция dispatch с нужным action. После всего с помощью connect связываем эти ф-ции с нашим компонентом и в дальнейшем можем обращаться к данным store или диспатчить в него что то с помощью переданных в props свойств, благодаря этому в случае если store изменится компонент перерисуется т.к. значения из store передаются в props<pre>
function SomeComp() {
const dispatch = useDispatch();
const someValue = useSelector((state) => state.value); 

return (
  &lt;button type="button" onClick={dispatch(someAction())}&gt;{someValue}&lt;/button&gt;
);
}</pre>В новых версиях достаточно использовать хуки. useSelector является аналогом mapStateToProps и позволяет получать любые данные из store, а также неявно подписывается на изменения состояния. useDispatch это аналог mapDispatchToProps`
  ],
  [
    'Глобальное состояние (RTK)',
    `<b>store.js</b><pre>
const store = configureStore({
reducer,
preloadedState: 0,
devTools: true
});</pre>Создание store с помощью RTK. Принимает объект с настройками где сначала указывается reducer, затем исходное состояние. DevTools указывает можно ли приложению взаимодействовать с браузерным расширением(по умолчанию true)<br><b>action.js</b><pre>
const ACTION = {
INC: 'INC',
ADD_SOME: 'ADD_SOME'
};
const inc = createAction(ACTION.INC);
const addSome = createAction(ACTION.ADD_SOME, (value) => ({payload: value}));</pre>Описание action в RTK. Сначала создаем объект для удобства и чтобы избежать ошибок при передаче action(паттерн action creator). Затем создаем сами action передав строковое значение в 1 аргументе. Т.к. в RTK созданные action имеют перезаписанный метод toString() то они возвращают строку action.type. Чтобы передать дополнительные параметры в качестве 2 аргумента создаем callback который получает наш параметр и возвращает объект со свойством payload.<br><b>reducer.js</b><pre>
const reducer = createReducer(initState, (builder) => {
builder
  .addCase(ACTION.INC, (state) => {
    state = state + 1;
  })
  .addCase(ACTION.ADD_SOME, (state, action) => {
    state = state + action.payload;
  });
});</pre>Создаем reducer с помощью RTK. Получает начальное состояние через 1 аргумент. Чтобы добавить какое то действие достаточно дописать addCase(), в котором в 1 аргумент передается тип action а во 2 callback который получает обязательный state и action если были переданны какие то данные. Внутри callback описывается логика изменения состояния. Благодаря библиотеке immer мы можем сразу указывать какое свойство объекта(если state объект) необходимо изменить(например: state.id = action.payload). Сама библиотека позволяет подобныйм образом изменять иммутабельный объект<pre>
const initStore = {
count: 0,
someData: []
};
const reducer = createReducer(initStore, (builder) => {
builder
  .addCase(ACTION.INC, (state) => {
    state.count += 1;
  })
  .addCase(ACTION.ADD_DATA, (state, action) => {
    state.data.push(action.payload);
  });
});</pre>С помощью immer можно также спокойно добавлять что то в массив в объекте initStore и библиотека сама все правильно обработает`
  ],
  [
    'Жизненные циклы в функциональном компоненте',
    `<pre>
useEffect(() => {
...(1)...
return () => {
  ...(2)...
}
}, [x]);</pre>Аналог жизненного цикла componentDidUpdate в главном блоке кода и componentWillUnmount в виде блока кода в return, где :<br>1) какая то логика при изменении<br>2) какая то логика в return которая выполнится если компонент будет уничтожен<br>3) после callback ф-ции передается массив зависимостей в котором можно либо указать какие то переменные которые послужат триггером для запуска useEffect либо оставить массив пустым и тогда useEffect сработает 1 раз как componentDidMount но только после отрисовки компонента. Компонент может содержать несколько эффектов и они будут выполнены в том порядке в котором были записаны<pre>
useLayoutEffect(() => {
...
});</pre>Этот хук является аналогом componentDidMount и сработает до отрисовки компонента`
  ],
  [
    'useEffect()',
    `Хук который в первую очередь служит методом жизненных циклов компонента. Также служит для того чтобы изолировать побочные эффекты от логики компонента. Что входит в эти эффекты:<br>
    1) Получение данных<br>
    2) Работа с таймерами<br>
    3) Прямое изменение DOM<br>
    4) Изменение размеров элемента<br>
    5) Работа с локальных хранилищем<br>
    6) Подписка на услуги<br>
    7) Взаимодействие с файловой системой<br>
    8) Вывод какого то результата на экран<br>
    В общем это логика которую надо изолировать от рендеринга`
  ],
  [
    'flux архитектура',
    `Подход когда глобальное состояние выносится отдельно от логики компонентов`
  ],
  [
    'defaultProps',
    `<pre>
function SomeComp(props) {
return(
  &lt;div&gt;{ props.name }&lt;/div&gt;
);
}

SomeComp.defaultProps = {
name: 'Guest'
}</pre>Свойство позволяет задать пропсы по умолчанию`
  ],
  [
    'Использование styled библиотеки',
    `<pre>
const Header = styled.h1\`
display: flex;
span {
  font-size: 20px;
  color: \${props => props.colored ? 'red' : 'black'}
}
\`
const AppHeader = () => {
return (
  &lt;Header colored&gt;
    &lt;span&gt;Some text&lt;/span&gt;
  &lt;Header /&gt;
) 
}</pre>Эта библиотека позволяет создавать элементы указав их как свойство объекта styled и сразу же описать для него стили. Также в стилях через props можно указать динамические параметры<hr><b>return (&lt;Header as='a' /&gt;)</b> - позволяет преобразовывать тэг в другой при отрисовке<hr><b>const StyledHead = styled(Header)\`background-color: red;\`</b> - позволяет создавать новые элементы на основе уже созданных и тут же добавлять новые стили`
  ],
  [
    'Хуки',
    `Это функции которые позволяют использовать в функциональных компонентах жизненные циклы, состояние и т.д.<hr>
    Основные правила хуков:<br>
    1) Хуки не используются в циклах или условиях потому что React полагается на порядок вызова хуков и если порядок нарушить будут ошибки<br>
    2) Использовать хуки можно только в компонентах на высшем уровне а не внутри каких то побочных ф-ций по тем же причинам`
  ],[
    'Паттерны',
    `<pre>
function App() {
return (
  &lt;SomeComp&gt;
    &lt;h1&gt;Some child &lt;/h1&gt;
  &lt;/SomeComp&gt;
); 
}

function SomeComp({render}) {
return (
  &lt;div&gt;
  { children }
  &lt;div&gt;
); 
}</pre>Паттерн использования служебного пропса children<pre>
function App() {
return (
  &lt;SomeComp render={(trigger) => {
    return trigger
      ? &lt;p&gt;Hello&lt;/p&gt;
      : &lt;p&gt;Goodbye&lt;/p&gt;
  }} /&gt;
); 
}

function SomeComp({children}) {
return (
  &lt;div&gt;
  { render(false) }
  &lt;div&gt;
); 
}</pre>Паттерн render-props. Позволяет передать в пропс ф-цию для отрисовки каких то элементов<pre>
function SomeComp({someTrigger}) {
return (
  &lt;div&gt;
  { someTrigger && &lt;p&gt;Hello world&lt;/p&gt; }
  &lt;div&gt;
); 
}</pre>Паттерн условный рендеринг позволяет использовать условие в более легкой форме <pre>
function Product({class, product}) {
return (
  &lt;article className={class}&gt;
    ...
  &lt;/article&gt;
);
}

function ProductNew({class = '', ...otherProps}) {
return (
  &lt;Product className={'product--new ' + class} {...otherProps} /&gt;
);
}

function ProductList({products}) {
function getType(type, product) {
  switch(type) {
    case 'new':
      return &lt;ProductNew product={product} /&gt;
    default:
      return &lt;Product product={product} /&gt;
  }
}

return (
  &lt;ul&gt;
    {
      products.map((prod) => (
        &lt;li key={prod.id}&gt;
          { getType(prod.type, product) }
        &lt;/li&gt;
      ))
    }
  &lt;ul&gt;
);
}</pre>Паттерн proxy-component. Принцип - сделать обертку для компонента добавив что то новое а потом в родительском компоненте применив паттерн container, основываясь на каком то выборе отрендерить 1 из компонентов. Т.к. в JSX нельзя использовать условия то можно вынести его в отдельную ф-цию а потом в разметке просто ее вызвать`
  ],
  [
    'Хуки Собственные',
    `Бывает случается так что в разных компонентах присутствует одинаковая логика. Это может быть взаимодействие с API или с другими хуками или что то подобное. Чтобы соблюдать принцип DRY эту логику было бы неплохо вынести отдельно. Можно сделать HOC и обернуть необходимые компоненты в него, а можно создать свой хук. По сути это просто ф-ция в которой может быть любая логика которая используется в нескольких компонентах. Внутри своего хука можно использовать уже встроенные хуки`
  ],
  [
    'default value',
    `<b>&lt;input type="text" defaultValue={props.some} /&gt;</b> - этот пропс позволяет передать значение по умолчанию тем самым не заблокировав элемент для ввода`
  ],
  [
    'Состояние компонента',
    `По сути это объект в котором хранятся какие то данные. Если данные изменяются то компонент перерисовывается. Сам объект иммутабельный поэтому для его изменения вызывается специальный метод.<pre>
class Some extends Component {
constructor(props) {
  super(props);
  this.state = {
    value: 4
  }
  changeState = (arg) => {
    this.setState((state, arg) => ({value: state.value + arg}));
  }
} 
}</pre>Создание состояние в классовом компоненте а также создание ф-ции для изменения состояния(вместо return можно просто обернуть весь блок кода {} в ())<pre>
const FuncComponent = () => {
const [data, setData] = useState([{}]);
function changeState(prop) {
  setData((data, prop) => {
    return [...data, {prop}];
  });
} 
}</pre>Создание состояни в функциональном компоненте с помощью хука useState. Сначала с помощью деструктуризации создается переменная data(где хранится состояние) а также ф-ция для изменения, а в сам хук передается исходное значение состояния([{}]). По скольку состояние иммутабельно в ф-ции изменения state передается новый объект в виде объединения старого state и нового свойства<hr>
Если так случилось что у нас есть компонент с локальным состоянием и нам надо как то синхронизировать его с другим компонентом, возможно лучшее решение будет вынести состояние наверх к родительскому компоненту, чтобы был однонаправленный поток данных`
  ],
  [
    'Классовый компонент',
    `<pre>
const Some extends Component {
constructor(props) {
  super(props);
}
render() {
  const {someProp} = this.props;
  return (
    &lt;p&gt;{someProp}&lt;/p&gt;
  )
}
}</pre>Создание классового компонента. Наследует Component от библиотеки React.`
  ],
  [
    'Создание начальной точки приложения',
    `<pre>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);</pre>Сначала создается начальная точка приложения в блоке с ID root, а затем в ней отрисовывается главный компонент.`
  ]
];