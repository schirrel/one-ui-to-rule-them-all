"use strict";

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return e(
      "albs-button",
      {
        onClick: () => {
          console.log("Outer React Click");

          const current = this.state.count;
          this.setState({ count: current + 1 });
        },
      },
      "Web Component Button " + this.state.count
    );
  }
}

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll(".like_button_container").forEach((domContainer) => {
  // Read the comment ID from a data-* attribute.
  const commentID = parseInt(domContainer.dataset.commentid, 10);
  const root = ReactDOM.createRoot(domContainer);
  root.render(e(LikeButton, { commentID: commentID }));
});
