import React from 'react';
import './Reviews.css';
import ReviewsRateDate from './ReviewsRateDate.jsx';
import ReviewsTitle from './ReviewsTitle.jsx';
import ReviewsResponse from './ReviewsResponse.jsx';
import ReviewsPhotos from './ReviewsPhotos.jsx';
import ReviewsFooter from './ReviewsFooter.jsx';
import ReviewsButtons from './ReviewsButtons.jsx';


class ReviewsTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewDisplay: 2
    };

    this.updateReviewDisplay = this.updateReviewDisplay.bind(this);
  }

  updateReviewDisplay() {
    let count = this.state.reviewDisplay + 2;
    this.setState({ reviewDisplay: count });
  }


  render() {
    const reviews = this.props.reviews;
    let summary, reviewCount;

    if (reviews.results) {
      summary = reviews.results.map((item, index) => {
        if (index > this.state.reviewDisplay - 1) { return; }
        reviewCount = reviews.results.count;

        return (
          <div className="individualReviewBox" key={item.summary}>
            <div id="starsUsernameDate" className="tileBody">
              <ReviewsRateDate
                stars={item.rating}
                username={item.reviewer_name}
                date={item.date}
              />
            </div>

            <div id="summaryHelpfulAndReport">
              <p id="summaryTitle" className="tileBody">
                <ReviewsTitle title={item.summary}/>
              </p>

              <p id="summaryBody" className="tileBody">
                {item.body}
              </p>

              <p id="trueRecommend" className="tileBody">
                {item.recommend ? '✔ I recommend this product' : null}
              </p>

              <ReviewsResponse response={item.response}/>

              <p className="tileBody">
                <ReviewsPhotos photos={item.photos}/>
              </p>

              <div id="helpfulAndReport">
                <ReviewsFooter helpful={item.helpfulness}/>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        {summary}

        <ReviewsButtons
          state={this.state.reviewDisplay}
          reviewCount={this.props.reviews.count}
          reviews={this.props.reviews}
          reviewDisplay={this.updateReviewDisplay}
        />
      </React.Fragment>
    );
  }
}

export default ReviewsTiles;