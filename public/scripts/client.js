$(document).ready(onReady);


function onReady() {
  $('#addRecordButton').on('click', addRecord);
}

function addRecord() {
  console.log('addRecords hit!!! :-)');

  var recordToSend = {
    artist: $('#artistIn').val(),
    album: $('#albumIn').val(),
    year: $('#yearIn').val(),
    imageUrl: $('#imageUrlIn').val()
  };
  console.log(recordToSend);

  $.ajax({
    url: '/addRecord',
    type: 'POST',
    data: recordToSend,
    success: function(response) {
      console.log(response);
    }
  });

}
