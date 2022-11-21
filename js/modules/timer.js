function timer(timerSelector, dateBefore){

   const timeDifference = function(date){
   const milliseconds = Date.parse(date) - Date.parse(new Date()),
   	      days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
   	      hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)-3,
   	      minutes = Math.floor((milliseconds / (1000 * 60)) % 60),
   	      seconds = Math.floor((milliseconds / 1000) % 60);

   	return {
   		'milliseconds':milliseconds,
   		'days': days,
   		'hours': hours,
   		'minutes': minutes,
   		'seconds': seconds,

   	};
   }

    const addZero = (num)=>{
    	if(num >= 0 && num<10 )
    	{
    		return`0${num}`
    	}else{
    		return num;
    	}
    }

    const settingTime = (selector, timeBefore)=>{
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(func, 1000);

    func();

    function func() {

      const t = timeDifference(timeBefore);

      days.textContent = addZero(t.days);
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if(t.milliseconds <= 0 ){
      clearInterval(timeInterval);
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';


    }
    }
  }

  settingTime(timerSelector, dateBefore);
}

export default timer;