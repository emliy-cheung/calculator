const Pad = ({id, btn, handleClick, name}) => {
    return (
    <button className={name} id ={id} onClick={handleClick} value={btn}>
        {btn}
    </button>
    )
  }
  

class Calculator extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
         btn: [
           {value: 'AC', id: 'clear', name: 'large'},   
		       {value: '/', id: 'divide'},
		       {value: '*', id: 'multiply'},
           
		       {value: '7', id: 'seven'}, 
           {value: '8', id: 'eight'}, 
           {value: '9', id: 'nine'}, 
           {value: '-', id: 'subtract'},
		   
		       {value: '4', id: 'four'}, 
           {value: '5', id: 'five'}, 
           {value: '6', id: 'six'}, 
           {value: '+', id: 'add'},
		   
		       {value: '1', id: 'one'}, 
           {value: '2', id: 'two'}, 
           {value: '3', id: 'three'}, 
           
           {value: '0', id: 'zero', name: 'large'}, 
           {value: '.', id: 'decimal'},
           {value: '=', id: 'equal'}
         ],
         arr: [],
         current: 0,
         total: 0,
         equal: 'no'
       };
       this.handleClick = this.handleClick.bind(this);
       this.calculate = this.calculate.bind(this);
     }
    
handleClick(e) {
      const {arr, current, equal, total} = this.state;
      const operator = /[+\-*/]/;
      const opWoNeg = /[+*/]/;
      const numbers = /[0-9]/;
      if (e.target.value == 'AC') {
        console.log("clear")
        this.setState({
          arr: [],
          current: 0
        });
      }

      else if (e.target.value == '.') {
        if (equal == 'yes') {
          this.setState({
            arr: [].concat("0", e.target.value),
            current: 0 + e.target.value,
            equal: 'no'
          });
        }
        else if (arr[arr.length-1] == '.') {
          this.setState({
            arr: arr,
            current: current
          });
        }
        
        else if (numbers.test(arr[arr.length-1])) {
            this.setState({
              arr: arr.concat(e.target.value),
              current: current + e.target.value
            });
          } else {
            console.log("there");
            this.setState({
            arr: arr.concat("0", e.target.value),
            current: 0 + e.target.value,
          });
          }
        }
      
      else if (equal == 'yes') {
        if (operator.test(e.target.value)) {
          this.setState({
             arr: [].concat(total, e.target.value),
            current: e.target.value,
            equal: 'no'
          });
        } else {
          this.setState({
           arr: [].concat(e.target.value),
            current: e.target.value,
            equal: 'no'   
          });
          }
      }
    
      else if(e.target.value == '-' && arr[arr.length - 1] == '-') {
        this.setState({
          arr: arr.concat(" ", e.target.value),
          current: e.target.value
        });
      }
  
      else if (opWoNeg.test(e.target.value) && operator.test(arr[arr.length-1])) {
        arr.splice(-1, 1, e.target.value);
        this.setState({
          arr: arr,
          current: e.target.value
        });
      }
    
      else if (e.target.value == '0' && arr[arr.length-1] == '0') {
        this.setState({
          arr: arr,
          current: e.target.value
        });
      }  
  
      else {
        this.setState({
            arr: arr.concat(e.target.value),
            current: e.target.value
      });
        if (e.target.value == '=') {
          this.calculate();
        }
      }
    }
  
    calculate() {
      let {arr, current, equal, total} = this.state;
      current = +eval(arr.join("")).toFixed(4);
      this.setState({current: current, equal: 'yes', total: current});
    }
    
    render() {
      return (
        <div class="calculator">
          <div class="equation">{this.state.arr}</div>
          <div id="display">{this.state.current}</div>
          {this.state.btn.map(item => (
            <Pad
            key={item.id}
             id={item.id}
             btn={item.value}
             handleClick={this.handleClick}
             name={item.name}/>
          ))}
        </div>
      )
    }
  }
  
  ReactDOM.render(<Calculator />, document.getElementById('root'));