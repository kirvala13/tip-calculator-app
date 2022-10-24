import './App.css';
import logo from './images/logo.svg'
import dollarsvg from "./images/icon-dollar.svg"
import { useEffect, useRef, useState } from 'react';
import { click } from '@testing-library/user-event/dist/click';
function App() {
  const billRef=useRef()
  const percRef=useRef()
  const peopleRef=useRef()
  const [percentval, setPercentVal] = useState(0)
  const [totalPeople, setTotalPeople] = useState()
  const [bill, setBill] = useState(0)
  const [tipAmount, setTipAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [eroor, setError] = useState(false)
  const resetBtn=()=>{
    billRef.current.value=0;
    peopleRef.current.value="";
    setTotalPeople(0)
    setTipAmount(0)
    setTotalAmount(0)
    setBill(0)
    setPercentVal(0)

  }
  const test = (e, i) => {
    if (e.target.className === "btn") {
      e.target.className = "checked";
      let val = e.target.getAttribute('value')
      setPercentVal(val)
    } else {
      e.target.className = "btn"
    }
  }
  const numberValid = /^[0-9]*\d$/;
  const customVAl = (e) => {
    if (numberValid.test(e.target.value)) {
      setPercentVal((e.target.value) / 100)
    }
  }

  const billVal = (e) => {
    if (numberValid.test(e.target.value)) {
      setBill(e.target.value)
    }
  }
  const peopleTotal = (e) => {
    if (numberValid.test(e.target.value)) {
      setTotalPeople(e.target.value)
    }
  }
 
  useEffect(() => {
    let tip = (bill * percentval) / totalPeople;
    let total = (bill * percentval + parseInt(bill)) / totalPeople;

    if (totalPeople || percentval || bill) {
      setTipAmount(0)
      setTotalAmount(0)
    }
    if (totalPeople && percentval && bill) {
      setTipAmount(tip.toFixed(2))
      setTotalAmount(total.toFixed(2))
    }

    console.log(totalPeople)
    if(totalPeople==0){
      setError(true)
    }else{
      setError(false)
    }
  }, [totalPeople, percentval, bill])

  return (
    <div className="App">
      <img src={logo} className="split-logo" />
      <main className='container'>
        <div className='bill_container'>
          <div className='input-container'>
            <h5>Bill</h5>
            <input type="text" className='bill-input' onChange={billVal} ref={billRef}/>
          </div>
          <div className='tip_select-container'>
            <h5>Select Tip %</h5>
            <div className='select_tip-container'>
              <div className="btn" value="0.05" onClick={test}>
                5%
              </div>
              <div className="btn" value="0.1" onClick={test}>
                10%
              </div>
              <div className="btn" value="0.15" onClick={test}>
                15%
              </div>
              <div className="btn" value="0.25" onClick={test}>
                25%
              </div>
              <div className="btn" onClick={test} value="0.5">
                50%
              </div>
              <input type="text" placeholder='Custom' className='custom' onChange={customVAl} />
            </div>
          </div>
          <div className='number_of_peopele'>
            <h5>Number of People  {eroor?<span className='error'>Can’t be zero</span>:""}</h5>
            <input type="text" className='number-input' onChange={peopleTotal} ref={peopleRef}/>
          </div>
        </div>

        {/**total amount */}
        <div className='total_amount-container'>
          <div className='tip-amount flexed'>
            <div className='amout_per-person'>
              <h2>Tip Amount</h2>
              <p className='pers'>/ person</p>
            </div>
            <p className='bill-percent price'>${tipAmount}</p>
          </div>
          <div className='total flexed'>
            <div className='total-price'>
              <h2>Total</h2>
              <p className='pers'>/ person</p>
            </div>
            <p className='bill-percent price'>${totalAmount}</p>
          </div>
          <div className='reset' onClick={resetBtn}>RESET</div>
        </div>
      </main>
    </div>
  );
}

export default App;
