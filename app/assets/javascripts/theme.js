$(document).ready(function() {
    var e = function() {
         $(".right_col").css("min-height", $(window).height());
        var e = $("body").outerHeight(),
            t = $("body").hasClass("footer_fixed") ? 0 : $("footer").height(),
            n = $(".left_col").eq(1).height() + $(".sidebar-footer").height(),
            i = n > e ? n : e;
        i -= $(".nav_menu").height() + t, $("right_col").css("min-height", i)
    };
    $("#sidebar-menu").find("a").on("click", function(t) {
        var n = $(this).parent();
        n.is(".active") ? (n.removeClass("active active-sm"), $("ul:first", n).slideUp(function() {
            e()
        })) : (n.parent().is(".child_menu") || ($("#sidebar-menu").find("li").removeClass("active active-sm"), $("#sidebar-menu").find("li ul").slideUp()), n.addClass("active"), $("ul:first", n).slideDown(function() {
            e()
        }))
    }), $("#menu_toggle").on("click", function() {
        $("body").hasClass("nav-md") ? ($("#sidebar-menu").find("li.active ul").hide(), $("#sidebar-menu").find("li.active").addClass("active-sm").removeClass("active")) : ($("#sidebar-menu").find("li.active-sm ul").show(), $("#sidebar-menu").find("li.active-sm").addClass("active").removeClass("active-sm")), $('body').toggleClass("nav-md nav-sm"), e()
    }), $("#sidebar-menu").find('a[href="' + window.location.href.split("?")[0] + '"]').parent("li").addClass("current-page"), $("#sidebar-menu").find("a").filter(function() {
        return this.href == window.location.href.split("?")[0]
    }).parent("li").addClass("current-page").parents("ul").slideDown(function() {
        e()
    }).parent().addClass("active"), $(window).smartresize(function() {
        e()
    }), e(), $.fn.mCustomScrollbar && $(".menu_fixed").mCustomScrollbar({
        autoHideScrollbar: !0,
        theme: "minimal",
        mouseWheel: {
            preventDefault: !0
        }
    })
}), $(document).ready(function() {
    $(".collapse-link").on("click", function() {
        var e = $(this).closest(".x_panel"),
            t = $(this).find("i"),
            n = e.find(".x_content");
        e.attr("style") ? n.slideToggle(200, function() {
            e.removeAttr("style")
        }) : (n.slideToggle(200), e.css("height", "auto")), t.toggleClass("fa-chevron-up fa-chevron-down")
    }), $(".close-link").click(function() {
        var e = $(this).closest(".x_panel");
        e.remove()
    })
}), $(document).ready(function() {
    $("input.flat")[0] && $(document).ready(function() {
        $("input.flat").iCheck({
            checkboxClass: "icheckbox_flat-green",
            radioClass: "iradio_flat-green"
        })
    })
}), $("table input").on("ifChecked", function() {
    checkState = "", $(this).parent().parent().parent().addClass("selected"), countChecked()
}), $("table input").on("ifUnchecked", function() {
    checkState = "", $(this).parent().parent().parent().removeClass("selected"), countChecked()
});
var checkState = "";
$(".bulk_action input").on("ifChecked", function() {
        checkState = "", $(this).parent().parent().parent().addClass("selected"), countChecked()
    }), $(".bulk_action input").on("ifUnchecked", function() {
        checkState = "", $(this).parent().parent().parent().removeClass("selected"), countChecked()
    }), $(".bulk_action input#check-all").on("ifChecked", function() {
        checkState = "all", countChecked()
    }), $(".bulk_action input#check-all").on("ifUnchecked", function() {
        checkState = "none", countChecked()
    }), $(document).ready(function() {
        $(".expand").on("click", function() {
            $(this).next().slideToggle(200), $expand = $(this).find(">:first-child"), "+" == $expand.text() ? $expand.text("-") : $expand.text("+")
        })
    }), "undefined" != typeof NProgress && ($(document).ready(function() {
        NProgress.start()
    }), $(window).load(function() {
        NProgress.done()
    })),
    function(e, t) {
        var n = function(e, t, n) {
            var i;
            return function() {
                function c() {
                    n || e.apply(a, o), i = null
                }
                var a = this,
                    o = arguments;
                i ? clearTimeout(i) : n && e.apply(a, o), i = setTimeout(c, t || 100)
            }
        };
        jQuery.fn[t] = function(e) {
            return e ? this.bind("resize", n(e)) : this.trigger(t)
        }
    }(jQuery, "smartresize");