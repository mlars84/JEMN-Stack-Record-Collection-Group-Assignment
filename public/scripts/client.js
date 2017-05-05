$(document).ready(onReady);


function onReady() {
  getRecords();
  $('#addRecordButton').on('click', addRecord);
  $(document).on('click', '.remove', removeRecord);
  $(document).on('click', '.update', updateRecord);
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
      $('#artistIn').val('');
      $('#albumIn').val('');
      $('#yearIn').val('');
      $('#imageUrlIn').val('');
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
      updateRecord(response);
      var outputDiv = $('#outputDiv');
      outputDiv.empty();

      for (var i = 0; i < response.length; i++) {
        var cellText = '<div class="col-sm-2 recordDiv" ><img class="imageCell" data-image="' + response[i].imageUrl + '"src="'+ response[i].imageUrl +'" style="width:100%"/>';
          cellText += '<p class="artistCell" data-artist="' + response[i].artist + '">' + response[i].artist + "</p>";
          cellText += '<p class="albumCell" data-album="' + response[i].album + '">' + response[i].album + "</p>";
          cellText += '<p class="yearCell" data-year="' + response[i].year + '">' + response[i].year + "</p>";
          cellText += '<button data-id="' + response[i]._id + '" class="remove btn" type="button" name="button" class="btn">Remove</button><button data-id="' + response[i]._id + '" class="update btn" type="button" name="button" class="btn">Update</button></div>';
          outputDiv.append(cellText);
    }
  }
});
} // end getRecords

function updateRecord() {
  console.log(this);
  console.log('this artist:', $(this).closest('.recordDiv').data('artist'));
  $(this).closest('.recordDiv').append('<div class=""><input id="editArtist" type="text" name="" value=""><input id="editAlbum" type="text" name="" value=""><input id="editYear" type="text" name="" value=""><input id="editImage" type="text" name="" value=""></div>');

  var myId = $(this).data('id');
  console.log('updating id', myId);
  var recordToUpdate = {
    id:myId
  };

  $.ajax({
    url: '/updateRecord',
    type: 'PUT',
    data: recordToUpdate,
    success: function(response) {
      console.log(response);
    }
  });
} // end updateRecord

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
