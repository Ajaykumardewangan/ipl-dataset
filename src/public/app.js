fetch('iplAllFunc.json').then((response) =>{return response.json()}).then((response) => {
    // console.log(response);
    let years=Object.keys(response.noOfMatechesplayed);
    let matches=Object.values(response.noOfMatechesplayed);
    matchesYear(years,matches);
})
function matchesYear(years,matches){
    var chart = Highcharts.chart('container-played', {

    title: {
        text: 'NO OF MATCHES PLAYED PER YEAR'
    },

    subtitle: {
        text: 'highchart'
    },

    xAxis: {
        categories: years
        
    },

    series: [{
        type: 'column',
        colorByPoint: true,
        data: matches,
        showInLegend: false
    }]

});
}
fetch('iplAllFunc.json').then((res) => {return res.json()}).then((res) => {
    let team=Object.keys(res.extraRunInYear);
    let extraRun=Object.values(res.extraRunInYear);
    teamExtraRun(team,extraRun);
})
function teamExtraRun(team,extraRun){
    var chart = Highcharts.chart('container-extr-run', {

    title: {
        text: 'EXTRA RUN CONCEDED PER TEAM IN 2016'
    },

    subtitle: {
        text: 'HighChart'
    },

    xAxis: {
        categories: team
        
    },

    series: [{
        type: 'column',
        colorByPoint: true,
        data: extraRun,
        showInLegend: false
    }]

});
}

fetch('iplAllFunc.json').then((res) =>{return res.json()}).then((res) =>{
    let bowler = Object.keys(res.ecoBowlerInYear);
    let ecoRate = Object.values(res.ecoBowlerInYear);
    ecoBowler(bowler,ecoRate);
})

function ecoBowler(bowler,ecoRate){
    var chart = Highcharts.chart('container-eco-bowler', {

    title: {
        text: 'TOP 10 ECONOMICAL BOWLERS IN 2015'
    },

    subtitle: {
        text: 'Highchart'
    },

    xAxis: {
        categories: bowler
        
    },

    series: [{
        type: 'column',
        colorByPoint: true,
        data: ecoRate,
        showInLegend: false
    }]

});
}

fetch('iplAllFunc.json').then((res) =>{return res.json()}).then((res) => {
    let years=Object.keys(res.eachTeamNoOfMatchesWon);
    let teamNwon=Object.values(res.eachTeamNoOfMatchesWon);
    console.log(teamNwon);
    let teams = teamNwon.reduce((allTeamsContainer,obj) =>{  
    var team_name=Object.keys(obj);
    var teamsInAYear = team_name.filter((val) => {
        return allTeamsContainer.indexOf(val)<0 && val !== "";
    });
     return allTeamsContainer.concat(teamsInAYear);
},[]);

//console.log(teams);
let allTeamNoOfwon = teams.map((team) =>{
    let teamNoOfwon={'name':team};
    teamNoOfwon['data']= years.map((year) =>
    {
        if(res.eachTeamNoOfMatchesWon[year].hasOwnProperty(team))
        {
          return res.eachTeamNoOfMatchesWon[year][team]
        }
        else{
              return 0;
        }
    });
//console.log("console for won matches",temp);
   return teamNoOfwon; 
})
numOfWon(years,allTeamNoOfwon);

})

function numOfWon(years,won){


Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'NUMBER OF MATCHES WON PER YEAR PER TEAM'
    },
    xAxis: {
        categories: years
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: won
});
}



