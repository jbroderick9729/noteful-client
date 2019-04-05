import React, { Component } from 'react';

class SomeError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        console.log("error function")
        return {hasError: true};
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Could not display the content!</h2>
                </div>
            );
        }
        return this.props.children;
    }
}

export default SomeError;