import { useState } from 'react'

function App() {
  const [city,setCity]=useState("");
  const [weatherForecast,setWeatherForecast]=useState(null)

  const hendleChange= (cidade)=>{
    const newCity= cidade.target.value;
    setCity(newCity)
    
  }

  const hendleSearch=()=>{
    const key="f751498fffae496f911182221220304";
    const url=(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&lang=pt`)
    fetch(url)
    .then(response=>{
      if(response.status===200){
      return  response.json()
      }
    })
    .then(data=>{
      console.log(data)
      setWeatherForecast(data)
    })
    .catch(err=>console.log(err))
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-5 ">
      <a className="navbar-brand text-white text-sm-start" href='#stop'>
        Previsão do Tempo
      </a>

      </nav>

      <main className="container">
        <div className="jumbotrom">
            <h1>Verifica agora a previsão do tempo da sua cidade</h1>
            <p className="lead">Digite o nome da sua cidade e em seguida clica em pesquisar</p>

            <div className="row mb-4">
                <div className="col-md-6">
                  <input
                    className="form-control"
                    onChange={hendleChange}
                    value={city}
                    
                  />
                </div>
            </div>

            <button
            className="btn btn-primary btn-lg"
            onClick={hendleSearch}
            >Pesquisar</button>


          {
            weatherForecast ? (
              <div>
            <div className="mt-4 d-flex align-items-center" >
                <div >
                  <img src={weatherForecast.current.condition.icon}/>
                </div>

                <div>

                  <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
                  <div className="lead">
                  <p>
                    Temperatura em Celsius: {weatherForecast.current.temp_c} 
                  </p>
                  <p>
                    Temperatura em Fahrenheit: {weatherForecast.current.temp_f} 
                  </p>
                  <p>
                    Humidade: {weatherForecast.current.humidity}% 
                  </p>
                    <p>
                      Vento : {weatherForecast.current.wind_kph} km/h
                    </p>
                    <h3>Pais: {weatherForecast.location.country}</h3>
                    <p>Cidade: {weatherForecast.location.name}</p>
                    <p> 
                     Horário local: <strong>{weatherForecast.location.localtime}</strong>
                    </p>
                  </div>
                </div>
        
            </div>
          </div>
            ):null}
        </div>
      </main>
    </div>
  )
}

export default App
