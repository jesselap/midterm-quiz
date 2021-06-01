$(
  () => {
    $("#userNav li a").promise().done(function() {
      $(".nav-link active").removeClass("active")
      const curPath = window.location.pathname
      $(`a[href="${curPath}"]`).addClass("active")
    })
  }
)
