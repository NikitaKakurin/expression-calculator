function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let expresion = expr;
  expresion = expresion.replace(/\s/g,'');
  console.log(expresion);
  expresion = "("+expresion+")";

  function strToArray(str){
    let arrExpr = [];
    let arrExprIndex = 0;
    arrExpr[arrExprIndex]="";
    for (let i=0;i<str.length; i++){
      if(/[^0-9\.]/.test(str[i])){
        if(/[^0-9\.]/.test(str[i+1])){
          arrExprIndex++;
          arrExpr[arrExprIndex]=str[i];
        }else{
          arrExprIndex++;
          arrExpr[arrExprIndex]=str[i];
          arrExprIndex++;
          arrExpr[arrExprIndex]="";
        }
      }else{
        arrExpr[arrExprIndex]+=str[i];
      }
    }
    return arrExpr;
  }
  
  function calculate (exprSlice){
    let multipIndex;
    //        /
    while(exprSlice.indexOf("/")!=-1){
      multipIndex = exprSlice.indexOf("/");

      if([multipIndex]==3 && exprSlice[0]=="-"){
        if(exprSlice[multipIndex+1]=="-"){//if after /-
          if(exprSlice[multipIndex+2]==0) throw("TypeError: Division by zero.");
          exprSlice.splice(0,5,(+exprSlice[multipIndex-1])/(+exprSlice[multipIndex+2]));
        }else{
          if(exprSlice[multipIndex+1]==0) throw("TypeError: Division by zero.");
        exprSlice.splice(0,4,-(+exprSlice[multipIndex-1])/(+exprSlice[multipIndex+1]));
        }
      }else if(exprSlice[multipIndex+1]=="-"){
        //if after /-
        if(exprSlice[multipIndex+2]==0) throw("TypeError: Division by zero.");
        exprSlice.splice(multipIndex-1,4,-(+exprSlice[multipIndex-1])/(+exprSlice[multipIndex+2]));
      }else{
        if(exprSlice[multipIndex+1]==0) throw("TypeError: Division by zero.");
      exprSlice.splice(multipIndex-1,3,(+exprSlice[multipIndex-1])/(+exprSlice[multipIndex+1]));
      }
    }
    //          *
    while(exprSlice.indexOf("*")!=-1){
      multipIndex = exprSlice.indexOf("*");
      if([multipIndex]==3 && exprSlice[0]=="-"){
        if(exprSlice[multipIndex+1]=="-"){
          //if after *-
          exprSlice.splice(0,5,(+exprSlice[multipIndex-1])*(+exprSlice[multipIndex+2]));
        }else{
        exprSlice.splice(0,4,-(+exprSlice[multipIndex-1])*(+exprSlice[multipIndex+1]));
        }
      }else if(exprSlice[multipIndex+1]=="-"){
        exprSlice.splice(multipIndex-1,4,-(+exprSlice[multipIndex-1])*(+exprSlice[multipIndex+2]));
      }else{
      exprSlice.splice(multipIndex-1,3,(+exprSlice[multipIndex-1])*(+exprSlice[multipIndex+1]));
      }
    }
    //    -
    while(exprSlice.indexOf("-")!=-1){
      multipIndex = exprSlice.indexOf("-");
      if([multipIndex]==3 && exprSlice[0]=="-"){
        //after --
        if(exprSlice[multipIndex+1]=="-"){
          exprSlice.splice(0,5,-(+exprSlice[multipIndex-1])+(+exprSlice[multipIndex+2]));
        }else{
        exprSlice.splice(0,4,-(+exprSlice[multipIndex-1])-(+exprSlice[multipIndex+1]));
        }
      }else if(exprSlice[multipIndex+1]=="-"){
        exprSlice.splice(multipIndex-1,4,(+exprSlice[multipIndex-1])+(+exprSlice[multipIndex+2]));
      }else if(exprSlice[multipIndex-1]=="+"){
        //before +-
        exprSlice.splice(multipIndex-2,4,(+exprSlice[multipIndex-2])-(+exprSlice[multipIndex+1]));
      }else{
      exprSlice.splice(multipIndex-1,3,(+exprSlice[multipIndex-1])-(+exprSlice[multipIndex+1]));
      }
    }
    //       +
    while(exprSlice.indexOf("+")!=-1){
      multipIndex = exprSlice.indexOf("+");
      if([multipIndex]==3 && exprSlice[0]=="-"){
        //if after +-
        if(exprSlice[multipIndex+1]=="-"){
          exprSlice.splice(0,5,-(+exprSlice[multipIndex-1])-(+exprSlice[multipIndex+2]));
        }else{
        exprSlice.splice(0,4,-(+exprSlice[multipIndex-1])+(+exprSlice[multipIndex+1]));
        }
      }else if(exprSlice[multipIndex+1]=="-"){
        exprSlice.splice(multipIndex-1,4,(+exprSlice[multipIndex-1])-(+exprSlice[multipIndex+2]));
      }else{
      exprSlice.splice(multipIndex-1,3,(+exprSlice[multipIndex-1])+(+exprSlice[multipIndex+1]));
      }
    }
    return exprSlice[0];
  }

  function expressionBrackets(exprInBrackets){
    let str = exprInBrackets.match(/\([^\(\)]*\)/);
    if (str.length===0) { throw 'ExpressionError: Brackets must be paired'}
    str=str[0];
    if (str==null){ throw 'ExpressionError: Brackets must be paired'}
    let calc = calculate(strToArray(str.slice(1,-1)));
    expresion=exprInBrackets.replace(/\([^\(\)]*\)/,calc);
    return expresion;
  }
  //loop for expression
  while (expresion.indexOf("(")!=-1){
    if (expresion.indexOf("(")!=-1){
      if (expresion.indexOf(")")===-1){throw 'ExpressionError: Brackets must be paired'};
      expresion=expressionBrackets(expresion);
    }else if(expresion.indexOf(")")!=-1){
      throw 'ExpressionError: Brackets must be paired';
    }
  }
  if(expresion.indexOf(")")!=-1) throw 'ExpressionError: Brackets must be paired';
  return Number.parseFloat(expresion);
  // write your solution here
}

module.exports = {
    expressionCalculator
}

