import $ from 'jquery'
$(function() {
    // 左侧菜单点击展开收起
    $('dt').on('click', function() {
        $(this).nextAll().stop().slideToggle()
        $('dt').removeClass('active')
        $(this).addClass('active').next().click()
    })
    $('dd').on('click', function() {
        $('dd').removeClass('active')
        $(this).addClass('active')
        $('.container').hide();
        const nodeId = $(this).children('a').attr('href').slice(2);
        $(`#${nodeId}`).show();
    })
    $('dl:eq(1) dt').click()
})