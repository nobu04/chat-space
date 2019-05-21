$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <div class="lower-message__content">
                      ${content}
                    </div>
                      ${img}
                  </div>
                </div>`
  return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});

    })

    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })

    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  })

  $(function(){ 
    var reloadMessages = function(){
      var last_message_id = $('.message').last().data('id')
      var user_url = "./api/messages";
      console.log(last_message_id);

       $.ajax ({
        url: user_url,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id },
      })

      .done(function(messages) {
        var insertHTML = '';
        if (messages.length !== 0) {
          messages.forEach(function(message) {
              insertHTML += buildHTML(message);                     
          });
          }

          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 5000);
      })

      .fail(function() {
        console.log('error');
      });
     } 
     setInterval(reloadMessages, 5000);
  });
  })
