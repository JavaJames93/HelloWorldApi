const uri = "api/helloworld";
let items = null;
function getCount(data) {
  const el = $("#counter");
  let name = "items";
  if (data) {
    if (data > 1) {
      name = "items";
    }
    el.text("Count: " + data);
  } else {
    el.text("No " + name);
  }
}

$(document).ready(function() {

    getData();
  
    $(".createItem").click(function() {
        $("#createItem").toggle().css('display', 'flex');
    });

    $("#submitItem").click(function() {
        $("#createItem").toggle();
    });

    $(".cancel").click(function() {
        $("#createItem").toggle();
        $("#add-item").val('');
    });

    $("#editCancel").click(function() {
        $("#spoiler").toggle();
    });
});

function getData() {
  $.ajax({
    type: "GET",
    url: uri,
    cache: false,
    success: function(data) {
      const tBody = $("#items");

      $(tBody).empty();

      getCount(data.length);

      $.each(data, function(key, item) {
        const tr = $("<div class='row'></div>")
          .append($("<div class='col col-6' style='display: flex; justify-content: center; align-items: center;'></div>").text(item.text))
          .append(
            $("<div class='col col-3'></div>").append(
              $("<button>Edit</button>").on("click", function() {
                editItem(item.id);
              })
            )
          )
          .append(
            $("<div class='col col-3'></div>").append(
              $("<button>Delete</button>").on("click", function() {
                deleteItem(item.id);
              })
            )
          );

        tr.appendTo(tBody);
      });

      items = data;
    }
  });
}

function addItem() {
  const item = {
    text: $("#add-item").val(),
    isComplete: false
  };

  $.ajax({
    type: "POST",
    accepts: "application/json",
    url: uri,
    contentType: "application/json",
    data: JSON.stringify(item),
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Something went wrong!");
    },
    success: function(result) {
      getData();
      $("#add-item").val("");
    }
  });
}

function deleteItem(id) {
  $.ajax({
    url: uri + "/" + id,
    type: "DELETE",
    success: function(result) {
      getData();
    }
  });
}

function editItem(id) {
  $.each(items, function(key, item) {
    if (item.id === id) {
      $("#edit-item").val(item.text);
      $("#edit-id").val(item.id);
    }
  });
  $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function() {
  const item = {
    text: $("#edit-item").val(),
    id: $("#edit-id").val()
  };

  $.ajax({
    url: uri + "/" + $("#edit-id").val(),
    type: "PUT",
    accepts: "application/json",
    contentType: "application/json",
    data: JSON.stringify(item),
    success: function(result) {
      getData();
    }
  });

  closeInput();
  return false;
});
