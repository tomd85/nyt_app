import React from "react";

export default class StoryPhoto extends React.Component {

    render() {
        let byline = this.props.storyData.byline.replace('By ', ''); //Design calls for removal of "By " from endpoint byline
        return (
            <div className='story-text'>
                <div className='title'>{this.props.storyData.title}</div>
                <div className='abstract'>{this.props.storyData.abstract}</div>
                <div className='footer'>
                    <div className='byline'>{byline}</div>
                    <div className='share'></div>
                </div>
            </div>
        );
    }
}
