let gamesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let gameData;

let canvas = d3.select('#canvas');
let tooltip = d3.select('#tooltip');


let drawTreeMap = () => {

  let hierarchy = d3.hierarchy(gameData,
  node => {
    return node['children'];
  }).
  sum(
  node => {
    return node['value'];
  }).
  sort(
  (node1, node2) => {
    return node2['value'] - node1['value'];
  });

  d3.treemap().
  size([1000, 800])(
  hierarchy);
  let gameTiles = hierarchy.leaves();
  let block = canvas.selectAll('g').
  data(gameTiles).
  enter().
  append('g').
  attr('transform', game => {
    return 'translate(' + game['x0'] + ', ' + game['y0'] + ')';
  });

  block.append('rect').
  attr('width', game => {
    return game['x1'] - game['x0'];
  }).
  attr('height', game => {
    return game['y1'] - game['y0'];
  }).
  attr('class', 'tile').
  attr('stroke', 'black').
  attr('fill', game => {
    let category = game['data']['category'];
    if (category === 'Wii') {
      return 'tomato';
    } else if (category === 'X360') {
      return 'lightGreen';
    } else if (category === 'PS2') {
      return 'lightBlue';
    } else if (category === 'PS3') {
      return 'cyan';
    } else if (category === 'PS4') {
      return 'blue';
    } else if (category === 'GB') {
      return 'lightGrey';
    } else if (category === 'GBA') {
      return 'gold';
    } else if (category === 'DS') {
      return 'yellow';
    } else if (category === 'PC') {
      return 'orange';
    } else if (category === 'N64') {
      return 'red';
    } else if (category === 'XB') {
      return 'green';
    } else if (category === '3DS') {
      return 'pink';
    } else if (category === '2600') {
      return 'grey';
    } else if (category === 'PS') {
      return 'linen';
    } else if (category === 'NES') {
      return 'green';
    } else if (category === 'SNES') {
      return 'rgb(255, 201, 147)';
    } else if (category === 'P5') {
      return 'rgb(147, 201, 255)';
    } else if (category === 'PSP') {
      return 'rgb(200, 147, 200)';
    } else if (category === 'XOne') {
      return 'rgb(147, 167, 225)';
    }
  }).
  attr('data-name', game => {
    return game['data']['name'];
  }).
  attr('data-category', game => {
    return game['data']['category'];
  }).
  attr('data-value', game => {
    return game['data']['value'];
  }).
  on('mouseover', (event, game) => {
    tooltip.transition().duration(0).
    style('visibility', 'visible').
    style('top', event.pageY + 'px').
    style('left', event.pageX + 'px').
    attr('data-value', game['data']['value']);

    tooltip.html(
    'Console: ' + game['data']['category'] + '<br />' +
    'Game: ' + game['data']['name'] + '<br />' +
    'Score: ' + game['data']['value']);

  }).
  on('mouseout', game => {
    tooltip.transition().style('visibility', 'hidden');
  });

  block.append('text').
  text(game => {
    return game['data']['name'];
  }).
  attr('x', 5).
  attr('y', 30);

};

d3.json(gamesUrl).then(
(data, error) => {
  if (error) {
    console.log(error);
  } else {
    gameData = data;
    console.log(gameData);
    drawTreeMap();
  }
});