var hf = document.querySelector('.myChart')

var femme = hf.dataset.femme
var homme = hf.dataset.homme

const ctx = document.querySelector('.myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['femme', 'homme'],
        datasets: [{
            label: '# of Votes',
            data: [femme, homme,],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
           
        }
    }
});


var readMessage = document.querySelector('.doughnutChart')
var reads = readMessage.dataset.read
var noread = readMessage.dataset.unread

var ctx2 = document.querySelector(".doughnutChart")
new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels:["lu","non lu",],
        datasets: [{
            data:[reads,noread,],
        }]
    }
})



var prodenv = document.querySelector('.doughnutChart2')
var payenv = prodenv.dataset.envok
var nonpayenv = prodenv.dataset.envnon

var ctx3 = document.querySelector(".doughnutChart2")
new Chart(ctx3, {
    type: 'doughnut',
    data: {
        labels:["regle env","regle non env",],
        datasets: [{
            data:[payenv,nonpayenv,],
        }]
    }
})

var tableauMontant =[]


var ctx4 = document.querySelector(".lineChart")
var test = JSON.parse(ctx4.dataset.ca)

        
        for(var i=0; i<11;i++){
            
           if (test[i]._id.inscriptionYear === 2019 && test[i]._id.inscriptionMonth===i+1){
            tableauMontant.push(test[i].total)
           }else{
            tableauMontant.push(0)
           }
        }
    console.log(tableauMontant)

// new Chart(ctx4, {
//     type: 'line',
//     data: {
//         labels:["janvier","fevrier",],
//         datasets: [{
//             data:[payenv,nonpayenv,],
//         }]
//     }
// })

console.log(test)