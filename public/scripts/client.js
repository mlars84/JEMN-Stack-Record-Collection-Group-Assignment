$(document).ready(onReady);


function onReady() {
  getRecords();
  $('#addRecordButton').on('click', addRecord);
  $(document).on('click', '#remove', removeRecord);
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
      getRecords();
    }
  });
} // end addRecord

function getRecords() {
  $.ajax({
    url: '/getRecords',
    type: 'GET',
    success: function(response) {
      console.log(response);

      var outputDiv = $('#outputDiv');
      outputDiv.empty();

      for (var i = 0; i < response.length; i++) {
        var cellText = '<div class="col-sm-3" ><img src="'+ response[i].imageUrl +'" style="width:100%"/>';
          cellText += "<p>" + response[i].artist + "</p>";
          cellText += "<p>" + response[i].album + "</p>";
          cellText += "<p>" + response[i].year + "</p>";
          cellText += '<button data-id="' + response[i]._id + '" id="remove" type="button" name="button" class="btn">Remove</button></div>';
          outputDiv.append(cellText);
    }
  }
});
} // end getRecords

function removeRecord() {
  var myId = $(this).data('id');
  console.log('removing', myId);
  var recordToRemove = {
    id: myId
  };

  $.ajax({
    url: "/removeRecord",
    type: 'DELETE',
    data: recordToRemove,
    success: function(response) {
      console.log(response);
      getRecords();
    }
  });
} // end removeRecord
