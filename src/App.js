import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';

const customers = [
{
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/1',
  'name' : '민유선',
  'birthday' : '941009',
  'gender' : '여자',
  'job' : '직장인'
}
,{
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/2',
  'name' : '임지현',
  'birthday' : '940404',
  'gender' : '여자',
  'job' : '직장인'
}
,{
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/3',
  'name' : '민우동',
  'birthday' : '190927',
  'gender' : '남자',
  'job' : '댕'
}
]
function App() {
  return (
    <div>
      {
        customers.map(c => {
          return(
            <Customer
            key={c.id}
            id={c.id}
            image={c.image}
            name={c.name}
            birthday={c.birthday}
            gender={c.gender}
            job={c.job}
          />
          );
        })  
      }
   
    </div>
  );
}

export default App;
