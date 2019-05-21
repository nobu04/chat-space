$(function() {

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");


  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${ user.name }</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</div>
  </div>`

  search_list.append(html);
}
 function appendErrMsgToHTML(msg) {
  var html = `<ul>
                <div class='listview__element--right-icon'>${ msg }</div>
              </ul>`
  search_list.append(html);
}

function appendList(name, id) {
  var html = `<div class='chat-group-user clearfix js-chat-member' user.id='chat-group-user-8'>
  <input name='group[user_ids][]' type='hidden' value='${ id }'>
  <p class='chat-group-user__name'>${ name }</p>
  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' name = ${ name } id = ${ id }>削除</div>
</div>`
  member_list.append(html);
}

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーは存在しません");
      }
    })
    
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  search_list.on("click", ".user-search-add", function(){
    var userName= $(this).data('user-name');
    var userId= $(this).data('user-id');
    appendList(userName, userId);
    search_list.empty();
})

$(document).on("click", ".user-search-remove", function(){
  $(this).parent().remove();
})
});
