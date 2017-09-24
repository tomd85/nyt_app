import React from "react";
import StoryList from "./StoryList";

export default class TimesApp extends React.Component {

    render() {
        return (
            <div>
                <StoryList sectionTitle='Popular' storyCollection={this.props.bootstrap.topStories} />
                <StoryList sectionTitle='Most Viewed' storyCollectionUri={this.props.bootstrap.mostPopularUri} />
            </div>
        );
    }
}
