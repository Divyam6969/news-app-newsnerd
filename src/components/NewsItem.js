import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props;
    return (

      <div className="card" style={{ width: "18rem;" }}>
        <img className="card-img-top" src={!imageUrl ? "https://media.istockphoto.com/id/891605714/vector/breaking-news-vector-illustration-poster-banner-logo-badge-on-white-background.jpg?b=1&s=612x612&w=0&k=20&c=EllCcjjvtMCJCbflIo1zMSCvWtBXSFOSfgdjJ7lIjuM=" : imageUrl} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} target="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          <p className="card-text"><small className="text-muted">By {!author ? "anonymous" : author} on {new Date(date).toGMTString()}</small></p>
        </div>
      </div>
    )
  }
}

export default NewsItem