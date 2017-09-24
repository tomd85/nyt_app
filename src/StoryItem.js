import React from "react";
import StoryPhoto from "./StoryPhoto";
import StoryText from "./StoryText";

export default class StoryItem extends React.Component {

    render() {

        // The two story endpoints keep their media in different places.
        // Also, some stories have no media.  In that case, do not create a StoryPhoto at all.
        let media = this.props.storyData.multimedia || this.props.storyData.media;

        return (
            <div className='story-item'>
                {media && <StoryPhoto media={media} />}
                <StoryText storyData={this.props.storyData} />
            </div>
        );
    }
}
