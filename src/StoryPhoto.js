import React from "react";

export default class StoryPhoto extends React.Component {

    render() {

        // Here again, handle difference in the media schema between the two story endpoints
        let photoList = this.props.media[0]['media-metadata'] || this.props.media;

        // Pick a photo format:
        // SuperJumbo is overkill, many unnecessary bytes on the wire given the size I am actually displaying at,
        // mediumThreeByTwo210 is too small; sampling up to the neighborhood of 2x size shows artifacts,
        // and, at least in the top stories API, there is no format in between.
        // For sake of this demonstration, go with the nicer looking choice.

        let preferredPhoto = photoList.find(function(photo) { return photo.format === 'superJumbo';});

        // Copyright can live in one of two places depending on endpoint.
        // Also below, copyright can come down the wire containing html entities.  Hack-replace one case with unicode equivalent
        // To prevent double-escaping.
        let copyright = this.props.media[0].copyright || preferredPhoto.copyright;

        return (
            <div className='story-photo'>
                <img src={preferredPhoto.url} />
                <div className='copyright'>{copyright.replace('&mdash;', '\u2014')}</div>
            </div>
        );
    }
}
