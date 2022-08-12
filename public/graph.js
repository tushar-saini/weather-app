function resizeChart() {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = new google.visualization.DataTable();
        data.addColumn('number', 'Day');
        data.addColumn('number', 'PM2.5');
        data.addRows([
          [1,  37.8],
          [2,  30.9],
          [3,  25.4],
          [4,  11.7],
          [5,  11.9],
          [6,   8.8],
          [7,   7.6],
          [8,  12.3],
          [9,  16.9],
          [10, 12.8],
          [11,  5.3],
          [12,  6.6],
          [13,  4.8],
          [14,  4.2]
        ]);
        var options = {
          chart: {
            title: 'PM2.5 Concentration',
          }
        };

      var chart = new google.charts.Line(document.getElementById('curve_chart'));
      var chart2 = new google.charts.Line(document.getElementById('curve_chart2'));
      var chart3 = new google.charts.Line(document.getElementById('curve_chart3'));

      chart.draw(data, google.charts.Line.convertOptions(options));
      chart2.draw(data, google.charts.Line.convertOptions(options));
      chart3.draw(data, google.charts.Line.convertOptions(options));
    }
}
if (document.addEventListener) {
    window.addEventListener('resize', resizeChart);
}
else if (document.attachEvent) {
    window.attachEvent('onresize', resizeChart);
}
else {
    window.resize = resizeChart;
}
