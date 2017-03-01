$(document).ready(function(){
    $("#rating-button").click(function(){
              $(".c100 > span").css({
              width: "3.33em",
              lineHeight: "3.33em",
              fontSize: "0.3em",
              color: "#307bbb"
            });
            setTimeout(function(){
              $(".c100 > span").css({
                width: "100%",
                lineHeight: "5em",
                fontSize: "0.2em",
                color: "#cccccc"
          });
      }, 1000);
    });
});
