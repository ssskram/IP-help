import * as React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import Header from '../services/shared/header'
import * as style from './style'
const helpContent = require('./content.json')

export default class SelfService extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    public render() {

        const accordion = helpContent.content.map((section) => {
            return (
                <AccordionItem key={section.title}>
                    <AccordionItemTitle>
                        <div>{section.title}</div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                        {section.body.map((body, bk) => {
                            return (
                                <div key={bk}>
                                    <h4><b>{body.section}</b></h4>
                                    {body.items.map((item, ik) => {
                                        return <a href={item.link} target="_blank" className="btn btn-selfservice" key={ik}>{item.title}</a>
                                    })}
                                </div>
                            )
                        })}
                    </AccordionItemBody>
                </AccordionItem>
            )
        })

        return <div style={style.accordionStyle}>
            <Header
                mainText='Training resources'
                subText='If something is missing, please let us know'
            />
            <Accordion>{accordion}</Accordion>
        </div>
    }
}