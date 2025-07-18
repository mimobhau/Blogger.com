import {formatISO9075} from "date-fns"

export default function Post(title, summary, cover, content, createdAt) {
    return(
    <div className="post">
        <div className="image">
          <img src="https://th.bing.com/th/id/OIP.Le1wi2LL8Rw_b17mcZvARAHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7" />
        </div>
        <div className="texts">
          <h2>{title}</h2>
          <p className="info">
            <a className="author">Tanveer Hossain</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
      );
}