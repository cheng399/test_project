$(function() {
    // 下拉菜单
    $('.selects').on('click', 'div', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active').siblings().removeClass('active')
        }
        $('.selects ul').slideUp()
        $('.selects .active ul').slideDown()
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
        $(this).prev().find('img').remove()
        $(this).prev().children().last().append(`<img src="./images/del.webp" class="del-option">`)
    })

    // 移除选项
    $('#addItem .options').on('click', '.del-option', function() {
        if ($('#addItem .options ul').children().length === 2) return alert('至少保留两条选项!')
        $(this).parent().remove()
        $('#addItem .options ul').children().last().append(`<img src="./images/del.webp" class="del-option">`)
    })

    $('.add-form').on('click', 'button', function(e) {
        e.preventDefault()
    })
})