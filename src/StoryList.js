import React from "react";
import StoryItem from "./StoryItem";

export default class StoryList extends React.Component {

    constructor(props) {
        super(props);

        // StoryCollection can change if stories are being fetched post-mount rather than being prepopulated.
        this.state = {
            storyCollection: this.props.storyCollection || []
        };
    }

    render() {
        return (
            <div className='story-list'>
                <div className='section-title'>{this.props.sectionTitle}</div>
                <div className='stories'>
                    {this.state.storyCollection.map((storyData, index) => {
                        return (
                          <StoryItem key={index} storyData={storyData} />
                        )
                    })}
                </div>
            </div>
        );
    }

    componentDidMount() {
        // If a uri was provided, assume that we need to fetch those results.
        if (this.props.storyCollectionUri) {
            $.ajax({
                url: this.props.storyCollectionUri,
                method: 'GET',
            }).done(function(response) {
                this.setState({storyCollection: response.results});
            }.bind(this))
        }
    }
}
