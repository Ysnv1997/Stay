jQuery(function() {
    Commonly();
    Tpjax();
    commentsAjax();
    ajax_comment();
    openNav();
    $(window).resize(function(e) {
        if ($(this).width() > '768') {
            $('.topNav').css({
                'display': 'block',
                'height': 'auto'
            });
        } else {
            $('.topNav').height($(window).height());
            $('.topNav').hide();
        }
        $('.headerFilter').css({
            'transform': 'translate3d(0,0px,0)',
            '-webkit-transform': 'translate3d(0,0px,0)',
            '-ms-transform': 'translate3d(0,0px,0)',
            '-o-transform': 'translate3d(0,0px,0)'
        });
        $('.headerZ').css({
            'transform': 'translate3d(0,0px,0)',
            '-webkit-transform': 'translate3d(0,0px,0)',
            '-ms-transform': 'translate3d(0,0px,0)',
            '-o-transform': 'translate3d(0,0px,0)',
        });
    });

    function Commonly() {
        $(".artText p > img").each(function() {
            var strA = '<a href="' + this.src + '" rel="gallery" class="popo"></a>'
            $(this).wrapAll(strA);
        });
        $('a[rel=gallery]').magnificPopup({
            type: 'image',
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
        var $window = $(window),
            $document = $(document),
            $body = $('body'),
            $Tbody = $("#Tbody"),
            $postImg = $('.postImg'),
            $headerFilter = $('.headerFilter'),
            $header = $('.headerZ');
        var $visible = $('#visible'),
            $share = $('#share');
        $share.on('click', function(e) {
            if ($visible.css("display") == "none") {
                $visible.slideDown(600);
            } else {
                $visible.slideUp(600);
            }
        })
        var $comments = $('.comments'),
            $arrows = $('#arrows');
        $arrows.on('click', function() {
            if ($comments.css('display') == 'block') {
                $comments.slideUp(600);
            } else {
                $comments.slideDown(600);
            }
        })
        $window.scroll(function() {
            if ($window.width() > "768") {
                var scrTop = ($window.scrollTop()) / 3;
                if (scrTop > "160") {
                    scrTop = 160;
                }
                $headerFilter.css({
                    'transform': 'translate3d(0,' + scrTop + 'px,0)',
                    '-webkit-transform': 'translate3d(0,' + scrTop + 'px,0)',
                    '-ms-transform': 'translate3d(0,' + scrTop + 'px,0)',
                    '-o-transform': 'translate3d(0,' + scrTop + 'px,0)'
                });
            }
        });
        $window.scroll(function() {
            if ($window.width() > "768") {
                var scrTop = ($window.scrollTop()) / 6;
                if (scrTop > "100") {
                    scrTop = 100;
                }
                $header.css({
                    'transform': 'translate3d(0,' + -scrTop + 'px,0)',
                    '-webkit-transform': 'translate3d(0,' + -scrTop + 'px,0)',
                    '-ms-transform': 'translate3d(0,' + -scrTop + 'px,0)',
                    '-o-transform': 'translate3d(0,' + -scrTop + 'px,0)',
                });
            }
        });
    }

    function openNav() {
        var $muen = $('.muen'),
            $navBody = $('.topNav');
        $muen.on('click', function() {
            if ($navBody.css('display') == 'none') {
                $('.muen > i').addClass('fa-align-right');
                $('.muen > i').removeClass('fa-align-justify');
                $navBody.css('display', 'block');
                $navBody.animate({
                    'right': '0'
                }, 300);
            } else if ($navBody.css('display') == 'block') {
                $navBody.animate({
                    'right': '-176px'
                }, 300, function() {
                    $navBody.css('display', 'none');
                    $('.muen > i').removeClass('fa-align-right');
                    $('.muen > i').addClass('fa-align-justify');
                });
            }
        })
    }

    function Tpjax() {
        $(document).pjax('a[target!=_blank][class!=page-numbers][rel!=nofollow][rel!=gallery][class!=popo]', '#Tbody', {
            fragment: '#Tbody',
            timeout: 1300
        });
        $(document).on('pjax:send', function() {
            NProgress.start();
        });
        $(document).on('pjax:complete', function() {
            $body.animate({
                scrollTop: $('.hestiaBlogs').offset().top - 60
            }, 1000);
            NProgress.done();
            ajax_comment();
            Commonly();
            commentsAjax();
            if ($(window).width() < '768') {
                $('.topNav').css('display', 'none');
            }
        });
    }

    function commentsAjax() {
        $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $('#navigation a').on('click', function(e) {
            e.preventDefault();
            $.ajax({
                type: "GET",
                url: $(this).attr('href'),
                beforeSend: function() {
                    $body.animate({
                        scrollTop: $('.comments').offset().top - 65
                    }, 1500);
                    $('#navigation').remove();
                    $('.commentlist').fadeOut(800);
                },
                dataType: "html",
                success: function(out) {
                    var result = $(out).find('.commentlist');
                    var belownav = $(out).find('#navigation');
                    $('#ajax-comments-title').after(result.fadeIn(800));
                    setTimeout(function() {
                        result.after(belownav);
                        commentsAjax();
                    }, 1000)
                }
            });
        });
    }

    function ajax_comment() {
        var i = 0,
            got = -1,
            len = document.getElementsByTagName('script').length;
        while (i <= len && got == -1) {
            var js_url = document.getElementsByTagName('script')[i].src,
                got = js_url.indexOf('app.js');
            i++;
        }
        var ajax_php_url = js_url.replace('js/app.js', 'inc/comments-ajax.php'),
            wp_url = js_url.substr(0, js_url.indexOf('/wp-content/')),
            pic_sb_url = wp_url + '/wp-admin/images/wpspin_light.gif',
            pic_no_url = wp_url + '/wp-admin/images/no.png',
            pic_ys_url = wp_url + '/wp-admin/images/yes.png',
            txt1 = ' style="display: none;background: url(',
            txt2 = ') no-repeat left;padding-left:20px;',
            txt3 = '<div id="commentload"' + txt1 + pic_sb_url + txt2 + '">正在提交, 请稍候...</div>',
            txt4 = '<div id="commenterror"' + txt1 + pic_no_url + txt2 + 'margin: 0 auto;">#</div>',
            txt5 = '\n<div style="border:1px solid #ccf;margin-top:1em;"><ol class="commentlist" id="new_comm_',
            txt6 = '\n<ul class="children" id="new_comm_',
            txt7 = '" style="display: none;">',
            txt8 = '\n<span id="success_',
            txt9 = '" style="display:none; background: url(' + pic_ys_url + txt2 + '">提交成功</span></div>\n',
            txtb, num = 0,
            $new_comm;
        $('#submit').attr("disabled", false);
        $('#submit').after(txt3 + txt4);
        $('#commentform').submit(function() {
            $('#submit').attr("disabled", true).fadeTo('slow', 0.2);
            $.ajax({
                url: ajax_php_url,
                data: $('#commentform').serialize(),
                type: 'POST',
                beforeSend: function() {
                    $('#commenterror').hide();
                    $('#commentload').slideDown();
                },
                error: function(request) {
                    $('#commentload').slideUp();
                    $('#commenterror').show('slow').html(request.responseText);
                    setTimeout(function() {
                        $('#submit').attr('disabled', false).fadeTo('slow', 1);
                        $('#commenterror').slideUp();
                    }, 3000);
                },
                success: function(data) {
                    $('textarea').each(function() {
                        this.value = ''
                    });
                    $('#commentload').hide();
                    var t = addComment,
                        cancel = t.I('cancel-comment-reply-link'),
                        temp = t.I('wp-temp-form-div'),
                        respond = t.I(t.respondId),
                        post = t.I('comment_post_ID').value,
                        parent = t.I('comment_parent').value,
                        num_text = num.toString();
                    if (parent == '0') {
                        new_htm = txt5 + num_text + txt7 + '</ol>'
                    } else {
                        new_htm = txt6 + num_text + txt7 + '</ul>';
                        is_div = document.getElementsByTagName('ol')[0].innerHTML.indexOf('div-');
                        if (is_div == -1) {
                            txtb = ''
                        } else {
                            txtb = 'div-'
                        };
                    }
                    new_htm = new_htm + txt8 + num_text + txt9;
                    $('#respond').before(new_htm);
                    var $new_comm = $('#new_comm_' + num_text);
                    $new_comm.append(data).fadeIn(4000);
                    countdown();
                    num++;
                    cancel.style.display = 'none';
                    cancel.onclick = null;
                    t.I('comment_parent').value = '0';
                    if (temp && respond) {
                        temp.parentNode.insertBefore(respond, temp);
                        temp.parentNode.removeChild(temp)
                    }
                }
            });
            return false;
        });
        addComment = {
            moveForm: function(commId, parentId, respondId, postId) {
                var t = this,
                    div, comm = t.I(commId),
                    respond = t.I(respondId),
                    cancel = t.I('cancel-comment-reply-link'),
                    parent = t.I('comment_parent'),
                    post = t.I('comment_post_ID');
                $('#commenterror').hide();
                t.respondId = respondId;
                postId = postId || false;
                if (!t.I('wp-temp-form-div')) {
                    div = document.createElement('div');
                    div.id = 'wp-temp-form-div';
                    div.style.display = 'none';
                    respond.parentNode.insertBefore(div, respond)
                }
                if (post && postId && comm)
                    comm.parentNode.insertBefore(respond, comm.nextSibling);
                post.value = postId;
                parent.value = parentId;
                cancel.style.display = '';
                cancel.onclick = function() {
                    var t = addComment,
                        temp = t.I('wp-temp-form-div'),
                        respond = t.I(t.respondId);
                    $('#commenterror').hide();
                    this.style.display = 'none';
                    this.onclick = null;
                    t.I('comment_parent').value = '0';
                    if (temp && respond) {
                        temp.parentNode.insertBefore(respond, temp);
                        temp.parentNode.removeChild(temp)
                    }
                    return false;
                };
                try {
                    t.I('comment').focus();
                } catch (e) {}
                return false;
            },
            I: function(e) {
                return document.getElementById(e)
            }
        };
        var wait = 15,
            submit_val = $('#submit').val();

        function countdown() {
            if (wait == 0) {
                $('#submit').val(submit_val).attr('disabled', false).fadeTo('slow', 1);
                wait = 15;
            } else {
                $('#submit').val(wait);
                wait--;
                setTimeout(countdown, 1000);
            }
        };
    }
})