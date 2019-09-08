
var socket = io()

socket.on('data_time', (data) =>{
      document.getElementById('time').innerText = data.message
      
          
})

socket.on('data_station', (data) =>{
      document.getElementById('station').innerText = data.message
          
})

socket.on('data_minutes', (data) =>{
      document.getElementById('mins').innerText = data.message
          
})
socket.on('data_secs', (data) =>{
      document.getElementById('secs').innerText = data.message

          
})



// countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>"; 

