import { useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const app = axios.create({
    baseURL: 'https://mastodon.compositecomputer.club/api/v1/',
    headers: {
      'Authorization': 'Bearer hEWMfL3oK2WC87kbybWpK2CPlg_3vAQF7O8Xf8sbOkQ'
    }
  })

  const [status, setStatus] = useState("");

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await app.post('https://mastodon.compositecomputer.club/api/v1/statuses', {
      "status": status
    })
    console.log(res)
  }

  return (
    <>
      <h1 className="title">NicoCommeDon</h1>
      <div className="content">
        <p className="description">
          C3部内で利用しているSNS，Mastodon！
          Mastodonで流れるコメントや何気ない投稿をニコニコ動画のように流したい！
          そんな思いでこのサイトを作成しました！
          下のフォームに投稿するとMastodonに投稿できます！
        </p>
        <p>※最長は500文字です．</p>
        <form onSubmit={handleSubmit}>
          <textarea value={status} onChange={handleStatus} className="textarea"></textarea>
          <input className="submit_button" type="submit" value="トゥート！" />
        </form>
      </div>
    </>
  );
}

export default App;
