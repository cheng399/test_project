import $ from 'jquery'
import '@/PC端/js/sidebar'
import '@/PC端/css/base.css'
import '@/PC端/sass/index.scss'
$(function() {
    // 下拉菜单
    $('.selects').on('click', 'div', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active').siblings().removeClass('active')
        }
        $('.selects ul').stop().slideUp()
        $('.selects .active ul').stop().slideDown()
    })
    $('.selects').on('click', 'li', function() {
        $(this).parent().prev().text($(this).text())
    })

    // 根据题型改变选项类型
    $('#testType').on('DOMNodeInserted', 'cite', function() {
        let text = $(this).text()
        if (text === '多选题') {
            $('#addItem .options [type=radio]').each((i, e) => $(e).attr('type', 'checkbox'))
        } else {
            $('#addItem .options [type=checkbox]').each((i, e) => $(e).attr('type', 'radio'))
        }
    })

    // 添加选项
    const option = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    $('#addItem .options .add-option').on('click', function() {
        const lastOption = $(this).prev().children().last().children('label').text()
        let lastOptionIndex = option.findIndex(e => e + '.' === lastOption)
        if (lastOptionIndex === option.length - 1) return alert('选项已达上限!')
        let index = lastOptionIndex + 1
        $(this).prev().append(`<li><input type="${$('#testType cite').text() === '多选题' ? 'checkbox' : 'radio'}" name="answers" id="${option[index]}"><label for="${option[index]}">${option[index]}.</label><input type="text" name="" id="" placeholder="选项, 点此编辑; 选中即设置为正确答案 (必填)">
        </li>`)
        loadDelPic()
    })

    // 移除选项
    $('#addItem .options').on('click', '.del-option', function() {
        if ($('#addItem .options ul').children().length === 2) return alert('至少保留两条选项!')
        $(this).parent().remove()
        loadDelPic()
    })

    $('.add-form').on('click', 'button', function(e) {
        e.preventDefault()
    })

    function loadDelPic() {
        $('#addItem .options ul').find('img').remove()
        $('#addItem .options ul').children().last().append(`<img src="data:image/webp;base64,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" class="del-option">`)
    }
    loadDelPic()
})