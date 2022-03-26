import { useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [token, setToken] = useState("");
  const [timeStamp, setTimeStamp] = useState(null);

  const app = axios.create({
    baseURL: 'https://mastodon.compositecomputer.club/api/v1/',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleToken = (e) => {
    setToken(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let now = new Date();
    let nowTime = now.getTime();
    if (timeStamp) {
      if (nowTime - timeStamp < 10000) {
        setIsError(true)
        setErrorDetail("投稿間隔が早すぎます．")
        return
      }
    }
    setIsError(false)
    setTimeStamp(nowTime)
    const res = await app.post('https://mastodon.compositecomputer.club/api/v1/statuses', {
      "status": status
    })
    setStatus('')
    console.log(res)
  }

  const SignIn = () => {
    setIsSignIn(true)
  }

  const SignOut = () => {
    setToken("")
    setIsSignIn(false)
  }

  return (
    <>
      <h1 className="title">NicoCommeDon</h1>
      <div className="content">
        <p className="description">
          C3部内で利用しているSNS，Mastodon！
          Mastodonで流れるコメントや何気ない投稿をニコニコ動画のように流したい！
          そんな思いでこのアプリを作成しました！
          ログインして下のフォームに投稿するとMastodonに投稿できます！
        </p>
        {
          isSignIn ? (
            <>
              <p>※最長500文字です．</p>
              {
                isError &&
                <>
                  <p className="error">※{errorDetail}</p>
                </>
              }
              <form onSubmit={handleSubmit}>
                <textarea value={status} onChange={handleStatus} className="textarea"></textarea>
                <label>コメントサイズ</label>
                <input type="radio" name="size" value="mid" checked /><label for="mid">中</label>
                <input type="radio" name="size" value="big" /><label for="big">大</label>
                <input type="radio" name="size" value="sml" /><label for="sml">小</label>
                <input className="submit_button" type="submit" value="トゥート！" />
              </form>
              <input className="submit_button" type="submit" value="サインアウト" onClick={SignOut} />
            </>
          ) : (
            <>
              <p>トークン</p>
              <form onSubmit={SignIn}>
                <input className="token_input" type="text" onChange={handleToken} />
                <input class="submit_button" type="submit" value="サインイン" />
              </form>
            </>
          )
        }
      </div>
    </>
  );
}

export default App;
