import TableF from "./TableF"

const App=()=>{
    const data = [
        { name: 'Deepak', email: 'deepak@gmail.com', mobile: 7889456130 },
        { name: 'Rohit', email: 'rohit@gmail.com', mobile: 7889455894 },
        { name: 'Anuj', email: 'Anuj@gmail.com', mobile: 9009455894 },
        { name: 'Vikash', email: 'vikash@gmail.com', mobile: 7878955894 },
        { name: 'Matt', email: 'matt@gmail.com', mobile: 9559891014 },
        { name: 'Mordok', email: 'Mordok@gmail.com', mobile: 6209891014 },
        { name: 'Peggy', email: 'peggy@gmail.com', mobile: 6089891014 },
        { name: 'Steve Rogers', email: 'steverogers@gmail.com', mobile: 7889891014 },
        { name: 'Bruce wayne', email: 'brucewayne@gmail.com', mobile: 7880011014 },
        { name: 'Optimus Prime', email: 'optimusprime@gmail.com', mobile: 8029891014 },
        { name: 'Loki', email: 'loki@gmail.com', mobile: 1009891014 },
        { name: 'Natasha', email: 'natasha@gmail.com', mobile: 7889891014 },
        { name: 'Ethan Hunt', email: 'ethanhunt@gmail.com', mobile: 8989891014 },
        { name: 'James Bond', email: 'jamesbond@gmail.com', mobile: 7880071007 },
        { name: 'John Snow', email: 'johnsnow@gmail.com', mobile: 7885551014 },
       
      ];
    return(
         <div>
         <h1>React Assessment</h1>
         <TableF data={data}/>
        </div>
    )
}
export default App