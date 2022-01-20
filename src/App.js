import "./App.css";
import React, { useState, useEffect } from "react";
import Bar from "./components/Bar";
import { ContactSupportOutlined } from "@material-ui/icons";
function App() {
  const [array, setArray] = useState([8, 7, 9, 17, 36, 13, 29]);
  const [store, setStore] = useState([]);
  const [time, setTime] = useState(1);

  const generate = () => {
    let sample = [];
    for (let i = 0; i < 15; i++) {
      sample.push(Math.floor(Math.random() * 50) + 1);
    }
    setArray(sample);
    return sample;
  };

  const swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    setStore([i, j]);
    return array;
  };

  function bubbleSort(arr){
    let array = [...arr];
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        setTimeout(() => {
          if (array[j] > array[j + 1]) {
            swap(array, j, j + 1);
            setArray([...array]);
            console.log(array);
          }
        }, 250 * (i * 2.5 + j));
      }
    }
  };

  function SelectionSort(arr) {
    let array = [...arr];

    for (let i = 0; i < array.length - 1; i++) {
      setTimeout(() => {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
          if (array[j] < array[minIdx]) {
            minIdx = j;
          }
        }
        swap(array, i, minIdx);
        setArray([...array]);
      }, 500 * i);
    }
    setTimeout(() => {
      setStore([]);
    }, 500 * array.length);
  }

  function insertionSort(arr) {
    let array = [...arr];
    let i;
    for (i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      let ind = i;
      setTimeout(() => {
        while (j >= 0 && array[j] > key) {
          array[j + 1] = array[j];
          j = j - 1;
          setArray([...array]);
        }
        array[j + 1] = key;
        setStore([j + 1, ind]);
        setArray([...array]);
      }, 250 * (i * 2.5 + j));
    }
  }


  const merge=(arr, l, m, r)=>{
      var n1 = m - l + 1;
      var n2 = r - m;
    
      // Create temp arrays
      var L = new Array(n1); 
      var R = new Array(n2);
    
      // Copy data to temp arrays L[] and R[]
      for (var i = 0; i < n1; i++)
          L[i] = arr[l + i];
      for (var j = 0; j < n2; j++)
          R[j] = arr[m + 1 + j];
    
      // Merge the temp arrays back into arr[l..r]
      // Initial index of first subarray
      var i = 0, j = 0, k = l;
    
      while (i < n1 && j < n2) {
          if (L[i] <= R[j]) {
              arr[k] = L[i];
              i++;
          }
          else {
              arr[k] = R[j];
              j++;
          }
          k++;
      }
      while (i < n1) {
          arr[k] = L[i];
          i++;
          k++;
      }
      while (j < n2) {
          arr[k] = R[j];
          j++;
          k++;
      }
      setTime(time+1) 
      setArray([...arr]);
  }
  function mergeSort(arr, left, right){
    setTimeout(() =>{
      if(left >= right)
        return;
    let mid = left + parseInt((right-left)/2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid+1, right);
    merge(arr, left, mid, right);
    console.log(arr)
    }, time*250);
  }
  return (
    <div>
      <div className = "Header">
      <button
        onClick={() => {
          bubbleSort(array);
        }}
      >
        Bubble Sort
      </button>
      <button
        onClick={() => {
          SelectionSort(array);
        }}
      >
        Selection Sort
      </button>
      <button 
        onClick={() => {
          insertionSort(array);
        }}
      >
        Insertion Sort
      </button>
      <button 
        onClick={() => {
          mergeSort(array, 0, array.length-1);
        }}
      >
        Merge Sort
      </button>
      
      </div>
      
      <div className="App-Container">
        {array.map((item, index) =>
          index === store[1] || index === store[0] ? (
            <Bar value={item} key={index} color="#30475E" />
          ) : (
            <Bar value={item} key={index} color="#F05454" />
          )
        )}
      </div>
      <div className = "button-container">
        <button className ="btn" onClick={generate}>Generate</button>
      </div>
      
    </div>
  );
}

export default App;
