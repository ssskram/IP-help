import * as React from 'react';

const margin = {
    marginTop: '25px',
}

export default class Messages extends React.Component<any, {}> {

    createMarkup() {
        return { __html: this.props.messages };
    }

    public render() {
        return (
            this.props.messages ? (
                <div style={margin} role="alert" className="alert alert-success">
                    <span style={{fontSize: '2em'}} dangerouslySetInnerHTML={this.createMarkup()}></span>
                </div>
            ) : null
        )
    }
}
