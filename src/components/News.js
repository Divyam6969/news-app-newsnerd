import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
export class News extends Component {
  articles = [
    {
      "source": {
        "id": null,
        "name": "New York Post"
      },
      "author": "News.com.au",
      "title": "Green comet to become visible for first time in 50,000 years - New York Post ",
      "description": "A bright green comet will appear in the night skies above Earth, visible for the first time in 50,000 years.",
      "url": "https://nypost.com/2023/01/10/green-comet-to-become-visible-for-first-time-in-50000-years/",
      "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2023/01/comet-1.10.23.jpg?quality=75&strip=all&w=1024",
      "publishedAt": "2023-01-10T10:48:00Z",
      "content": "A bright green comet will appear in the night skies above Earth, visible for the first time in 50,000 years.\r\nThe recently discovered comet, which was given the catchy name C/2022 E3 (ZTF), will soar… [+1319 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "CNBC"
      },
      "author": "Jeff Cox",
      "title": "Powell stresses need for Fed's political independence while tackling inflation - CNBC",
      "description": "The central bank leader noted that stabilizing prices requires making tough decisions that can be unpopular politically.",
      "url": "https://www.cnbc.com/2023/01/10/powell-stresses-need-for-feds-political-independence-while-tackling-inflation.html",
      "urlToImage": "https://image.cnbcfm.com/api/v1/image/107176166-1673300395297-gettyimages-1245668489-US-WASHINGTON_DC-FEDERAL_RESERVE-INTEREST_RATES-HIKE.jpeg?v=1673360594&w=1920&h=1080",
      "publishedAt": "2023-01-10T14:00:00Z",
      "content": "Federal Reserve Chairman Jerome Powell on Tuesday emphasized the need for the central bank to be free of political influence while it tackles persistently high inflation.\r\nIn a speech delivered to Sw… [+3037 chars]"
    },
    {
      "source": {
        "id": "nfl-news",
        "name": "NFL News"
      },
      "author": "Dan Hanzus",
      "title": "NFL Power Rankings: 49ers, Bills, Bengals remain on top heading into Super Wild Card Weekend - NFL.com",
      "description": "Who sits atop the NFL Power Rankings heading into the playoffs? With the 2022 regular season in the books, Dan Hanzus provides a full rundown of the league hierarchy, 1-32.",
      "url": "https://www.nfl.com/news/nfl-power-rankings-super-wild-card-weekend-2022-nfl-season",
      "urlToImage": "https://static.www.nfl.com/image/private/t_editorial_landscape_12_desktop/league/icdqcwyuxjktofq07gh7",
      "publishedAt": "2023-01-10T13:49:00Z",
      "content": "The 2022 regular season has, at long last, reached its conclusion. Now it gets really fun.\r\nThe postseason promises drama, and eventual immortality for one team. But before any of that, let's take on… [+514 chars]"
    },
    {
      "source": {
        "id": "reuters",
        "name": "Reuters"
      },
      "author": null,
      "title": "China suspends issuing visas in Japan, S.Korea to retaliate for COVID curbs - Reuters",
      "description": "China suspended issuing short-term visas in South Korea and Japan on Tuesday, after announcing it would retaliate against countries that required negative COVID-19 tests from Chinese travellers.",
      "url": "https://www.reuters.com/world/china/covid-wave-past-its-peak-many-parts-china-state-media-2023-01-10/",
      "urlToImage": "https://www.reuters.com/resizer/kRBo3X-4ZjnEA_x6277R7ZawK_8=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/SOBGVU3KVNKMTCPQ2QWM2U7CTY.jpg",
      "publishedAt": "2023-01-10T13:34:00Z",
      "content": "BEIJING, Jan 10 (Reuters) - China suspended issuing short-term visas in South Korea and Japan on Tuesday, after announcing it would retaliate against countries that required negative COVID-19 tests f… [+5460 chars]"
    }]

  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'business'
  }

  // static propTypes = {
  //   country: this.propTypes.string,
  //   pageSize: this.propTypes.number,
  //   category: this.propTypes.string
  // }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state =
    {
      articles: this.articles,
      loading: false,
      page: 1
    }
    document.title = `NewsNerd - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async componentDidMount() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fed5eeabf2f047de8ccb76cf2b3a3c5c&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);
    this.setState({ loading: true })
    let data = await fetch(url);

    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    this.props.setProgress(100);
  }

  handlePrevClick = async () => {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fed5eeabf2f047de8ccb76cf2b3a3c5c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles })
    this.props.setProgress(70);
    console.log("previous");
    this.setState(
      {
        page: this.state.page - 1,
        articles: parsedData.articles
      }
    )
    this.props.setProgress(100);
  }

  handleNextClick = async () => {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=fed5eeabf2f047de8ccb76cf2b3a3c5c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);

    if (!Math.ceil((this.state.page + 1) > this.state.totalResults / this.props.pageSize)) {
      this.setState({ loading: true })
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({ articles: parsedData.articles })
      this.props.setProgress(70);
      console.log("next");
      this.setState(
        {
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
        }
      )
    }
    this.props.setProgress(100);

  }
  render() {
    return (
      <div className="container my-3" >
        <h1 className="text-center">
          NewsNerd- Main headlines - {this.props.title}
        </h1>
        {this.state.loading && <Spinner />}


        

        <div className="row" style={{ height: '30px', }}>
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4 my-2" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author} date={element.publishedAt} />
            </div>
          })}
          <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous</button>
          <button style={{marginLeft: "78vw", marginTop:"10px"}} disabled={((this.state.page + 1) > this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </div>
     
      </div>
    )
  }
}

export default News