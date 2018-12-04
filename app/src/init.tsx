import * as React from 'react'
import HydrateStore from './components/utilities/hydrateStore'

export default class Init extends React.Component<any, any> {

    render() {
        return (
            <div>
                <HydrateStore />
                Howdy
            </div>
        )
    }
}