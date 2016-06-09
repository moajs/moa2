
function click_del (url) {
  if (!window.confirm("确认要删除？")) {
    return window.event.returnValue = false
  }
  
  console.log(url)
  
  $.ajax({
    type: "DELETE",
    url: url
  })
  .done( function (res) {
    if (res.status.code == 0) {
      // alert( "Data delete: success " + res.status.msg )
      window.location.href= location.href
    } else {
      alert( "Data delete fail: " + res.status.msg )
    } 
  })
}

function click_edit (id, url) {
  // $('#' + id).attr('action','#')
  console.log(url)
  
  if (!confirm("确认要更新？")) {
    return window.event.returnValue = false
  }
  
  var form = document.querySelector('form')
  var data = form2obj(form)
  console.log(data)
  
  // return false
  $.ajax({
    type: "PATCH",
    url: url,
    data : data
  })
  .done( function( res ) {
    if (res.status.code == 0){
      // alert( "Data delete: success " + res.status.msg )
      window.location.href= res.data.redirect
    } else {
      alert( "Data delete fail: " + res.status.msg )
    }
  })
  
  return false
}
