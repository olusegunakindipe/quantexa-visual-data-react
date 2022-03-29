import React, {useState,ChangeEvent, useEffect} from 'react';
import './App.css';
import * as XLSX  from 'xlsx';
import Table from './component/Table';
import { IData } from './data';
import Chart from './component/Charts';

const App = () => {

  const [fileName, setFileName] = useState('');
  const [csvData, setCsvData] = useState<IData[]>([]);
  const [showLineChart, setShowLineChart] = useState<boolean>(false);
  const [showBarChart, setShowBarChart] = useState<boolean>(false);
  const [showPieChart, setShowPieChart] = useState<boolean>(false);

  const handleFile = async (e: ChangeEvent<HTMLInputElement> ) => {
    const file = e.target.files![0];
    setFileName(file.name);
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data);
    const first_sheet_name = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: IData[] = XLSX.utils.sheet_to_json(first_sheet_name);
    const a = jsonData.map(e => {
     return { ...e, Date: excelDateToJSDate(e.Date) }
    })
   
    setCsvData(a) 
  }
  
  const handleBarChart = (name: string) => {
    if (csvData.length === 0) {
      alert(`Please Load CSV File before generating ${name} chart`);
      name = '';
    }
    else {
      if(name === 'Bar') {
        setShowBarChart(true);
      }
      else if(name === 'Line') {
        setShowLineChart(true);
      }
      else {
        setShowPieChart(true);
      }
    }      

  }

  const closeModal = () => {
    setShowBarChart(false);
    setShowLineChart(false);
    setShowPieChart(false);

  }

  const excelDateToJSDate = (excelDate: number | string) => {
    if (typeof excelDate == 'number') {
      let date = new Date(Math.round((excelDate - (25567 + 1)) * 86400 * 1000));
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0');
      let yyyy = date.getFullYear();
      
      var formated_date = dd + '/' + mm + '/' + yyyy;
      return formated_date;
    }
    else {
      return excelDate;
    }
   
}
  
  return (
      <div className="container">
      <div className='details'>
        <div className='quantexa'>
          <img src="https://www.quantexa.com/wp-content/uploads/2020/05/quantexa-logo.svg" alt="" />
        </div>
      
        <div className='move'>
          
          <div className='input'>
            <input type="file"  data-testid="test" onChange={(e) =>  handleFile(e)}/>
          </div>
          <div className='chart'>
            <button className='bar-chart' onClick={() => handleBarChart('Bar')}> BarChart</button>
            <button className='bar-chart' onClick={() => handleBarChart('Line')}> Line Chart</button>
            <button className='bar-chart' onClick={() => handleBarChart('Pie')} > Pie Chart</button>
          </div>
        </div>
        {
          csvData.length > 0 ?
          (
            <div className='table-data'>
              <Table tableData={csvData} />
              {(showBarChart || showLineChart || showPieChart) &&
                <Chart
                tableData={csvData}
                bar={showBarChart}
                line={showLineChart}
                pie={showPieChart}
                  toggle={() => closeModal()}
                /> }
            </div>
            ) : <div className="no-data">
               Upload csv to show data
          </div>
         
        }

        </div>
     
        
      </div>
      
  );
}

export default App;
