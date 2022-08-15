function autoMove(){//자동으로 움직이기
    var flip_card = $('#covo_card_whole .card_whole:last-child');
    flip_card.css('transform', 'translate(0,-120px)');
    flip_card.css('transition', '.1s');

    setTimeout(function() {
        getNewCard();
    }, 500);
}
let card_length = $('#covo_card_whole').find('.card_whole').length;
let yet_img_num = $('.group_card_inner_box').find('.card_whole').length;
var timer = setInterval(function() {//자동으로 모든 covo_card_whole div에 있는 카드 옮기기
    if(yet_img_num > card_length - 1){
        clearInterval(timer);
        setTimeout(function() {
            $('.card_whole').attr('onclick', 'addFlip(this)');
            $('.card_pass').fadeOut(500);
        }, 1000);
    }else{
        autoMove();
        yet_img_num++;
    }
}, 1000);
function getNewCard() {//움직이는 카드 카드 놓는 곳에 생성
    var flipped_img_val = $('#grabbed_card_name2').val();
    flipped_img_val++;
    $('#grabbed_card_name2').attr('value', flipped_img_val);

    var flip_card = $('#covo_card_whole .card_whole:last-child');
    var flip_val = flip_card.find('.opposit_card').attr('value');
    var flipped_img_src = flip_card.find('.opposit_card').attr('src');
    flip_card.remove();

    var flipped_img_new = '';
    flipped_img_new += '<div id="card_whole_new" data-id="card_whole_new" class="card_whole card_whole_new">';
    flipped_img_new += '    <div class="game_card card_inner">';
    flipped_img_new += '        <img src="" alt="" value="" class="opposit_card card_back p_grab_card p_grab_new">';
    flipped_img_new += '        <img src="./img/card/card_what.svg" alt="" value="" class="opposit_card card_front">';
    flipped_img_new += '    </div>';
    flipped_img_new += '</div>';
    $('.group_card_inner_box').append(flipped_img_new);
    $('.card_whole_new').attr('class', 'card_whole card_whole'+flipped_img_val);
    $('.card_whole'+flipped_img_val).attr('id', 'card_whole'+flipped_img_val);
    $('.card_whole'+flipped_img_val).attr('data-id', 'card_whole'+flipped_img_val);
    $('.p_grab_new').attr('class', 'p_grab_card p_grab_news p_grab_new'+flipped_img_val);
    $('.p_grab_new'+flipped_img_val).attr('id', 'p_grab_new'+flipped_img_val);
    $('#p_grab_new'+flipped_img_val).hide();
    $('#p_grab_new'+flipped_img_val).attr('src', flipped_img_src);
    $('#p_grab_new'+flipped_img_val).attr('value', flip_val);
}

function addFlip(ths) {//카드 뒤집기
    $('.p_grab_news').show();
    var grabbed_num = $('#grabbed_num').val();
    grabbed_num++;
    $('#grabbed_num').attr('value', grabbed_num);
    if(grabbed_num <= 2) {
        var flip_card = ths.dataset.id;
        $('#'+flip_card).addClass('card_flipped');
        var regex = /[^0-9]/g;
        var grabbed_card_num = flip_card.replace(regex, "");
        var this_val = $('#p_grab_new'+grabbed_card_num).attr('value');
        var this_src = $('#p_grab_new'+grabbed_card_num).attr('src');
        $('#grabbed_card_val'+grabbed_num).attr('value', this_val);

        var flipped_num = $('#grabbed_num').val();
        if(flipped_num == 2) {
            $('#grabbed_src').attr('value', this_src);
            $('#grabbed_card_id').attr('value', flip_card);
            cardTwice();
        }
        $('#'+flip_card).attr('onclick', '');
    }
};
function cardTwice() {
    var grabbed_card_val1 = $('#grabbed_card_val1').val();
    var grabbed_card_val2 = $('#grabbed_card_val2').val();
    console.log(grabbed_card_val1);
    console.log(grabbed_card_val2);
    if(grabbed_card_val1 == grabbed_card_val2) {
        cardRight();
    }else {
        cardWrong();
    }
};
function cardWrong() {//카드가 틀렸을 때
    var grabbed_card_id = $('#grabbed_card_id').val();
    var grabbed_img = $('#'+grabbed_card_id);
    var img_position_top = grabbed_img.offset().top + 70;
    var img_position_side = grabbed_img.offset().left + 44;
    $('.no_right_img').css('top', img_position_top);
    $('.no_right_img').css('left', img_position_side);
    setTimeout(function() {
        $('.card_whole').removeClass('card_flipped');
        $('.card_whole').attr('onclick', 'addFlip(this)');
    }, 1000);
    $('.no_right_img').fadeIn(400);
    setTimeout(function() {
        $('.no_right_img').fadeOut(400);
    }, 400);
    $('#grabbed_num').attr('value', '0');
    $('#grabbed_card_val1').attr('value', '');
    $('#grabbed_card_val2').attr('value', '');
}
function cardRight(){//카드가 맞았을 때
    var grabbed_img = $('.card_flipped');
    grabbed_img.css('transform', 'scale(1.8)');
    grabbed_img.css('transition', '.4s');
    setTimeout(function() {
        grabbed_img.css('transform', 'scale(1.0)');
        grabbed_img.css('transition', '.4s');
        grabbed_img.attr('onclick', '');
    }, 500);
    cardBottom();

    $('#grabbed_num').attr('value', '0');
    $('#grabbed_card_val1').attr('value', '');
    $('#grabbed_card_val2').attr('value', '');
}
function cardBottom(){//클릭한 카드를 최하단에 넣기
    var card_name = $('#grabbed_card_name1').val();
    card_name++;
    $('#grabbed_card_name1').attr('value', card_name);

    var grabbed_img = $('#grabbed_src');
    var grabbed_img_src = grabbed_img.val();
    var my_grabbed_img = '';
    my_grabbed_img += '<img src="" alt="" class="grab_card my_grabbed_card">';
    $('.card_grab_mine_flex').append(my_grabbed_img);
    
    $('.my_grabbed_card').attr('class', 'grab_card my_grabbed_card'+card_name);
    $('.my_grabbed_card'+card_name).attr('id', 'my_grabbed_card'+card_name);
    $('.my_grabbed_card'+card_name).attr('src', grabbed_img_src);
    $('#grabbed_card_name').attr('value', card_name);
    
    $('#grabbed_src').attr('value', '');
    setTimeout(function() {
        $('.card_flipped').find('img').remove();
        $('.card_flipped').find('*').css('cursor', 'default');
        $('.card_flipped').removeClass('card_flipped');
    }, 500);
    var card_num = $('.card_grab_mine_flex').find('.grab_card').length;
    if(card_num == 8) {
        $('.win_div').fadeIn(400);
        setTimeout(function() {
            $('.win_div').fadeOut(400);
            $('.game_reset').fadeIn(400);
        }, 5000);
    }
}

function passBtn() {
    clearInterval(timer);
    for(i=yet_img_num;i<16;i++) {
        autoMove();
    }
    setTimeout(function() {
        $('.card_whole').attr('onclick', 'addFlip(this)');
        $('.card_pass').fadeOut(400);
    }, 500);
}
function restartBtn() {
    window.location.reload();
}

$(".card_grab_mine_flex").on('mousewheel',function(e){//마우스 스크롤로 가로 스크롤
    var wheelDelta = e.originalEvent.wheelDelta;
    if(wheelDelta > 0){
        $(this).scrollLeft(-wheelDelta + $(this).scrollLeft());
        e.preventDefault();
    }else{
        $(this).scrollLeft(-wheelDelta + $(this).scrollLeft());
        e.preventDefault();
    }
});