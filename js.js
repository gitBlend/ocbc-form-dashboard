const ctx = document.getElementById('myChart');

  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [{
        label: 'Total Submission',
        data: [100, 150, 178, 333, 375, 432, 423, 450],
        borderWidth: 4,
        borderColor: '#6C19FF',
        backgroundColor: '#6C19FF',
      },
      {
        label: 'Sucess Submission',
        data: [50, 100, 120, 280, 333, 375, 320, 400],
        borderWidth: 4,
        borderColor: '#61CEF8',
        backgroundColor: '#61CEF8',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  




  $('#downloadPdf').click(function(event) 
  {
    var reportPageHeight = $('#reportPage').innerHeight();
    var reportPageWidth = $('#reportPage').innerWidth();

    var pdfCanvas = $('<canvas/>').attr({
      id: "canvaspdf",
      width: reportPageWidth,
      height: reportPageHeight
    });

    var pdfctx = $(pdfCanvas)[0].getContext('2d');
    var pdfctxX = 0;
    var pdfctxY = 0;
    var buffer = 100;

    $("canvas").each(function(index) {
      var canvasHeight = $(this).innerHeight();
      var canvasWidth = $(this).innerWidth();

      pdfctx.drawImage($(this)[0],pdfctxX, pdfctxY, canvasWidth, canvasHeight);
      pdfctxX += canvasWidth + buffer;

      if (index % 2 === 1) {
        pdfctxX = 0;
        pdfctxY += canvasHeight + buffer;
      }
    });

    var pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
    pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

   pdf.save('filename.pdf');

  });







   var table =  $('#form-graph').DataTable( {
        dom: 'BRfrtlip',
        buttons: [
            'csv',
            'excel'
        ],

        // lengthMenu: [
        //     [10, 25, 50, -1],
        //     [10, 25, 50, 'All'],
        // ],

        ajax: "data-all.txt",
        columns: [
        { data: "id"},
        { data: "name"},
        { data: "position"},
        { data: "salary"},
        { data: "start_date"}
        ]
    } );


   var table1 =  $('#form-graph1').DataTable( {
    dom: 'BRfrtlip',
    buttons: [
        'csv',
        'excel'
    ],

    // lengthMenu: [
    //     [10, 25, 50, -1],
    //     [10, 25, 50, 'All'],
    // ],

    ajax: "data-success.txt",
    columns: [
    { data: "id"},
    { data: "name"},
    { data: "position"},
    { data: "salary"},
    { data: "start_date"}
    ]
} );









  $(function(){
  $('#datepicker').datepicker();
});

$(function(){
  $('#datepicker-2').datepicker();
});


function testingFunction(){
  alert("Hello! I am an alert box!!");


}



const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))




//datepicker untuk weekly dan monthly

$('#input-start-weekly').datepicker({
  autoclose: true,
  format :'mm/dd/yyyy',
  forceParse :false
}).on("changeDate", function(e) {
  //console.log(e.date);
  var date = e.date;
  startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
  endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()+6);
  //$('#weekpicker').datepicker("setDate", startDate);
  $('#weekpicker').datepicker('update', startDate);
  $('#weekpicker').val((startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' +  startDate.getFullYear() + ' - ' + (endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' +  endDate.getFullYear());
});

$('#input-start-monthly').datepicker({
  autoclose: true,
  minViewMode: 1,
  format: 'mm/yyyy'
   }).on('changeDate', function(selected){
      startDate = new Date(selected.date.valueOf());
      startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
      $('.to').datepicker('setStartDate', startDate);
    }); 

$('#input-end-weekly').datepicker({
      autoclose: true,
      format :'mm/dd/yyyy',
      forceParse :false
    }).on("changeDate", function(e) {
      //console.log(e.date);
      var date = e.date;
      startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()+6);
      //$('#weekpicker').datepicker("setDate", startDate);
      $('#weekpicker').datepicker('update', startDate);
      $('#weekpicker').val((startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' +  startDate.getFullYear() + ' - ' + (endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' +  endDate.getFullYear());
    });
    
$('#input-end-monthly').datepicker({
      autoclose: true,
      minViewMode: 1,
      format: 'mm/yyyy'
       }).on('changeDate', function(selected){
          startDate = new Date(selected.date.valueOf());
          startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
          $('.to').datepicker('setStartDate', startDate);
        }); 



// untuk hide dan unhide input date berdasarkan value dropdown

function showHideDateInput(select){
  switch (select.value) {
    case 'daily':
      removeActiveClass();
      removeActiveClass();
      addActiveClass('input-form-date-daily');
      addActiveClass('input-form-date-daily-end');
      break;
    case 'weekly':
      removeActiveClass();
      removeActiveClass();
      addActiveClass('input-form-date-weekly');
      addActiveClass('input-form-date-weekly-end');
    break;
    case 'monthly':
      removeActiveClass();
      removeActiveClass();
      addActiveClass('input-form-date-monthly');
      addActiveClass('input-form-date-monthly-end');
    break;
    case 'yearly':
      removeActiveClass();
      removeActiveClass();
      addActiveClass('input-form-date-yearly');
      addActiveClass('input-form-date-yearly-end');
    break;
    default:
  }
}

function removeActiveClass(){
  var elems = document.querySelector('.active-date-form');
  if(elems !== null) {
    elems.classList.remove('active-date-form');
  }
}

function addActiveClass(elementId){
  $('#'+elementId).addClass('active-date-form');
}
 






const alertPlaceholder = document.getElementById('AlertPlaceholder')
const appendAlert = (message, type, id) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class=" me-4 alert alert-${type} alert-dismissible d-inline-flex" role="alert" id="${id}">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}


$(function()
    {
      $('#AlertCheckBox1').change(function()
      {
        if ($(this).is(':checked')) {
           // Do something...
           appendAlert(AlertCheckBox1.value, 'primary', 'test1');
        } else {
          const alertElement = document.getElementById("test1");
          alertElement.remove();
        };
      });
    });

    $(function()
    {
      $('#AlertCheckBox2').change(function()
      {
        if ($(this).is(':checked')) {
           // Do something...
           appendAlert(AlertCheckBox2.value, 'primary', 'test2');
        } else {
          const alertElement = document.getElementById("test2");
          alertElement.remove();
        };
      });
    });


    $(function()
    {
      $('#AlertCheckBox3').change(function()
      {
        if ($(this).is(':checked')) {
           // Do something...
           appendAlert(AlertCheckBox3.value, 'primary', 'test3');
        } else {
          const alertElement = document.getElementById("test3");
          alertElement.remove();
        };
      });
    });






  const dataChangeTrigger1 = document.getElementById('vbtn-radio2')
  if (dataChangeTrigger1) {
  dataChangeTrigger1.addEventListener('click', () => {
   table.ajax.url('/data-success.txt').load();
  })
}

const dataChangeTrigger2 = document.getElementById('vbtn-radio1')
  if (dataChangeTrigger2) {
  dataChangeTrigger2.addEventListener('click', () => {
   table.ajax.url('/data-all.txt').load();
  })
}
