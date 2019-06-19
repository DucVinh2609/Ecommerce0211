
    var selectCallback = function(variant, selector) {
      if (!variant) {
        return false;
      }
      var _parent = '.product-info';
      var _parentprice = _parent + ' .price-box';
      if (variant.price < variant.compare_at_price) {
        jQuery(_parentprice + '>span:last-child').addClass('price-box__old');
        jQuery(_parentprice + '>span:first-child').show();
        changePriceValue(_parentprice + '>span:last-child', variant.compare_at_price);
        changePriceValue(_parentprice + '>span:first-child', variant.price);
        jQuery('.product_message_alarm').show();
      } else {
        jQuery(_parentprice + '>span:first-child').hide();
        jQuery(_parentprice + '>span:last-child').removeClass(
          'price-box__old');
        changePriceValue(_parentprice + '>span:last-child', variant.price);
        jQuery('.product_message_alarm').hide();
      }
      // BEGIN SWATCHES
      if (variant) {
        var form = jQuery('#' + selector.domIdPrefix).closest('form');
        for (var i = 0, length = variant.options.length; i < length; i++) {
          var val = variant.options[i].replace(/'/g, "&#039;");
          var radioButton = form.find(".swatch[data-option-index='" + i +
            "'] :radio[value='" + val + "']");
          if (radioButton.size()) {
            radioButton.get(0).checked = true;
          }
        }
      }
      // END SWATCHES
      newVariantTextData(_parent + ' .sku', variant.sku);
      if (jQuery(_parent + ' .product-info__sku').length) {
        var $ava = jQuery(_parent + " .product-info__availability");
        if (variant.sku != "") {
          if ($ava.hasClass('pull-left')) {
            $ava.removeClass('pull-left')
          }
        } else {
          if (!$ava.hasClass('pull-left')) {
            $ava.addClass('pull-left')
          }
        }
      }
      if (variant.available) {
        if (jQuery(_parent + " .product-info__availability .color-red").length) {
          jQuery(_parent + " .product-info__availability .color-red").removeClass(
            'color-red');
        }
        if (variant.inventory_management == null) {
          jQuery(_parent + " .product-info__availability .color").text(
            "Many in stock");
          jQuery('.product_message_alarm').hide();
          jQuery('.divider_alarm').hide();
        } else {
          jQuery(_parent + " .product-info__availability .color").text(
            variant.inventory_quantity + " in stock");
          var percent = Math.round(100 - (variant.price / variant.compare_at_price) *
            100);
          jQuery('.product_message_alarm .percent').text(percent);
          percent == '-Infinity' ? jQuery(
            '.product_message_alarm .percent_parent').hide() : jQuery(
            '.product_message_alarm .percent_parent').show();
          percent == '-Infinity' ? jQuery('.product_message_alarm').css(
            'margin-top', '30px') : jQuery('.product_message_alarm').css(
            'margin-top', '0');
          jQuery('.product_message_alarm .percent').text(percent);
          jQuery('.product_message_alarm .update_quantity_not_delete').text(
            variant.inventory_quantity);
          jQuery('.product_message_alarm').show();
          jQuery('.divider_alarm').show();
        }
      } else {
        jQuery(_parent + " .product-info__availability .color").text(
          "Out of stock");
        jQuery(_parent + " .product-info__availability .color").addClass(
          "color-red");
        jQuery('.product_message_alarm').hide();
        jQuery('.divider_alarm').hide();
      }
      if (variant && variant.featured_image && jQuery("#bigImg").length > 0) {
        var originalImage = jQuery("#bigImg");
        var newImage = variant.featured_image;
        var element = originalImage[0];
        Shopify.Image.switchImage(newImage, element, function(
          newImageSizedSrc, newImage, element) {
          jQuery('.zoomContainer').remove();
          jQuery(element).removeData('elevateZoom');
          jQuery(element).attr('src', newImageSizedSrc);
          jQuery(element).attr('zoom-image', newImageSizedSrc);
          elevateZoom();
        });
        if ($j("#mobileGallery").length) {
          var src = String(newImage.src).replace("https:", "").replace(
            "http:", "");
          var arr = src.split('.');
          src = arr[0];
          for (var i = 1; i < arr.length; i++) {
            src += (i == arr.length - 1 ? '_1024x1024.' : '.') + arr[i];
          }
          var num = jQuery('[src="' + src + '"]').last().parent().attr(
            'data-slick-index');
          if (num) {
            var $container = $j("#mobileGallery");
            $container.slick('slickGoTo', num);
          }
        }
      }
      if (variant && variant.available) {
        jQuery(_parent + ' .addtocart').removeAttr('disabled');
        jQuery(_parent + ' .addtocart').html(
          '<span class="icon icon-shopping_basket"></span> Add to Cart');
        jQuery(_parent + ' .qty-label').show();
        jQuery(_parent + ' .qty-input').show();
      } else {
        jQuery(_parent + ' .addtocart').attr('disabled', 'disabled');
        jQuery(_parent + ' .addtocart').html('Unavailable');
        jQuery(_parent + ' .qty-label').hide();
        jQuery(_parent + ' .qty-input').hide();
      }
    };

    function changePriceValue(cell, value) {
      jQuery(cell).html(Shopify.formatMoney(value,
        "<span class=money>${{amount}}</span>"));
    };

    function newVariantTextData(obj, value) {
      if (value != '') {
        jQuery(obj).parent().show();
        jQuery(obj).text(value);
      } else {
        jQuery(obj).parent().hide();
        jQuery(obj).text('');
      }
    };
    jQuery(document).ready(function($) {
      if (jQuery("#product-select").length) {
        new Shopify.OptionSelectors("product-select", {
          product: {
            "id": 9097940428,
            "title": "D-Kallien Boots",
            "handle": "paul-smith-blazer",
            "description": "\u003cp\u003eLorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\u003c\/p\u003e\n\u003cdiv class=\"divider divider--md\"\u003e\u003c\/div\u003e\n\u003ctable class=\"table table-params\"\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003ePROOF\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003ePDF Proof\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eSAMPLES\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eDigital, Printed\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eWRAPPING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eYes, No\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eUV GLOSS COATING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eYes\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eSHRINK WRAPPING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eNo Shrink Wrapping, Shrink in 25s, Shrink in 50s, Shrink in 100s\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eWEIGHT\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003e0.05, 0.06, 0.07ess cards\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003c\/tbody\u003e\n\u003c\/table\u003e\n[tabs][tab title=\"E\"]Unique Tab. Content 1[\/tab][tab title=\"F\"]Unique Tab. Content 2[\/tab][tab title=\"H\"]Unique Tab. Content 3[\/tab][\/tabs][item-gallery][icon-new-always][countdown]2017\/07\/30 10:30:00[\/countdown][smallDescription]Silver, metallic-blue and metallic-lavender silk-blend jacquard, graphic pattern, pleated ruffle along collar, long sleeves with button-fastening cuffs, buckle-fastening silver skinny belt, large pleated rosettes at hips. Dry clean. Zip and hook fastening at back. 100% silk. Specialist clean. [\/smallDescription] [custom_html]\n\u003cdiv class=\"product-info__description__brand\"\u003e\u003cimg src=\"https:\/\/cdn.shopify.com\/s\/files\/1\/1020\/0405\/files\/brand.png?10631915041598488553\" alt=\"\"\u003e\u003c\/div\u003e\n\u003cdiv class=\"product-info__description__text\"\u003eLorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.\u003c\/div\u003e\n[\/custom_html] [video]https:\/\/www.youtube.com\/watch?v=wR-ySdcnbtk[\/video]",
            "published_at": "2016-12-03T17:05:07-05:00",
            "created_at": "2016-12-03T17:05:07-05:00",
            "vendor": "Your Store Default",
            "type": "Dress",
            "tags": ["$10-$100", "34", "Bags", "Belts", "bikini",
              "Blazers", "clothes", "club dresses", "colorful",
              "Hats", "Jeans", "Jewellery",
              "Jumpers \u0026 Cardigans", "Levi's", "model",
              "prom dresses", "streetstyle", "style", "Sweat Pants",
              "vintage", "white", "Yellow"
            ],
            "price": 8500,
            "price_min": 8500,
            "price_max": 8500,
            "available": true,
            "price_varies": false,
            "compare_at_price": 13000,
            "compare_at_price_min": 13000,
            "compare_at_price_max": 13000,
            "compare_at_price_varies": false,
            "variants": [{
              "id": 31530899468,
              "title": "S \/ red",
              "option1": "S",
              "option2": "red",
              "option3": null,
              "sku": "Stock Keeping Unit",
              "requires_shipping": true,
              "taxable": true,
              "featured_image": null,
              "available": false,
              "name": "D-Kallien Boots - S \/ red",
              "public_title": "S \/ red",
              "options": ["S", "red"],
              "price": 8500,
              "weight": 0,
              "compare_at_price": 13000,
              "inventory_quantity": 0,
              "inventory_management": "shopify",
              "inventory_policy": "deny",
              "barcode": null
            }, {
              "id": 31530899532,
              "title": "S \/ green",
              "option1": "S",
              "option2": "green",
              "option3": null,
              "sku": null,
              "requires_shipping": true,
              "taxable": true,
              "featured_image": null,
              "available": true,
              "name": "D-Kallien Boots - S \/ green",
              "public_title": "S \/ green",
              "options": ["S", "green"],
              "price": 8500,
              "weight": 0,
              "compare_at_price": 13000,
              "inventory_quantity": 5,
              "inventory_management": "shopify",
              "inventory_policy": "deny",
              "barcode": null
            }, {
              "id": 31530899596,
              "title": "S \/ blue",
              "option1": "S",
              "option2": "blue",
              "option3": null,
              "sku": null,
              "requires_shipping": true,
              "taxable": true,
              "featured_image": null,
              "available": true,
              "name": "D-Kallien Boots - S \/ blue",
              "public_title": "S \/ blue",
              "options": ["S", "blue"],
              "price": 8500,
              "weight": 0,
              "compare_at_price": 13000,
              "inventory_quantity": 1,
              "inventory_management": null,
              "inventory_policy": "deny",
              "barcode": null
            }, {
              "id": 31530899660,
              "title": "M \/ red",
              "option1": "M",
              "option2": "red",
              "option3": null,
              "sku": null,
              "requires_shipping": true,
              "taxable": true,
              "featured_image": null,
              "available": true,
              "name": "D-Kallien Boots - M \/ red",
              "public_title": "M \/ red",
              "options": ["M", "red"],
              "price": 8500,
              "weight": 0,
              "compare_at_price": 13000,
              "inventory_quantity": -3,
              "inventory_management": null,
              "inventory_policy": "deny",
              "barcode": null
            }, {
              "id": 31530899724,
              "title": "M \/ green",
              "option1": "M",
              "option2": "green",
              "option3": null,
              "sku": null,
              "requires_shipping": true,
              "taxable": true,
              "featured_image": null,
              "available": true,
              "name": "D-Kallien Boots - M \/ green",
              "public_title": "M \/ green",
              "options": ["M", "green"],
              "price": 8500,
              "weight": 0,
              "compare_at_price": 13000,
              "inventory_quantity": 19,
              "inventory_management": "shopify",
              "inventory_policy": "deny",
              "barcode": null
            }, {
              "id": 31530899788,
              "title": "M \/ blue",
              "option1": "M",
              "option2": "blue",
              "option3": null,
              "sku": null,
              "requires_shipping": true,
              "taxable": true,
              "featured_image": null,
              "available": true,
              "name": "D-Kallien Boots - M \/ blue",
              "public_title": "M \/ blue",
              "options": ["M", "blue"],
              "price": 8500,
              "weight": 0,
              "compare_at_price": 13000,
              "inventory_quantity": 1,
              "inventory_management": null,
              "inventory_policy": "deny",
              "barcode": null
            }, {
              "id": 31530899852,
              "title": "L \/ red",
              "option1": "L",
              "option2": "red",
              "option3": null,
              "sku": null,
              "requires_shipping": true,
              "taxable": true,
              "featured_image": null,
              "available": true,
              "name": "D-Kallien Boots - L \/ red",
              "public_title": "L \/ red",
              "options": ["L", "red"],
              "price": 8500,
              "weight": 0,
              "compare_at_price": 13000,
              "inventory_quantity": 1,
              "inventory_management": null,
              "inventory_policy": "deny",
              "barcode": null
            }, {
              "id": 31530899916,
              "title": "L \/ green",
              "option1": "L",
              "option2": "green",
              "option3": null,
              "sku": null,
              "requires_shipping": true,
              "taxable": true,
              "featured_image": null,
              "available": true,
              "name": "D-Kallien Boots - L \/ green",
              "public_title": "L \/ green",
              "options": ["L", "green"],
              "price": 8500,
              "weight": 0,
              "compare_at_price": 13000,
              "inventory_quantity": 0,
              "inventory_management": null,
              "inventory_policy": "deny",
              "barcode": null
            }, {
              "id": 31530899980,
              "title": "L \/ blue",
              "option1": "L",
              "option2": "blue",
              "option3": null,
              "sku": null,
              "requires_shipping": true,
              "taxable": true,
              "featured_image": null,
              "available": true,
              "name": "D-Kallien Boots - L \/ blue",
              "public_title": "L \/ blue",
              "options": ["L", "blue"],
              "price": 8500,
              "weight": 0,
              "compare_at_price": 13000,
              "inventory_quantity": 1,
              "inventory_management": null,
              "inventory_policy": "deny",
              "barcode": null
            }, {
              "id": 31530900044,
              "title": "S \/ White",
              "option1": "S",
              "option2": "White",
              "option3": null,
              "sku": null,
              "requires_shipping": true,
              "taxable": true,
              "featured_image": null,
              "available": true,
              "name": "D-Kallien Boots - S \/ White",
              "public_title": "S \/ White",
              "options": ["S", "White"],
              "price": 8500,
              "weight": 0,
              "compare_at_price": 13000,
              "inventory_quantity": 1,
              "inventory_management": "shopify",
              "inventory_policy": "deny",
              "barcode": null
            }],
            "images": [
              "\/\/cdn.shopify.com\/s\/files\/1\/1637\/5229\/products\/LEATHER_FUR_CROSSBODY_BAG_4.jpg?v=1481124090",
              "\/\/cdn.shopify.com\/s\/files\/1\/1637\/5229\/products\/LEATHER_TASSEL_WALLET.jpg?v=1481124092",
              "\/\/cdn.shopify.com\/s\/files\/1\/1637\/5229\/products\/LEATHER_TASSEL_WALLET_1.jpg?v=1481124094"
            ],
            "featured_image": "\/\/cdn.shopify.com\/s\/files\/1\/1637\/5229\/products\/LEATHER_FUR_CROSSBODY_BAG_4.jpg?v=1481124090",
            "options": ["Size", "Color"],
            "content": "\u003cp\u003eLorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\u003c\/p\u003e\n\u003cdiv class=\"divider divider--md\"\u003e\u003c\/div\u003e\n\u003ctable class=\"table table-params\"\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003ePROOF\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003ePDF Proof\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eSAMPLES\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eDigital, Printed\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eWRAPPING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eYes, No\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eUV GLOSS COATING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eYes\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eSHRINK WRAPPING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eNo Shrink Wrapping, Shrink in 25s, Shrink in 50s, Shrink in 100s\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eWEIGHT\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003e0.05, 0.06, 0.07ess cards\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003c\/tbody\u003e\n\u003c\/table\u003e\n[tabs][tab title=\"E\"]Unique Tab. Content 1[\/tab][tab title=\"F\"]Unique Tab. Content 2[\/tab][tab title=\"H\"]Unique Tab. Content 3[\/tab][\/tabs][item-gallery][icon-new-always][countdown]2017\/07\/30 10:30:00[\/countdown][smallDescription]Silver, metallic-blue and metallic-lavender silk-blend jacquard, graphic pattern, pleated ruffle along collar, long sleeves with button-fastening cuffs, buckle-fastening silver skinny belt, large pleated rosettes at hips. Dry clean. Zip and hook fastening at back. 100% silk. Specialist clean. [\/smallDescription] [custom_html]\n\u003cdiv class=\"product-info__description__brand\"\u003e\u003cimg src=\"https:\/\/cdn.shopify.com\/s\/files\/1\/1020\/0405\/files\/brand.png?10631915041598488553\" alt=\"\"\u003e\u003c\/div\u003e\n\u003cdiv class=\"product-info__description__text\"\u003eLorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.\u003c\/div\u003e\n[\/custom_html] [video]https:\/\/www.youtube.com\/watch?v=wR-ySdcnbtk[\/video]"
          },
          onVariantSelected: selectCallback,
          enableHistoryState: true
        });
        Shopify.linkOptionSelectors({
          "id": 9097940428,
          "title": "D-Kallien Boots",
          "handle": "paul-smith-blazer",
          "description": "\u003cp\u003eLorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\u003c\/p\u003e\n\u003cdiv class=\"divider divider--md\"\u003e\u003c\/div\u003e\n\u003ctable class=\"table table-params\"\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003ePROOF\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003ePDF Proof\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eSAMPLES\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eDigital, Printed\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eWRAPPING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eYes, No\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eUV GLOSS COATING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eYes\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eSHRINK WRAPPING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eNo Shrink Wrapping, Shrink in 25s, Shrink in 50s, Shrink in 100s\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eWEIGHT\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003e0.05, 0.06, 0.07ess cards\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003c\/tbody\u003e\n\u003c\/table\u003e\n[tabs][tab title=\"E\"]Unique Tab. Content 1[\/tab][tab title=\"F\"]Unique Tab. Content 2[\/tab][tab title=\"H\"]Unique Tab. Content 3[\/tab][\/tabs][item-gallery][icon-new-always][countdown]2017\/07\/30 10:30:00[\/countdown][smallDescription]Silver, metallic-blue and metallic-lavender silk-blend jacquard, graphic pattern, pleated ruffle along collar, long sleeves with button-fastening cuffs, buckle-fastening silver skinny belt, large pleated rosettes at hips. Dry clean. Zip and hook fastening at back. 100% silk. Specialist clean. [\/smallDescription] [custom_html]\n\u003cdiv class=\"product-info__description__brand\"\u003e\u003cimg src=\"https:\/\/cdn.shopify.com\/s\/files\/1\/1020\/0405\/files\/brand.png?10631915041598488553\" alt=\"\"\u003e\u003c\/div\u003e\n\u003cdiv class=\"product-info__description__text\"\u003eLorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.\u003c\/div\u003e\n[\/custom_html] [video]https:\/\/www.youtube.com\/watch?v=wR-ySdcnbtk[\/video]",
          "published_at": "2016-12-03T17:05:07-05:00",
          "created_at": "2016-12-03T17:05:07-05:00",
          "vendor": "Your Store Default",
          "type": "Dress",
          "tags": ["$10-$100", "34", "Bags", "Belts", "bikini",
            "Blazers", "clothes", "club dresses", "colorful", "Hats",
            "Jeans", "Jewellery", "Jumpers \u0026 Cardigans",
            "Levi's", "model", "prom dresses", "streetstyle", "style",
            "Sweat Pants", "vintage", "white", "Yellow"
          ],
          "price": 8500,
          "price_min": 8500,
          "price_max": 8500,
          "available": true,
          "price_varies": false,
          "compare_at_price": 13000,
          "compare_at_price_min": 13000,
          "compare_at_price_max": 13000,
          "compare_at_price_varies": false,
          "variants": [{
            "id": 31530899468,
            "title": "S \/ red",
            "option1": "S",
            "option2": "red",
            "option3": null,
            "sku": "Stock Keeping Unit",
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": false,
            "name": "D-Kallien Boots - S \/ red",
            "public_title": "S \/ red",
            "options": ["S", "red"],
            "price": 8500,
            "weight": 0,
            "compare_at_price": 13000,
            "inventory_quantity": 0,
            "inventory_management": "shopify",
            "inventory_policy": "deny",
            "barcode": null
          }, {
            "id": 31530899532,
            "title": "S \/ green",
            "option1": "S",
            "option2": "green",
            "option3": null,
            "sku": null,
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "name": "D-Kallien Boots - S \/ green",
            "public_title": "S \/ green",
            "options": ["S", "green"],
            "price": 8500,
            "weight": 0,
            "compare_at_price": 13000,
            "inventory_quantity": 5,
            "inventory_management": "shopify",
            "inventory_policy": "deny",
            "barcode": null
          }, {
            "id": 31530899596,
            "title": "S \/ blue",
            "option1": "S",
            "option2": "blue",
            "option3": null,
            "sku": null,
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "name": "D-Kallien Boots - S \/ blue",
            "public_title": "S \/ blue",
            "options": ["S", "blue"],
            "price": 8500,
            "weight": 0,
            "compare_at_price": 13000,
            "inventory_quantity": 1,
            "inventory_management": null,
            "inventory_policy": "deny",
            "barcode": null
          }, {
            "id": 31530899660,
            "title": "M \/ red",
            "option1": "M",
            "option2": "red",
            "option3": null,
            "sku": null,
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "name": "D-Kallien Boots - M \/ red",
            "public_title": "M \/ red",
            "options": ["M", "red"],
            "price": 8500,
            "weight": 0,
            "compare_at_price": 13000,
            "inventory_quantity": -3,
            "inventory_management": null,
            "inventory_policy": "deny",
            "barcode": null
          }, {
            "id": 31530899724,
            "title": "M \/ green",
            "option1": "M",
            "option2": "green",
            "option3": null,
            "sku": null,
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "name": "D-Kallien Boots - M \/ green",
            "public_title": "M \/ green",
            "options": ["M", "green"],
            "price": 8500,
            "weight": 0,
            "compare_at_price": 13000,
            "inventory_quantity": 19,
            "inventory_management": "shopify",
            "inventory_policy": "deny",
            "barcode": null
          }, {
            "id": 31530899788,
            "title": "M \/ blue",
            "option1": "M",
            "option2": "blue",
            "option3": null,
            "sku": null,
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "name": "D-Kallien Boots - M \/ blue",
            "public_title": "M \/ blue",
            "options": ["M", "blue"],
            "price": 8500,
            "weight": 0,
            "compare_at_price": 13000,
            "inventory_quantity": 1,
            "inventory_management": null,
            "inventory_policy": "deny",
            "barcode": null
          }, {
            "id": 31530899852,
            "title": "L \/ red",
            "option1": "L",
            "option2": "red",
            "option3": null,
            "sku": null,
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "name": "D-Kallien Boots - L \/ red",
            "public_title": "L \/ red",
            "options": ["L", "red"],
            "price": 8500,
            "weight": 0,
            "compare_at_price": 13000,
            "inventory_quantity": 1,
            "inventory_management": null,
            "inventory_policy": "deny",
            "barcode": null
          }, {
            "id": 31530899916,
            "title": "L \/ green",
            "option1": "L",
            "option2": "green",
            "option3": null,
            "sku": null,
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "name": "D-Kallien Boots - L \/ green",
            "public_title": "L \/ green",
            "options": ["L", "green"],
            "price": 8500,
            "weight": 0,
            "compare_at_price": 13000,
            "inventory_quantity": 0,
            "inventory_management": null,
            "inventory_policy": "deny",
            "barcode": null
          }, {
            "id": 31530899980,
            "title": "L \/ blue",
            "option1": "L",
            "option2": "blue",
            "option3": null,
            "sku": null,
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "name": "D-Kallien Boots - L \/ blue",
            "public_title": "L \/ blue",
            "options": ["L", "blue"],
            "price": 8500,
            "weight": 0,
            "compare_at_price": 13000,
            "inventory_quantity": 1,
            "inventory_management": null,
            "inventory_policy": "deny",
            "barcode": null
          }, {
            "id": 31530900044,
            "title": "S \/ White",
            "option1": "S",
            "option2": "White",
            "option3": null,
            "sku": null,
            "requires_shipping": true,
            "taxable": true,
            "featured_image": null,
            "available": true,
            "name": "D-Kallien Boots - S \/ White",
            "public_title": "S \/ White",
            "options": ["S", "White"],
            "price": 8500,
            "weight": 0,
            "compare_at_price": 13000,
            "inventory_quantity": 1,
            "inventory_management": "shopify",
            "inventory_policy": "deny",
            "barcode": null
          }],
          "images": [
            "\/\/cdn.shopify.com\/s\/files\/1\/1637\/5229\/products\/LEATHER_FUR_CROSSBODY_BAG_4.jpg?v=1481124090",
            "\/\/cdn.shopify.com\/s\/files\/1\/1637\/5229\/products\/LEATHER_TASSEL_WALLET.jpg?v=1481124092",
            "\/\/cdn.shopify.com\/s\/files\/1\/1637\/5229\/products\/LEATHER_TASSEL_WALLET_1.jpg?v=1481124094"
          ],
          "featured_image": "\/\/cdn.shopify.com\/s\/files\/1\/1637\/5229\/products\/LEATHER_FUR_CROSSBODY_BAG_4.jpg?v=1481124090",
          "options": ["Size", "Color"],
          "content": "\u003cp\u003eLorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\u003c\/p\u003e\n\u003cdiv class=\"divider divider--md\"\u003e\u003c\/div\u003e\n\u003ctable class=\"table table-params\"\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003ePROOF\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003ePDF Proof\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eSAMPLES\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eDigital, Printed\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eWRAPPING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eYes, No\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eUV GLOSS COATING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eYes\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eSHRINK WRAPPING\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003eNo Shrink Wrapping, Shrink in 25s, Shrink in 50s, Shrink in 100s\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003ctr\u003e\n\u003ctd class=\"text-right\"\u003e\u003cspan class=\"color\"\u003eWEIGHT\u003c\/span\u003e\u003c\/td\u003e\n\u003ctd\u003e0.05, 0.06, 0.07ess cards\u003c\/td\u003e\n\u003c\/tr\u003e\n\u003c\/tbody\u003e\n\u003c\/table\u003e\n[tabs][tab title=\"E\"]Unique Tab. Content 1[\/tab][tab title=\"F\"]Unique Tab. Content 2[\/tab][tab title=\"H\"]Unique Tab. Content 3[\/tab][\/tabs][item-gallery][icon-new-always][countdown]2017\/07\/30 10:30:00[\/countdown][smallDescription]Silver, metallic-blue and metallic-lavender silk-blend jacquard, graphic pattern, pleated ruffle along collar, long sleeves with button-fastening cuffs, buckle-fastening silver skinny belt, large pleated rosettes at hips. Dry clean. Zip and hook fastening at back. 100% silk. Specialist clean. [\/smallDescription] [custom_html]\n\u003cdiv class=\"product-info__description__brand\"\u003e\u003cimg src=\"https:\/\/cdn.shopify.com\/s\/files\/1\/1020\/0405\/files\/brand.png?10631915041598488553\" alt=\"\"\u003e\u003c\/div\u003e\n\u003cdiv class=\"product-info__description__text\"\u003eLorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.\u003c\/div\u003e\n[\/custom_html] [video]https:\/\/www.youtube.com\/watch?v=wR-ySdcnbtk[\/video]"
        });
      }
    });

    jQuery(function() {
      jQuery('.swatch :radio').change(function() {
        var optionIndex = jQuery(this).closest('.swatch').attr(
          'data-option-index');
        var optionValue = jQuery(this).val();
        jQuery(this).closest('form').find('.single-option-selector').eq(
          optionIndex).val(optionValue).trigger('change');
      });
      if (jQuery(".selector-wrapper label").length) {
        jQuery(".selector-wrapper label").each(function(index) {
          jQuery(this).text(jQuery(this).text() + ":");
        });
      }
    });

    // (c) Copyright 2014 Caroline Schnapp. All Rights Reserved. Contact: mllegeorgesand@gmail.com
    // See http://docs.shopify.com/manual/configuration/store-customization/advanced-navigation/linked-product-options
    var Shopify = Shopify || {};
    Shopify.optionsMap = {};
    Shopify.updateOptionsInSelector = function(selectorIndex) {
      switch (selectorIndex) {
        case 0:
          var key = 'root';
          var selector = jQuery('.single-option-selector:eq(0)');
          break;
        case 1:
          var key = jQuery('.single-option-selector:eq(0)').val();
          var selector = jQuery('.single-option-selector:eq(1)');
          break;
        case 2:
          var key = jQuery('.single-option-selector:eq(0)').val();
          key += ' / ' + jQuery('.single-option-selector:eq(1)').val();
          var selector = jQuery('.single-option-selector:eq(2)');
      }
      var initialValue = selector.val();
      selector.empty();
      var availableOptions = Shopify.optionsMap[key];
      for (var i = 0; i < availableOptions.length; i++) {
        var option = availableOptions[i];
        var newOption = jQuery('<option></option>').val(option).html(option);
        selector.append(newOption);
      }
      jQuery('.swatch[data-option-index="' + selectorIndex +
        '"] .swatch-element').each(function() {
        if (jQuery.inArray(jQuery(this).attr('data-value'),
            availableOptions) !== -1) {
          jQuery(this).removeClass('soldout').show().find(':radio').removeAttr(
            'disabled', 'disabled').removeAttr('checked');
        } else {
          jQuery(this).addClass('soldout').hide().find(':radio').removeAttr(
            'checked').attr('disabled', 'disabled');
        }
      });
      if (jQuery.inArray(initialValue, availableOptions) !== -1) {
        selector.val(initialValue);
      }
      selector.trigger('change');
    };
    Shopify.linkOptionSelectors = function(product) {
      // Building our mapping object.
      for (var i = 0; i < product.variants.length; i++) {
        var variant = product.variants[i];
        if (variant.available) {
          // Gathering values for the 1st drop-down.
          Shopify.optionsMap['root'] = Shopify.optionsMap['root'] || [];
          Shopify.optionsMap['root'].push(variant.option1);
          Shopify.optionsMap['root'] = Shopify.uniq(Shopify.optionsMap['root']);
          // Gathering values for the 2nd drop-down.
          if (product.options.length > 1) {
            var key = variant.option1;
            Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
            Shopify.optionsMap[key].push(variant.option2);
            Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
          }
          // Gathering values for the 3rd drop-down.
          if (product.options.length === 3) {
            var key = variant.option1 + ' / ' + variant.option2;
            Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
            Shopify.optionsMap[key].push(variant.option3);
            Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
          }
        }
      }
      // Update options right away.
      /*Shopify.updateOptionsInSelector(0);
      if (product.options.length > 1) Shopify.updateOptionsInSelector(1);
      if (product.options.length === 3) Shopify.updateOptionsInSelector(2);*/
      // When there is an update in the first dropdown.
      jQuery(".single-option-selector:eq(0)").change(function() {
        Shopify.updateOptionsInSelector(1);
        if (product.options.length === 3) Shopify.updateOptionsInSelector(
          2);
        return true;
      });
      // When there is an update in the second dropdown.
      jQuery(".single-option-selector:eq(1)").change(function() {
        if (product.options.length === 3) Shopify.updateOptionsInSelector(
          2);
        return true;
      });
    };
