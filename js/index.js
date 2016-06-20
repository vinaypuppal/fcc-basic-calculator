$(document).ready(function(){
  
  var operators = ['+','-','*','/'];
  var decimalAdded = false;
  var fontSize = 40
  var brackets = 0;
  function roundToFive(num) {    
    return +(Math.round(num + "e+5")  + "e-5");
  }
  $('.screen').html('');
  $('.key').on('click',function(e){
    console.log($('.screen')[0].offsetWidth<$('.screen')[0].scrollWidth);
    if($('.screen')[0].offsetWidth < $('.screen')[0].scrollWidth){
      fontSize = fontSize <= 10 ? 10 : fontSize/1.3;
      $('.screen').css('font-size',fontSize+'px');
    }
    var btnValue = e.target.innerText;
    var $screen = $('.screen');
    var screenHtml = $screen.html();
    var screenLastChar = screenHtml[screenHtml.length-1];
    if(btnValue === 'AC'){
      $('.screen').css('font-size','60px');
      fontSize= 40;
      $screen.html('');
      decimalAdded = false;
      brackets = 0;
    }else if(btnValue === 'C'){
      if(screenLastChar === '.'){
        decimalAdded = false;
      }
      if(screenLastChar === '('){
        brackets -= 1;
      }
      if(screenLastChar === ')'){
        brackets += 1;
      }
      if(screenHtml === 'Infinity' || screenHtml === 'NaN' || screenHtml === '-Infinity'){
        $screen.html('');  
      }else{
        screenHtml = screenHtml.replace(/.$/,'');
        $screen.html(screenHtml);  
      }
      
    }else if(btnValue === '='){
      if(brackets){
        $('.error').css('opacity','1');
        setTimeout(function(){
          $('.error').css('opacity','0');
        },1000)
      }
      if(~operators.indexOf(screenLastChar)){
        screenHtml = screenHtml.replace(/.$/,'');
      }
      
        var answer = eval(screenHtml);
        if(answer !== Infinity){
          answer = roundToFive(answer);
        }
        $('.screen').css('font-size','40px');
        fontSize=40;
        if(Number.isNaN(answer)){
          $screen.html(answer+'');  
        }else{
          $screen.html(answer);  
        }
        answer = answer+'';
        if(~answer.indexOf('.')){
          decimalAdded = true;
        }else{
          decimalAdded = false;
        }
    }else if(~operators.indexOf(btnValue)){
      if(screenHtml && !~operators.indexOf(screenLastChar)){
        $screen.html(screenHtml+btnValue);
      }
      if(screenHtml && ~operators.indexOf(screenLastChar)){
        $screen.html(screenHtml.replace(/.$/,btnValue));
      }
      if(!screenHtml && btnValue === '-'){
        $screen.html(btnValue);
      }
      decimalAdded = false;
    }else if(btnValue === '.'){
      if(!decimalAdded){
        $screen.html(screenHtml+btnValue);
        decimalAdded = true;
      }
    }else if(btnValue === '('){
      if(~operators.indexOf(screenLastChar) || !screenHtml){
        $screen.html(screenHtml+btnValue);
        brackets += 1;  
      }else{
       $screen.html(screenHtml); 
      }
    }else if(btnValue === ')'){
      if(screenLastChar === '(' || !brackets || !screenHtml){
       $screen.html(screenHtml);
      }else{
       $screen.html(screenHtml+btnValue);
       brackets -= 1; 
      }
    }else{
        if(screenHtml === 'Infinity') $screen.html(btnValue);
        else $screen.html(screenHtml+btnValue);
    }
  });
});

//added for ripple effect 
var f7 = new Framework7({
    material: true,
    ajaxLinks: '.ajax',
    tapHold: true
});