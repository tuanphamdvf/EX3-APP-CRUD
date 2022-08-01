const labels = ['01 June', '02 June', '03 June', '04 June', '05 June', '06 June', '07 June'];
const yearCurrent = new Date().getFullYear();
var ctx = document.getElementById('myChart');
const datapoints = [400, 1300, 800, 1500, 300, 1200, 600, 2400];
const data = {
    labels: labels,
    datasets: [
        {
            data: datapoints,
            borderColor: '#0e9f6e',
            fill: false,
            cubicInterpolationMode: 'monotone',
            pointStyle: 'line',
            tension: 0.4,
            pointStyle: 'circle',
            pointRadius: 1,
        },
    ],
};
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
        },

        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: { maxTicksLimit: 10 },
            },
            y: {
                grid: {
                    drawBorder: false,
                    tickLength: 40,
                },

                ticks: {
                    max: 2400,
                    min: 0,
                    stepSize: 400,
                    callback: (context, index) => {
                        return context + 'k';
                    },
                },
            },
        },
        //----------- custom tooltip ------------
        plugins: {
            tooltip: {
                // Disable the on-canvas tooltip
                enabled: false,
                external: function (context) {
                    // Tooltip Element
                    let tooltipEl = document.getElementById('chartjs-tooltip');

                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        tooltipEl.innerHTML = '<table></table>';
                        document.body.appendChild(tooltipEl);
                    }

                    // Hide if no tooltip
                    const tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    // Set caret Position
                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }

                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }

                    // Set Text
                    if (tooltipModel.body) {
                        const titleLines = tooltipModel.title || [];
                        const bodyLines = tooltipModel.body.map(getBody);

                        let innerHtml = '<thead>';

                        titleLines.forEach(function (title) {
                            innerHtml += '<tr><th><div class = "tooltip--title">' + title + ', ' + yearCurrent + '</div></th></tr>';
                        });
                        innerHtml += '</thead>';

                        bodyLines.forEach(function (body, i) {
                            innerHtml +=
                                '<tr><th><div class = "tooltip--body">' +
                                '<div class ="tooltip--body--icon"></div>' +
                                '<span class = "tooltip--body--tilte"> Sales: </span> ' +
                                '&nbsp' +
                                '<span class ="tooltip--body--value"> ' +
                                body +
                                'k' +
                                '&nbsp' +
                                'VND' +
                                ' </span></div></th></tr>';
                        });

                        let tableRoot = tooltipEl.querySelector('table');
                        tableRoot.innerHTML = innerHtml;
                    }

                    const position = context.chart.canvas.getBoundingClientRect();
                    const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);
                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left - 94 + window.pageXOffset + tooltipModel.caretX + 'px';
                    console.log(tooltipEl.style.left);
                    console.log(position.left);
                    tooltipEl.style.top = position.top - 130 + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.font = bodyFont.string;
                    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                    tooltipEl.style.pointerEvents = 'none';
                },
            },

            legend: {
                display: false,
            },
        },
    },
    //add line onhover
    plugins: [
        {
            afterDraw: (chart) => {
                if (chart.tooltip?._active?.length) {
                    let x = chart.tooltip._active[0].element.x;
                    let yAxis = chart.scales.y;
                    let ctx = chart.ctx;
                    ctx.save();
                    ctx.beginPath();
                    ctx.setLineDash([5, 6]);
                    ctx.moveTo(x, yAxis.top);
                    ctx.lineTo(x, yAxis.bottom);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = '#e5e7eb';
                    ctx.stroke();
                    ctx.restore();
                }
            },
        },
    ],
};

const myChart = new Chart(document.getElementById('myChart'), config);
