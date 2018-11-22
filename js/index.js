/**
 * 初期化処理を行います
 */
$(function() {
   firebase.database().ref('members').on('value', (snapshot) => {
      snapshot.forEach((memSnap) => {
        console.log(memSnap.val());
        const statusText = getStatusName(memSnap.child('status').val());
        const name = memSnap.child('last_name').val() + " " + memSnap.child('first_name').val();
        const color = getStatusColor(memSnap.child('status').val());
        addCard(name, statusText, color);
      });
   });
});

// 以下手抜き
function getStatusName(statusId) {
  if (statusId == 0) {
    return "帰宅";
  }else if(statusId == 1) {
    return "学内";
  }

  return "在室";
}

// これも手抜き 突貫工事
function getStatusColor(statusId) {
  if (statusId == 0) {
    return "secondary";
  }else if(statusId == 1) {
    return "warning";
  }

  return "primary";
}

/**
 * Htmlにカードを追加します
 * @param {string} name - ユーザ名
 * @param {string} statusText - ステータス状態を表す文字列
 * @param {string} color - ステータス状態に対応するBootStrapカラー
 */
function addCard(name, statusText, color){
  $('#memberStatus').append(
    $('<div class="card" style="margin: 5pt;width: 11rem;height: 9rem;"></div>').addClass('bg-' + color)
    .append($('<a href="#" class="btn btn-fix"></a>')
      .attr({
        'onClick': 'showStatusDetail(this)',
        'data-name': name,
        'data-statusText': statusText,
        'data-color': color
      })
      .append($('<h4 class="card-header"></h4>').text(name))
      .append($('<div class="card-body"></div>')
        .append($('<h1 class="card-title" style="font-weight: bold;"></h1>').text(statusText))
      )
    )
  );
}

/**
 * ステータス更新用のボタンを作成します
 * @param {JSON} status - サーバからのレスポンスの内、ステータス情報の部分を抜き出したJSON
 */
function initStatusDetailButton(status){
  $('#statusButtons').empty();
  for(var i = 0; i < status.length; i++){
    $('#statusButtons').append(
      $('<Button class="btn btn-lg" style="width: 7em;height: 5em; margin: 3pt;"></Button>').addClass('btn-' + status[i].color)
      .text(status[i].name)
      .attr({
        'data-id': i,
        'onClick': 'statusChange(this)'
      })
    );
  }
}
