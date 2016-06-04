import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';


Array.prototype.getUnique = function(){
 var u = {}, a = [];
 for(var i = 0, l = this.length; i < l; ++i){
    if(u.hasOwnProperty(this[i])) {
       continue;
    }
    a.push(this[i]);
    u[this[i]] = 1;
 }
 return a;
}
ReactDOM.render(<App />, document.getElementById('app'));
