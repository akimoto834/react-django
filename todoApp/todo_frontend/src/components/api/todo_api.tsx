const originUrl = new URL('http://localhost:8000/api/todo/');

//Promiseを返す関数
//状態: Promiseは次の3つの状態を持ちます。
//Pending（保留中）: 初期状態。処理が完了していない状態。
//Fulfilled（成功）: 非同期処理が成功し、結果が得られた状態。
//Rejected（失敗）: 非同期処理が失敗した状態。
export const getToDoList = (() => {
  const url = originUrl;
  return new Promise( (resolve, reject) => {
    //非同期処理を行う
    fetch(url.href)//指定されたURLに対してHTTPリクエストを送信 Promiseを返す
    .then( res => res.json() )
    .then( json => resolve(json) )//リクエストが成功した場合にjsonデータをPromiseの結果として返す
    .catch( () => reject([]) );
  });
});


//非同期関数（async 関数）の返り値は、常に Promise オブジェクト 
export const getToDoList2 = async () => {//getTodoListと同じ処理でasync await使った場合
  try {
    const url = originUrl;

    //await は、Promise が「解決される（fulfilled）」「拒否される（rejected）」のいずれかになるまで、非同期処理を待機します。
    const response = await fetch(url.href); // 非同期でfetchの結果を待つ　fetchもPromise返す
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();     // レスポンスのjsonデータを待つ
    return json;                            // jsonデータを返す

  } catch (error) {
    return [];  // エラーが発生した場合は空の配列を返す
  }
};

export const postCreateTodo = async (name: string) => {
  const url = originUrl;
  try {
    const response = await fetch(url.href, {
      method : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name})
    })
     // HTTP ステータスが 200 系以外の場合、エラーを投げる
     //fetch は、ネットワークエラーが発生しない限り（つまり、レスポンスが正常に受信された場合）、HTTP エラーステータス（例: 404, 500）でもエラーを投げません
     if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //正常なレスポンスをjsonとして返す
    const json = await  response.json()
    return json

  } catch (error){
     // エラーが発生した場合に適切なエラーメッセージを返す
    console.error('Error occurred while creating TODO:', error);
    return { error: 'Failed to create TODO', details: error };
  }
}

//チェックステータスを切り替えるのに使い、部分的にデータの更新するためPATCHアクションを実行
export const patchCheckTodo = async (id: number, check: boolean) => {
  const url = originUrl;
  try{
    const response = await fetch(url.href, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: check})
    });

    // HTTP ステータスが成功でない場合、エラーを投げる
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 成功時に JSON を返す
    const json = await response.json();
    return json;
  } catch(error){
     // エラーをキャッチして適切なメッセージを返す
     console.error('Error occurred while updating TODO:', error);
     return { error: 'Failed to update TODO', details: error };
  }
}

export const deleteTodo = async (id: number) => {
  const url = new URL(`/api/todo/${id}/`, originUrl)
  try{
    const response = await fetch(url.href, {method: 'DELETE'});

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json;
    return json
  } catch(error){
     // エラーをキャッチして適切なメッセージを返す
     console.error('Error occurred while delreting TODO:', error);
     return { error: 'Failed to delete TODO', details: error };
  }
}

/*
async関数は非同期に実行されるため、関数の中でawaitを使って何かを待機している間でも、他の処理を並行して実行することができます。これがJavaScriptの「非同期処理」の強力な特徴です。

非同期処理の仕組み
JavaScriptは「シングルスレッド」という、一度に一つの命令しか実行できない性質を持っていますが、非同期処理によって、ある処理が完了するのを待っている間に他の処理を実行することができます。

たとえば、以下のコードでは、async関数の中でAPIを呼び出してデータを取得している間に、他の同期的な処理が実行されます。

例
async function fetchData() {
    console.log("Fetching data...");

    // ここで非同期処理を待機
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();

    console.log("Data fetched:", data);
}

console.log("Before fetching data");

// 非同期関数の呼び出し
fetchData();

console.log("After fetching data");

実行順序
1.Before fetching data: 同期的にすぐ実行される。
2.Fetching data...: 非同期関数fetchData()の最初の部分が実行される。
3.fetchでAPIリクエストを送信し、ここで一旦待機します（await）。
4.After fetching data: APIリクエストの完了を待たずに、この行がすぐに実行されます。
5.APIからのレスポンスを待った後、非同期処理が再開し、**Data fetched:**が表示される。
*/


/*
async/awaitと.thenは、Promiseオブジェクトを扱う2つの方法ですが、主にコードの書き方と読みやすさに違いがあります。基本的にどちらも同じことを達成できますが、状況によって使い分けがされます。

1. .thenを使ったPromiseの書き方
.thenを使うと、非同期処理の完了後に何をするかをPromiseチェーンの形で書きます。非同期処理が成功した場合は.then()、失敗した場合は.catch()でエラーハンドリングを行います。

例:
javascript
コードをコピーする
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log("Data fetched:", data);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
2. async/awaitを使った書き方
async/awaitは、より直感的で同期的な書き方でPromiseを扱うことができます。asyncキーワードを関数に付けると、その関数の中でawaitを使って、Promiseの完了を待つことができ、まるで同期処理のように書けます。

例:
javascript
コードをコピーする
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log("Data fetched:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

違い
1. コードの見た目
.then：非同期処理の完了後の処理がネストしていくため、コードが横に長くなりがちで、複雑なチェーンになると可読性が低下します。
async/await：同期処理のように直線的に書けるため、ネストが少なく、コードが読みやすくなることが多いです。
2. エラーハンドリング
.then：.catch()メソッドでエラーハンドリングを行います。
async/await：try/catchブロックでエラーをキャッチします。
3. エラーハンドリングのスコープ
.then：エラーはPromiseチェーン全体に適用されます。どこでエラーが起きても、チェーンの最後の.catch()が対応します。
async/await：try/catchブロックの中で発生したエラーを個別にキャッチでき、細かくエラーハンドリングのスコープを管理できます。
4. ネストの深さ
.then：Promiseチェーンが多くなると、ネストが深くなりやすい。
async/await：ネストが少なく、直線的なコードが書けるため、非同期処理が多くなってもスッキリします。
5. 同期的に見えるかどうか
.then：Promiseチェーンに慣れていない人にとっては、非同期処理が次々にネストされていくことでコードの流れがわかりにくくなる場合があります。
async/await：同期的なコードの流れに近く、Promiseに慣れていない人でも理解しやすいです。
どちらを使うべきか？
シンプルな非同期処理：.then()でも十分対応できます。
複雑な非同期処理やネストが多い場合：async/awaitを使った方がコードの可読性が高くなります。
async/awaitは、特に複数の非同期処理を連続して実行したい場合や、エラーハンドリングが複雑な場合に便利です。
*/

/*
.thenのreturnいるかいらないか

/ ブロックなし、暗黙的にreturn
.then(response => response.json())

// ブロックあり、明示的にreturn
.then(response => {
  return response.json();
}) */