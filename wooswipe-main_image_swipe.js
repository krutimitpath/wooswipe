(function (document, window, $) {
    $("#wooswipe .woocommerce-main-image").on("click", function (e) {
        e.preventDefault();
    });
    "use strict";
    var main_image_swiper = wooswipe_data['product_main_slider'];
    var light_icon = ( wooswipe_data['light_icon'])  ? "style='filter: invert(1);'" : "";

    setTimeout(function(){
        if(wooswipe_data['light_icon']) {
            $('body').find('#wooswipe .slick-arrow').addClass('light-icon');
            $('body').find('#wooswipe .wooswipe-mainimagepopup').addClass('light-icon');
        } else {
            $('body').find('#wooswipe  .slick-arrow').removeClass('light-icon');
            $('body').find('#wooswipe .wooswipe-mainimagepopup').removeClass('light-icon');
        }
    },100);

    var add_slick_track_class = " ";
    var add_slick_slide_class = " ";
    if (main_image_swiper) {
        add_slick_track_class = ".slick-track";
        add_slick_slide_class = ".slick-slide";
    }
    (function productThumbnails() {
        // see wp_enqueue_script wp_localize_script wooswipe.php
        var plugin_path = wooswipe_wp_plugin_path.templateUrl + "/";

        var addPintrest = wooswipe_data['addpin'];

        var firstUrl = $(".single-product-main-image img").attr("src");
        var alt = $(".single-product-main-image img").attr("alt");
        var link = window.location.href;

        // run this on thumbnail click
        function pinit(url) {
            $(".wooswipe-pinit").attr(
                "href",
                "https://www.pinterest.com/pin/create/button/?media=" +
                url +
                "&url=" +
                link +
                "&description=" +
                encodeURI(alt)
            );
        }

        if (addPintrest) {
            // set up first pin
            if ($(".single-product-main-image").length != 0) {
                $("#wooswipe").prepend(
                    '<a class="wooswipe-pinit wooswipe-mainimagepin" target="_blank" rel="noreferrer noopener" href="https://www.pinterest.com/pin/create/button/?media=' +
                    firstUrl +
                    "&url=" +
                    link +
                    "&description=" +
                    encodeURI(alt) +
                    '"><img src="' +
                    plugin_path +
                    '/pinit/pinterest.svg" alt="Pinterest" /></a>'
                );

            }
            // popit new window
            $(".wooswipe-pinit").click(function (e) {
                e.preventDefault();
                var popitHref = $(this).attr("href");
                window.open(
                    popitHref,
                    "popUpWindow",
                    "height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes"
                );
                return false;
            });
            // end add pin
        }


        // setup the full screen box
        $("#wooswipe").prepend(
            '<a class="wooswipe-popup wooswipe-mainimagepopup" rel="noreferrer noopener" href="' +
            firstUrl + '"><img src="' +
            plugin_path +
            '/images/full-screen-box.svg" alt="wooswipe-zoom" '+light_icon+'/></a>'
        );

        // It will setup the selected image url for the full screen view
        function setup_full_screen_image_url(url) {
            $(".wooswipe-popup").attr("href", url);
        }



        $(".thumbnail-nav").slick({
            variableWidth: false,
            dots: false,
            focusOnSelect: false,
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            respondTo: "slider",
            responsive: [
                {
                    breakpoint: 680,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 520,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 3
                    }
                }
            ]
        });


        // if slider enable for the main image

        // implement slick carousel for main image slider
        $(".single-product-main-image").slick({
            variableWidth: false,
            dots: false,
            focusOnSelect: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            respondTo: "slider",
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 680,
                    settings: {
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 520,
                    settings: {
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
        // change pinterest src on side arrows navigation click
        $("#wooswipe .slick-arrow").on("click", function (event) {
            var current_slide = $(".single-product-main-image .slick-active").find("a").attr('data-med');

            if (addPintrest) {
                pinit(current_slide);
                setup_full_screen_image_url(current_slide);
            }
        });
        // set the data attributes for the image on thumbnail click
        $('div.thumb[data-slide]').click(function (e) {
            e.preventDefault();
            var $this = $(this);
            var med = $this.attr("data-med");
            var srcset = $this.attr("data-med");
            var width = $this.attr("data-medw");
            var height = $this.attr("data-medh");
            var hq = $this.attr("data-hq");
            var hqw = $this.attr("data-w");
            var hqh = $this.attr("data-h");
            var atid = $this.attr("data-attachment_id");
            var ind = $this.parent().index();
            var parHeight = 0;

            mainImage = $(".single-product-main-image #" + atid);

            mainImage
                .attr("data-ind", ind)
                .attr("src", med)
                .attr("srcset", med)
                .attr("width", width)
                .attr("height", height)
                .attr("data-hq", hq)
                .attr("data-w", hqw)
                .attr("data-h", hqh)
                .attr("data-attachment_id", atid);
            if (addPintrest) {
                pinit(med);
                setup_full_screen_image_url(med);
            }
            var slideno = $(this).data('slide');
            // implemented the main slider naviation on thumbnail click
            $('.single-product-main-image').slick('slickGoTo', slideno);
        });


        var mainImage = $(".single-product-main-image " + add_slick_track_class + " img");
        if (!mainImage.length) {
            mainImage = $(".single-product-main-image " + add_slick_track_class + " img");
            mainImage.wrap('<a class="woocommerce-main-image zoom" href="#"></a>');
            $(".woocommerce-main-image").wrap(
                '<div class="single-product-main-image"></div>'
            );
            if (addPintrest) {
                pinit(mainImage[0].src);
                setup_full_screen_image_url(mainImage[0].src);
            }
        }

        // on variation change set popup index to changed variation (if slider enable for the main image)

        $(document).on("change", ".variations select", function () {
            var srcind = displaySwachesOrVariationSelection();
            $('.single-product-main-image').slick('slickGoTo', srcind);
            // $("#wooswipe .single-product-main-image "+add_slick_slide_class+" img").attr("data-ind", srcind);
        });


        // compatibility for "WooCommerce Variation Swatches and Photo". On swatch change set popup index to changed variation
        if ($(".variations .swatch-control").length > 0) {

            // if slider enable for the main image

            $(".variations_form").addClass('has-swatches');

            // manage variation change for the color type swatch
            $(document).on("click", ".variations_form.has-swatches .swatch-wrapper.selected ", function (e) {
                displaySwachesOrVariationSelection();
            });

            // manage variation change for the radio type swatch
            $(document).on("change", ".variations_form.has-swatches .radio-select.swatch-control li input[type=radio]", function (e) {
                displaySwachesOrVariationSelection();
            });
        }
        function displaySwachesOrVariationSelection() {
            var variation_img_src_with_swatch = $(".woocommerce-product-gallery__image").attr("data-thumb");
            var srcind_new = 0;
            var pinimgsrc = '';
            $("div.thumb[data-slide]").each(function () {
                if (variation_img_src_with_swatch == $(this).attr("data-med")) {
                    srcind_new = $(this).parent().attr("data-slick-index");
                    pinimgsrc = $(this).attr("data-med");
                }
            });

            $('.single-product-main-image').slick('slickGoTo', srcind_new);

            // $("#wooswipe .single-product-main-image "+add_slick_slide_class+" img").attr("data-ind", srcind_new);
            if (addPintrest) {
                pinit(pinimgsrc);
                setup_full_screen_image_url(pinimgsrc);
            }
            return srcind_new;
        };
    })();



    (function photoSwipe() {
        var pswpElement = document.querySelectorAll(".pswp")[0];
        var items = [];

        function openPswp(index) {
            var options = {
                index: index,
                shareEl: false
            };
            // Initializes and opens PhotoSwipe
            var gallery = new PhotoSwipe(
                pswpElement,
                PhotoSwipeUI_Default,
                items,
                options
            );
            gallery.init();
        }

        // build items array
        function pushItem(image) {
            var src = image.attributes["data-hq"].value;
            var w = image.attributes["data-w"].value;
            var h = image.attributes["data-h"].value;
            var t = image.attributes["data-title"].value;
            var item = {
                src: src,
                w: w,
                h: h,
                title: t
            };
            items.push(item);
        }

        // Adding items to image for lightbox
        if ($(".thumbnails .thumb").length > 0) {
            var $thumbs = $(".thumbnails .thumb");

            for (var i = 0; i < $thumbs.length; i++) {
                var thumbAlt = $($thumbs[i]).find("img").attr("alt");
                $thumbs.attr("data-title", thumbAlt);
                pushItem($thumbs[i]);
            }
        } else if ($(".single-product-main-image").length > 0) {
            var singleImg = $(".single-product-main-image img");
            for (var i = 0; i < singleImg.length; i++) {
                var singleImgAlt = $(singleImg[i]).attr("alt");
                singleImg.attr("data-title", singleImgAlt);
                var $this = $(".single-product-main-image img");
                pushItem($this);
            }
        }

        // click event
        if ($(".single-product-main-image " + add_slick_slide_class + " img").length > 0) {
            $(document).on("click", ".wooswipe-popup", function (e) {

                // Allow user to open image link in new tab or download it
                if (e.which == 2 || e.ctrlKey || e.altKey) {
                    return;
                }
                var current_active_slick = jQuery(".slick-current.slick-active")[0];
                var ind = jQuery(current_active_slick).attr("data-slick-index");

                e.preventDefault();
                var index = ind ? parseInt(ind) : 0;
                openPswp(index);
            });
        }
    })();
})(document, window, jQuery);