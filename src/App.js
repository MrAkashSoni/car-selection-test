import {  useEffect, useState } from 'react';

import { ENGINE_DATA, MAKE_DATA, MODEL_DATA, YEAR_DATA } from './constant';
import './App.css';

function App() {

  const [ymme, setYmme] = useState({
     year: '',
     make: '',
     model: '',
     engine: '',
  });

  const handleSelect = (e) => {
    const data = {...ymme};
    data[e.target.name]= e.target.value;
    if(e.target.name === "model" && ENGINE_DATA[ymme.make]?.length === 1) {
        data["engine"]=ENGINE_DATA[ymme.make][0];
    }
    setYmme(data);
  }

  const handleSubmit = () => {
    console.log("YMME: ", ymme)
  }

  useEffect(() => {
    if(!!ymme.engine) handleSubmit();
  }, [ymme])

  return (
    <div className="App">
       {/* Year selection */}
        <select name='year' onChange={handleSelect}>
          <option defaultValue={""} disabled selected>{`1 | Year`}</option>
          {YEAR_DATA.map((item, index) =>  (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        {/* Make selection */}
        <select name='make' onChange={handleSelect} disabled={!ymme.year}>
          <option defaultValue={""} disabled selected>{`2 | Make`}</option>
          {MAKE_DATA.map((item, index) =>  (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        {/* Model selection */}
        <select 
          name='model' 
          onChange={handleSelect}
          disabled={!ymme.year || !ymme.make}
        >
          <option defaultValue="" disabled selected>{`3 | Model`}</option>
          {MODEL_DATA[ymme.make]?.map((item, index) =>  (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        {/* Engine selection */}
        <select 
          name='engine' 
          onChange={handleSelect} 
          disabled={!ymme.year || !ymme.make || !ymme.model}
        >
          <option 
            defaultValue={""} 
            disabled 
            selected={!ymme.model ||ENGINE_DATA[ymme.make]?.length !== 1}
          >
            {`4 | Engine`}
          </option>
          {ENGINE_DATA[ymme.make]?.map((item, index) =>  (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
    </div>
  );
}

export default App;
