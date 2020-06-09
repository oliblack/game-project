const tileArray = [[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]];

initialisation();


function initialisation(){
    console.log(tileArray);
}


//event listeners for arrow keys pressed
document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowUp') {
      alert('Up pressed!')
    } else if (event.code == 'ArrowDown') {
        alert('Down pressed!')
    } else if (event.code == 'ArrowRight') {
        alert('Right pressed!')
    } else if (event.code == 'ArrowLeft') {
        alert('Left pressed!')
    }
  });